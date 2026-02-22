import { useState, useEffect } from 'react';
import { galleryItems, CATEGORIES } from '../data/galleryData';

interface Props {
  labels: {
    tabAll?: string;
    tabBath?: string;
    tabRepipe?: string;
    tabDrain?: string;
    tabHeater?: string;
    tabFilter?: string;
    [key: string]: any;
  };
}

export default function GalleryTabs({ labels }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES.ALL);

  // --- EFECTO: Leer la URL para filtrar automáticamente ---
  useEffect(() => {
    const handleHashChange = () => {
      // Obtenemos el hash completo, ej: "#showcase?category=filtration"
      const hashString = window.location.hash;

      // Buscamos si existe el parámetro "?category="
      if (hashString.includes('?category=')) {
        // Extraemos el valor después del igual
        const category = hashString.split('?category=')[1];

        // Verificamos que sea una categoría válida de nuestra lista
        // (Esto evita errores si alguien escribe ?category=basura)
        const validCategories = Object.values(CATEGORIES) as string[];
        
        if (validCategories.includes(category)) {
          setActiveCategory(category);
          
          // Opcional: Hacer scroll suave hacia la galería si no estamos ahí
          const element = document.getElementById('showcase');
          if (element) {
            // Un pequeño timeout ayuda a asegurar que el DOM esté listo
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }
      }
    };

    // 1. Escuchar cambios cuando el usuario navega (clic en botón de servicio)
    window.addEventListener('hashchange', handleHashChange);
    
    // 2. Ejecutar inmediatamente al cargar la página (por si viene de otra URL)
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Filtrar los items según el estado actual
  const filteredItems = activeCategory === CATEGORIES.ALL 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div>
      {/* --- BOTONES DE FILTRO --- */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
        
        <FilterButton 
          isActive={activeCategory === CATEGORIES.ALL} 
          onClick={() => setActiveCategory(CATEGORIES.ALL)}
          label={labels.tabAll || 'All'}
        />
        <FilterButton 
          isActive={activeCategory === CATEGORIES.FILTRATION} 
          onClick={() => setActiveCategory(CATEGORIES.FILTRATION)}
          label="Filtration"
        />
        <FilterButton 
          isActive={activeCategory === CATEGORIES.BATHROOM} 
          onClick={() => setActiveCategory(CATEGORIES.BATHROOM)}
          label="Bathrooms"
        />
        <FilterButton 
          isActive={activeCategory === CATEGORIES.REPIPING} 
          onClick={() => setActiveCategory(CATEGORIES.REPIPING)}
          label="Repiping"
        />
        <FilterButton 
          isActive={activeCategory === CATEGORIES.HEATER} 
          onClick={() => setActiveCategory(CATEGORIES.HEATER)}
          label="Heaters"
        />
        <FilterButton 
          isActive={activeCategory === CATEGORIES.DRAIN} 
          onClick={() => setActiveCategory(CATEGORIES.DRAIN)}
          label="Drains"
        />
      </div>

      {/* --- GRID DE IMÁGENES --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in min-h-[400px]">
        {filteredItems.map((item) => (
          <div key={item.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow-md cursor-pointer">
            <img 
              src={item.src.src} 
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay con texto al pasar el mouse */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white font-medium text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {item.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mensaje si no hay fotos */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No photos available in this category yet.</p>
        </div>
      )}
    </div>
  );
}

// Subcomponente para los botones (para no repetir código y estilos)
function FilterButton({ isActive, onClick, label }: { isActive: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 md:px-6 md:py-2 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform hover:-translate-y-0.5 ${
        isActive 
          ? 'bg-[#E31B23] text-white shadow-lg shadow-red-500/30' 
          : 'bg-white text-gray-600 border border-gray-200 hover:border-red-200 hover:text-[#E31B23]'
      }`}
    >
      {label}
    </button>
  );
}