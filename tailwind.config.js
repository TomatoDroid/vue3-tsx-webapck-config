module.exports = {
  purge: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '50%': '50% 50%',
      '80%': '80% 80%',
      '100%': '100% 100%',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
