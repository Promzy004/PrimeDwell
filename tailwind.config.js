 /** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        
        //background image for the hero section
        'custom-image': "url('./src/assets/images/hero.png')"
      },
      colors: {
        primaryColor: '#0984E3',
        color2: '#FAF8FB',
        color3: '#455463',
        color4: '#25517A',
        color5: '#33628D',
      }
    },
  },
  plugins: [],
}
