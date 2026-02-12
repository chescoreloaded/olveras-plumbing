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
      const response = await fetch('/send-mail.php', {
        method: 'POST',
        body: formData,
        // No necesitamos headers json porque FormData envía multipart/form-data automáticamente
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
        console.error(error); // Bueno para depurar
        setStatus('error');
    }
  };

  // ESTADO DE ÉXITO (Lo que ve el usuario al enviar)
  if (status === 'success') {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-green-50 rounded-2xl border-2 border-green-100 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
          ✅
        </div>
        <h3 className="text-2xl font-black text-green-800 mb-2">{texts.successTitle}</h3>
        <p className="text-green-700 mb-8 max-w-xs mx-auto">{texts.successMessage}</p>
        <button 
          onClick={() => setStatus('idle')} 
          className="text-sm font-bold text-green-800 underline hover:text-green-900 transition"
        >
          {texts.btnRetry}
        </button>
      </div>
    );
  }

  // FORMULARIO NORMAL
  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100 relative overflow-hidden">
      
      {/* Decoración superior */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0B2545] to-[#E31B23]"></div>

      <h3 className="text-3xl font-black text-[#0B2545] mb-2">{texts.title}</h3>
      <p className="text-gray-500 mb-8">{texts.subtitle}</p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Campo Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1 ml-1">{texts.name}</label>
          <input 
            type="text" 
            name="name" 
            id="name"
            required 
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#0B2545] focus:ring-4 focus:ring-[#0B2545]/10 outline-none transition-all font-medium text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Campo Teléfono (CRÍTICO para plomeros) */}
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1 ml-1">{texts.phone}</label>
          <input 
            type="tel" 
            name="phone" 
            id="phone"
            required 
            placeholder="(904) 555-0123"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#0B2545] focus:ring-4 focus:ring-[#0B2545]/10 outline-none transition-all font-medium text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Campo Mensaje */}
        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1 ml-1">{texts.message}</label>
          <textarea 
            name="message" 
            id="message"
            rows={4}
            required
            placeholder="..."
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#0B2545] focus:ring-4 focus:ring-[#0B2545]/10 outline-none transition-all font-medium text-gray-800 placeholder-gray-400 resize-none"
          ></textarea>
        </div>

        {/* Botón de Envío */}
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

        {/* Mensaje de Error (si falla Formspree) */}
        {status === 'error' && (
          <p className="text-red-600 text-sm text-center font-bold bg-red-50 p-2 rounded">
            {texts.error}
          </p>
        )}
      </form>
    </div>
  );
}