export interface Testimonial {
  id: string;
  quote: {
    en: string;
    es: string;
  };
  author: string;
  role: {
    en: string;
    es: string;
  };
}

// Placeholder copy — swap in the real quotes once the auto shop and Monse send theirs.
export const testimonials: Testimonial[] = [
  {
    id: 'auto-shop',
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
    quote: {
      en: '[Placeholder — swap in Monse’s actual review]',
      es: '[Marcador de posición — reemplazar con la reseña real de Monse]',
    },
    author: 'Monse',
    role: {
      en: "Mou's Mettle client",
      es: "Cliente de Mou's Mettle",
    },
  },
];
