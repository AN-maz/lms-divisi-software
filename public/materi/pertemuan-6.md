# Materi Frontend: Menghubungkan UI ke REST API

> **Konteks:** Materi ini adalah lanjutan dari backend Inventory API yang sudah dibuat sebelumnya. Di sini kita akan belajar cara membuat tampilan (frontend) yang bisa berkomunikasi dengan backend tersebut.

---

## Daftar Isi

1. Apa itu Frontend & Cara Kerja Browser
2. Vite & Build Tool
3. Tailwind CSS
4. Fetch API & Async/Await
5. Project: UI Inventory dengan Vite + Tailwind

---

# 1. Apa itu Frontend & Cara Kerja Browser

## Frontend vs Backend

Ketika kamu membuka sebuah website, ada dua bagian besar yang bekerja:

| | Frontend | Backend |
|---|---|---|
| **Berjalan di** | Browser (komputer user) | Server |
| **Bahasa utama** | HTML, CSS, JavaScript | Node.js, Python, PHP, dll |
| **Yang dikerjakan** | Tampilan, interaksi user | Logic bisnis, database |
| **Dilihat user?** | Ya | Tidak |

Analoginya seperti restoran:
- **Frontend** = ruang makan + pelayan (yang berhadapan langsung dengan pelanggan)
- **Backend** = dapur (tempat makanan dibuat, tidak terlihat pelanggan)

---

## Cara Kerja Browser

Ketika user membuka website, ini yang terjadi secara berurutan:

```
User buka URL
     ↓
Browser kirim HTTP Request ke server
     ↓
Server kirim balik file HTML, CSS, JS
     ↓
Browser membaca & menampilkan HTML
Browser memuat CSS → halaman jadi cantik
Browser menjalankan JS → halaman jadi interaktif
     ↓
JS bisa kirim request lagi ke backend (Fetch API)
     ↓
Backend kirim data JSON
     ↓
JS tampilkan data ke halaman
```

Poin pentingnya: **HTML, CSS, dan JS yang dikirim server itu dijalankan di komputer user (browser)**, bukan di server. Inilah yang membedakan frontend dari backend.

---

## Tiga Bahasa Frontend

**HTML** — Struktur/kerangka halaman

```html
<h1>Daftar Produk</h1>
<table id="tabel-produk"></table>
<button id="btn-tambah">Tambah Produk</button>
```

**CSS** — Tampilan/gaya

```css
h1 {
  color: #333;
  font-size: 24px;
}

button {
  background-color: blue;
  color: white;
  padding: 8px 16px;
}
```

**JavaScript** — Interaktivitas & komunikasi dengan backend

```js
// Klik tombol → tampilkan pesan
document.getElementById('btn-tambah').addEventListener('click', () => {
  alert('Tombol diklik!');
});
```

Ketiganya bekerja bersama: HTML adalah "tulangnya", CSS adalah "kulitnya", dan JavaScript adalah "otaknya".

---

## Hubungan Frontend dengan Backend yang Sudah Dibuat

Backend Inventory API yang sudah kita buat sebelumnya berjalan di `http://localhost:3000`. Backend itu **tidak punya tampilan** — dia hanya menerima request dan mengembalikan data JSON.

Tugas frontend di materi ini adalah membuat **tampilan** yang bisa:
- Mengambil data produk dari backend dan menampilkannya di tabel
- Mengirim data produk baru melalui form
- Mengupdate dan menghapus produk lewat tombol

---

# 2. Vite & Build Tool

## Kenapa Tidak Buat File HTML Biasa Saja?

Secara teknis, kamu bisa membuat file `index.html` dan langsung membukanya di browser tanpa tools apapun. Tapi ada masalah:

1. **Tidak bisa pakai `import/export`** — browser punya batasan ketika membuka file lokal langsung
2. **Tidak ada auto-reload** — setiap ubah kode, harus refresh manual
3. **Tidak ada optimasi** — file JS dan CSS tidak dikompresi untuk performa

**Build tool** hadir untuk menyelesaikan masalah-masalah itu.

---

## Apa itu Build Tool?

Build tool adalah program yang **memproses kode kamu sebelum dijalankan di browser**. Tugasnya antara lain:

- Menyediakan **dev server** dengan auto-reload otomatis
- Memungkinkan penggunaan `import/export` secara bebas
- Menggabungkan dan mengompres semua file untuk production

---

## Apa itu Vite?

Vite (dibaca: *vit*, bahasa Prancis artinya "cepat") adalah build tool modern yang dibuat oleh pembuat Vue.js. Keunggulan utamanya:

- **Sangat cepat** saat development — tidak perlu compile ulang semua file setiap ada perubahan
- **Setup minimal** — langsung bisa dipakai tanpa konfigurasi rumit
- **Hot Module Replacement (HMR)** — perubahan kode langsung terlihat di browser tanpa full reload

---

## Vite vs Membuka HTML Langsung

| | HTML Biasa (buka langsung) | Dengan Vite |
|---|---|---|
| Auto-reload | ❌ | ✅ |
| Import/export JS | Terbatas | ✅ Bebas |
| Dev server | ❌ | ✅ |
| Cocok untuk belajar | Untuk yang sangat sederhana | ✅ Recommended |

---

## Cara Kerja Vite (Sederhana)

```
Kamu tulis kode (HTML, CSS, JS)
          ↓
Vite memantau perubahan file
          ↓
Vite menyajikan file lewat dev server lokal
          ↓
Browser membuka http://localhost:5173
          ↓
Setiap kamu simpan file → browser otomatis refresh
```

Saat nanti project akan "dipublish", Vite juga bisa mengemas semua file menjadi versi yang dioptimasi dengan perintah `npm run build`. Tapi untuk belajar, kita cukup gunakan mode development-nya saja.

---

# 3. Tailwind CSS

## Apa itu Tailwind CSS?

Tailwind CSS adalah **utility-first CSS framework**. Artinya, alih-alih menulis CSS sendiri di file `.css`, kamu langsung menempelkan class-class kecil siap pakai ke elemen HTML.

Setiap class di Tailwind punya **satu tugas spesifik**:

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Klik Saya
</button>
```

Terjemahan tiap class:
- `bg-blue-500` → background biru sedang
- `text-white` → teks putih
- `px-4 py-2` → padding horizontal 1rem, vertikal 0.5rem
- `rounded` → sudut melengkung
- `hover:bg-blue-600` → saat di-hover, background jadi biru lebih gelap

Tanpa Tailwind, kamu perlu menulis CSS terpisah:

```css
.tombol-saya {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
.tombol-saya:hover {
  background-color: #2563eb;
}
```

Hasilnya sama persis — tapi dengan Tailwind kamu tidak perlu berpindah file.

---

## CSS Biasa vs Tailwind CSS vs Bootstrap

Mungkin kamu pernah dengar **Bootstrap** — framework CSS yang juga populer. Apa bedanya dengan Tailwind?

| | CSS Biasa | Bootstrap | Tailwind CSS |
|---|---|---|---|
| **Cara pakai** | Tulis sendiri di file `.css` | Pakai class komponen jadi (`btn`, `card`, `navbar`) | Pakai utility class kecil-kecil langsung di HTML |
| **Fleksibilitas** | ✅ Bebas total | ❌ Terbatas pada desain Bootstrap | ✅ Bebas total |
| **Kecepatan awal** | Lambat (tulis semua sendiri) | Cepat (tinggal pakai) | Cepat (tinggal pakai) |
| **Hasil tampilan** | Terserah kamu | Terlihat "Bootstrap banget" | Terserah kamu |
| **Ukuran file CSS** | Bisa besar kalau tidak dikelola | Besar (~30KB+, banyak yang tidak dipakai) | Kecil (hanya class yang dipakai yang ikut di-build) |
| **Cocok untuk** | Project kecil / belajar dasar | Prototyping cepat | Project skala menengah–besar |

**Analogi:**
- **CSS Biasa** = masak dari bahan mentah sendiri
- **Bootstrap** = beli makanan jadi — cepat, tapi rasanya sama semua
- **Tailwind** = beli bahan siap masak — tetap bebas berkreasi, tapi tidak mulai dari nol

---

## Kenapa Tailwind Cocok untuk Project Skala Besar?

Ini adalah pertanyaan yang bagus. Untuk project kecil seperti latihan ini, CSS biasa pun cukup. Tapi begitu project bertambah besar, ada masalah yang muncul dengan CSS biasa:

**Masalah 1 — CSS terus bertambah besar**

Setiap fitur baru → perlu tambah class baru di CSS. Lama-lama file CSS bisa ribuan baris dan susah dikelola.

```
Bulan 1:  style.css  → 200 baris
Bulan 3:  style.css  → 800 baris
Bulan 6:  style.css  → 2000 baris  ← mulai kacau
```

Dengan Tailwind, tidak ada file CSS yang terus bertambah — semua style langsung di HTML.

**Masalah 2 — Takut hapus CSS lama**

Di proyek besar, developer sering takut menghapus class CSS karena tidak tahu apakah masih dipakai atau tidak. Akhirnya CSS lama menumpuk dan tidak pernah dibersihkan.

Dengan Tailwind, style menempel langsung ke elemen HTML — kalau elemennya dihapus, style-nya ikut hilang otomatis.

**Masalah 3 — Nama class tidak konsisten antar developer**

Di tim yang besar, satu developer bisa bikin `.btn-primary`, developer lain bikin `.primary-button`, developer lain lagi bikin `.button-blue`. Hasilnya berantakan.

Dengan Tailwind, semua developer pakai class yang sama (`bg-blue-500 text-white px-4 py-2`) — konsisten secara otomatis.

**Masalah 4 — CSS yang tidak dipakai ikut ter-load**

Bootstrap memuat semua class-nya (~30KB+) meski kamu hanya pakai 10% dari fiturnya. Tailwind hanya menyertakan class yang benar-benar dipakai di HTML — ukuran file CSS production bisa sangat kecil (biasanya di bawah 10KB).

---

## Kapan Sebaiknya TIDAK Pakai Tailwind?

Tailwind juga punya kekurangan — penting untuk tahu batasannya:

- **HTML jadi panjang** — class yang banyak di satu elemen bisa membuat HTML susah dibaca
- **Kurva belajar** — perlu waktu untuk hafal nama-nama class utility-nya
- **Tidak cocok untuk yang baru belajar CSS dari nol** — lebih baik belajar CSS dasar dulu sebelum pakai Tailwind, agar tahu apa yang sebenarnya terjadi di balik class-class itu

Untuk project sederhana (landing page statis, tugas kuliah), CSS biasa atau Bootstrap mungkin lebih praktis.

---

## Pola Class Tailwind yang Sering Dipakai

### Warna

Format: `{properti}-{warna}-{intensitas}`

```html
<div class="bg-blue-500">...</div>     <!-- background biru -->
<div class="bg-gray-100">...</div>     <!-- background abu-abu terang -->
<p class="text-red-600">Error!</p>    <!-- teks merah -->
<p class="text-gray-500">...</p>       <!-- teks abu-abu -->
```

Intensitas: `100` (paling terang) → `900` (paling gelap). Yang sering dipakai: `100`, `200`, `400`, `500`, `600`, `700`.

### Spacing (Padding & Margin)

Format: `{p/m}{sisi}-{ukuran}`

```html
<div class="p-4">...</div>          <!-- padding semua sisi: 1rem -->
<div class="px-4 py-2">...</div>    <!-- padding horizontal 1rem, vertikal 0.5rem -->
<div class="mt-6 mb-4">...</div>    <!-- margin top 1.5rem, bottom 1rem -->
```

Ukuran: `1`=0.25rem · `2`=0.5rem · `4`=1rem · `6`=1.5rem · `8`=2rem

### Ukuran Teks & Font

```html
<p class="text-xs">Sangat kecil</p>
<p class="text-sm">Kecil</p>
<p class="text-base">Normal</p>
<p class="text-lg font-semibold">Agak besar, tebal</p>
<p class="text-2xl font-bold">Judul besar</p>
```

### Layout

```html
<!-- Flexbox -->
<div class="flex gap-4 items-center justify-between">...</div>

<!-- Lebar & centering -->
<div class="max-w-4xl mx-auto">...</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">...</div>
```

### Pseudo-class (Hover & Focus)

Format: `{kondisi}:{class}`

```html
<button class="bg-green-500 hover:bg-green-600">Simpan</button>
<input class="focus:outline-none focus:ring-2 focus:ring-blue-400" />
```

### Show / Hide dari JavaScript

Di Tailwind, untuk menyembunyikan elemen digunakan class `hidden` (setara `display: none`). Untuk menampilkannya kembali, hapus class `hidden` dan tambahkan `block`.

```js
// Sembunyikan elemen
element.classList.add('hidden');

// Tampilkan elemen
element.classList.remove('hidden');
element.classList.add('block');
```

---

# 4. Fetch API & Async/Await

Ini adalah materi **paling penting** di bagian frontend — karena inilah cara JavaScript di browser "berbicara" dengan backend.

## Apa itu Fetch API?

Fetch API adalah fitur bawaan browser (tidak perlu install library apapun) yang digunakan untuk **mengirim HTTP request dari JavaScript**.

Ingat materi REST API sebelumnya? Kita bisa melakukan GET, POST, PUT, DELETE — tapi waktu itu dari Thunder Client. Sekarang kita lakukan hal yang sama, tapi **dari dalam kode JavaScript**.

```js
// Kirim GET request ke backend
fetch('http://localhost:3000/api/products');
```

Satu baris itu sudah cukup untuk mengirim request. Tapi hasilnya perlu kita "tangkap" dan proses — di sinilah `async/await` berperan.

---

## Review: Synchronous vs Asynchronous

Sebelum masuk ke `async/await`, pahami dulu perbedaan ini:

**Synchronous** — kode dijalankan satu per satu, baris berikutnya menunggu baris sebelumnya selesai:

```js
console.log('Mulai');
console.log('Tengah');   // Menunggu baris atas selesai
console.log('Selesai');

// Output:
// Mulai
// Tengah
// Selesai
```

**Asynchronous** — kode tidak menunggu, langsung lanjut ke baris berikutnya meski proses sebelumnya belum selesai:

```js
console.log('Mulai');

setTimeout(() => {
  console.log('Ini butuh waktu...');
}, 2000);

console.log('Selesai');

// Output:
// Mulai
// Selesai
// Ini butuh waktu...   ← muncul 2 detik kemudian
```

**Kenapa fetch bersifat asynchronous?**

Karena request ke server membutuhkan waktu — bisa 100ms, bisa 2 detik, tergantung jaringan. Kalau JavaScript harus menunggu (synchronous), browser akan **freeze/hang** selama menunggu response. Bayangkan halaman tidak bisa diklik sama sekali selama loading data — buruk sekali untuk user experience.

Dengan asynchronous, JavaScript bisa tetap responsif sambil menunggu data datang.

---

## Async/Await

`async/await` adalah cara modern untuk menulis kode asynchronous agar **terlihat seperti kode synchronous** — lebih mudah dibaca dan dipahami.

**Aturan dasar:**
- Fungsi yang berisi operasi async harus ditandai dengan kata kunci `async`
- Di dalam fungsi tersebut, tambahkan `await` di depan operasi yang perlu "ditunggu"

```js
// Tanpa async/await (lebih susah dibaca)
fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Dengan async/await (lebih mudah dibaca)
async function ambilProduk() {
  const response = await fetch('http://localhost:3000/api/products');
  const data = await response.json();
  console.log(data);
}
```

Keduanya melakukan hal yang sama persis — tapi versi `async/await` jauh lebih mudah dibaca, terutama kalau operasinya bertambah kompleks.

---

## Anatomi Fetch Request

Mari bedah satu per satu:

```js
async function ambilProduk() {
  // 1. Kirim request, tunggu sampai ada response
  const response = await fetch('http://localhost:3000/api/products');

  // 2. Dari response, ambil body-nya dan parse sebagai JSON
  //    Ini juga async karena perlu membaca stream data
  const data = await response.json();

  // 3. Sekarang data sudah berupa JavaScript object/array
  console.log(data);
  // Output: { success: true, data: [...] }
}
```

**Apa isi `response` sebelum di-`.json()`?**

`response` berisi informasi lengkap tentang HTTP response — bukan datanya langsung:

```js
response.status    // → 200, 404, 500, dll
response.ok        // → true kalau status 200-299
response.headers   // → header dari response
```

Data JSON-nya baru keluar setelah kita panggil `await response.json()`.

---

## Fetch untuk Berbagai Method HTTP

**GET** (mengambil data — default):

```js
async function getSemuaProduk() {
  const response = await fetch('http://localhost:3000/api/products');
  const data = await response.json();
  return data;
}
```

**POST** (mengirim data baru):

```js
async function tambahProduk(produkBaru) {
  const response = await fetch('http://localhost:3000/api/products', {
    method: 'POST',                         // Tentukan method
    headers: {
      'Content-Type': 'application/json',   // Beritahu server bahwa kita kirim JSON
    },
    body: JSON.stringify(produkBaru),        // Ubah object JS menjadi string JSON
  });
  const data = await response.json();
  return data;
}

// Cara pakai:
tambahProduk({ name: 'Mouse Gaming', price: 350000, category_id: 1 });
```

**PUT** (mengupdate data):

```js
async function updateProduk(id, dataBaru) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataBaru),
  });
  const data = await response.json();
  return data;
}
```

**DELETE** (menghapus data):

```js
async function hapusProduk(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}
```

---

## Error Handling pada Fetch

Ada dua jenis error yang perlu ditangani:

**1. Network error** — request tidak sampai ke server sama sekali (misalnya: server mati, tidak ada internet)

**2. HTTP error** — request sampai ke server, tapi server mengembalikan status error (misalnya: 404 Not Found, 500 Internal Server Error)

Fetch **hanya otomatis throw error untuk network error**. HTTP error seperti 404 atau 500 tidak dianggap error oleh fetch — perlu dicek manual lewat `response.ok`.

```js
async function getSemuaProduk() {
  try {
    const response = await fetch('http://localhost:3000/api/products');

    // Cek apakah HTTP status-nya OK (200-299)
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    // Menangkap: network error ATAU error yang kita throw di atas
    console.error('Gagal mengambil data:', error.message);
  }
}
```

---

## Ringkasan Fetch API

| Aksi | Method | Perlu `body`? | Perlu `headers`? |
|------|--------|---------------|------------------|
| Ambil semua data | GET | ❌ | ❌ |
| Ambil data by ID | GET | ❌ | ❌ |
| Tambah data baru | POST | ✅ | ✅ |
| Update data | PUT | ✅ | ✅ |
| Hapus data | DELETE | ❌ | ❌ |

---

# 5. Project: UI Inventory dengan Vite + Tailwind


## Langkah 1: Setup Project

| Perintah | Fungsi |
| :--- | :--- |
| `npm create vite@latest inventory-frontend -- --template vanilla` | Buat project Vite baru dengan template JavaScript murni |
| `cd inventory-frontend ` | Masuk folder |
| `code .` | untuk masuk langsung ke vscode | 
| `npm install -D tailwindcss @tailwindcss/vite` | Install Tailwind CSS & plugin Vite-nya |

### Konfigurasi di kodingan
```js
// vite.config.js — aktifkan plugin Tailwind (kalo ga ada filenya bisa buat manual)
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

```css
/* src/index.css — aktifkan Tailwind */
@import "tailwindcss";
```
> kalian bisa kunjungi langsung dokumentasi 
> `https://tailwindcss.com/docs/installation/using-vite`

---

## Langkah 2: Stuktur folder


```text

inventory-frontend/
├── public/                 # Aset statis asli (favicon, robot.txt, dll)
├── src/
│   ├── api/                # Semua urusan komunikasi dengan backend
│   │   └── productApi.js
│   ├── components/         # Komponen UI yang reusable (Form, Tabel, Notifikasi)
│   │   ├── productForm.js
│   │   ├── productTable.js
│   │   └── notification.js
│   ├── utils/              # Fungsi pembantu (formatter harga, tanggal, dll)
│   │   └── formatter.js
│   ├── config/             # Konfigurasi global (Environment Variables, Base URL)
│   │   └── constants.js
│   ├── style.css           # Styling global (Tailwind / CSS biasa)
│   └── main.js             # Entry point utama (Inisialisasi aplikasi)
├── index.html              # File HTML utama (Letakkan di root untuk Vite)
├── vite.config.js          # Konfigurasi Vite
└── package.json

```
## Langkah 3: kode program 
isi kodingannya: `https://github.com/AN-maz/documentation-progress/tree/main/vite/inventory-frontend`

> untuk hal teknis penjelasan kode program ga akan dijelasin detail ya. Kalian bisa pelajari sendiri dengan bantuan AI sebagai coding assistant

## Langkah 4: Perbaharui kode Backend

### Mengatasi CORS

| Keterangan | Detail |
| :--- | :--- |
| **Masalah** | Browser memblokir request dari port 5173 ke port 3000 karena dianggap *cross-origin* |
| **Solusi** | Install & aktifkan library `cors` di project **backend** |
| **Perintah** | `npm install cors` (di folder backend) |

```javascript
// src/app.js (di backend)
const express = require('express');
const cors = require('cors');            // ← tambahkan ini

const app = express();

app.use(cors());                         // ← tambahkan ini (sebelum routes)
app.use(express.json());

app.use('/api/products', productRoutes);
```

> 💡 **CORS** adalah aturan keamanan browser: JS di halaman A tidak boleh sembarangan mengambil data dari server B yang berbeda domain/port. `cors()` memberi izin eksplisit dari server.

### Perbaharui kode `product.service.js`

```js
const db = require("../../config/database");

const productService = {
  getProducts: async () => {
    const query = `
      SELECT p.id, p.name, p.price, c.id AS category_id, c.name AS category_name
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
    `; 

    const [rows] = await db.query(query);
    return rows;
  },

  createProduct: async (productData) => {
    const { name, price, category_name } = productData;
    
    let categoryId;
    
    const [existingCat] = await db.query("SELECT id FROM categories WHERE name = ?", [category_name]);
    
    if (existingCat.length > 0) {
      categoryId = existingCat[0].id;
    } else {

      const [newCat] = await db.query("INSERT INTO categories (name) VALUES (?)", [category_name]);
      categoryId = newCat.insertId;
    }

    const query = "INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [name, price, categoryId]);
    
    return { id: result.insertId, name, price, category_name };
  },

  updateProduct: async (id, productData) => {
    const { name, price, category_name } = productData;

    let categoryId;
    const [existingCat] = await db.query("SELECT id FROM categories WHERE name = ?", [category_name]);
    
    if (existingCat.length > 0) {
      categoryId = existingCat[0].id;
    } else {
      const [newCat] = await db.query("INSERT INTO categories (name) VALUES (?)", [category_name]);
      categoryId = newCat.insertId;
    }

    const query = "UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?";
    const [result] = await db.query(query, [name, price, categoryId, id]);
    
    return result.affectedRows;
  },

  deleteProduct: async (id) => {
    const query = "DELETE FROM products WHERE id = ?";
    const [result] = await db.query(query, [id]);
    return result.affectedRows;
  },

  getProductById: async (id) => {
    const query = `
      SELECT p.id, p.name, p.price, c.name AS category_name
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
    const [rows] = await db.query(query, [id]);
    return rows[0];
  },
};

module.exports = productService;
```

> Bisa langsung ditimpa saja

untuk detail lebih lanjut kalian bisa kunjungi project backend nya di github: `https://github.com/AN-maz/documentation-progress/tree/main/RESTful-express/latihan`

---

## jangan lupa `.env`

di link github itu ga ada file `.env` karena memang file itu berisi informasi rahasia terkait data project kita. Disana ada username, password, port untuk menghubungkan database kalian. Karena tujuan sekrang belajar temen-temen bisa buat file `.env`. Kalo yang udh ada berarti bisa skip tahap ini ya.

isi file `.env` dengan:
```text
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
```

kemudian donwload depedensi `.env`
buka terminal dan ketik `npm install dotenv`

lalu panggil di file `config/database.js`

```js
const mysql = require('mysql2/promise');
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "inventory_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// kodingan sisnya ....

```

---

## Langkah 5: Jalankan & Test

| Terminal | Perintah | URL |
| :--- | :--- | :--- |
| **Terminal 1 — Backend** | `npm run dev` (di folder `backend`) | `http://localhost:3000` |
| **Terminal 2 — Frontend** | `npm run dev` (di folder `inventory-frontend`) | `http://localhost:5173` |
| **database mySql** | aktifkan juga untuk databasenya | xampp/laragon  | 

| Fitur | Cara Test |
| :--- | :--- |
| Lihat daftar produk | Tabel otomatis terisi saat halaman dibuka |
| Tambah produk | Isi form → klik Simpan |
| Edit produk | Klik tombol Edit → ubah data → klik Simpan |
| Hapus produk | Klik tombol Hapus → konfirmasi |

---


## Alur Kerja Lengkap

| 1. Buka Browser | 2. JS Jalankan Fetch | 3. Backend Query DB | 4. Render Tabel | 5. User Aksi |
| :--- | :--- | :--- | :--- | :--- |
| User buka `localhost:5173`, browser muat HTML & JS. | `muatUlangData()` dipanggil → fetch GET ke `localhost:3000`. | Backend query MySQL → kirim balik data JSON. | JS terima JSON → `renderTabel()` → DOM diupdate, tabel muncul. | Klik Tambah/Edit/Hapus → fetch POST/PUT/DELETE → tabel refresh. |

---

## Penutup

| Konsep | Yang Sudah Dipelajari |
| :--- | :--- |
| **Frontend & Browser** | Perbedaan frontend-backend, alur kerja browser, HTML/CSS/JS |
| **Vite** | Fungsi build tool, dev server, auto-reload, HMR |
| **Tailwind CSS** | Utility-first, perbandingan dengan CSS biasa & Bootstrap, pola class umum |
| **Fetch API** | Async/await, GET/POST/PUT/DELETE, error handling |
| **Project** | UI Inventory lengkap terhubung ke REST API |

> 💡 **Konsep terpenting:** Frontend dan backend adalah dua program terpisah yang berkomunikasi lewat HTTP. Frontend tidak perlu tahu bagaimana backend menyimpan data — yang penting backend mengembalikan JSON yang sesuai.
