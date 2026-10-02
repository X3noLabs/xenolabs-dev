import type { APIRoute } from 'astro';

// Hand-rolled instead of @astrojs/sitemap: the site is a handful of static
// pages mirrored across two locales, and this keeps each URL's hreflang
// alternates next to it without another dependency.
const SITE = 'https://xenolabs.dev';

const slugs = Object.keys(import.meta.glob('./en/**/*.astro'))
  .map((file) => file.replace('./en/', '').replace('.astro', ''))
  .map((name) => (name === 'index' ? '' : `${name}/`))
  .sort();

function entry(lang: 'en' | 'es', slug: string): string {
  const alt = (l: string) => `${SITE}/${l}/${slug}`;
  return `  <url>
    <loc>${alt(lang)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${alt('en')}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${alt('es')}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>
  </url>`;
}

export const GET: APIRoute = () => {
  const urls = slugs.flatMap((slug) => [entry('en', slug), entry('es', slug)]);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
