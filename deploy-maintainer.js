// jalanin
// npm run deploy:maintainer
// buat naro dist si web ke branch utama
// yang bisa ngubah di repo classList adalah
// orang yang punya write access langsung
const ghpages = require('gh-pages')

ghpages.publish(
  'dist', // folder dist yang ditaro di host
  {
    branch: 'gh-pages',
    repo: 'https://github.com/bellshade/bellshade.github.io.git',
  },
  (err) => err && console.log(err)
)
