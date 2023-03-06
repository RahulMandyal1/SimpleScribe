/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    // all colors  palletes
    colors: {
      green: '#72C699',
      blue: '#3EC6F2',
      mainblue: '#18A0FB',
      black: '#000',
      white: '#fff',
      offWhite: '#FCFBFD',
      lilacgray: '#C7C5C9',
      slategray: '#737376',
      darkraspberry: '#30063A',
      darkorchid: '#7F3F98'
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
      },
      keyframes: {
        spin: {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(360deg)'
          }
        },

        //custom animation
        animation: {
          spin: 'spin 1s linear infinite'
        }
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
