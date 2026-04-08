import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: '0.0.0.0', // <-- यह सही है, इससे Vite सभी नेटवर्क इंटरफेस पर सुनेगा
    port: 5173,      // <-- पोर्ट सही है
    open: true,      // <-- वैकल्पिक: सर्वर स्टार्ट होते ही ब्राउज़र खुलेगा
    
    // *** यह महत्वपूर्ण लाइन है जो आपको पिछली एरर (Blocked request) से छुटकारा दिलाएगी ***
    allowedHosts: ['.ngrok-free.app'], // <-- यह ngrok डोमेन को अनुमति देगा
  },
})
