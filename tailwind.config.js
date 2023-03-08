/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", //Just in time builds /
  content: ['./views/**/*.ejs'],
  theme: {

    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
    },
    extend: {},
  },
  plugins: [],
}
