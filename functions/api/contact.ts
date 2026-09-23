interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  wantsCall?: unknown;
  callTime?: unknown;
  locale?: unknown;
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

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 200) : '';
  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 5000) : '';
  const wantsCall = body.wantsCall === true;
  const callTime = typeof body.callTime === 'string' ? body.callTime.trim().slice(0, 100) : '';
  const locale = body.locale === 'es' ? 'es' : 'en';

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'Missing or invalid fields' }), { status: 400 });
  }

  const callLine = wantsCall
    ? `<p><strong>Intro call requested</strong>${callTime ? ` — preferred time: ${escapeHtml(callTime)}` : ' — no preferred time given'}</p>`
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
