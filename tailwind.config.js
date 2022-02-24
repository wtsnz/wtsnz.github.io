const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{html,js,mdx,jsx,mdx}',
    './src/templates/**/*.{html,js,mdx}',
    './src/components/**/*.{html,js,mdx}',
    './src/pages/**/*.{html,js,mdx}',
    './src/content/**/*.{html,js,mdx,md}'
  ],
  theme: {
    fontFamily: {
      sans: ['Avenir', 'sans-serif'],
      // display: ['Avenir', 'system-ui', 'sans-serif'],
      // body: ['Avenir', 'system-ui', 'sans-serif'],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
          },
        },
      },
      colors: {
        orange: colors.orange
      },
    },
  },
  variants: {

  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
