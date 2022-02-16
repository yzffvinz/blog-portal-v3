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
      msm: { max: '600px' },
    },
    colors: {
      'c-gary': '#999',
    },
    extend: {
      gap: {
        '1/25': '4%',
      },
    },
  },
  plugins: [],
}
