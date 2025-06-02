# 🎬 LK21 Unofficial API

API tidak resmi untuk mengakses data film dan serial dari situs LK21. Dibangun dengan Node.js dan Express, API ini menyediakan berbagai endpoint untuk menelusuri, mencari, dan mengambil detail film serta serial.([CodeGym][1])

## 🚀 Fitur

* Cari film atau serial berdasarkan judul
* Ambil daftar film atau serial terbaru
* Filter berdasarkan genre, negara, atau tahun rilis
* Ambil detail dan streaming untuk film atau serial
* Ambil daftar episode untuk serial([GitLab][2])

## 🧰 Teknologi yang Digunakan

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Axios](https://axios-http.com/)
* [Cheerio](https://cheerio.js.org/)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [Morgan](https://www.npmjs.com/package/morgan)

## 📦 Instalasi

1. Klon repositori ini:

   ```bash
   git clone https://github.com/KenXinDev/lk21-unofficial-api.git
   cd lk21-unofficial-api
   ```


2\. Instal dependensi:

```bash
npm install
```


3\. Buat file `.env` dan tambahkan variabel lingkungan yang diperlukan:

```env
PORT=3000
LK21_BASE_MOVIE=https://tv1.nontondrama.click/
LK21_BASE_SERIES=https://tv17.nontondrama.click/
```


4\. Jalankan server:

```bash
npm start
```



## 📚 Dokumentasi API

### 🔍 Pencarian

* **GET** `/search?s=judul`
  Cari film atau serial berdasarkan judul.([YouTube][3])

### 🎬 Film

* **GET** `/movies/latest?page=1`
  Ambil daftar film terbaru.

* **GET** `/movies/genres`
  Ambil daftar genre film.([arXiv][4])

* **GET** `/movies/genre/:genre?page=1`
  Ambil film berdasarkan genre.

* **GET** `/movies/countries`
  Ambil daftar negara asal film.

* **GET** `/movies/country/:country?page=1`
  Ambil film berdasarkan negara.([YouTube][5])

* **GET** `/movies/years`
  Ambil daftar tahun rilis film.

* **GET** `/movies/year/:year?page=1`
  Ambil film berdasarkan tahun rilis.

* **GET** `/movies/:slug/stream`
  Ambil link streaming untuk film tertentu.

### 📺 Serial

* **GET** `/series/genres`
  Ambil daftar genre serial.

* **GET** `/series/genre/:genre?page=1`
  Ambil serial berdasarkan genre.

* **GET** `/series/countries`
  Ambil daftar negara asal serial.

* **GET** `/series/country/:country?page=1`
  Ambil serial berdasarkan negara.

* **GET** `/series/years`
  Ambil daftar tahun rilis serial.

* **GET** `/series/year/:year?page=1`
  Ambil serial berdasarkan tahun rilis.

* **GET** `/series/:slug/`
  Ambil daftar episode untuk serial tertentu.([arXiv][4])

* **GET** `/series/:slug/stream`
  Ambil link streaming untuk serial tertentu.

## 👨‍💻 Pengembang

* **Nama**: KenXinDev
* **GitHub**: [https://github.com/KenXinDev/](https://github.com/KenXinDev/)([Microsoft Learn][6])

## ⚠️ Catatan

* API ini tidak resmi dan tidak berafiliasi dengan situs LK21.
* Gunakan API ini dengan bijak dan hanya untuk tujuan pembelajaran atau pengembangan.

---

Anda dapat menyesuaikan file `README.md` ini sesuai dengan kebutuhan proyek Anda. Pastikan untuk memperbarui informasi seperti URL repositori, nama pengembang, dan detail lainnya agar sesuai dengan proyek Anda.
