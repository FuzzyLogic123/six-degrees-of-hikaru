module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'PorterSansBlock': ['PorterSansBlock', 'sans-serif'],
        'LexendZetta': ['LexendZetta', 'sans-serif'],
        'Megrim': ['Megrim', 'sans-serif'],
        'Mohave': ['Mohave', 'sans-serif'],
        'Outfit': ['Outfit', 'sans-serif'],
        'AguafinaScript': ['AguafinaScript', 'sans-serif'],
        'LibreBarcode128': ['LibreBarcode128', 'sans-serif'],
        'Ephesis': ['Ephesis', 'sans-serif'],
        'Sen': ['Sen', 'sans-serif'],
        'Roboto': ['Roboto', 'sans-serif'],
        'RobotoCondensed': ['RobotoCondensed', 'sans-serif'],

      },
      screens: {
        '3xl': '2000px'
      },
    },
  },
  plugins: [],
}
