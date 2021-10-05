module.exports = {
  prefix: '',
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'inter': ['Inter'],
    },
    backgroundColor: theme => ({
      'primary': '#373737',
      'arrow-background': '#DEDEDE',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'primary': '#DEDEDE',
      'secondary': '#ffed4a',
      'danger': '#e3342f',
    }),
    textColor: {
      'headline': '#BDBDBD',
      'sub-headline': '#DEDEDE',
    },
    boxShadow: {
      DEFAULT: '0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};
