const { defineConfig } = require('vite')

const base = process.env.BASE === 'forked' ? '/bellshade-website/' : '/'

module.exports = defineConfig({
  base,
})
