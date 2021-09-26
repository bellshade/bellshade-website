const { defineConfig } = require('vite')

const base = process.env.BASE === 'forked' ? '/bellshade.github.io/' : '/'

module.exports = defineConfig({
  base,
})
