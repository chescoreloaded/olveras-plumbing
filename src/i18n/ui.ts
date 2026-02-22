export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    // --- LÓGICA DE NEGOCIO (NUEVO) ---
    // Teléfonos y WhatsApp
    'phone.primary.display': '(904) 861-7792',  // Inglés Primario
    'phone.primary.link': '9048617792',
    'phone.secondary.display': '(904) 678-1775', // Español como respaldo
    'phone.secondary.link': '9046781775',
    'phone.secondary.label': 'Spanish Line',
    'whatsapp.number': '9048617792', // WhatsApp Inglés

    // Estado del negocio (Header)
    'header.slogan': "Jacksonville's Trusted Plumbers", // NUEVO
    'header.open': 'Open Now',
    'header.closed': 'Emergency Service Available',

    // --- TEXTOS DE LA UI ---
    // Navegación
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',

    // Header & Hero (Usados en index.astro)
    'header.emergency': 'Emergency 24/7',
    'header.call': 'Call Now',
// CAMBIO DE COPYWRITING: Enfoque en Beneficio
    'hero.badge': 'Available 24/7 for Emergencies',
    'hero.title.main': 'Fast & Reliable Plumbing Solutions', // Antes decía algo con Olveras
    'hero.subtitle': 'From leak detection to complete bathroom remodeling. We fix it right the first time.',
    'hero.btn.call': 'Get Emergency Help',
    'hero.btn.services': 'View Our Services',

    // Contact Form
    'form.title': 'Get a Free Quote',
    'form.subtitle': 'Fill out the form below and we will get back to you within 24 hours.',
    
    // Footer
    'footer.aboutTitle': 'Quick Links',
    'footer.aboutText': 'Professional plumbing services in Jacksonville, FL. Dedicated to quality craftsmanship and 24/7 availability.',
    'footer.contactTitle': 'Contact Us',
    'footer.rights': 'All rights reserved.',
  },
  es: {
    // --- LÓGICA DE NEGOCIO (NUEVO) ---
    // Teléfonos y WhatsApp
    'phone.primary.display': '(904) 678-1775',  // Español Primario
    'phone.primary.link': '9046781775',
    'phone.secondary.display': '(904) 861-7792', // Inglés como respaldo
    'phone.secondary.link': '9048617792',
    'phone.secondary.label': 'Línea en Inglés',
    'whatsapp.number': '9046781775', // WhatsApp Español

    // Estado del negocio (Header)
    'header.slogan': 'Sus Plomeros de Confianza en Jax', // NUEVO
    'header.open': 'Abierto Ahora',
    'header.closed': 'Servicio de Emergencia',

    // --- TEXTOS DE LA UI ---
    // Navegación
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.reviews': 'Reseñas',
    'nav.contact': 'Contacto',

    // Header & Hero
    'header.emergency': 'Emergencia 24/7',
    'header.call': 'Llamar Ahora',
    'hero.badge': 'Disponibles 24/7 para Emergencias',
    'hero.title.main': 'Soluciones de Plomería Rápidas y Honestas', // Mucho más potente
    'hero.subtitle': 'Desde detección de fugas hasta remodelación de baños. Lo arreglamos bien a la primera.',
    'hero.btn.call': 'Ayuda de Emergencia',
    'hero.btn.services': 'Ver Servicios',

    // Contact Form
    'form.title': 'Solicita Presupuesto',
    'form.subtitle': 'Llena el formulario y te contactaremos en menos de 24 horas.',

    // Footer
    'footer.aboutTitle': 'Enlaces Rápidos',
    'footer.aboutText': 'Servicios profesionales de plomería en Jacksonville, FL. Dedicados a la calidad artesanal y disponibilidad 24/7.',
    'footer.contactTitle': 'Contáctanos',
    'footer.rights': 'Todos los derechos reservados.',
  },
} as const;