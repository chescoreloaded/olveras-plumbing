import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless'; // <--- 1. Importar

export default defineConfig({
  // 2. Cambiar a modo servidor (para que funcione el formulario)
  output: 'server',
  adapter: vercel(), 
  
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});