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
    stack: ['React', 'Firebase', 'Cloud Functions', 'Express'],
    name: { en: 'Forge', es: 'Forge' },
    tagline: {
      en: 'Project management, without the bloat',
      es: 'Gestión de proyectos, sin la carga extra',
    },
    description: {
      en: 'A lightweight internal tool for tracking projects, milestones, and tasks — built because the existing options felt heavier than the work actually needed. Includes a dashboard, activity history, client billing with hourly and fixed-rate invoicing, and a companion MCP server so the assistant can read and update projects directly from chat.',
      es: 'Una herramienta interna ligera para dar seguimiento a proyectos, hitos y tareas — la construí porque las opciones que había se sentían más pesadas de lo que el trabajo realmente necesitaba. Incluye un panel, historial de actividad, facturación de clientes por hora o tarifa fija, y un servidor MCP complementario para que el asistente pueda leer y actualizar proyectos directamente desde el chat.',
    },
  },
  {
    slug: 'hive-mind',
    accent: '#8b5cf6',
    screenshots: [
      '/screenshots/hive-mind-01-office.webp',
      '/screenshots/hive-mind-02-bots-status.webp',
      '/screenshots/hive-mind-03-chat.webp',
      '/screenshots/hive-mind-04-diagram.webp',
      '/screenshots/hive-mind-05-knowledge-base.webp',
    ],
    stack: ['Claude API', 'Discord & Signal', 'Git-based Knowledge Base'],
    name: { en: 'Hive Mind', es: 'Hive Mind' },
    tagline: {
      en: 'A personal AI chief of staff, and the specialists it delegates to',
      es: 'Un jefe de gabinete de IA personal, y los especialistas a los que delega',
    },
    description: {
      en: 'An ongoing multi-agent system built for my own workload — a "chief of staff" agent that takes requests from chat, routes each one to the right specialist (a developer, a researcher, a sysadmin, a writer), and keeps a running Git-based knowledge base so context and decisions carry over between sessions instead of getting lost. Still actively evolving — including a live dashboard that shows what each agent is doing in real time.',
      es: 'Un sistema multiagente que sigo construyendo para mi propio trabajo — un agente "jefe de gabinete" que recibe peticiones desde el chat, las reparte al especialista correcto (un agente desarrollador, investigador, de sistemas o de redacción), y mantiene una base de conocimiento en Git para que el contexto y las decisiones se conserven entre sesiones en lugar de perderse. Sigue evolucionando activamente — incluyendo un panel en vivo que muestra en qué está trabajando cada agente en tiempo real.',
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
      en: 'An Android Auto app that lets you talk to Claude hands-free while driving — ask a question, get a spoken answer, keep going. Built with real multi-turn memory, barge-in interruption, and natural-sounding voices, and tested on real drives rather than an emulator.',
      es: 'Una app de Android Auto que te permite hablar con Claude sin usar las manos mientras manejas — haces una pregunta, obtienes una respuesta hablada, y sigues tu camino. Tiene memoria real de conversación con varios turnos, la puedes interrumpir a media respuesta, y usa voces naturales. La probé en manejadas reales, no solo en un emulador.',
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
      en: 'Built for a teacher, one real spreadsheet at a time',
      es: 'Hecho para una maestra, partiendo de su hoja de cálculo real',
    },
    description: {
      en: 'A gradebook web app for a school teacher, built to match her existing grading rubric exactly — attendance, participation, homework, and exam weighting, per-skill grades, class rankings, and printable report cards. Now syncs across her tablet and computer.',
      es: 'Una aplicación web de calificaciones para una maestra, hecha para calzar exactamente con su rúbrica de calificación existente — asistencia, participación, tarea y peso de exámenes, calificaciones por habilidad, ranking de grupo y boletas imprimibles. Ahora se sincroniza entre su tablet y su computadora.',
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
      en: 'A location-guessing game for up to six players, with several game modes, a coin economy, a wardrobe of unlockable cosmetics, achievements, and daily challenges. Started as a fun side build and grew into a full family app, complete with custom illustrated art and sound.',
      es: 'Un juego de adivinar ubicaciones para hasta seis jugadores, con varios modos de juego, una economía de monedas, un guardarropa de cosméticos desbloqueables, logros y retos diarios. Empezó como un proyecto divertido y se convirtió en una app familiar completa, con arte ilustrado y sonido hechos a la medida.',
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
      en: 'A CrossFit and cycle tracker, built as a personal gift',
      es: 'Un rastreador de CrossFit y ciclo, hecho como regalo personal',
    },
    description: {
      en: 'A Flutter fitness app built as a personal gift for my partner — WOD logging with photo-scan OCR, three-way PR tracking, self-adjusting lift milestones, and two-way Samsung Health sync, alongside a full cycle tracker with per-cycle ovulation and fertile-window predictions. Fully bilingual, shipped and in daily use.',
      es: 'Una app de fitness en Flutter hecha como regalo personal para mi pareja — registro de WODs con escaneo OCR, seguimiento de PRs en tres modalidades, hitos de peso que se ajustan solos, y sincronización bidireccional con Samsung Health, junto con un rastreador de ciclo completo con predicciones de ovulación y ventana fértil por ciclo. Totalmente bilingüe, ya lanzada y en uso diario.',
    },
  },
];

export const projects = allProjects.filter((project) => !project.hidden);
