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

// Spanish quotes are the originals as written; English versions are translations.
const allTestimonials: Testimonial[] = [
  {
    id: 'gradebook',
    quote: {
      en: 'As an English teacher, this gradebook has become an indispensable tool. It organises the school year into two-month grading periods, lets me set the weighting for attendance, participation, homework, notebook and exams just once, and brings academic tracking and behaviour incident records together in one place. The design is clean and intuitive, and autosave gives complete peace of mind. A reliable, practical tool built with a real understanding of what a classroom needs. Highly recommended.',
      es: 'Como docente de inglés, este gradebook se ha vuelto una herramienta indispensable. Organiza el ciclo escolar por bimestres, permite configurar una sola vez la ponderación de asistencia, participación, tareas, cuaderno y examen, y reúne en un mismo lugar el seguimiento académico y el registro de incidentes de conducta. Su diseño es limpio e intuitivo, y el guardado automático da total tranquilidad. Una herramienta confiable, práctica y hecha con verdadero conocimiento de las necesidades del aula. Muy recomendable.',
    },
    author: 'Miss García',
    role: {
      en: 'English teacher · Digital Gradebook',
      es: 'Docente de inglés · Calificaciones Digitales',
    },
  },
  {
    id: 'monse',
    quote: {
      en: "Mou's Mettle is so much more than a workout log — it's a daily reminder that every effort counts. The home screen shows exactly what matters: this week's workouts, effort level, fitness score and a streak that keeps you motivated to stick with the habit. The tip of the day and the achievements section celebrate progress, even the smallest wins, and the history lets you look back and see how far you've come. Navigation is simple and practical, and you can tell it was made with love and a clear purpose: to walk alongside you on your training journey, not just measure it. An app well worth having in your day-to-day.",
      es: "Mou's Mettle es mucho más que un registro de entrenamientos: es un recordatorio diario de que cada esfuerzo cuenta. Desde la pantalla de inicio muestra con claridad lo que importa: entrenamientos de la semana, nivel de esfuerzo, puntaje de condición física y una racha que motiva a no soltar el hábito. Los consejos del día y la sección de logros celebran el progreso, incluso el más pequeño, y el historial permite ver con perspectiva cuánto se ha avanzado. Su navegación es sencilla y práctica, y se nota que fue creada con cariño y con un propósito claro: acompañar a quien entrena en el camino, no solo medirlo. Una app que vale la pena tener en tu día a día.",
    },
    author: 'Monse',
    role: {
      en: "Mou's Mettle",
      es: "Mou's Mettle",
    },
  },
  {
    id: 'auto-shop',
    draft: true,
    quote: {
      en: '[Placeholder — swap in the EBB / Baja Garage review]',
      es: '[Marcador de posición — reemplazar con la reseña de EBB / Baja Garage]',
    },
    author: 'EBB & Baja Garage',
    role: {
      en: 'Website client',
      es: 'Cliente de sitio web',
    },
  },
];

export const testimonials = allTestimonials.filter((t) => !t.draft);
