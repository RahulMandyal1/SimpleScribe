/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    // all colors  palletes
    colors: {
      green: '#72C699',
      blue: '#3EC6F2',
      mainblue: '#18A0FB'
    },
    extend: {
      // font family
      fontFamily: {
        galano: ['Galano-Grotesque', 'sans-serif']
      },
      //font weight
      fontWeight: {
        light: 100,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900
      }
    },
    // Mobile First Approach
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '769px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px'
      // => @media (min-width: 1280px) { ... }
    }
  },
  plugins: []
};
