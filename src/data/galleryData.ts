import type { ImageMetadata } from 'astro';

// --- 1. IMPORTACIÓN MASIVA DE FOTOS (Tus archivos reales) ---
import imgHeater from '../assets/1.jpeg';      // Boiler A.O. Smith
import imgSewerPump from '../assets/2.jpeg';   // Bomba exterior
import imgRoughShower from '../assets/3.jpeg'; // Shower Pan
import imgJacuzzi from '../assets/4.jpeg';     // Jacuzzi Gold
import imgCrawlspace from '../assets/5.jpeg';  // Debajo de casa
import imgRoughConcrete from '../assets/6.jpeg'; // Concreto
import imgFraming1 from '../assets/7.jpeg';    // Framing ducha
import imgFraming2 from '../assets/8.jpeg';    // Framing aéreo
import imgSewerDig from '../assets/9.jpeg';    // Zanja bomba
import imgVanity from '../assets/10.jpeg';     // Baño terminado
import imgFilter from '../assets/11.jpeg';     // Filtros Azules
import imgMainLine from '../assets/12.jpg';    // Zanja Humana
import imgFiberglass from '../assets/13.jpg';  // Ducha Fibra
import imgBanosLuxury from '../assets/banos2.jpeg'; 
import imgBanosHero from '../assets/hero-bg.jpg';
import imgDisposal from '../assets/lavabos.jpeg'; // Garbage disposal
import imgPexWall from '../assets/instalacion.jpeg'; // Pex en techo
import imgLaundry from '../assets/instalacion2.jpeg'; // Conexiones lavandería
import imgFaucet from '../assets/llaveagua.jpeg'; // Llave en vanity azul
import imgBanosSmall from '../assets/banos.jpeg'; // Baño pequeño
import imgShowerTile from '../assets/banos1.jpeg'; // Ducha subway tile

// --- 2. DEFINICIÓN DE CATEGORÍAS ---
// IMPORTANTE: Estos valores deben coincidir con los IDs en Services.astro
export const CATEGORIES = {
  ALL: 'all',
  FILTRATION: 'filtration',
  BATHROOM: 'bathroom',
  REPIPING: 'repiping',
  DRAIN: 'drain',
  HEATER: 'heater',
  EMERGENCY: 'emergency'
} as const;

export interface GalleryItem {
  id: string;
  src: ImageMetadata;
  alt: string;
  category: string;
}

// --- 3. ASIGNACIÓN DE FOTOS ---
export const galleryItems: GalleryItem[] = [
  // --- FILTRATION (Filtros) ---
  { id: 'filter-system', src: imgFilter, alt: 'Sistema completo de filtración y suavizador de agua', category: CATEGORIES.FILTRATION },

  // --- BATHROOM (Baños) ---
  { id: 'bath-jacuzzi', src: imgJacuzzi, alt: 'Jacuzzi de lujo con grifería dorada', category: CATEGORIES.BATHROOM },
  { id: 'bath-hero', src: imgBanosHero, alt: 'Bañera exenta con vitrales de fondo', category: CATEGORIES.BATHROOM },
  { id: 'bath-bidet', src: imgBanosLuxury, alt: 'Inodoro y Bidet modernos', category: CATEGORIES.BATHROOM },
  { id: 'bath-vanity', src: imgVanity, alt: 'Mueble de baño moderno con encimera de cuarzo', category: CATEGORIES.BATHROOM },
  { id: 'bath-faucet', src: imgFaucet, alt: 'Instalación de grifería y mueble azul', category: CATEGORIES.BATHROOM },
  { id: 'bath-tile', src: imgShowerTile, alt: 'Ducha con azulejo tipo metro y nicho', category: CATEGORIES.BATHROOM },
  { id: 'bath-small', src: imgBanosSmall, alt: 'Remodelación de baño de visitas con papel tapiz', category: CATEGORIES.BATHROOM },

  // --- REPIPING (Tuberías y Obra Gris) ---
  { id: 'pex-crawl', src: imgCrawlspace, alt: 'Reemplazo de tubería bajo la casa (Crawlspace)', category: CATEGORIES.REPIPING },
  { id: 'pex-ceiling', src: imgPexWall, alt: 'Líneas de agua PEX instaladas en techo', category: CATEGORIES.REPIPING },
  { id: 'rough-shower', src: imgRoughShower, alt: 'Impermeabilización de base de ducha (Shower Pan)', category: CATEGORIES.REPIPING },
  { id: 'rough-concrete', src: imgRoughConcrete, alt: 'Instalación de drenaje en piso de concreto', category: CATEGORIES.REPIPING },
  { id: 'framing-aerial', src: imgFraming2, alt: 'Vista aérea de tuberías en estructura de madera', category: CATEGORIES.REPIPING },
  { id: 'framing-shower', src: imgFraming1, alt: 'Estructura para nueva ducha', category: CATEGORIES.REPIPING },
  { id: 'fiberglass', src: imgFiberglass, alt: 'Instalación de unidad de ducha de fibra de vidrio', category: CATEGORIES.REPIPING },
  { id: 'laundry', src: imgLaundry, alt: 'Conexiones de agua y drenaje para lavandería', category: CATEGORIES.REPIPING },

  // --- DRAIN (Drenajes y Exterior) ---
  { id: 'main-line', src: imgMainLine, alt: 'Reparación de línea principal de drenaje (Excavación)', category: CATEGORIES.DRAIN },
  { id: 'sewer-pump', src: imgSewerPump, alt: 'Sistema de bomba de expulsión exterior', category: CATEGORIES.DRAIN },
  { id: 'sewer-dig', src: imgSewerDig, alt: 'Excavación para instalación de bomba', category: CATEGORIES.DRAIN },
  { id: 'disposal', src: imgDisposal, alt: 'Instalación de triturador de comida', category: CATEGORIES.DRAIN },

  // --- HEATER (Calentadores) ---
  { id: 'heater-aosmith', src: imgHeater, alt: 'Calentador de agua A.O. Smith nuevo', category: CATEGORIES.HEATER },

  // --- EMERGENCY (Usamos fotos de impacto técnico) ---
  // Nota: Reutilizamos algunas fotos que sirven para emergencia
  { id: 'emergency-pump', src: imgSewerPump, alt: 'Respuesta a fallo de sistema de bombeo', category: CATEGORIES.EMERGENCY },
  { id: 'emergency-line', src: imgMainLine, alt: 'Reparación urgente de colapso de drenaje', category: CATEGORIES.EMERGENCY },
];