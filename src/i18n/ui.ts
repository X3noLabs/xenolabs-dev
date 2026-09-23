export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.cta': 'Get in touch',
    'footer.tagline': 'AI agents and automation, built to quietly take work off your plate.',
    'footer.rights': 'All rights reserved.',
    'footer.based': 'Based in Guanajuato, Mexico. Working with clients everywhere.',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.services': 'Servicios',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'nav.cta': 'Contáctame',
    'footer.tagline': 'Agentes de IA y automatización, hechos para quitarte trabajo de encima sin hacer ruido.',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.based': 'Con base en Guanajuato, México. Trabajo con clientes en cualquier parte.',
  },
} as const;

export type Lang = keyof typeof ui;
