import { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
}

interface Props {
  finishedImages: ImageProps[];
  roughImages: ImageProps[];
  labels: {
    tabFinished: string;
    tabRough: string;
    title: string;
    subtitle: string;
  };
}

export default function GalleryTabs({ finishedImages, roughImages, labels }: Props) {
  const [activeTab, setActiveTab] = useState<'finished' | 'rough'>('finished');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const currentImages = activeTab === 'finished' ? finishedImages : roughImages;

  return (
    <section className="py-20 bg-white" id="gallery">
      <div className="container mx-auto px-4">
        
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-[#0B2545] mb-4">{labels.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{labels.subtitle}</p>
        </div>

        {/* Pestañas */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('finished')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              activeTab === 'finished'
                ? 'bg-[#0B2545] text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            ✨ {labels.tabFinished}
          </button>
          <button
            onClick={() => setActiveTab('rough')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              activeTab === 'rough'
                ? 'bg-[#0B2545] text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            🔧 {labels.tabRough}
          </button>
        </div>

        {/* NUEVO LAYOUT: COLUMNAS (Masonry CSS) 
           Esto evita que las fotos se corten. Se acomodan naturalmente.
        */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {currentImages.map((img, index) => (
            <div 
              key={index} 
              className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-md cursor-zoom-in"
              onClick={() => setSelectedImage(img.src)}
            >
              {/* h-auto permite que la imagen tenga su altura real sin deformarse */}
              <img
                src={img.src}
                alt="Olveras Plumbing Work"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay sutil al pasar el mouse */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Modal para ver imagen completa (LightBox) */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full max-h-screen">
              <button 
                className="absolute -top-12 right-0 text-white text-4xl font-bold hover:text-red-500 transition"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </button>
              <img 
                src={selectedImage} 
                alt="Full preview" 
                className="w-full h-full max-h-[90vh] object-contain rounded-md shadow-2xl" 
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}