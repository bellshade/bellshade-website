# Bellshade Website

Visit: [bellshade.org](https://bellshade.org)

# Local Development

Disarankan melakukan fork dan clone repositori hasil fork. Jika tidak melakukan kontribusi ke repo ini silahkan clone langsung saja.

## Cloning

Lakukan cloning pada repositori ini terlebih dahulu.

```bash
# ssh
git clone git@github.com:bellshade/bellshade-website.git

# https
git clone https://github.com/bellshade/bellshade-website.git
```

### Install Package

Install package yang diperlukan dengan menjalankan

```bash
npm install
```

### Local Build

Melakukan local build cukup menjalankan

```bash
npm run build
```

Bisa menggunakan `serve` untuk melihat hasil buildnya.

```bash
npx serve dist/ -p 3000
```

### List Script yang Bisa Digunakan

- Untuk **local development**, buka http://localhost:3000/ di browser setelah menjalankan script dibawah ini.

```bash
npm run dev
```

- Untuk **deployment ke repo hasil fork**, jalankan script berikut ini.

> Jangan lupa ubah pengaturan github pages dengan mengubah branch `main` menjadi branch `gh-pages`.

```bash
npm run deploy
```

- Untuk **deployment ke repo utama**, jalankan script berikut ini.

> Hati-hati untuk maintainer dalam menggunakan script ini. Diskusikan terlebih dahulu untuk melakukannya.

```bash
npm run deploy:maintainer
```
