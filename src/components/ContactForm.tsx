import { useState } from 'react';

interface Props {
  texts: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    message: string;
    btnSend: string;
    btnSending: string;
    successTitle: string;
    successMessage: string;
    btnRetry: string;
    error: string;
  }
}

export default function ContactForm({ texts }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
        console.error(error);
        setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 bg-green-50 rounded-2xl border-2 border-green-100 animate-fade-in shadow-xl">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner text-green-600">
          ✓
        </div>
        <h3 className="text-3xl font-black text-green-800 mb-4">{texts.successTitle}</h3>
        <p className="text-green-700 mb-8 max-w-xs mx-auto text-lg leading-relaxed">{texts.successMessage}</p>
        <button 
          onClick={() => setStatus('idle')} 
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition shadow-lg hover:shadow-green-900/20"
        >
          {texts.btnRetry}
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Efecto Glow trasero */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl relative">
        
        <h3 className="text-3xl font-black text-[#0B2545] mb-2">{texts.title}</h3>
        <p className="text-gray-500 mb-8">{texts.subtitle}</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Honeypot Invisible */}
          <div className="opacity-0 absolute top-0 left-0 h-0 w-0 -z-50 overflow-hidden">
              <label htmlFor="website_check">Website</label>
              <input type="text" name="website_check" id="website_check" tabIndex={-1} autoComplete="off" />
          </div>
          
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1 ml-1">{texts.name}</label>
            <input 
              type="text" 
              name="name" 
              id="name"
              required 
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#E31B23] focus:ring-4 focus:ring-[#E31B23]/10 outline-none transition-all font-medium text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1 ml-1">{texts.phone}</label>
            <input 
              type="tel" 
              name="phone" 
              id="phone"
              required 
              placeholder="(904) 555-0123"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#E31B23] focus:ring-4 focus:ring-[#E31B23]/10 outline-none transition-all font-medium text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Selector de Servicio (MEJORA UX) */}
          <div>
            <label htmlFor="service" className="block text-sm font-bold text-gray-700 mb-1 ml-1">Service Needed / Servicio Requerido</label>
            <div className="relative">
              <select 
                name="service" 
                id="service"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#E31B23] focus:ring-4 focus:ring-[#E31B23]/10 outline-none transition-all font-medium text-gray-800 appearance-none cursor-pointer"
              >
                <option value="General Inquiry">General Inquiry / Consulta General</option>
                <option value="Emergency">🚨 Emergency / Emergencia</option>
                <option value="Water Heater">Water Heater / Calentador</option>
                <option value="Drain Cleaning">Drain Cleaning / Drenajes</option>
                <option value="Repiping">Repiping / Tuberías</option>
                <option value="Bathroom Remodel">Bathroom Remodel / Baños</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>
          </div>

          {/* Mensaje */}
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1 ml-1">{texts.message}</label>
            <textarea 
              name="message" 
              id="message"
              rows={3}
              required
              placeholder="..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#E31B23] focus:ring-4 focus:ring-[#E31B23]/10 outline-none transition-all font-medium text-gray-800 placeholder-gray-400 resize-none"
            ></textarea>
          </div>

          {/* Botón */}
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full bg-[#E31B23] hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2 group"
          >
            {status === 'submitting' ? (
              <span>{texts.btnSending}</span>
            ) : (
              <>
                {texts.btnSend}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            We respect your privacy. Your information is safe.
          </p>

          {status === 'error' && (
            <p className="text-red-600 text-sm text-center font-bold bg-red-50 p-2 rounded animate-pulse">
              {texts.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}