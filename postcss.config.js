const purgecss = require('@fullhuman/postcss-purgecss')

const dev = process.env.NODE_ENV === 'development'

const whitelistModules = [
  './node_modules/slick-carousel/slick/slick.js',
  './node_modules/smooth-scrollbar/index.js',
]

module.exports = {
  plugins: [
    !dev &&
      purgecss({
        content: ['./index.html', './main.js', ...whitelistModules],
      }),
  ],
}
