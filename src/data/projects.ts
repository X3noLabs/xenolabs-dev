export interface Project {
  slug: string;
  accent: string;
  stack: string[];
  screenshots?: string[];
  // Kept in the data but left off the site (e.g. client work awaiting permission to show).
  hidden?: boolean;
  // Two matching screenshots shown as a drag-to-compare slider on the projects page.
  compare?: {
    before: string;
    after: string;
    labels: [string, string];
  };
  links?: { label: string; href: string }[];
  // Slug of a case-study page at /{lang}/projects/{caseStudy}/.
  caseStudy?: string;
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

const allProjects: Project[] = [
  {
    slug: 'forge',
    accent: '#5b5bf0',
    screenshots: [
      '/screenshots/forge-01-dashboard.webp',
      '/screenshots/forge-02-projects.webp',
      '/screenshots/forge-03-project-detail.webp',
      '/screenshots/forge-04-tasks.webp',
      '/screenshots/forge-05-ideas.webp',
      '/screenshots/forge-06-invoices.webp',
      '/screenshots/forge-07-invoice-detail.webp',
      '/screenshots/forge-08-dashboard-mobile.webp',
    ],
    stack: ['React', 'Firebase', 'Cloud Functions', 'MCP'],
    name: { en: 'Forge', es: 'Forge' },
    tagline: {
      en: 'Project management that an AI assistant can run too',
      es: 'Gestión de proyectos que también puede manejar un asistente de IA',
    },
    description: {
      en: 'Off-the-shelf tools like Notion were heavier than my work needed, so I built my own and moved everything into it. Forge tracks projects, milestones, tasks and recurring work, and turns billable time into hourly or fixed-rate invoices. It also has its own MCP server, so I can ask an AI assistant to check what’s due, add tasks or update a project straight from chat, without opening the app.',
      es: 'Herramientas como Notion eran más pesadas de lo que mi trabajo necesitaba, así que construí la mía y pasé todo a ella. Forge da seguimiento a proyectos, hitos, tareas y trabajo recurrente, y convierte el tiempo facturable en facturas por hora o tarifa fija. Además tiene su propio servidor MCP, así que puedo pedirle a un asistente de IA que revise qué vence, agregue tareas o actualice un proyecto directamente desde el chat, sin abrir la app.',
    },
  },
  {
    slug: 'hive-mind',
    caseStudy: 'hive-mind',
    accent: '#8b5cf6',
    screenshots: [
      '/screenshots/hive-mind-01-office.webp',
      '/screenshots/hive-mind-02-bots-status.webp',
      '/screenshots/hive-mind-03-chat.webp',
      '/screenshots/hive-mind-04-diagram.webp',
      '/screenshots/hive-mind-05-knowledge-base.webp',
    ],
    stack: ['Claude & OpenAI', 'Discord & Signal', 'Git-based Knowledge Base'],
    name: { en: 'Hive Mind', es: 'Hive Mind' },
    tagline: {
      en: 'An AI chief of staff with a team of specialists behind it',
      es: 'Un jefe de gabinete de IA con un equipo de especialistas detrás',
    },
    description: {
      en: 'The system I use to run my own workload. I message it from Discord or Signal the way I would a colleague, and a "chief of staff" agent decides who should handle each request: a developer, a researcher, a sysadmin, a reviewer or an artist. Everything it learns and decides goes into a Git-based knowledge base, so context carries over between sessions instead of being re-explained every time. A live office dashboard shows who’s working on what. It’s actively evolving, and it’s where I prove out the agent patterns I build for clients.',
      es: 'El sistema con el que manejo mi propio trabajo. Le escribo desde Discord o Signal como le escribiría a un colega, y un agente "jefe de gabinete" decide quién debe encargarse de cada petición: un desarrollador, un investigador, uno de sistemas, un revisor o una artista. Todo lo que aprende y decide queda en una base de conocimiento en Git, así que el contexto se conserva entre sesiones en lugar de tener que explicarlo cada vez. Un panel en vivo muestra quién está trabajando en qué. Sigue evolucionando, y es donde pongo a prueba los patrones de agentes que construyo para clientes.',
    },
  },
  {
    slug: 'relay',
    accent: '#22a37b',
    screenshots: [
      '/screenshots/relay-01-car-dashboard.webp',
      '/screenshots/relay-02-listen.webp',
      '/screenshots/relay-03-customize.webp',
      '/screenshots/relay-04-history.webp',
      '/screenshots/relay-05-quick-answer.webp',
    ],
    stack: ['Kotlin', 'Android Auto', 'Claude API', 'AWS Polly'],
    name: { en: 'Relay', es: 'Relay' },
    tagline: {
      en: 'A voice-first AI assistant for the car',
      es: 'Un asistente de IA por voz, hecho para el carro',
    },
    description: {
      en: 'An Android Auto app for talking to Claude without taking your hands off the wheel. Ask a question, hear a spoken answer, and keep the conversation going: Relay remembers what you said a few questions ago, and you can cut in mid-answer to redirect it. You can pick a faster or smarter model and one of several natural voices, and every conversation is saved to review later on the phone. It was tested on real drives in a real car, not just an emulator.',
      es: 'Una app de Android Auto para platicar con Claude sin soltar el volante. Haces una pregunta, escuchas la respuesta y sigues la conversación: Relay recuerda lo que dijiste unas preguntas atrás, y puedes interrumpirlo a media respuesta para cambiar el rumbo. Puedes elegir un modelo más rápido o más capaz y una de varias voces naturales, y cada conversación se guarda para revisarla después en el celular. La probé en trayectos reales en un carro real, no solo en un emulador.',
    },
  },
  {
    slug: 'gradebook',
    accent: '#e0975a',
    screenshots: [
      '/screenshots/gradebook-01-results-class.webp',
      '/screenshots/gradebook-02-results-student.webp',
      '/screenshots/gradebook-03-attendance.webp',
      '/screenshots/gradebook-04-homework.webp',
      '/screenshots/gradebook-05-roster.webp',
      '/screenshots/gradebook-06-mobile-results.webp',
    ],
    stack: ['Web App', 'Cloud Sync', 'PDF Export'],
    name: { en: "Digital Gradebook", es: 'Calificaciones Digitales' },
    tagline: {
      en: 'From a teacher’s spreadsheet to a gradebook she uses every day',
      es: 'De la hoja de cálculo de una maestra a un sistema que usa a diario',
    },
    description: {
      en: 'A gradebook built from an English teacher’s real Excel sheet, matching her rubric exactly rather than forcing her into someone else’s. She sets the weighting for attendance, participation, homework, notebook and exams once, and it calculates per-skill grades, bimester averages and class rankings automatically across the whole school year. It also keeps a behaviour incident log, prints report cards, saves as she types and syncs between her tablet and computer.',
      es: 'Un sistema de calificaciones hecho a partir del Excel real de una maestra de inglés, que respeta exactamente su rúbrica en lugar de obligarla a usar la de alguien más. Configura una sola vez la ponderación de asistencia, participación, tareas, cuaderno y examen, y el sistema calcula automáticamente las calificaciones por habilidad, los promedios por bimestre y el ranking del grupo durante todo el ciclo escolar. También lleva un registro de incidentes de conducta, imprime boletas, guarda mientras escribe y se sincroniza entre su tablet y su computadora.',
    },
  },
  {
    slug: 'donde-squad',
    accent: '#d64550',
    screenshots: [
      '/screenshots/donde-squad-01-home.webp',
      '/screenshots/donde-squad-02-round.webp',
      '/screenshots/donde-squad-03-reveal.webp',
      '/screenshots/donde-squad-04-game-end.webp',
      '/screenshots/donde-squad-05-la-feria.webp',
      '/screenshots/donde-squad-06-wardrobe.webp',
      '/screenshots/donde-squad-07-mobile-round.webp',
    ],
    stack: ['Next.js', 'Firebase', 'Google Maps API'],
    name: { en: '¿Dónde Squad?', es: '¿Dónde Squad?' },
    tagline: {
      en: 'A GeoGuessr-style game, built for family game night',
      es: 'Un juego estilo GeoGuessr, hecho para las noches de juego en familia',
    },
    description: {
      en: 'A real-time multiplayer game where everyone gets dropped onto the same street somewhere in the world and races to pin where they are. There are over 400 hand-checked locations in about 90 countries, five game modes (including cooperative and team play), and difficulties from free-roaming Street View to a frozen satellite view. Winnings unlock mini-games and cosmetics for illustrated avatars of the family. It started as a side build and became our game night.',
      es: 'Un juego multijugador en tiempo real donde todos aparecen en la misma calle de algún lugar del mundo y compiten por adivinar dónde están. Tiene más de 400 ubicaciones revisadas a mano en unos 90 países, cinco modos de juego (incluyendo cooperativo y por equipos) y niveles de dificultad que van de Street View libre a una vista satelital congelada. Las ganancias desbloquean minijuegos y cosméticos para avatares ilustrados de la familia. Empezó como un proyecto de fin de semana y se volvió nuestra noche de juegos.',
    },
  },
  {
    slug: 'auto-shop',
    accent: '#6b7280',
    screenshots: [
      '/screenshots/local-sites-01-home-split.webp?v=2',
      '/screenshots/local-sites-02-why-us-split.webp?v=2',
      '/screenshots/local-sites-03-services-split.webp?v=2',
      '/screenshots/local-sites-04-mobile-both.webp?v=2',
    ],
    compare: {
      before: '/screenshots/local-sites-01-home-ebb.webp?v=2',
      after: '/screenshots/local-sites-01-home-baja.webp?v=2',
      labels: ['EBB', 'Baja Garage'],
    },
    links: [
      { label: 'ebb.com.mx', href: 'https://ebb.com.mx/' },
      { label: 'bajagarage.com.mx', href: 'https://bajagarage.com.mx/' },
    ],
    stack: ['Web Design', 'Local SEO'],
    name: { en: 'Local Business Websites', es: 'Sitios Web para Negocios Locales' },
    tagline: {
      en: 'Two workshops, one site system, two distinct brands',
      es: 'Dos talleres, un mismo sistema, dos marcas distintas',
    },
    description: {
      en: 'Websites for two auto repair workshops, EBB in Guanajuato and Baja Garage in Aguascalientes, built on one shared site system and styled to each brand with its own logo, colours and type. Clean, fast-loading and mobile-first, focused on what a local workshop actually needs: clear services, hours, location, and an easy way for customers to get in touch. Drag the slider to compare them.',
      es: 'Sitios web para dos talleres mecánicos, EBB en Guanajuato y Baja Garage en Aguascalientes, construidos sobre un mismo sistema y adaptados a cada marca con su propio logo, colores y tipografía. Limpios, rápidos y pensados primero para el celular, enfocados en lo que un taller local realmente necesita: servicios claros, horarios, ubicación y una forma fácil de que los clientes se pongan en contacto. Desliza para compararlos.',
    },
  },
  {
    slug: 'mous-mettle',
    accent: '#ec4899',
    screenshots: [
      '/screenshots/mous-mettle-01-dashboard.webp?v=2',
      '/screenshots/mous-mettle-02-log-workout.webp?v=2',
      '/screenshots/mous-mettle-03-pr-detail.webp?v=2',
      '/screenshots/mous-mettle-04-cycle-tracker.webp?v=2',
      '/screenshots/mous-mettle-05-settings.webp?v=2',
    ],
    stack: ['Flutter', 'Firebase', 'Samsung Health SDK'],
    name: { en: "Mou's Mettle", es: "Mou's Mettle" },
    tagline: {
      en: 'A CrossFit and cycle tracker, built as a gift',
      es: 'Una app de CrossFit y ciclo menstrual, hecha como regalo',
    },
    description: {
      en: 'A training app built for my partner around how she actually trains. She can snap the gym whiteboard to log a WOD instead of typing it out. It tracks three kinds of PR, sets lift milestones that move up as she gets stronger, and pulls in her Samsung Health data. It sits alongside a cycle tracker that predicts ovulation and fertile windows cycle by cycle, so training and recovery live in one place. Fully bilingual, and in daily use.',
      es: 'Una app de entrenamiento hecha para mi pareja, pensada en cómo entrena realmente. Puede tomarle foto al pizarrón del box para registrar el WOD en lugar de escribirlo. Registra tres tipos de PR, pone metas de levantamiento que suben conforme se hace más fuerte y trae sus datos de Samsung Health. Todo junto a un seguimiento del ciclo que predice la ovulación y los días fértiles de cada ciclo, para tener entrenamiento y recuperación en un solo lugar. Totalmente bilingüe y en uso diario.',
    },
  },
];

export const projects = allProjects.filter((project) => !project.hidden);

// Screenshots carry an English caption baked into the image; the Spanish site
// uses the same shots with Spanish captions from /screenshots/es/.
export function localizedShot(src: string, lang: 'en' | 'es'): string {
  return lang === 'es' ? src.replace('/screenshots/', '/screenshots/es/') : src;
}
