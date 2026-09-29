export interface Testimonial {
  id: string;
  quote: {
    en: string;
    es: string;
  };
  author: string;
  // Drafts stay out of the rendered site until a real quote replaces the placeholder.
  draft?: boolean;
  role: {
    en: string;
    es: string;
  };
}

// Placeholder copy — swap in the real quotes once the auto shop and Monse send theirs.
const allTestimonials: Testimonial[] = [
  {
    id: 'auto-shop',
    draft: true,
    quote: {
      en: '[Placeholder — swap in the auto repair shop’s actual review]',
      es: '[Marcador de posición — reemplazar con la reseña real del taller mecánico]',
    },
    author: 'Local Auto Shop',
    role: {
      en: 'Website client',
      es: 'Cliente de sitio web',
    },
  },
  {
    id: 'monse',
    draft: true,
    quote: {
      en: '[Placeholder — swap in Monse’s actual review]',
      es: '[Marcador de posición — reemplazar con la reseña real de Monse]',
    },
    author: 'Monse',
    role: {
      en: "Mou's Mettle beta tester",
      es: "Beta tester de Mou's Mettle",
    },
  },
];

export const testimonials = allTestimonials.filter((t) => !t.draft);
