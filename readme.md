# 🎬 LK21 Unofficial API

**API tidak resmi** untuk mengakses data film dan serial dari situs LK21. Dibangun menggunakan **Node.js** dan **Express**, API ini menyediakan berbagai endpoint untuk pencarian, eksplorasi genre, negara, tahun rilis, serta detail dan link streaming film atau serial.

> ⚠️ Proyek ini hanya untuk tujuan **pembelajaran** dan tidak berafiliasi dengan situs LK21.

---

## 🚀 Fitur

- 🔍 Pencarian film atau serial berdasarkan judul
- 🆕 Ambil daftar film atau serial terbaru
- 🎭 Filter berdasarkan genre, negara, atau tahun rilis
- 📄 Ambil detail dan link streaming
- 📺 Ambil daftar episode serial

---

## 🧰 Teknologi

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [Cheerio](https://cheerio.js.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Morgan](https://www.npmjs.com/package/morgan)

---

## 📦 Instalasi

```bash
# 1. Klon repositori
git clone https://github.com/KenXinDev/lk21-unofficial-api.git
cd lk21-unofficial-api

# 2. Instal dependensi
npm install

# 3. Buat file .env
echo PORT=3000 > .env
echo LK21_BASE_MOVIE=https://tv1.nontondrama.click/ >> .env
echo LK21_BASE_SERIES=https://tv17.nontondrama.click/ >> .env

# 4. Jalankan server
npm start
````

---

## 📚 Dokumentasi API

### 🔍 Pencarian

* `GET /search?s=judul`
  Cari film atau serial berdasarkan judul.

---

### 🎬 Film

* `GET /movies/latest?page=1` – Film terbaru
* `GET /movies/genres` – Daftar genre
* `GET /movies/genre/:genre?page=1` – Filter berdasarkan genre
* `GET /movies/countries` – Daftar negara
* `GET /movies/country/:country?page=1` – Filter berdasarkan negara
* `GET /movies/years` – Daftar tahun rilis
* `GET /movies/year/:year?page=1` – Filter berdasarkan tahun rilis
* `GET /movies/:slug/stream` – Link streaming film

---

### 📺 Serial

* `GET /series/genres` – Daftar genre
* `GET /series/genre/:genre?page=1` – Filter berdasarkan genre
* `GET /series/countries` – Daftar negara
* `GET /series/country/:country?page=1` – Filter berdasarkan negara
* `GET /series/years` – Daftar tahun rilis
* `GET /series/year/:year?page=1` – Filter berdasarkan tahun rilis
* `GET /series/:slug/` – Daftar episode
* `GET /series/:slug/stream` – Link streaming serial

---

## 👤 Pengembang

* **Nama**: KenXinDev
* **GitHub**: [@KenXinDev](https://github.com/KenXinDev)

---

## ⚠️ Catatan Penting

* Proyek ini **tidak resmi** dan tidak berafiliasi dengan LK21.
* Hanya untuk **tujuan edukasi dan pembelajaran**.
* Jangan gunakan API ini untuk keperluan komersial atau ilegal.

---

## ⭐ Dukungan

Jika proyek ini bermanfaat, silakan beri ⭐ di GitHub dan bagikan kepada rekan-rekan developer lainnya.
