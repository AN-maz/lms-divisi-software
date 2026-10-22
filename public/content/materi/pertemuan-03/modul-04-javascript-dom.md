# 1. Pengenalan Document Object Model (DOM) JavaScript

--- 

## Daftar isi
1. Pengenalan Document Object Model JavaScript
2. Struktur DOM
3. Memilih Element HTML
4. Memanipulasi isi dari attribute element 
5. Mengubah Style CSS dengan JavaScript
6. Manipulasi CSS Class (classList)
7. Membuat dan Menghapus Elemen HTML
8. DOM Events (Merespon Interaksi User)
9. Event Object - Informasi Detail tentang Event
10. Proyek Nyata: Aplikasi Interaktif Sederhana
11. Best Practice DOM JavaScript
12. Kesimpulan
13. Latihan 
14. Tugas mandiri 
15. Referensi

---

Bayangkan halaman HTML kamu adalah sebuah rumah. DOM adalah cara JavaScript untuk "melihat" dan "mengubah" setiap bagian dari rumah tersebut—dari pintu, jendela, hingga furniture di dalamnya.

**DOM (Document Object Model)** adalah jembatan antara HTML (struktur) dan JavaScript (logika). Dengan DOM, JavaScript dapat:

- 📝 Mengubah isi teks di halaman
- 🎨 Mengubah warna dan style
- ➕ Menambah elemen HTML baru
- ❌ Menghapus elemen
- 🖱️ Merespon klik dan interaksi user

## Konsep Dasar DOM

Browser membaca file HTML dan mengubahnya menjadi objek yang bisa diakses oleh JavaScript. Proses ini terjadi otomatis ketika halaman dimuat.

### Contoh Sederhana

Misalkan kamu punya HTML seperti ini:

```html
<h1 id="judul">Hello World</h1>
```

Dengan JavaScript, kamu bisa mengubahnya:

```javascript
const judul = document.getElementById("judul");
judul.textContent = "Belajar DOM JavaScript";
```

Hasilnya di browser akan berubah menjadi:

```html
<h1 id="judul">Belajar DOM JavaScript</h1>
```

> **Catatan:** Perubahan terjadi hanya di browser, bukan di file HTML asli kamu.

---

# 2. Struktur DOM (Pohon Dokumen)

Browser membaca HTML dan mengubahnya menjadi struktur pohon (Tree Structure). Setiap elemen HTML menjadi "node" atau "cabang" di pohon ini.

## Visualisasi Struktur DOM

Bayangkan file HTML seperti ini:

```html
<body>
  <div class="container">
    <h1>Judul Halaman</h1>
    <p>Ini paragraf</p>
    <button>Klik Saya</button>
  </div>
</body>
```

Browser akan mengubahnya menjadi struktur pohon:

```
document (Akar)
  └── html
      └── body
          └── div (class="container")
              ├── h1
              ├── p
              └── button
```

## Objek Penting dalam DOM

| Objek | Fungsi |
| --- | --- |
| `document` | Pintu masuk utama ke seluruh halaman HTML |
| `element` | Representasi elemen HTML (h1, p, button, dll) |
| `node` | Semua item dalam struktur DOM (elemen + teks) |

> **Tips:** `document` adalah objek global yang selalu tersedia di JavaScript tanpa perlu dideclare.

---

# 3. Memilih Elemen HTML (DOM Selection)

Sebelum mengubah sesuatu, kamu harus memilih elemen mana yang akan diubah. Ada beberapa cara untuk memilih elemen:

## A. getElementById() - Berdasarkan ID

Gunakan ini untuk memilih elemen yang memiliki atribut `id`.

```html
<h1 id="judul">Selamat Datang</h1>
```

```javascript
const judul = document.getElementById("judul");
console.log(judul); // Menampilkan elemen <h1>
```

**Kelebihan:** Cepat dan langsung menemukan 1 elemen (ID harus unik).

## B. querySelector() - Menggunakan Selector CSS

Cara paling modern dan fleksibel. Menggunakan selector CSS biasa (.class, #id, tag).

```html
<p class="deskripsi">Ini adalah deskripsi</p>
```

```javascript
const deskripsi = document.querySelector(".deskripsi");
console.log(deskripsi); // Menampilkan elemen <p> pertama
```

Contoh lainnya:

```javascript
// Pilih berdasarkan ID
document.querySelector("#judul");

// Pilih berdasarkan tag
document.querySelector("button");

// Pilih berdasarkan class
document.querySelector(".active");

// Kombinasi (lebih spesifik)
document.querySelector("div.container > p");
```

> **Catatan:** `querySelector()` hanya mengembalikan **elemen pertama** yang cocok.

## C. querySelectorAll() - Memilih Banyak Elemen Sekaligus

Gunakan ini jika ingin memilih lebih dari satu elemen.

```html
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
```

```javascript
const items = document.querySelectorAll("li");
console.log(items); // Menampilkan semua 3 elemen <li>
console.log(items.length); // Output: 3
```

Kamu bisa looping untuk mengakses masing-masing:

```javascript
items.forEach(function(item) {
  console.log(item.textContent);
});
```

## D. getElementsByClassName() - Berdasarkan Class

Cara lama namun masih digunakan:

```html
<p class="info">Teks A</p>
<p class="info">Teks B</p>
<p class="info">Teks C</p>
```

```javascript
const allInfo = document.getElementsByClassName("info");
console.log(allInfo); // HTMLCollection dengan 3 elemen
```

## Perbandingan Metode Pemilihan

| Metode | Sintaksis | Hasil | Catatan |
| --- | --- | --- | --- |
| `getElementById()` | `getElementById("id")` | 1 elemen atau null | Paling cepat |
| `querySelector()` | `querySelector("selector")` | 1 elemen atau null | Modern, fleksibel |
| `querySelectorAll()` | `querySelectorAll("selector")` | Semua elemen | Harus loop jika ingin akses satu-satu |
| `getElementsByClassName()` | `getElementsByClassName("class")` | Semua elemen | Lebih lama, jarang dipakai |

> **Rekomendasi:** Gunakan `querySelector()` dan `querySelectorAll()` karena lebih modern dan fleksibel.

---

# 4. Memanipulasi Isi dan Atribut Elemen

Sekarang kita sudah bisa memilih elemen, saatnya mengubahnya!

## A. Mengubah Teks dengan textContent

Gunakan `textContent` untuk mengubah atau membaca teks biasa (tanpa HTML).

```html
<p id="pesan">Halo Dunia</p>
```

```javascript
const pesan = document.getElementById("pesan");

// Membaca teks
console.log(pesan.textContent); // Output: "Halo Dunia"

// Mengubah teks
pesan.textContent = "Selamat Belajar DOM!";
```

Hasilnya di browser:

```html
<p id="pesan">Selamat Belajar DOM!</p>
```

## B. Mengubah HTML dengan innerHTML

Gunakan `innerHTML` jika kamu ingin menambah kode HTML (bukan hanya teks).

```javascript
const pesan = document.getElementById("pesan");

pesan.innerHTML = "<strong>Teks tebal</strong> dan <em>miring</em>";
```

Hasilnya:

```html
<p id="pesan"><strong>Teks tebal</strong> dan <em>miring</em></p>
```

## Perbedaan textContent vs innerHTML

| Properti | Bisa Baca HTML? | Keamanan | Kapan Gunakan? |
| --- | --- | --- | --- |
| `textContent` | ❌ Tidak | ✅ Aman | Hanya teks biasa |
| `innerHTML` | ✅ Ya | ⚠️ Rawan XSS | Ketika perlu tambah elemen HTML |

> **Peringatan:** Hindari `innerHTML` untuk data dari user karena bisa terkena serangan XSS (Cross Site Scripting). Lebih aman gunakan `textContent`.

## C. Mengubah Atribut

Elemen HTML punya atribut seperti `src`, `href`, `alt`, `class`, dll. Kamu bisa mengubahnya dengan `setAttribute()`.

```html
<img id="foto" alt="Foto saya">
```

```javascript
const foto = document.getElementById("foto");

// Menambah atribut
foto.setAttribute("src", "kucing.jpg");
foto.setAttribute("width", "200");
foto.setAttribute("alt", "Kucing lucu");
```

Hasilnya:

```html
<img id="foto" src="kucing.jpg" width="200" alt="Kucing lucu">
```

### Mengambil Nilai Atribut

```javascript
const src = foto.getAttribute("src");
console.log(src); // Output: "kucing.jpg"
```

---

# 5. Mengubah Style CSS dengan JavaScript

Kamu bisa mengubah gaya (warna, ukuran, posisi, dll) elemen secara dinamis.

## A. Mengubah Style Langsung

```html
<p id="teks">Halo Dunia</p>
```

```javascript
const teks = document.getElementById("teks");

// Mengubah warna
teks.style.color = "red";

// Mengubah ukuran font
teks.style.fontSize = "30px";

// Mengubah background
teks.style.backgroundColor = "yellow";

// Mengubah padding
teks.style.padding = "20px";
```

## B. Catatan: camelCase untuk CSS Properties

JavaScript menggunakan format `camelCase` (kata kedua huruf besar), berbeda dengan CSS yang pakai kebab-case (tanda hubung).

| CSS (di file .css) | JavaScript (di file .js) |
| --- | --- |
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |
| `margin-top` | `marginTop` |
| `text-align` | `textAlign` |

> **Tips:** Jika CSS punya tanda hubung (-), hilangkan dan buat huruf berikutnya besar!

## C. Cara yang Lebih Baik: Gunakan CSS Class

Mengubah style satu-satu tidak efisien. Lebih baik buat class CSS dulu, lalu tambahkan class itu ke elemen.

**File CSS:**

```css
.highlight {
  background-color: yellow;
  color: black;
  padding: 10px;
  border-radius: 5px;
}
```

**HTML:**

```html
<p id="teks">Halo Dunia</p>
```

**JavaScript:**

```javascript
const teks = document.getElementById("teks");
teks.classList.add("highlight");
```

Hasil: Elemen akan mendapat semua style dari class `.highlight` sekaligus!

---

# 6. Manipulasi CSS Class (classList)

Menggunakan class lebih rapi dan terorganisir. JavaScript punya method khusus untuk mengelola class:

## Method classList

```javascript
const elemen = document.querySelector("p");

// Menambah class
elemen.classList.add("active");

// Menghapus class
elemen.classList.remove("active");

// Toggle (tambah jika tidak ada, hapus jika ada)
elemen.classList.toggle("active");

// Mengecek apakah punya class tertentu
if (elemen.classList.contains("active")) {
  console.log("Elemen punya class 'active'");
}
```

## Contoh: Dark Mode Toggle

```html
<button id="toggle-dark">🌙 Dark Mode</button>
<p id="konten">Ini adalah konten halaman</p>
```

```css
body {
  background-color: white;
  color: black;
}

body.dark-mode {
  background-color: #1a1a1a;
  color: white;
}
```

```javascript
const tombol = document.getElementById("toggle-dark");

tombol.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});
```

Klik tombol → halaman berganti ke dark mode!

---

# 7. Membuat dan Menghapus Elemen HTML

Kadang kita perlu menambah elemen HTML baru dari JavaScript, bukan dari HTML langsung.

## A. Membuat Elemen dengan createElement()

```javascript
// Buat elemen baru
const item = document.createElement("li");

// Isi dengan teks
item.textContent = "Item baru";
```

Elemen sudah dibuat, tapi belum terlihat di halaman. Kita perlu memasukkannya ke dalam HTML.

## B. Menambahkan Elemen ke Halaman

### appendChild() - Tambah ke Akhir

```html
<ul id="daftar">
  <li>Item 1</li>
</ul>
```

```javascript
const daftar = document.getElementById("daftar");

const item2 = document.createElement("li");
item2.textContent = "Item 2";

daftar.appendChild(item2);
```

Hasilnya:

```html
<ul id="daftar">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### prepend() - Tambah ke Awal

```javascript
const item0 = document.createElement("li");
item0.textContent = "Item 0";

daftar.prepend(item0);
```

Hasilnya:

```html
<ul id="daftar">
  <li>Item 0</li>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

## C. Menghapus Elemen dengan remove()

```javascript
const item1 = daftar.querySelector("li:first-child");
item1.remove(); // Elemen langsung hilang dari halaman
```

## Contoh Lengkap: Membuat Daftar Buah

```html
<!DOCTYPE html>
<html>
<head>
  <title>Daftar Buah</title>
</head>
<body>
  <h1>Daftar Buah Favorit</h1>
  <ul id="buah"></ul>
  <button id="tambah-buah">Tambah Buah</button>

  <script src="script.js"></script>
</body>
</html>
```

```javascript
const daftarBuah = document.getElementById("buah");
const tombolTambah = document.getElementById("tambah-buah");
const buahList = ["Apel", "Jeruk", "Mangga"];

// Fungsi membuat item
function tambahBuah(nama) {
  const li = document.createElement("li");
  li.textContent = nama;
  daftarBuah.appendChild(li);
}

// Isi daftar saat halaman dibuka
buahList.forEach(function(buah) {
  tambahBuah(buah);
});

// Klik tombol → tambah buah baru
tombolTambah.addEventListener("click", function() {
  tambahBuah("Pisang");
});
```

---

# 8. DOM Events (Merespon Interaksi User)

Event adalah aksi yang terjadi pada halaman web, seperti klik, hover, atau mengetik. Dengan event listener, JavaScript bisa "mendengar" aksi tersebut dan merespons.

## Jenis Event Umum

| Event | Kapan Terjadi |
| --- | --- |
| `click` | Saat elemen diklik |
| `dblclick` | Saat elemen diklik 2 kali |
| `mouseenter` | Saat mouse masuk ke elemen |
| `mouseleave` | Saat mouse keluar dari elemen |
| `input` | Saat nilai input berubah |
| `change` | Saat nilai input selesai berubah |
| `keydown` | Saat tombol keyboard ditekan |
| `keyup` | Saat tombol keyboard dilepas |
| `submit` | Saat form dikirim |
| `load` | Saat halaman selesai dimuat |
| `scroll` | Saat user scroll halaman |

## Menggunakan addEventListener()

`addEventListener()` adalah cara modern untuk "mendengarkan" event.

**Sintaksis:**

```javascript
elemen.addEventListener("jenis-event", function() {
  // Kode yang dijalankan saat event terjadi
});
```

## Contoh 1: Click Event

```html
<button id="tombol">Klik Saya!</button>
<p id="hasil"></p>
```

```javascript
const tombol = document.getElementById("tombol");
const hasil = document.getElementById("hasil");

tombol.addEventListener("click", function() {
  hasil.textContent = "Tombol sudah diklik!";
});
```

Ketika tombol diklik → teks berubah!

## Contoh 2: Input Event

```html
<input type="text" id="nama" placeholder="Ketik nama kamu...">
<p id="sapaan"></p>
```

```javascript
const input = document.getElementById("nama");
const sapaan = document.getElementById("sapaan");

input.addEventListener("input", function() {
  sapaan.textContent = "Halo, " + input.value;
});
```

Saat kamu mengetik → teks sapaan berubah real-time!

## Menggunakan Arrow Function

Cara modern menggunakan arrow function (lebih singkat):

```javascript
tombol.addEventListener("click", () => {
  console.log("Tombol diklik!");
});
```

---

# 9. Event Object - Informasi Detail tentang Event

Setiap kali event terjadi, JavaScript otomatis mengirim sebuah object yang berisi informasi detail. Object ini biasanya dinamai `e` atau `event`.

```javascript
elemen.addEventListener("click", function(e) {
  console.log(e); // Menampilkan event object
});
```

## Properti Event Penting

| Properti | Fungsi |
| --- | --- |
| `e.target` | Elemen yang mengalami event (yang diklik, diketik, dll) |
| `e.type` | Jenis event (click, input, keydown, dll) |
| `e.key` | Tombol keyboard yang ditekan (untuk keydown/keyup) |
| `e.value` | Nilai input (untuk event input) |

## Contoh: Keyboard Event

```javascript
document.addEventListener("keydown", function(e) {
  console.log("Tombol yang ditekan: " + e.key);
});
```

Coba tekan tombol keyboard → console akan menampilkan tombol mana yang ditekan!

## preventDefault() - Mencegah Perilaku Default

Beberapa elemen punya perilaku default (otomatis). Misalnya, form akan reload halaman saat submit. Kita bisa mencegahnya dengan `preventDefault()`.

```html
<form id="form-login">
  <input type="email" placeholder="Email">
  <button type="submit">Login</button>
</form>
```

```javascript
const form = document.getElementById("form-login");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // Cegah reload halaman
  
  console.log("Form submitted tanpa reload!");
});
```

---

# 10. Proyek Nyata: Aplikasi Interaktif Sederhana

Mari praktik membuat aplikasi kecil yang menggabungkan semua konsep DOM!

## Proyek A: Counter (Penghitung)

### Struktur File

```
counter-app/
├── index.html
├── style.css
└── script.js
```

### File: index.html

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Counter App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Counter</h1>
    
    <div class="counter-display">
      <h2 id="angka">0</h2>
    </div>
    
    <div class="buttons">
      <button id="btn-minus" class="btn btn-minus">➖ Kurang</button>
      <button id="btn-reset" class="btn btn-reset">🔄 Reset</button>
      <button id="btn-plus" class="btn btn-plus">➕ Tambah</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### File: style.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
}

h1 {
  color: #667eea;
  margin-bottom: 30px;
  font-size: 2.5em;
}

.counter-display {
  background: #f0f0f0;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
}

#angka {
  font-size: 4em;
  color: #667eea;
  margin: 0;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-plus {
  background: #4caf50;
  color: white;
}

.btn-minus {
  background: #ff5252;
  color: white;
}

.btn-reset {
  background: #2196f3;
  color: white;
}
```

### File: script.js

```javascript
// 1. Pilih elemen
const angka = document.getElementById("angka");
const btnPlus = document.getElementById("btn-plus");
const btnMinus = document.getElementById("btn-minus");
const btnReset = document.getElementById("btn-reset");

// 2. Buat variabel counter
let count = 0;

// 3. Fungsi update tampilan
function updateDisplay() {
  angka.textContent = count;
}

// 4. Event listener untuk tombol tambah
btnPlus.addEventListener("click", function() {
  count++;
  updateDisplay();
});

// 5. Event listener untuk tombol kurang
btnMinus.addEventListener("click", function() {
  count--;
  updateDisplay();
});

// 6. Event listener untuk tombol reset
btnReset.addEventListener("click", function() {
  count = 0;
  updateDisplay();
});
```

**Hasil:** Aplikasi counter yang berfungsi penuh dengan desain cantik!

## Proyek B: To-Do List

### Struktur File

```
todo-app/
├── index.html
├── style.css
└── script.js
```

### File: index.html

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do List</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>📝 Daftar Tugas Saya</h1>
    
    <div class="input-group">
      <input 
        type="text" 
        id="input-tugas" 
        placeholder="Ketik tugas baru..."
        autocomplete="off"
      >
      <button id="btn-tambah">Tambah</button>
    </div>
    
    <ul id="daftar-tugas" class="todo-list"></ul>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### File: style.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 500px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

h1 {
  color: #667eea;
  margin-bottom: 25px;
  text-align: center;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

#input-tugas {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s;
}

#input-tugas:focus {
  outline: none;
  border-color: #667eea;
}

#btn-tambah {
  padding: 12px 25px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

#btn-tambah:hover {
  background: #5568d3;
}

.todo-list {
  list-style: none;
}

.todo-item {
  padding: 15px;
  background: #f9f9f9;
  border-left: 4px solid #667eea;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s;
}

.todo-item:hover {
  background: #f0f0f0;
}

.todo-text {
  flex: 1;
  font-size: 1.05em;
}

.btn-hapus {
  padding: 8px 15px;
  background: #ff5252;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.btn-hapus:hover {
  background: #ff3333;
}
```

### File: script.js

```javascript
// 1. Pilih elemen
const inputTugas = document.getElementById("input-tugas");
const btnTambah = document.getElementById("btn-tambah");
const daftarTugas = document.getElementById("daftar-tugas");

// 2. Event listener untuk tombol tambah
btnTambah.addEventListener("click", tambahTugas);

// 3. Tekan Enter di input juga untuk tambah
inputTugas.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    tambahTugas();
  }
});

// 4. Fungsi untuk tambah tugas
function tambahTugas() {
  const tugas = inputTugas.value.trim();
  
  // Validasi: jangan biarkan kosong
  if (tugas === "") {
    alert("Tugas tidak boleh kosong!");
    return;
  }
  
  // Buat elemen li
  const li = document.createElement("li");
  li.className = "todo-item";
  
  // Buat teks tugas
  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = tugas;
  
  // Buat tombol hapus
  const btnHapus = document.createElement("button");
  btnHapus.className = "btn-hapus";
  btnHapus.textContent = "Hapus";
  
  // Tambah event hapus
  btnHapus.addEventListener("click", function() {
    li.remove();
  });
  
  // Gabungkan elemen
  li.appendChild(span);
  li.appendChild(btnHapus);
  
  // Tambah ke daftar
  daftarTugas.appendChild(li);
  
  // Kosongkan input
  inputTugas.value = "";
  inputTugas.focus();
}
```

**Hasil:** Aplikasi To-Do List yang fungsional dengan tambah dan hapus tugas!

---

# 11. Best Practice DOM JavaScript

Saat membuat kode DOM, ikuti praktik-praktik terbaik ini:

## ✅ Gunakan const untuk Elemen

Elemen yang dipilih biasanya tidak berubah, jadi gunakan `const`:

```javascript
const tombol = document.getElementById("btn");
const isiHalaman = document.querySelector(".content");
```

## ✅ Pilih Elemen di Awal Kode

Jangan pilih elemen berkali-kali dalam fungsi. Pilih sekali saja di awal:

```javascript
// ❌ Tidak efisien
function ubah() {
  document.getElementById("teks").style.color = "red";
}

// ✅ Efisien
const teks = document.getElementById("teks");
function ubah() {
  teks.style.color = "red";
}
```

## ✅ Gunakan Event Listener (Jangan onclick)

**❌ Hindari:**

```html
<button onclick="klik()">Klik</button>
```

**✅ Lebih baik:**

```html
<button id="tombol">Klik</button>
```

```javascript
const tombol = document.getElementById("tombol");
tombol.addEventListener("click", function() {
  // Kode di sini
});
```

## ✅ Gunakan Nama Variabel yang Jelas

**❌ Kurang jelas:**

```javascript
const x = document.getElementById("a");
const y = document.querySelector("p");
```

**✅ Lebih jelas:**

```javascript
const tombolLogin = document.getElementById("btn-login");
const pesanError = document.querySelector(".error-message");
```

## ✅ Gunakan textContent, Hindari innerHTML dari User Input

**❌ Rawan XSS:**

```javascript
const input = document.getElementById("input");
document.body.innerHTML += input.value; // Bahaya!
```

**✅ Aman:**

```javascript
const input = document.getElementById("input");
document.body.textContent = input.value; // Aman
```

---

# 12. Kesimpulan

Pada materi ini kita telah belajar tentang DOM JavaScript yang merupakan **fondasi JavaScript Front-End**:

✅ Apa itu DOM dan konsepnya  
✅ Struktur pohon (tree structure) HTML  
✅ Cara memilih elemen (selector)  
✅ Mengubah isi dan atribut elemen  
✅ Mengubah style CSS  
✅ Menambah dan menghapus elemen  
✅ Merespon event dan interaksi user  
✅ Membuat aplikasi interaktif sederhana  

> **Catatan Penting:** DOM adalah jantung interaktivitas web. Hampir semua framework modern seperti React, Vue, dan Angular pada dasarnya bekerja dengan memanipulasi DOM seperti yang telah kita pelajari.

**Langkah Berikutnya:**
- Praktik membuat lebih banyak proyek interaktif
- Pelajari tentang Async/Await untuk fetch data
- Eksplorasi framework seperti React (yang membuat manipulasi DOM lebih mudah)

---

# 13. Latihan

## Latihan 1: Ubah Warna Background

Buatlah halaman dengan beberapa tombol yang masing-masing mengubah warna background halaman ke warna berbeda.

**Persyaratan:**
* Buat 4 tombol dengan warna berbeda (misalnya: merah, biru, hijau, kuning)
* Saat tombol diklik, background berubah sesuai warna tombol
* Tampilkan teks di halaman yang menunjukkan warna apa yang sedang aktif
* Gunakan `addEventListener` untuk setiap tombol

**Hint:**
```javascript
tombol.addEventListener("click", function() {
  document.body.style.backgroundColor = "warna";
});
```

## Latihan 2: Show/Hide Password

Buatlah form login sederhana dengan fitur menampilkan/menyembunyikan password.

**Persyaratan:**
* Buat input type password
* Buat checkbox dengan label "Tampilkan Password"
* Saat checkbox dicentang, ubah input type menjadi `text`
* Saat checkbox tidak dicentang, ubah kembali menjadi `type` password
* Gunakan `getAttribute()` dan `setAttribute()`

**Hint:**
```javascript
if (input.getAttribute("type") === "password") {
  input.setAttribute("type", "text");
} else {
  input.setAttribute("type", "password");
}
```

## Latihan 3: Live Character Counter

Buatlah textarea dengan counter karakter yang update secara real-time.

**Persyaratan:**
* Buat elemen textarea
* Di bawahnya tampilkan counter: "Karakter: 0/100"
* Saat user mengetik, counter update otomatis
* Beri peringatan jika sudah mencapai 100 karakter
* Gunakan event `input` untuk mendeteksi perubahan

**Hint:**
```javascript
textarea.addEventListener("input", function() {
  jumlahKarakter.textContent = textarea.value.length;
});
```

## Latihan 4: Generate List Dinamis

Buatlah fitur untuk menambah item ke list secara dinamis.

**Persyaratan:**
* Buat input text dan tombol "Tambah Item"
* Saat tombol diklik, input ditambahkan ke list
* Validasi: jangan biarkan input kosong
* Kosongkan input setelah item ditambahkan
* Gunakan `createElement()` dan `appendChild()`

**HTML:**
```html
<input type="text" id="input-item" placeholder="Ketik item...">
<button id="btn-tambah">Tambah</button>
<ul id="list"></ul>
```

---

# 14. Tugas Mandiri

## Challenge: Image Gallery Interaktif

Buatlah galeri gambar sederhana dengan fitur navigasi dan kapasitas penuh.

### Persyaratan

Kamu akan menggabungkan seluruh materi DOM JavaScript dalam satu proyek.

### File yang Dibutuhkan

* `gallery.html` (Kerangka UI)
* `gallery.css` (Styling)
* `gallery.js` (Logika JavaScript)

### Alur Logika

**1. Data Gambar (Array of Objects)**

Buat array yang berisi data gambar:

```javascript
const gambar = [
  {
    id: 1,
    src: "gambar1.jpg",
    judul: "Pemandangan Pantai",
    deskripsi: "Pantai yang indah saat matahari terbenam"
  },
  {
    id: 2,
    src: "gambar2.jpg",
    judul: "Gunung Bersalju",
    deskripsi: "Puncak gunung yang tertutup salju"
  },
  {
    id: 3,
    src: "gambar3.jpg",
    judul: "Hutan Tropis",
    deskripsi: "Hutan yang lebat dan hijau"
  }
  // Tambah minimal 2 gambar lagi
];
```

**2. Variabel Tracking**

```javascript
let indexGambarSaat = 0; // Gambar yang sedang ditampilkan
```

**3. Fungsi Menampilkan Gambar**

```javascript
function tampilkanGambar(index) {
  // - Ambil gambar dari array berdasarkan index
  // - Update element img dengan src gambar
  // - Update judul dan deskripsi
  // - Update nomor halaman (contoh: "1 / 5")
}
```

**4. Fungsi Navigasi**

```javascript
function gambarBerikutnya() {
  // - Increment index
  // - Jika index >= panjang array, reset ke 0
  // - Panggil tampilkanGambar()
}

function gambarSebelumnya() {
  // - Decrement index
  // - Jika index < 0, set ke panjang array - 1
  // - Panggil tampilkanGambar()
}
```

**5. Event Listeners**

```javascript
// - Event listener untuk tombol "Next"
// - Event listener untuk tombol "Previous"
// - Event listener untuk keyboard arrows (bonus)
```

### Template HTML

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Gallery</title>
  <link rel="stylesheet" href="gallery.css">
</head>
<body>
  <div class="container">
    <h1>🖼️ Galeri Gambar</h1>
    
    <div class="gallery">
      <img id="gambar-utama" src="" alt="Galeri Gambar">
      
      <div class="info">
        <h2 id="judul-gambar"></h2>
        <p id="deskripsi-gambar"></p>
        <p id="nomor-halaman"></p>
      </div>
      
      <div class="controls">
        <button id="btn-sebelumnya">← Sebelumnya</button>
        <button id="btn-berikutnya">Berikutnya →</button>
      </div>
    </div>
  </div>

  <script src="gallery.js"></script>
</body>
</html>
```

### Template CSS

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 700px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: center;
  color: #667eea;
  margin-bottom: 30px;
}

.gallery {
  text-align: center;
}

#gambar-utama {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}

.info {
  margin-bottom: 25px;
}

#judul-gambar {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
}

#deskripsi-gambar {
  color: #666;
  margin-bottom: 10px;
  font-size: 0.95em;
}

#nomor-halaman {
  color: #999;
  font-size: 0.9em;
  font-style: italic;
}

.controls {
  display: flex;
  gap: 15px;
  justify-content: center;
}

button {
  padding: 12px 25px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  font-size: 1em;
}

button:hover {
  background: #5568d3;
}

button:active {
  transform: scale(0.98);
}
```

### Template JavaScript Lengkap

```javascript
// 1. Data gambar (Array of Objects)
const gambar = [
  {
    id: 1,
    src: "https://via.placeholder.com/600x400?text=Gambar+1",
    judul: "Pemandangan Indah",
    deskripsi: "Pemandangan alam yang menakjubkan"
  },
  {
    id: 2,
    src: "https://via.placeholder.com/600x400?text=Gambar+2",
    judul: "Sunrise",
    deskripsi: "Matahari terbit di pagi hari"
  },
  {
    id: 3,
    src: "https://via.placeholder.com/600x400?text=Gambar+3",
    judul: "Sunset",
    deskripsi: "Matahari terbenam di sore hari"
  },
  {
    id: 4,
    src: "https://via.placeholder.com/600x400?text=Gambar+4",
    judul: "Malam Berbintang",
    deskripsi: "Langit malam yang penuh dengan bintang"
  },
  {
    id: 5,
    src: "https://via.placeholder.com/600x400?text=Gambar+5",
    judul: "Alam Liar",
    deskripsi: "Keindahan alam liar yang mempesona"
  }
];

// 2. Pilih elemen
const gambarUtama = document.getElementById("gambar-utama");
const judulGambar = document.getElementById("judul-gambar");
const deskripsiGambar = document.getElementById("deskripsi-gambar");
const nomorHalaman = document.getElementById("nomor-halaman");
const btnSebelumnya = document.getElementById("btn-sebelumnya");
const btnBerikutnya = document.getElementById("btn-berikutnya");

// 3. Variabel untuk tracking gambar
let indexGambar = 0;

// 4. Fungsi tampilkan gambar
function tampilkanGambar(index) {
  const gambarSaat = gambar[index];
  
  gambarUtama.src = gambarSaat.src;
  gambarUtama.alt = gambarSaat.judul;
  judulGambar.textContent = gambarSaat.judul;
  deskripsiGambar.textContent = gambarSaat.deskripsi;
  nomorHalaman.textContent = `${index + 1} / ${gambar.length}`;
}

// 5. Fungsi gambar berikutnya
function gambarBerikutnya() {
  indexGambar++;
  if (indexGambar >= gambar.length) {
    indexGambar = 0; // Kembali ke awal
  }
  tampilkanGambar(indexGambar);
}

// 6. Fungsi gambar sebelumnya
function gambarSebelumnya() {
  indexGambar--;
  if (indexGambar < 0) {
    indexGambar = gambar.length - 1; // Ke akhir
  }
  tampilkanGambar(indexGambar);
}

// 7. Event listeners
btnBerikutnya.addEventListener("click", gambarBerikutnya);
btnSebelumnya.addEventListener("click", gambarSebelumnya);

// 8. Bonus: Navigasi keyboard (kiri-kanan)
document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowRight") {
    gambarBerikutnya();
  } else if (e.key === "ArrowLeft") {
    gambarSebelumnya();
  }
});

// 9. Tampilkan gambar pertama saat halaman dimuat
tampilkanGambar(indexGambar);
```

### Kriteria Penilaian

- [ ] Data gambar tersimpan dalam Array of Objects dengan struktur yang tepat
- [ ] Fungsi `tampilkanGambar()` berhasil menampilkan gambar, judul, dan deskripsi
- [ ] Tombol "Berikutnya" berfungsi dan looping ke awal saat mencapai akhir
- [ ] Tombol "Sebelumnya" berfungsi dan looping ke akhir saat mencapai awal
- [ ] Nomor halaman menampilkan posisi gambar saat ini dengan format "x / y"
- [ ] Desain halaman responsif dan menarik (di HP dan desktop)
- [ ] Kode terstruktur dengan baik dan penamaan variabel jelas
- [ ] Tidak ada error di console browser

### Bonus

- [ ] 🎯 Implementasi navigasi keyboard (arrow left/right)
- [ ] 🎨 Tambahkan transisi/animasi smooth saat ganti gambar
- [ ] ⌨️ Tambahkan indikator dot (●●●) di bawah gambar untuk navigasi cepat
- [ ] 🔄 Fitur auto-play gambar berubah setiap 5 detik
- [ ] ⬆️ Tombol zoom/enlarge untuk melihat gambar lebih besar

---

# 15. Referensi

* [MDN Web Docs - DOM Introduction](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
* [MDN Web Docs - addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
* [W3Schools - JavaScript DOM](https://www.w3schools.com/js/js_htmldom.asp)
* [W3Schools - DOM Events](https://www.w3schools.com/js/js_events.asp)
* [JavaScript.info - DOM Manipulation](https://javascript.info/dom-manipulation)
* [CSS-Tricks - JavaScript and the DOM](https://css-tricks.com/dom/)