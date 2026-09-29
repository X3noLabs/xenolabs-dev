interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
  // Optional: once set, every submission must carry a valid Turnstile token.
  TURNSTILE_SECRET_KEY?: string;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  wantsCall?: unknown;
  callTime?: unknown;
  timeZone?: unknown;
  locale?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });
  if (!res.ok) return false;
  const outcome = (await res.json()) as { success?: boolean };
  return outcome.success === true;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  // Honeypot: the field is hidden from people, so anything in it is a bot.
  // Answer as if it worked so the bot has nothing to learn from.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const token = typeof body.turnstileToken === 'string' ? body.turnstileToken : '';
    const ip = request.headers.get('CF-Connecting-IP');
    if (!token || !(await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip))) {
      return new Response(JSON.stringify({ error: 'Verification failed' }), { status: 403 });
    }
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 200) : '';
  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 5000) : '';
  const wantsCall = body.wantsCall === true;
  const callTime = typeof body.callTime === 'string' ? body.callTime.trim().slice(0, 100) : '';
  const timeZone = typeof body.timeZone === 'string' ? body.timeZone.trim().slice(0, 64) : '';
  const locale = body.locale === 'es' ? 'es' : 'en';

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'Missing or invalid fields' }), { status: 400 });
  }

  const callLine = wantsCall
    ? `<p><strong>Intro call requested</strong>${
        callTime
          ? ` — preferred time: ${escapeHtml(callTime.replace('T', ' '))}${timeZone ? ` (${escapeHtml(timeZone)})` : ' (timezone unknown)'}`
          : ' — no preferred time given'
      }</p>`
    : '';

  const html = `
    <div style="font-family: system-ui, sans-serif; font-size: 14px; color: #0f1115;">
      <p><strong>New message from xenolabs.dev</strong> (${locale})</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${callLine}
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Xeno Labs <contact@xenolabs.dev>',
        to: [env.CONTACT_EMAIL],
        reply_to: email,
        subject: wantsCall ? `New intro call request from ${name}` : `New message from ${name}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      console.error('Resend error', resendRes.status, detail);
      return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact function error', err);
    return new Response(JSON.stringify({ error: 'Unexpected error' }), { status: 500 });
  }
};

export const onRequestGet: PagesFunction = async () => {
  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
};
