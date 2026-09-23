export interface Project {
  slug: string;
  accent: string;
  stack: string[];
  name: {
    en: string;
    es: string;
  };
  tagline: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'forge',
    accent: '#5b5bf0',
    stack: ['React', 'Firebase', 'Cloud Functions', 'Express'],
    name: { en: 'Forge', es: 'Forge' },
    tagline: {
      en: 'Project management, without the bloat',
      es: 'Gestión de proyectos, sin la carga extra',
    },
    description: {
      en: 'A lightweight internal tool for tracking projects, milestones, and tasks — built because the existing options felt heavier than the work actually needed. Includes a dashboard, activity history, and a companion MCP server so the assistant can read and update projects directly from chat.',
      es: 'Una herramienta interna ligera para dar seguimiento a proyectos, hitos y tareas — la construí porque las opciones que había se sentían más pesadas de lo que el trabajo realmente necesitaba. Incluye un panel, historial de actividad y un servidor MCP complementario para que el asistente pueda leer y actualizar proyectos directamente desde el chat.',
    },
  },
  {
    slug: 'relay',
    accent: '#22a37b',
    stack: ['Kotlin', 'Android Auto', 'Claude API', 'AWS Polly'],
    name: { en: 'Relay', es: 'Relay' },
    tagline: {
      en: 'A voice-first AI assistant for the car',
      es: 'Un asistente de IA por voz, hecho para el coche',
    },
    description: {
      en: 'An Android Auto app that lets you talk to Claude hands-free while driving — ask a question, get a spoken answer, keep going. Built with real multi-turn memory, barge-in interruption, and natural-sounding voices, and tested on real drives rather than an emulator.',
      es: 'Una app de Android Auto que te permite hablar con Claude sin usar las manos mientras manejas — haces una pregunta, obtienes una respuesta hablada, y sigues tu camino. Tiene memoria real de conversación con varios turnos, la puedes interrumpir a media respuesta, y usa voces naturales. La probé en manejadas reales, no solo en un emulador.',
    },
  },
  {
    slug: 'gradebook',
    accent: '#e0975a',
    stack: ['Web App', 'Cloud Sync', 'PDF Export'],
    name: { en: "Digital Gradebook", es: 'Calificaciones Digitales' },
    tagline: {
      en: 'Built for a teacher, one real spreadsheet at a time',
      es: 'Hecho para una maestra, partiendo de su hoja de cálculo real',
    },
    description: {
      en: 'A gradebook web app for a school teacher, built to match her existing grading rubric exactly — attendance, participation, homework, and exam weighting, per-skill grades, class rankings, and printable report cards. Now syncs across her tablet and computer, and is being scoped for a wider school rollout.',
      es: 'Una aplicación web de calificaciones para una maestra, hecha para calzar exactamente con su rúbrica de calificación existente — asistencia, participación, tarea y peso de exámenes, calificaciones por habilidad, ranking de grupo y boletas imprimibles. Ahora se sincroniza entre su tablet y su computadora, y se está evaluando llevarla a toda la escuela.',
    },
  },
  {
    slug: 'donde-squad',
    accent: '#d64550',
    stack: ['Next.js', 'Firebase', 'Google Maps API'],
    name: { en: '¿Dónde Squad?', es: '¿Dónde Squad?' },
    tagline: {
      en: 'A GeoGuessr-style game, built for family game night',
      es: 'Un juego estilo GeoGuessr, hecho para las noches de juego en familia',
    },
    description: {
      en: 'A location-guessing game for up to six players, with several game modes, a coin economy, a wardrobe of unlockable cosmetics, achievements, and daily challenges. Started as a fun side build and grew into a full family app, complete with custom illustrated art and sound.',
      es: 'Un juego de adivinar ubicaciones para hasta seis jugadores, con varios modos de juego, una economía de monedas, un guardarropa de cosméticos desbloqueables, logros y retos diarios. Empezó como un proyecto divertido y se convirtió en una app familiar completa, con arte ilustrado y sonido hechos a la medida.',
    },
  },
  {
    slug: 'auto-shop',
    accent: '#6b7280',
    stack: ['Web Design', 'Local SEO'],
    name: { en: 'Local Business Websites', es: 'Sitios Web para Negocios Locales' },
    tagline: {
      en: 'Two sites, two locations, one small business',
      es: 'Dos sitios, dos sucursales, un negocio local',
    },
    description: {
      en: 'Designed and built websites for a local auto repair business with two locations — clean, fast-loading sites focused on the basics a small business actually needs: clear services, hours, location, and a way for customers to get in touch.',
      es: 'Diseñé y construí los sitios web de un taller mecánico local con dos sucursales — sitios limpios y rápidos, enfocados en lo que un negocio pequeño realmente necesita: servicios claros, horarios, ubicación y una forma fácil de que los clientes se pongan en contacto.',
    },
  },
];
