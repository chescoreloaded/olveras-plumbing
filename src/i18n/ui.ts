export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    // Header
    'header.emergency': 'Emergency 24/7',
    'header.call': 'Call Now',
    
    // Hero
    'hero.badge': 'AVAILABLE 24/7 FOR EMERGENCIES',
    'hero.title.span': 'PLUMBING', // La parte "PLUMBING" que va en otro color
    'hero.subtitle': 'Experts in leak repair, water heaters, drains, and complete remodeling. Quality guaranteed in Jacksonville.',
    'hero.btn.call': 'Call Now',
    'hero.btn.services': 'View Services',
  },
  es: {
    // Header
    'header.emergency': 'Emergencias 24/7',
    'header.call': 'Llamar',
    
    // Hero
    'hero.badge': 'DISPONIBLE 24/7 PARA URGENCIAS',
    'hero.title.span': 'PLOMERÍA',
    'hero.subtitle': 'Expertos en reparación de fugas, calentadores, drenajes y remodelaciones completas. Calidad garantizada en Jacksonville.',
    'hero.btn.call': 'Llamar Ya',
    'hero.btn.services': 'Ver Servicios',
  },
} as const;