# 1. Pengenalan dan Dasar-Dasar JavaScript

## Daftar Isi
1. Pengenalan dan Dasar-Dasar JavaScript
2. Persiapan Awal (Setup Project)
3. Variabel dan Tipe Data
4. Operator dan Logika
5. Perulangan (Loops)
6. Fungsi (Functions)
7. Struktur Data: Array dan Object
8. Pengenalan DOM
9. Contoh Implementasi: Sistem Cek Kelulusan Sederhana
10. Latihan (Practical Exercise)
11. Tugas Mandiri
12. Referensi
---

## Apa itu JavaScript?

JavaScript (JS) adalah bahasa pemrograman web yang membuat halaman website menjadi interaktif dan dinamis. Jika HTML adalah kerangka dan CSS adalah desain visual, maka JavaScript adalah "otak" atau "otot" yang memberikan fungsionalitas (seperti klik tombol, pop-up, kalkulasi, dll).

## 1. Sejarah JavaScript — Bahasa yang "Niatnya Kecil", Tapi Jadi Raja Web 

### Sebelum JavaScript Ada...

Dulu website itu statis banget. Ibarat brosur digital.

Klik ya cuma pindah halaman. Ga ada tombol interaktif, validasi form, animasi, notif realtime, atau hal-hal keren kayak sekarang.

Lalu muncul pertanyaan:

> "Gimana kalau website bisa *ngerespon* pengguna secara langsung?"

Dan di sinilah semuanya dimulai.

---

## 2. Tahun 1995 — JavaScript Lahir 

Brendan Eich bekerja di Netscape Communications, perusahaan pembuat browser terkenal bernama Netscape Navigator.

Netscape ingin membuat bahasa scripting ringan supaya website jadi lebih hidup dan interaktif.

Masalahnya?

Deadline-nya gila.

Brendan Eich cuma dikasih waktu:

### **10 hari.**

Dan anehnya... berhasil 

---

## 3. Timeline Perjalanan JavaScript 

### Tahun 1995 — Dibuat dalam 10 Hari

Awalnya JavaScript belum bernama JavaScript.

Urutannya:

```
Mocha → LiveScript → JavaScript
```

Kenapa akhirnya jadi "JavaScript"?

Karena saat itu bahasa Java lagi hype banget.

Jadi nama "JavaScript" dipilih biar ikut terkenal juga.

> **Trivia:** Marketing dulu ternyata sudah savage.

---

### Tahun 1996 — Microsoft Ikut Nimbrung 

Melihat JavaScript sukses, Microsoft bikin versi mereka sendiri:

#### JScript

Dipakai di browser Internet Explorer.

Masalah mulai muncul.

Kode yang jalan di Netscape... belum tentu jalan di Internet Explorer.

Developer saat itu rasanya kurang lebih:

```javascript
// jalan di Netscape :)
console.log("Yeay!");
```

```javascript
// error di Internet Explorer :')
console.log("Tidak jalan :(");
```

Inilah awal dari:

#### Browser War 

Perang browser dimulai, dan setiap browser punya versi JavaScript-nya sendiri.

---

### Tahun 1997 — ECMAScript Lahir 

Karena browser mulai berantem sendiri-sendiri, akhirnya JavaScript distandarisasi oleh:

**ECMA International**

Nama standar resminya:

#### ECMAScript

Tapi... semua orang tetap manggilnya JavaScript 

---

### Jadi Sebenernya:

| Nama | Artinya |
| --- | --- |
| **JavaScript** | Nama bahasa yang dipakai developer |
| **ECMAScript** | Standar resmi/specification-nya |

Ibaratnya:

> **JavaScript itu "motor"-nya**
> **ECMAScript itu "aturan jalan"-nya**

---

### Tahun 2009 — Node.js Mengubah Segalanya 

Sebelum tahun 2009:

```
JavaScript = cuma buat browser
```

Lalu muncul Ryan Dahl dengan:

#### Node.js

Dan DUARRR

JavaScript sekarang bisa jalan di:

* Server
* Backend
* Database tools
* API
* CLI
* Bahkan aplikasi desktop & mobile

Developer jadi bisa:

```
Frontend? JavaScript.
Backend? JavaScript.
```

Satu bahasa untuk banyak hal.

---

### Tahun 2015 — ES6 Datang, Developer Bahagia 🥹

Tahun 2015 jadi titik besar modernisasi JavaScript.

Muncul:

#### ES6 / ECMAScript 2015

Fitur-fitur baru mulai bermunculan:

```javascript
let
const
arrow function =>
class
template literal
destructuring
```

**Contoh sebelum ES6:**

```javascript
var nama = "PURWA";

function halo() {
  console.log("Halo " + nama);
}
```

**Sesudah ES6:**

```javascript
const nama = "PURWA";

const halo = () => {
  console.log(`Halo ${nama}`);
};
```

Lebih bersih. Lebih modern. Lebih enak dibaca.

---

## 4. Kenapa JavaScript Bisa Bertahan Sampai Sekarang?

Karena JavaScript terus berkembang.

Dari bahasa kecil yang dibuat buru-buru... jadi bahasa yang dipakai untuk:

* Website
* Backend
* Mobile App
* Game
* AI tools
* Bahkan IoT

Dan hampir semua browser di dunia punya JavaScript engine sendiri.

---

## 5. Fun Facts JavaScript 

### Fakta 1: JavaScript dan Java itu Beda Total

Walau namanya mirip, mereka bukan saudara dekat 

JavaScript dirancang untuk browser dan berfokus pada fungsionalitas front-end, sementara Java adalah bahasa general-purpose untuk berbagai keperluan.

### Fakta 2: JavaScript Dibuat Super Cepat

Bahasa yang sekarang dipakai miliaran website... dibuat cuma dalam 10 hari.

Padahal banyak bahasa pemrograman modern yang membutuhkan waktu berbulan-bulan atau bertahun-tahun untuk dirancang.

### Fakta 3: Hampir Semua Website Modern Pakai JavaScript

Termasuk:

* YouTube
* Instagram
* Netflix
* TikTok Web
* Facebook
* dan banyak lagi.

Hampir mustahil menemukan website modern yang tidak menggunakan JavaScript.

---

## 6. Penutup terkait sejarah

JavaScript awalnya cuma dibuat untuk "nambah interaksi kecil" di browser.

Tapi sekarang?

Ia berubah jadi salah satu bahasa pemrograman paling berpengaruh di dunia web.

> **Dari script sederhana... jadi fondasi internet modern 🌐**
---

# 2. Persiapan Awal (Setup Project)

Sebelum mulai menulis kode, kita perlu menyiapkan "kanvas" kerjanya agar hasil dari JavaScript bisa langsung terlihat di halaman web.

1. Buat sebuah folder baru di komputermu, beri nama `Belajar-JS`.
2. Buka folder tersebut menggunakan Code Editor (seperti Visual Studio Code).
3. Buat dua file baru di dalam folder tersebut:
   - `index.html` *(Sebagai kerangka tampilan)*
   - `script.js` *(Sebagai otak logikanya)*

Di dalam file `index.html`, tuliskan kode berikut. Kita menyiapkan sebuah kotak khusus yaitu `<div id="output"></div>` yang akan diisi otomatis oleh JavaScript kita nanti.

## Isi dari file `index.html`

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Belajar JS Dasar</title>
  <style>
    /* Sedikit styling agar rapi */
    body { font-family: Arial, sans-serif; padding: 20px; }
    #output { background-color: #f4f4f4; padding: 15px; border-radius: 5px; line-height: 1.6; }
  </style>
</head>
<body>
  <h1>Hasil Belajar JavaScript:</h1>
  
  <div id="output"></div>

  <script src="script.js"></script>
</body>
</html>

```

Mulai dari sini, semua kode JavaScript akan kita tulis di dalam file script.js.


# 3. Variabel dan Tipe Data

## A. Variable
Variabel adalah `"wadah"` untuk menyimpan nilai data. Dalam JavaScript, kita mendeklarasikan variabel menggunakan kata kunci `let`, `const`, atau `var`.

- `let`: Digunakan untuk nilai yang bisa diubah-ubah nantinya.
- `const`: Digunakan untuk nilai tetap yang tidak boleh diubah.
- `var`: Cara lama (sebelum standar ES6 modern), cakupan fungsinya lebih luas dan kini jarang digunakan.

JavaScript secara otomatis mengenali tipe data saat nilai dimasukkan (dinamis). Tipe data ini menentukan jenis nilai yang disimpan dan dibagi menjadi dua kategori utama.

untuk penulisan variable umumnya bisa dengan cara:
- camelcase (const `namaSaya`)
- uppercase (const `NAMASAYA`)
- snakecase (const `nama_saya`) (kek di python)

> NOTE: jangan membuat nama variable sama seperti keyword yang ada di javaScript atau pun angka diawal kata, di spaci jangan pokoknya (const nama saya)

## B. Tipe Data
Tipe data dibagi menjadi 2, yaitu:

### B.1 Tipe Data Primitif
Data tunggal yang sederhana.
1. `String`: Teks yang diapit tanda kutip. (Contoh: `"Halo MasPur"` / `'Halo MasPur`)
2. `Number`: Angka, baik desimal maupun bilangan bulat. (Contoh:  `15000.50, 25`)
3. `Boolean`: Nilai logika, hanya berisi `true (benar)` atau `false (salah)`.
4. `Undefined`: Variabel yang sudah dibuat tapi belum diberikan nilai.
5. `Null`: Ketiadaan nilai yang diatur secara sengaja.
6. `BigInt`: Angka sangat besar yang melebihi batas tipe Number. (Contoh: `1234567890n`)
7. `Symbol`: Nilai unik yang sering digunakan sebagai kunci properti objek tingkat lanjut.

### B.2 Tipe Data Object
Kumpulan data kompleks yang bisa menyimpan banyak nilai sekaligus.
1. `Object`: Kumpulan pasangan `"kunci"` dan `"nilai"`. (Contoh: biodata siswa).
2. `Array`: Daftar data terurut yang dimulai dari urutan (indeks) ke-0.

## Contoh Implementasi Variabel & Tipe Data di Layar
Agar kita bisa melihat isi variabel ini secara langsung, kita akan menampilkannya ke dalam kotak 
``` html
<div id="output"></div> 
```
yang sudah kita siapkan di file index.html.

Tulis kode berikut di dalam file script.js:

```js
// 1. DEKLARASI VARIABEL & TIPE DATA
let namaSiswa = "Budi";         // String
const umur = 25;                // Number
let isLogin = true;             // Boolean
let status;                     // Undefined
let dataKosong = null;          // Null

// Tipe Data Objek
let profil = { 
    nama: "Purwa", 
    kota: "Bandung" 
}; 

// Tipe Data Array
let daftarDIvisi = ["Hardware", "Software", "Game"];

// 2. MENANGKAP ELEMEN HTML
const kotakOutput = document.getElementById("output");

// 3. MERANGKAI TEKS TAMPILAN
// Kita menggunakan += untuk menyambung teks baris demi baris
let teksTampilan = "<h3>Mengenal Tipe Data:</h3>";

teksTampilan += "<ul>";
teksTampilan += "<li><b>String:</b> " + namaSiswa + "</li>";
teksTampilan += "<li><b>Number:</b> " + umur + "</li>";
teksTampilan += "<li><b>Boolean:</b> " + isLogin + "</li>";
teksTampilan += "<li><b>Undefined:</b> " + status + "</li>";
teksTampilan += "<li><b>Null:</b> " + dataKosong + "</li>";
teksTampilan += "</ul>";

teksTampilan += "<h3>Mengenal Objek & Array:</h3>";
teksTampilan += "<ul>";
teksTampilan += "<li><b>Kota dari Object profil:</b> " + profil.kota + "</li>";
teksTampilan += "<li><b>Divisi urutan ke-0 dari Array:</b> " + daftarDIvisi[0] + "</li>";
teksTampilan += "<li><b>Divisi urutan ke-1 dari Array:</b> " + daftarDIvisi[1] + "</li>";
teksTampilan += "</ul>";

// 4. MENCETAK KE HALAMAN WEB
kotakOutput.innerHTML = teksTampilan;
```
# 4. Operator dan Logika (Pengondisian)
Dalam JavaScript, operator digunakan untuk memanipulasi nilai (seperti menghitung atau membandingkan), sedangkan logika (pengondisian) digunakan untuk mengatur alur keputusan program agar website bisa bertindak sesuai situasi.

## 1. Jenis-jenis Operator
### A. Operator Aritmatika 
Digunakan untuk melakukan perhitungan standar.

| Operator | Fungsi                          | Contoh         |
| -------- | ------------------------------- | -------------- |
| `+`      | Penjumlahan / Penggabungan teks | `5 + 3` → `8`  |
| `-`      | Pengurangan                     | `10 - 2` → `8` |
| `*`      | Perkalian                       | `4 * 2` → `8`  |
| `/`      | Pembagian                       | `16 / 2` → `8` |
| `%`      | Sisa Bagi (Modulus)             | `10 % 3` → `1` |
| `**`     | Perpangkatan                    | `2 ** 3` → `8` |

## B. Operator Penugasan (Assignment)
Digunakan untuk memberikan atau memperbarui nilai suatu variabel.
- `=` (Mengisi nilai)
- `+=` (Tambah dan isi: x += 5 sama dengan x = x + 5)
- `-=` (Kurang dan isi)

## C. Operator Perbandingan
Digunakan untuk membandingkan dua nilai dan selalu menghasilkan tipe data Boolean (`true` atau `false`).
- `==` (Sama nilai, tanpa mengecek tipe data)
- `===` (Sama nilai dan sama tipe data -> Sangat Direkomendasikan)
- `!=` (Tidak sama nilai)
- `!==` (Tidak sama nilai atau tidak sama tipe data)
- `>, <, >=, <=` (Lebih besar, lebih kecil, lebih besar sama dengan, lebih kecil sama dengan)

## D. Operator Logika
Digunakan untuk menggabungkan beberapa kondisi pengecekan sekaligus.
- `&& (AND)`: Menghasilkan true hanya jika SEMUA kondisi benar.
- `|| (OR)`: Menghasilkan true jika SALAH SATU kondisi benar.
- `! (NOT)`: Membalikkan nilai (true jadi false, dan sebaliknya).

## 2. Logika dan Pengondisian (Control Flow)
Di sinilah `JavaScript` bertindak sebagai `"otak"` dengan mengambil keputusan menggunakan `if`, `else`, dan `switch`.

## A. Struktur if, else if, dan else
Mengecek satu atau beberapa kondisi secara berurutan. Jika kondisi pertama salah, ia akan mengecek kondisi di bawahnya.

## B. Operator Ternary
Cara singkat menulis `if-else` sederhana dalam satu baris menggunakan simbol `?` (jika benar) dan `:` (jika salah).

## C. Struktur switch
Alternatif dari `if-else` yang sangat rapi jika kita ingin mengecek banyak kondisi pada satu nilai spesifik yang sama (misalnya: mengecek warna lampu lalu lintas).

## Contoh Implementasi di Halaman Web
Mari kita gabungkan operator matematika, logika, dan switch ke dalam satu program. Kita akan mencetak hasilnya langsung ke dalam 
``` html 
<div id="output"></div>
```
di file HTML kita.

Tulis kode berikut di dalam file script.js:

```js
// 1. KITA TANGKAP DULU KOTAK HTML-NYA
const kotakOutput = document.getElementById("output");
let teksHTML = ""; // Variabel kosong untuk menampung teks

// 2. OPERATOR ARITMATIKA & PENUGASAN
let skor = 10;
skor += 5; // Menambah 5 ke dalam skor (menjadi 15)
let sisaBagi = 10 % 3; // Hasilnya 1

teksHTML += "<h3>1. Hasil Operator:</h3>";
teksHTML += "<p>Skor akhir: <b>" + skor + "</b></p>";
teksHTML += "<p>Sisa bagi 10 dengan 3: <b>" + sisaBagi + "</b></p>";

// 3. OPERATOR LOGIKA & IF-ELSE
let umur = 18;
let punyaSIM = true;
// Harus punya SIM AND (&&) umur minimal 17
let bolehMenyetir = punyaSIM && (umur >= 17); 

teksHTML += "<h3>2. Cek Izin Mengemudi:</h3>";
if (bolehMenyetir === true) {
    teksHTML += "<p>Status: <span style='color:green;'>Boleh mengemudi</span></p>";
} else {
    teksHTML += "<p>Status: <span style='color:red;'>Tidak boleh mengemudi</span></p>";
}

// 4. OPERATOR TERNARY
let kategoriUmur = (umur >= 18) ? "Dewasa" : "Anak-anak";
teksHTML += "<p>Kategori Umur: <b>" + kategoriUmur + "</b></p>";

// 5. PENGONDISIAN SWITCH
let warnaLampu = "kuning";

teksHTML += "<h3>3. Status Lampu Lalu Lintas (" + warnaLampu + "):</h3>";
switch (warnaLampu) {
    case "merah":
        teksHTML += "<p>Instruksi: <b>Berhenti!</b></p>";
        break; // Break menghentikan pengecekan jika kondisi sudah terpenuhi
    case "kuning":
        teksHTML += "<p>Instruksi: <b>Bersiap!</b></p>";
        break;
    case "hijau":
        teksHTML += "<p>Instruksi: <b>Jalan!</b></p>";
        break;
    default:
        teksHTML += "<p>Instruksi: Lampu sedang rusak.</p>";
}

// 6. TAMPILKAN SEMUANYA KE LAYAR
kotakOutput.innerHTML = teksHTML;
```

# 5. Pengulangan (looping)

Bayangkan kalian harus mencetak kalimat "Halo MasPur" sebanyak 100 kali. Menulisnya satu per satu tentu akan sangat melelahkan (lagian juga ngapain yak). Di sinilah Perulangan (Loops) berfungsi: menyuruh komputer melakukan tugas yang berulang-ulang secara otomatis.

## 1. Perulangan for
Digunakan saat kamu sudah tahu pasti berapa kali kode harus diulang.

Struktur: `for (inisialisasi; kondisi; perubahan)`

## 2. Perulangan while
Digunakan ketika jumlah perulangan belum diketahui pasti, dan bergantung pada suatu kondisi logika. Selama kondisi bernilai true, kode akan terus berulang. Jangan lupa membuat batasan agar perulangan tidak berjalan selamanya (infinite loop)!

## 3. Perulangan do...while
Sangat mirip dengan while, tetapi bedanya: kode di dalam blok pasti dijalankan minimal satu kali di awal, baru kemudian sistem mengecek kondisinya untuk memutuskan apakah akan lanjut mengulang atau berhenti.

## 4. Perulangan Khusus Data Koleksi (Array & Object)
JavaScript menyediakan cara ringkas untuk membongkar dan membaca data dalam jumlah banyak:

- `for...of`: Digunakan untuk mengambil nilai (value) dari dalam daftar Array.
- `for...in`: Digunakan untuk mengambil kunci (key/properti) dari sebuah Object.

## 5. Kontrol Perulangan: break dan continue
kalian bisa mengendalikan alur perulangan di tengah jalan menggunakan dua kata kunci ini:
- `break`: Menghentikan paksa seluruh proses perulangan saat itu juga, meskipun perulangan belum selesai.
- `continue`: Melewati sisa kode di perulangan saat ini dan langsung melompat ke urutan berikutnya.

## Contoh Implementasi di Halaman Web

Mari kita coba semua jenis perulangan di atas dan tampilkan hasilnya langsung ke dalam `<div id="output"></div>` di halaman web kita.

Tulis kode berikut di dalam file script.js:

```js
// 1. TANGKAP KOTAK HTML & SIAPKAN WADAH TEKS
const kotakOutput = document.getElementById("output");
let teksHTML = "";

// --- 1. PERULANGAN FOR ---
teksHTML += "<h3>1. Hasil Perulangan for:</h3><ul>";
for (let i = 1; i <= 3; i++) {
    teksHTML += "<li>Perulangan ke-" + i + "</li>";
}
teksHTML += "</ul>";


// --- 2. PERULANGAN WHILE ---
teksHTML += "<h3>2. Hasil Perulangan while:</h3><ul>";
let energi = 3;
while (energi > 0) {
    teksHTML += "<li>Berjalan... (Sisa energi: " + energi + ")</li>";
    energi--; // Kurangi energi setiap jalan agar tidak loop selamanya
}
teksHTML += "</ul>";


// --- 3. PERULANGAN DO...WHILE ---
teksHTML += "<h3>3. Hasil Perulangan do...while:</h3><ul>";
let pilihan = false;
do {
    teksHTML += "<li>Menu ini muncul minimal sekali, meski kondisi false.</li>";
} while (pilihan === true);
teksHTML += "</ul>";


// --- 4. PERULANGAN ARRAY & OBJECT ---
teksHTML += "<h3>4. Membongkar Array dan Object:</h3>";

const buah = ["Apel", "Jeruk", "Mangga"];
teksHTML += "<p><b>Isi Array (for...of):</b></p><ul>";
for (const item of buah) {
    teksHTML += "<li>" + item + "</li>";
}
teksHTML += "</ul>";

const user = { nama: "Budi", umur: 20, kota: "Bandung" };
teksHTML += "<p><b>Isi Object (for...in):</b></p><ul>";
for (const kunci in user) {
    teksHTML += "<li>" + kunci + ": " + user[kunci] + "</li>";
}
teksHTML += "</ul>";


// --- 5. KONTROL BREAK & CONTINUE ---
teksHTML += "<h3>5. Uji Coba break dan continue:</h3><ul>";
for (let i = 1; i <= 5; i++) {
    if (i === 2) {
        teksHTML += "<li style='color:orange;'>Angka 2 dilewati (continue)</li>";
        continue;
    }
    if (i === 4) {
        teksHTML += "<li style='color:red;'>Berhenti total di angka 4 (break)</li>";
        break;
    }
    teksHTML += "<li>Mencetak angka: " + i + "</li>";
}
teksHTML += "</ul>";

// 2. CETAK SEMUA TEKS KE LAYAR
kotakOutput.innerHTML = teksHTML;
```

# 6. Fungsi (Functions)

Jika kamu memiliki sebuah instruksi panjang yang harus digunakan berkali-kali di berbagai tempat, menuliskannya berulang-ulang tentu tidak efisien. Di sinilah Fungsi berperan. Fungsi adalah blok kode yang kita buat sekali, lalu bisa kita panggil berkali-kali kapan pun dibutuhkan.

## 1. Struktur Dasar Fungsi

Untuk membuat fungsi, gunakan kata kunci `function`, diikuti nama fungsi, kurung biasa `()`, dan blok kode di dalam kurung kurawal `{}`. Fungsi yang sudah dibuat tidak akan berjalan otomatis sampai kamu "memanggilnya" menggunakan namanya.

## 2. Parameter dan Argumen

Fungsi bisa menerima data masukan dari luar agar kerjanya lebih dinamis.

* **Parameter**: Variabel penampung yang ditulis saat fungsi dibuat.
* **Argumen**: Nilai asli yang dikirimkan saat fungsi dipanggil.

## 3. Mengembalikan Nilai (`return`)

Sebuah fungsi bisa memproses data dan mengirimkan hasil akhirnya kembali menggunakan kata kunci `return`. Saat JavaScript membaca kata `return`, fungsi tersebut akan langsung berhenti bekerja dan mengeluarkan nilai tersebut.

## 4. Tiga Cara Menulis Fungsi

Di JavaScript modern, ada tiga gaya penulisan fungsi:

1. **Function Declaration (Standar)**: Menggunakan kata kunci `function` di awal.
2. **Function Expression**: Fungsi yang disimpan ke dalam sebuah variabel (`const` atau `let`).
3. **Arrow Function**: Cara modern (ES6) yang lebih ringkas menggunakan tanda panah `=>`. Sangat populer saat ini!

## 5. Default Parameter

Kadang pengguna lupa memasukkan argumen. Kita bisa memberikan nilai cadangan (default) yang akan otomatis dipakai jika argumen dibiarkan kosong.

## Contoh Implementasi di Halaman Web

Mari kita coba semua jenis fungsi di atas. Alih-alih mencetaknya ke console, kita akan membuat fungsi-fungsi ini mengembalikan teks yang kemudian kita rangkai dan tampilkan ke dalam `<div id="output"></div>`.

Tulis kode berikut di dalam file `script.js`:

```js
// TANGKAP KOTAK HTML & SIAPKAN WADAH TEKS
const kotakOutput = document.getElementById("output");
let teksHTML = "";

// --- 1 & 2. FUNGSI DASAR, PARAMETER, DAN ARGUMEN ---
// Membuat fungsi
function sapaUser(nama) {
    return "Halo, " + nama + "! Selamat belajar JavaScript.";
}

teksHTML += "<h3>1. Hasil Pemanggilan Fungsi sapaUser:</h3>";
// Memanggil fungsi dengan argumen berbeda
teksHTML += "<p>" + sapaUser("Budi") + "</p>";
teksHTML += "<p>" + sapaUser("Siti") + "</p>";


// --- 3. MENGEMBALIKAN NILAI (RETURN) ---
function hitungLuasPersegi(sisi) {
    let luas = sisi * sisi;
    return luas; // Mengirimkan hasil keluar
}

teksHTML += "<h3>2. Hasil Kalkulasi Return:</h3>";
let hasilLuas = hitungLuasPersegi(5); // Menyimpan hasil return ke variabel
teksHTML += "<p>Luas persegi dengan sisi 5 adalah: <b>" + hasilLuas + "</b></p>";


// --- 4. TIGA CARA MENULIS FUNGSI ---
// Ini adalah Arrow Function yang sangat ringkas
const tambah = (a, b) => a + b; 

teksHTML += "<h3>3. Hasil Arrow Function:</h3>";
teksHTML += "<p>Hasil 10 + 15 adalah: <b>" + tambah(10, 15) + "</b></p>";


// --- 5. DEFAULT PARAMETER ---
// Jika 'nilaiPangkat' tidak diisi, otomatis menggunakan angka 2
function hitungPangkat(angka, nilaiPangkat = 2) {
    return angka ** nilaiPangkat;
}

teksHTML += "<h3>4. Hasil Default Parameter:</h3>";
// Memanggil dengan 1 argumen (nilaiPangkat otomatis 2)
teksHTML += "<p>5 pangkat default (2) = <b>" + hitungPangkat(5) + "</b></p>";
// Memanggil dengan 2 argumen (default ditimpa menjadi 3)
teksHTML += "<p>5 pangkat 3 = <b>" + hitungPangkat(5, 3) + "</b></p>";


// CETAK SEMUA TEKS KE LAYAR HTML
kotakOutput.innerHTML = teksHTML;
```

# 7. Struktur Data: Array dan Object

Saat aplikasi yang kita buat mulai membesar, menyimpan satu per satu data di variabel terpisah (seperti nama1, nama2, nama3) tidak lagi efisien. JavaScript menyediakan dua struktur data utama untuk menampung banyak nilai sekaligus: Array dan Object.

## Perbedaan Utama: Array vs Object

| Karakteristik | Array (Koleksi Terurut) | Object (Koleksi Terkunci) |
|---|---|---|
| **Definisi** | Menyimpan daftar item dalam urutan posisi tertentu. | Menyimpan data entitas berdasarkan kata kunci (key). |
| **Akses Data** | Menggunakan indeks angka (dimulai dari 0). | Menggunakan nama properti berbentuk string (key). |
| **Tujuan Utama** | Manipulasi daftar/list (contoh: daftar nama peserta). | Menggambarkan satu wujud nyata (contoh: profil pengguna). |
| **Sintaksis** | Kurung siku [ ... ] | Kurung kurawal { ... } |

## 1. Struktur Data: Array

Array dirancang untuk menampung banyak nilai di dalam satu nama variabel. Elemen di dalam Array dapat berupa tipe data apa saja, termasuk campuran angka, string, maupun boolean.

### Metode Manipulasi Array (Built-in Methods):

Mesin JavaScript telah menyediakan alat bantu khusus untuk mengolah data berurutan:

* `.push(item)`: Menambahkan elemen baru ke akhir array.
* `.pop()`: Menghapus elemen terakhir dari array.
* `.unshift(item)`: Menambahkan elemen baru ke awal array.
* `.shift()`: Menghapus elemen pertama di awal array.
* `.length`: Mengetahui jumlah total elemen di dalam array.

## 2. Struktur Data: Object

Object digunakan untuk menyimpan data yang lebih kompleks dengan format pasangan kunci: nilai (key: value). Ibarat lemari kabinet, setiap dokumen disimpan di laci bertanda (key) khusus agar mudah dicari.

* **Dot Notation**: Cara mengakses menggunakan titik (contoh: user.nama). Paling sering digunakan.
* **Bracket Notation**: Cara mengakses menggunakan kurung siku (contoh: user["status kerja"]). Wajib digunakan jika nama kunci memiliki spasi.
* **Menghapus Data**: Gunakan kata kunci delete untuk membuang properti secara permanen (contoh: delete user.lokasi).

## 3. Kombinasi Tingkat Lanjut: Array of Objects

Dalam realitas pemrograman web, kedua struktur ini hampir selalu digabungkan untuk mengelola data dari server atau database. Format ini menampung daftar data (Array) yang di dalamnya berisi banyak entitas data detail (Object).

## Contoh Implementasi di Halaman Web

Mari kita terapkan semua manipulasi Array dan Object ini. Kita akan menampilkan perubahannya secara langsung ke dalam `<div id="output"></div>` di halaman web kita.

Tulis kode berikut di dalam file `script.js`:

```js
// TANGKAP KOTAK HTML & SIAPKAN WADAH TEKS
const kotakOutput = document.getElementById("output");
let teksHTML = "";

// --- 1. MANIPULASI ARRAY ---
// Membuat array daftar divisi
let daftarDivisi = ["Web Dev", "Mobile Dev", "Data Science"];

teksHTML += "<h3>1. Manipulasi Array:</h3>";
teksHTML += "<p><b>Data Awal:</b> " + daftarDivisi.join(", ") + "</p>";

// Menambahkan elemen ke akhir
daftarDivisi.push("UI/UX");
teksHTML += "<p><b>Setelah push('UI/UX'):</b> " + daftarDivisi.join(", ") + "</p>";

// Menghapus elemen pertama
daftarDivisi.shift();
teksHTML += "<p><b>Setelah shift() [Web Dev terhapus]:</b> " + daftarDivisi.join(", ") + "</p>";
teksHTML += "<p><b>Jumlah Divisi (.length):</b> " + daftarDivisi.length + "</p>";


// --- 2. MANIPULASI OBJECT ---
// Membuat object profil organisasi
let profilOrganisasi = {
    nama: "UKM Oxigen",
    kampus: "Universitas Teknologi Bandung",
    "tahun berdiri": 2024
};

teksHTML += "<h3>2. Manipulasi Object:</h3>";
// Mengakses dengan Dot Notation dan Bracket Notation
teksHTML += "<p><b>Nama Organisasi:</b> " + profilOrganisasi.nama + "</p>";
teksHTML += "<p><b>Tahun Berdiri:</b> " + profilOrganisasi["tahun berdiri"] + "</p>";

// Menambah properti baru
profilOrganisasi.fokus = "Teknologi & Pemrograman";
// Menghapus properti
delete profilOrganisasi.kampus; 

teksHTML += "<p><b>Fokus Baru:</b> " + profilOrganisasi.fokus + "</p>";
teksHTML += "<p><b>Cek Kampus (setelah di-delete):</b> " + profilOrganisasi.kampus + " <i>(Undefined)</i></p>";


// --- 3. ARRAY OF OBJECTS ---
// Membuat daftar kepengurusan dalam bentuk Array of Objects
const daftarPengurus = [
    { id: 1, nama: "Sulastian", jabatan: "Ketua" },
    { id: 2, nama: "Gita Aulia", jabatan: "Wakil Ketua" },
    { id: 3, nama: "Andrian", jabatan: "Mentor" }
];

teksHTML += "<h3>3. Array of Objects (Daftar Pengurus):</h3><ul>";

// Menggabungkan dengan materi Perulangan (Bab 5)
for (let i = 0; i < daftarPengurus.length; i++) {
    let orang = daftarPengurus[i];
    teksHTML += "<li>" + orang.nama + " (Jabatan: " + orang.jabatan + ")</li>";
}
teksHTML += "</ul>";


// CETAK SEMUA TEKS KE LAYAR HTML
kotakOutput.innerHTML = teksHTML;
```
# 8. Pengenalan DOM (Document Object Model)
Sejak bab 3, kita sebenarnya sudah diam-diam menggunakan DOM. DOM adalah jembatan yang memungkinkan JavaScript "berbicara" dan mengubah isi file HTML secara langsung tanpa perlu me-refresh halaman web.

Dua perintah DOM yang paling sering kita gunakan sejauh ini adalah:
1. `document.getElementById("nama_id")`: Memerintahkan JavaScript untuk mencari elemen HTML yang memiliki ID tertentu (misalnya kotak wadah kita).
2. `.innerHTML`: Memerintahkan JavaScript untuk menyisipkan teks atau tag HTML baru ke dalam elemen yang sudah ditangkap tersebut.

## Contoh Sederhana:

```JavaScript
// 1. JS mencari elemen dengan id="pesan" di HTML
const kotakPesan = document.getElementById("pesan");

// 2. JS mengubah isi di dalam elemen tersebut
kotakPesan.innerHTML = "<b>Halo! Teks ini muncul berkat DOM!</b>";
```

Hanya dengan dua baris kode ini, kita bisa membuat halaman web yang tadinya kosong menjadi hidup dan dinamis!
# 9. Contoh Implementasi: Sistem Cek Kelulusan Sederhana
Mari gabungkan semua materi dari Bab 3 hingga Bab 8. Kita akan membuat sebuah mini-project yang menyimpan data beberapa peserta, mengecek apakah mereka lulus atau tidak menggunakan logika, dan menampilkannya di halaman web menggunakan DOM.

Tulis kode ini di dalam `script.js` kita:

```js
// 1. VARIABEL & STRUKTUR DATA (Array berisi Object)
const dataPeserta = [
    { nama: "Andrian", nilai: 85 },
    { nama: "Purwa", nilai: 60 },
    { nama: "Ahmad", nilai: 90 }
];

// 2. FUNGSI & LOGIKA (Mengecek status kelulusan)
function cekStatus(nilai) {
    if (nilai >= 75) {
        return "Lulus";
    } else {
        return "Remedial";
    }
}

// 3. PENGHUNI DOM (Menangkap kotak dari HTML)
const kotakOutput = document.getElementById("output");

// Variabel penampung teks HTML yang akan dicetak
let teksHTML = "<h3>Daftar Hasil Ujian:</h3><ul>";

// 4. PERULANGAN (Membaca data peserta satu per satu)
for (let i = 0; i < dataPeserta.length; i++) {
    let peserta = dataPeserta[i];
    
    // Panggil fungsi untuk dapatkan status
    let statusKelulusan = cekStatus(peserta.nilai); 
    
    // Rangkai teksnya
    teksHTML += "<li>" + peserta.nama + " (Nilai: " + peserta.nilai + ") - Status: <b>" + statusKelulusan + "</b></li>";
}

teksHTML += "</ul>"; // Menutup tag list HTML

// 5. TAMPILKAN KE LAYAR (Mengubah HTML)
kotakOutput.innerHTML = teksHTML;
```

# 10. Latihan

## Latihan 1: Kalkulator Sederhana (Variabel, Operator, dan Fungsi)

Buatlah logika kalkulator sederhana menggunakan JavaScript:

* Buat fungsi `hitung(angka1, angka2, operator)`.
* Gunakan struktur `switch` atau `if-else` untuk mengecek operator (`+`, `-`, `*`, `/`).
* Kembalikan (return) hasil perhitungannya.
* Panggil fungsi tersebut dan cetak hasilnya ke layar menggunakan DOM.

## Latihan 2: Halaman Profil Pengguna (Object, Array, Loop, dan DOM)

Buat halaman yang menampilkan data diri pengguna secara dinamis menggunakan JavaScript.

* Buat Object `user` berisi: `nama` (String), `umur` (Number), dan `hobi` (Array berisi 3 hobi).
* Buat Fungsi `cekKategoriUmur` yang mengembalikan `"Dewasa"` jika umur >= 18, dan `"Remaja/Anak"` jika di bawahnya.
* Gunakan perulangan `for` untuk mencetak list hobi.

### Template File `index.html`

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Latihan Profil JS</title>
</head>
<body>
    <h1>Profil Pengguna</h1>
    <!-- JavaScript akan mengisi kotak di bawah ini -->
    <div id="latihan-profil"></div>

    <script src="script.js"></script>
</body>
</html>
```

### Template File `script.js`

```javascript
// 1. Tangkap elemen DOM
const kotakProfil = document.getElementById("latihan-profil");

// 2. Buat Object user
// TODO: Buat object user (nama, umur, hobi)

// 3. Buat Fungsi cek umur
// TODO: Buat fungsi cekKategoriUmur(umur) dengan if-else

// 4. Rangkai teks HTML
let teks = "";
// TODO: Tambahkan nama ke variabel teks
// TODO: Panggil fungsi cek umur dan tambahkan hasilnya ke teks
// TODO: Buat perulangan for untuk merangkai Array hobi menjadi tag <li>

// 5. Cetak ke HTML
// TODO: Masukkan variabel teks ke dalam kotakProfil.innerHTML
```

---

# 11. Tugas Mandiri

## Challenge: Aplikasi Mini Kasir (Struk Belanja)

Buatlah sistem logika untuk menghitung total belanjaan pelanggan dan mencetak struk belanja ke halaman web. Kamu perlu menggabungkan seluruh materi dari Bab 3 hingga Bab 8.

### Persyaratan File

* `kasir.html` (Kerangka UI dan wadah DOM)
* `kasir.js` (Otak logika program)

### Alur Logika (Tulis di `kasir.js`)

* **Data**: Buat Array of Objects bernama `keranjang`. Isi dengan minimal 3 barang (tiap barang memiliki `namaBarang`, `harga`, dan `jumlahBeli`).
* **Fungsi**: Buat fungsi `hitungSubtotal(harga, jumlah)` yang me-return hasil kali harga dan jumlah.
* **Proses**: Siapkan variabel `totalBelanja = 0`. Gunakan perulangan (`for`) untuk membaca isi keranjang, panggil fungsi subtotal, dan tambahkan hasilnya ke `totalBelanja`.
* **Pengondisian**: Jika `totalBelanja` lebih dari Rp100.000, berikan pesan string `"Selamat! Anda dapat voucher diskon!"`. Jika tidak, `"Terima kasih sudah berbelanja."`.
* **Tampilan**: Rangkai semuanya menggunakan tag HTML (`<ul>`, `<li>`, `<b>`) di dalam variabel string, lalu cetak menggunakan `.innerHTML`.

### Kriteria Penilaian

- [ ] Berhasil membuat data menggunakan Array of Objects dengan struktur yang benar.
- [ ] Fungsi `hitungSubtotal` berjalan dan mengembalikan nilai dengan tepat.
- [ ] Perulangan berhasil membaca seluruh barang di dalam array tanpa error.
- [ ] Logika `if-else` berhasil menentukan pesan diskon berdasarkan total belanja.
- [ ] Hasil akhir tercetak di halaman HTML (bukan di console).
- [ ] Kode rapi, terstruktur, dan menggunakan penamaan variabel yang jelas.

### Bonus

- [ ] Gunakan AI (seperti ChatGPT atau Gemini) untuk membuatkan file CSS yang mempercantik tampilan struk belanjaanmu. (Prompt hint: "Buatkan CSS modern berbentuk seperti struk kasir atau invoice untuk kerangka HTML berikut...")
- [ ] Format angka total harga menggunakan "Rp" (misal: Rp 150000).

---

# 12. Referensi

* [MDN Web Docs - JavaScript Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
* [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/)
* [JavaScript.info](https://javascript.info/)