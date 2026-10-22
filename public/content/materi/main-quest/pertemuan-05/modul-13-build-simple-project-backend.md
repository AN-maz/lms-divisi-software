# Tutorial: Membangun REST API Inventory dari Nol

Pada modul ini kalian bakal cobain gimana bikin backend simple dan sederhana dengan menggunakan framework express

---

## Daftar Isi

1. [Persiapan: Install Node.js]
2. [Membuat Folder Project]
3. [Inisialisasi Project Node.js]
4. [Install Dependensi]
5. [Menyiapkan Database MySQL]
6. [Membuat Struktur Folder Project]
7. [Membuat File Konfigurasi]
8. [Membuat Kode Aplikasi]
9. [Menjalankan Server]
10. [Testing API]

---

# 1. Persiapan: Install Node.js

Node.js adalah **runtime environment** yang memungkinkan JavaScript dijalankan di luar browser — yaitu langsung di komputer kalian (server-side). Tanpa Node.js, kalian tidak bisa menjalankan kode backend JavaScript sama sekali.

### Cara Install Node.js

1. Buka browser, pergi ke **https://nodejs.org**
2. Download versi **LTS (Long Term Support)** — ini versi yang paling stabil dan direkomendasikan untuk pemula
3. Jalankan installer yang sudah didownload, ikuti langkah-langkahnya sampai selesai
4. Setelah selesai, **buka Terminal** (Mac/Linux) atau **Command Prompt / PowerShell** (Windows)

### Verifikasi Instalasi

Ketik perintah berikut untuk memastikan Node.js dan npm sudah terinstall:

```bash
node -v
```

```bash
npm -v
```

Jika berhasil, output-nya akan menampilkan nomor versi, contohnya:

```
v20.11.0
v10.2.4
```

> **Apa itu npm?**  
> npm (Node Package Manager) adalah tools yang otomatis ikut terinstall bersama Node.js. Fungsinya untuk mengunduh dan mengelola library/paket yang dibutuhkan oleh project kalian. Bayangkan npm seperti "google play store" untuk kode Node.js.

---

# 2. Membuat Folder Project

Sekarang kita buat folder untuk menyimpan semua file project.

## Langkah-langkah

Buat folder project (bebas mau di directory yg mana) 

untuk nama foldernya bebas, tapi sy namainnya `latihan`

Kemudian buka folder tersebut di Vscode

---

# 3. Inisialisasi Project Node.js

Setiap project Node.js membutuhkan file bernama `package.json`. File ini adalah "identitas" project kalian — berisi nama project, versi, daftar library yang digunakan, dan perintah-perintah yang bisa dijalankan.

buka terminal di vscode 

Jalankan perintah berikut:

```bash
npm init -y
```

Penjelasan flag `-y`:
- Tanpa `-y`: npm akan menanyakan satu per satu (nama project, versi, deskripsi, dll.)
- Dengan `-y`: npm langsung menjawab semua pertanyaan dengan nilai default secara otomatis

Setelah berhasil, akan muncul pesan seperti ini dan file `package.json` akan otomatis terbuat:

```
Wrote to /path/to/latihan/package.json:

{
  "name": "latihan",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  ...
}
```

---

# 4. Install Dependensi

Dependensi adalah **library atau paket buatan orang lain** yang kita gunakan dalam project agar tidak perlu menulis semuanya dari nol.

Contoh sederhananya: daripada kita tulis sendiri cara menangani HTTP request dari awal (yang sangat rumit), kita cukup pakai library Express.js yang sudah jadi.

Kita akan menginstall **3 dependensi utama** dan **1 dependensi untuk development**.

## Install Dependensi Utama

```bash
npm install express mysql2 dotenv
```

Perintah ini menginstall tiga paket sekaligus. Berikut penjelasan masing-masing:

## `express`
Express adalah **web framework** untuk Node.js. Fungsinya untuk mempermudah pembuatan server dan routing (menentukan URL mana memanggil fungsi apa).

Tanpa Express, kalian harus menulis ratusan baris kode hanya untuk membuat server sederhana. Dengan Express, cukup beberapa baris:

```js
const express = require('express');
const app = express();
app.listen(3000);
```

### `mysql2`
Library ini digunakan untuk **menghubungkan aplikasi Node.js ke database MySQL**. Dengan mysql2, kalian bisa mengirim query SQL (SELECT, INSERT, UPDATE, DELETE) dari dalam kode JavaScript.

Tanpa library ini, Node.js tidak tahu cara "berbicara" dengan MySQL.

## `dotenv`
Library ini digunakan untuk **membaca file `.env`** — yaitu file yang menyimpan konfigurasi rahasia seperti password database, port server, dll.

Kenapa tidak ditulis langsung di kode? Karena kalau kalian upload kode ke GitHub atau kirim ke orang lain, password database kalian bisa terbaca semua orang. Dengan `.env`, file konfigurasi sensitif bisa dikecualikan dari upload.

---

> jadi jangan coba-coba nyimpen yg rahasia di hardcode nya langsung ya ges ya

### Install Dependensi Development

```bash
npm install --save-dev nodemon
```

Flag `--save-dev` artinya paket ini **hanya digunakan saat development** (saat kalian sedang coding), bukan di production (saat aplikasi sudah live/digunakan user).

## `nodemon`
Saat kalian mengubah kode lalu menyimpannya, server Node.js biasanya perlu direstart secara manual (CTRL+C lalu jalankan ulang). Nodemon **otomatis merestart server** setiap kali ada perubahan file yang disimpan.

Ini sangat menghemat waktu saat proses pengembangan.

---

## Cek Hasil Instalasi

Setelah semua terinstall, buka file `package.json` — isinya akan berubah menjadi seperti ini:

```json
{
  "name": "latihan",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "mysql2": "^3.22.4"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

kalian juga akan melihat folder baru bernama `node_modules/` — di sinilah semua kode dari library yang kalian install disimpan. **Jangan diubah isinya secara manual.**

> **Catatan:** Folder `node_modules` tidak perlu di-upload ke GitHub atau dikirim ke orang lain. Siapapun yang dapat file project kalian cukup jalankan `npm install` untuk mengunduh semua dependensi secara otomatis berdasarkan daftar di `package.json`.

---

# 5. Menyiapkan Database MySQL

Pastikan MySQL sudah terinstall di komputermu. Jika menggunakan **XAMPP**, cukup aktifkan service **MySQL** dari XAMPP Control Panel.

## Buka phpMyAdmin atau MySQL CLI

Jika menggunakan XAMPP: buka browser dan pergi ke **http://localhost/phpmyadmin**

## Buat Database Baru

Klik tombol **"New"** di sidebar kiri, lalu masukkan nama database:

```
inventory_db
```

Klik **"Create"**.

## Buat Tabel

Kita akan membuat 2 tabel: `categories` dan `products`.

Klik tab **SQL**, paste query berikut, lalu klik **"Go"**:

```sql
-- Buat tabel categories
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Buat tabel products
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Isi Data Awal (Opsional)

Supaya langsung ada data untuk dicoba, jalankan query ini:

```sql
-- Isi tabel categories
INSERT INTO `categories` (`name`) VALUES
('Elektronik'),
('Pakaian'),
('Makanan'),
('Gaming'),
('Buku & Literasi'),
('Layanan Digital');

-- Isi tabel products
INSERT INTO `products` (`name`, `price`, `category_id`) VALUES
('Keyboard Mechanical', 500000, 1),
('Paket Makanan Bergizi', 25000, 3),
('Call of Duty: Modern Warfare 3', 850000, 4),
('Buku Pemrograman Dasar', 125000, 5),
('Paket Hosting Elite 1 Tahun', 450000, 6);
```

---

# 6. Membuat Struktur Folder Project

Sekarang kita buat struktur folder yang rapi. Masih di dalam folder `latihan`, buat folder-folder berikut:

```
latihan/
├── config/              ← Konfigurasi database
├── node_modules/        ← Library yang diinstall (otomatis)
├── src/
│   ├── controllers/     ← Handler HTTP request & response
│   ├── routes/          ← Definisi URL/endpoint
│   └── services/        ← Logic bisnis & query database
├── .env                 ← Konfigurasi environment (akan dibuat)
├── index.js             ← Entry point aplikasi (akan dibuat)
└── package.json         ← Identitas project (sudah ada)
```

> **Kenapa dipisah-pisah foldernya?**  
> Ini namanya **arsitektur berlapis (layered architecture)**. Tujuannya agar kode lebih terorganisir, mudah dibaca, dan mudah dirawat. Bayangkan kalau semua kode ditumpuk dalam satu file — akan sangat susah dicari ketika ada error.

---

# 7. Membuat File Konfigurasi

## File `.env`

Buat file bernama `.env` (tanpa ekstensi apapun, titiknya di depan) di root folder project:

```
latihan/.env
```

Isi file `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=inventory_db
```

Penjelasan tiap baris:
- `PORT=3000` — port yang digunakan server untuk berjalan
- `DB_HOST=localhost` — alamat server database (karena di komputer lokal, pakai `localhost`)
- `DB_USER=root` — username MySQL (default XAMPP adalah `root`)
- `DB_PASSWORD=` — password MySQL (default XAMPP kosong, isi sesuai password kalian)
- `DB_NAME=inventory_db` — nama database yang tadi dibuat

> **Penting:** Jika kalian menggunakan Git, tambahkan `.env` ke file `.gitignore` agar tidak ikut terupload. Buat file `.gitignore` dan isi dengan satu baris: `.env`

---

## File `config/database.js`

File ini bertugas **membuat koneksi ke database MySQL** dan mengekspornya agar bisa digunakan oleh file lain.

Buat file `config/database.js`:

```js
const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;
```

Penjelasan:
- `mysql2/promise` — menggunakan versi mysql2 yang mendukung `async/await` (lebih modern)
- `createPool` — membuat "kolam koneksi". Ini lebih efisien daripada membuat koneksi baru setiap ada request, karena koneksi yang sudah ada bisa digunakan ulang
- `connectionLimit: 10` — maksimal 10 koneksi simultan ke database
- `module.exports = db` — mengekspor variabel `db` agar bisa di-`require` oleh file lain

---

# 8. Membuat Kode Aplikasi

Kita akan membuat file secara berurutan dari yang paling dalam (service) ke yang paling luar (index.js).

## `src/services/product.service.js`

Layer **Service** berisi **logika bisnis dan query SQL**. File ini yang bertugas berkomunikasi langsung dengan database.

```js
const db = require('../../config/database');

const productService = {

  // Ambil semua produk beserta nama kategorinya
  getProducts: async () => {
    const query = `
      SELECT p.id, p.name, p.price, c.name AS category_name
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
    `;
    const [rows] = await db.query(query);
    return rows;
  },

  // Ambil satu produk berdasarkan ID
  getProductById: async (id) => {
    const query = `
      SELECT p.id, p.name, p.price, c.name AS category_name
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
    const [rows] = await db.query(query, [id]);
    return rows[0]; // Kembalikan objek pertama (atau undefined kalau tidak ada)
  },

  // Tambah produk baru
  createProduct: async (productData) => {
    const { name, price, category_id } = productData;
    const query = 'INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)';
    const [result] = await db.query(query, [name, price, category_id]);
    return { id: result.insertId, ...productData };
  },

  // Update data produk
  updateProduct: async (id, productData) => {
    const { name, price, category_id } = productData;
    const query = 'UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?';
    const [result] = await db.query(query, [name, price, category_id, id]);
    return result.affectedRows; // Jumlah baris yang berhasil diubah
  },

  // Hapus produk
  deleteProduct: async (id) => {
    const query = 'DELETE FROM products WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result.affectedRows; // Jumlah baris yang berhasil dihapus
  },

};

module.exports = productService;
```

> **Kenapa query pakai tanda `?`?**  
> Tanda `?` disebut **prepared statement**. Ini cara aman untuk memasukkan data dari user ke dalam query SQL, sehingga terhindar dari serangan **SQL Injection** — yaitu teknik hacking dengan cara menyisipkan perintah SQL berbahaya melalui input form.

---

## `src/controllers/product.controller.js`

Layer **Controller** bertugas **menerima request dari client, memanggil service, lalu mengirimkan response** balik ke client. Controller tidak boleh berisi query SQL — itu urusan service.

```js
const productService = require('../services/product.service');

const productController = {

  // GET /api/products
  getAll: async (req, res) => {
    try {
      const products = await productService.getProducts();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /api/products/:id
  getById: async (req, res) => {
    try {
      const { id } = req.params; // Ambil parameter id dari URL
      const product = await productService.getProductById(id);

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /api/products
  create: async (req, res) => {
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /api/products/:id
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedRows = await productService.updateProduct(id, req.body);

      if (updatedRows === 0) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      res.status(200).json({ success: true, message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /api/products/:id
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRows = await productService.deleteProduct(id);

      if (deletedRows === 0) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

};

module.exports = productController;
```

> **Apa itu `try...catch`?**  
> Ini adalah cara menangani error. Kode di dalam blok `try` dijalankan terlebih dahulu. Jika terjadi error (misalnya database mati), maka program tidak langsung crash — melainkan masuk ke blok `catch` dan mengirimkan response error yang rapi ke client.

> **Apa itu HTTP Status Code?**  
> Angka-angka seperti `200`, `201`, `404`, `500` adalah kode standar yang memberi tahu client tentang hasil request:
> - `200` — OK (berhasil)
> - `201` — Created (data berhasil dibuat)
> - `404` — Not Found (data tidak ditemukan)
> - `500` — Internal Server Error (ada error di server)

---

## `src/routes/product.route.js`

Layer **Routes** bertugas **mendaftarkan URL endpoint** beserta method HTTP-nya, dan menghubungkannya ke fungsi controller yang sesuai.

```js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Daftarkan semua endpoint untuk resource "products"
router.get('/', productController.getAll);        // GET  /api/products
router.get('/:id', productController.getById);    // GET  /api/products/1
router.post('/', productController.create);       // POST /api/products
router.put('/:id', productController.update);     // PUT  /api/products/1
router.delete('/:id', productController.delete);  // DELETE /api/products/1

module.exports = router;
```

> **Apa itu `/:id`?**  
> Titik dua (`:`) menandakan **parameter dinamis**. Jadi `/:id` artinya URL ini menerima nilai apapun di posisi tersebut. Contoh: `/api/products/5` berarti `id = 5`, dan `/api/products/99` berarti `id = 99`.

---

## `src/app.js`

File ini adalah **inti dari aplikasi Express**. Di sini kita merakit semua bagian: setup middleware dan mendaftarkan routes.

```js
const express = require('express');
const productRoutes = require('./routes/product.route');

const app = express();

// Middleware: beri tahu Express untuk memahami request body berformat JSON
app.use(express.json());

// Route dasar untuk mengecek server berjalan
app.get('/', (req, res) => {
  res.send('Selamat datang di API Inventory!');
});

// Daftarkan semua route produk dengan prefix /api/products
app.use('/api/products', productRoutes);

module.exports = app;
```

> **Apa itu Middleware?**  
> Middleware adalah fungsi yang berjalan **di antara** request masuk dan response keluar. `express.json()` adalah middleware bawaan Express yang bertugas mem-parsing request body yang berformat JSON menjadi object JavaScript. Tanpa ini, `req.body` akan selalu `undefined` saat menerima data dari client.

---

## `index.js`

Ini adalah **titik masuk (entry point)** aplikasi — file pertama yang dijalankan Node.js.

```js
const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
```

> Kenapa pakai `process.env.PORT || 3000`? Artinya: gunakan PORT dari file `.env` kalau ada, kalau tidak ada pakai `3000` sebagai nilai default.

---

## Cek Struktur File Final

Pastikan semua file sudah dibuat dengan benar:

```
latihan/
├── config/
│   └── database.js
├── node_modules/         ← otomatis ada
├── src/
│   ├── app.js
│   ├── controllers/
│   │   └── product.controller.js
│   ├── routes/
│   │   └── product.route.js
│   └── services/
│       └── product.service.js
├── .env
├── index.js
└── package.json
```

---

# 9. Menjalankan Server

## Tambahkan Script di `package.json`

Buka `package.json`, ubah bagian `"scripts"` menjadi:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

Penjelasan:
- `"start"` — menjalankan server menggunakan Node.js biasa (untuk production)
- `"dev"` — menjalankan server menggunakan Nodemon (untuk development, auto-restart)

## Jalankan Server

Untuk development (disarankan saat belajar):

```bash
npm run dev
```

Jika berhasil, terminal akan menampilkan:

```
[nodemon] starting `node index.js`
Server berjalan di http://localhost:3000
```

Untuk menghentikan server, tekan `CTRL + C`.

> **Catatan:** Pastikan MySQL sudah aktif sebelum menjalankan server. Jika MySQL mati, server tetap bisa jalan tapi semua request yang butuh database akan error.

---

# 10. Testing API

Ada beberapa cara untuk menguji API. Kita akan menggunakan dua cara: **browser** (untuk GET) dan **Thunder Client** (untuk semua method).

## Cara 1: Test via Browser (hanya untuk GET)

Buka browser dan akses URL berikut:

| URL | Hasil yang diharapkan |
|-----|----------------------|
| `http://localhost:3000/` | Teks: "Selamat datang di API Inventory!" |
| `http://localhost:3000/api/products` | JSON berisi semua produk |
| `http://localhost:3000/api/products/1` | JSON berisi produk dengan id = 1 |

---

## Cara 2: Test via Thunder Client (Recommended)

Thunder Client adalah **extension VS Code** khusus untuk testing API. Cara install:

1. Buka VS Code
2. Klik ikon **Extensions** di sidebar kiri (atau tekan `Ctrl+Shift+X`)
3. Cari **"Thunder Client"**
4. Klik **Install**

Setelah terinstall, klik ikon Thunder Client di sidebar kiri VS Code.

---

### Test 1: GET Semua Produk

- Method: `GET`
- URL: `http://localhost:3000/api/products`
- Klik **Send**

Contoh response yang diharapkan:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Keyboard Mechanical",
      "price": "500000.00",
      "category_name": "Elektronik"
    },
    {
      "id": 2,
      "name": "Paket Makanan Bergizi",
      "price": "25000.00",
      "category_name": "Makanan"
    }
  ]
}
```

---

### Test 2: GET Produk by ID

- Method: `GET`
- URL: `http://localhost:3000/api/products/1`
- Klik **Send**

Response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Keyboard Mechanical",
    "price": "500000.00",
    "category_name": "Elektronik"
  }
}
```

Coba juga ID yang tidak ada, misalnya `/api/products/999`:

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### Test 3: POST Tambah Produk Baru

- Method: `POST`
- URL: `http://localhost:3000/api/products`
- Klik tab **Body** → pilih **JSON**
- Isi body dengan:

```json
{
  "name": "Mouse Gaming",
  "price": 350000,
  "category_id": 1
}
```

- Klik **Send**

Response yang diharapkan (status `201 Created`):

```json
{
  "success": true,
  "data": {
    "id": 9,
    "name": "Mouse Gaming",
    "price": 350000,
    "category_id": 1
  }
}
```

---

### Test 4: PUT Update Produk

- Method: `PUT`
- URL: `http://localhost:3000/api/products/9`
- Body (JSON):

```json
{
  "name": "Mouse Gaming RGB",
  "price": 400000,
  "category_id": 1
}
```

- Klik **Send**

Response:

```json
{
  "success": true,
  "message": "Product updated successfully"
}
```

---

### Test 5: DELETE Hapus Produk

- Method: `DELETE`
- URL: `http://localhost:3000/api/products/9`
- Klik **Send**

Response:

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

Verifikasi dengan GET kembali ke `/api/products/9` — seharusnya sudah `404 Not Found`.

---

## Ringkasan Endpoint API

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| GET | `/api/products` | Ambil semua produk |
| GET | `/api/products/:id` | Ambil satu produk by ID |
| POST | `/api/products` | Tambah produk baru |
| PUT | `/api/products/:id` | Update produk |
| DELETE | `/api/products/:id` | Hapus produk |

---

## Troubleshooting (Masalah Umum)

### Error: `Cannot find module 'express'`
**Penyebab:** Dependensi belum terinstall.  
**Solusi:** Jalankan `npm install` di dalam folder project.

### Error: `ECONNREFUSED` atau `connect ECONNREFUSED 127.0.0.1:3306`
**Penyebab:** MySQL tidak aktif.  
**Solusi:** Aktifkan service MySQL dari XAMPP Control Panel.

### Error: `Access denied for user 'root'@'localhost'`
**Penyebab:** Password database salah.  
**Solusi:** Cek kembali nilai `DB_PASSWORD` di file `.env`.

### Error: `Unknown database 'inventory_db'`
**Penyebab:** Database belum dibuat.  
**Solusi:** Buat database `inventory_db` terlebih dahulu di phpMyAdmin.

### Server tidak auto-restart saat file diubah
**Penyebab:** Server dijalankan dengan `npm start` bukan `npm run dev`.  
**Solusi:** Gunakan `npm run dev` untuk development.

---

*Tutorial selesai. Selamat — kalian baru saja membangun REST API pertamamu!*
