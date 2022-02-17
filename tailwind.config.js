module.exports = {
  corePlugins: {
    preflight: false,
  },
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    screens: {
      sm: '600px',
      md: '800px',
      lg: '1000px',
      xl: '1280px',
      msm: { max: '600px' },
    },
    colors: {
      white: '#FFF',
      gray: '#999',
      black: '#000',
      divide: '#cdcdcd',
      'menu-bg': '#222223',
      'menu-title': '#a1a1a3',
    },
    extend: {
      gap: {
        '1/25': '4%',
      },
    },
  },
  plugins: [],
}
