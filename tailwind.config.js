/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",              
    "./public/js/**/*.{js}",       
    "./public/**/*.{html,js}",      
  ],
  theme: {
    extend: {},
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },
  plugins: [],
}


