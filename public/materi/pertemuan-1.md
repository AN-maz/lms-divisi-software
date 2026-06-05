# 1. Pengenalan Web & Fondasi

Yo, sebelum kita diving ke HTML, kita perlu tau dulu gimana si web itu bekerja. Bayangkan web itu kayak restoran, ya. Kamu (browser) memesan makanan (request), terus server (dapur) ngasih resep yang udah siap (response), terus kamu bisa makan (lihat halaman di browser).

## Apa itu Markup Language?

Markup language itu bahasa buat ngatur *struktur* dan *tampilan* dokumen. Beda sama programming language yang kayak "lakukan ini kalau itu", markup language itu lebih kayak "ini judul", "ini paragraf", "ini gambar".

HTML itu singkat dari **HyperText Markup Language**. HyperText = teks yang bisa nyambung ke teks lain (link, duh!). Markup = memberi tanda/label. Jadi intinya, HTML itu bahasa buat nyuruh browser "ey, ini judul, ini teks biasa, ini link".

## Frontend Development (HTML, CSS, JavaScript)

Kamu tahu kan kalau website itu punya 2 sisi? Frontend dan Backend.

- **Frontend** = yang kamu lihat dan bisa klik-klik (tampilan + interaksi)
  - **HTML** = kerangka (struktur, kayak tulang)
  - **CSS** = baju dan makeup (styling, warna, layout)
  - **JavaScript** = otak (logika, interaksi, animasi)

- **Backend** = yang bekerja di belakang layar (database, server logic)

Di modul ini kita fokus ke **Frontend**, terutama HTML dulu. CSS sama JavaScript cuma sentuhan aja.

## Apa itu HTTP?

HTTP = **HyperText Transfer Protocol**. Protokol = aturan main. Jadi HTTP itu aturan buat komunikasi antara browser sama server pake bahasa yang sama.

Alur HTTP:
1. Kamu ketik URL di browser (request)
2. Browser kirim permintaan ke server pake HTTP
3. Server terima, proses, terus balas (response) berisi HTML file
4. Browser render HTML itu jadi tampilan yang bisa dilihat

Gampangnya: **Kamu tanya, server jawab.**

## Domain Names

Domain name itu alamat rumah di internet. Misal `www.google.com` itu domain name-nya. Tanpa domain, gimana sih kamu bisa tahu mau ke server mana? Itu kayak alamat jalan aja. Domain punya struktur:

- `www` = World Wide Web (subdomain, opsional)
- `google` = nama perusahaan (second-level domain)
- `com` = top-level domain (TLD), menunjukkan jenis situs (.com = komersial, .id = Indonesia, .org = organisasi)

## Hosting

Hosting itu tempat si server berada (kayak rumah server). Kamu perlu sewa tempat buat naro file web kamu agar bisa diakses 24/7. Misal Netlify, Vercel, Heroku, dll.

## DNS (Domain Name System)

DNS itu kayak phonebook internet. Kamu kasih nama domain, DNS cariin IP address yang cocok. Misal:

- Kamu: "Ey, buka google.com"
- Browser: "Halo DNS, google.com itu IP address berapa?"
- DNS: "Google.com itu 142.251.41.14"
- Browser: "Thanks! Langsung ke server itu."

## Browser

Browser itu aplikasi buat baca file HTML dan render jadi tampilan yang cantik. Chrome, Firefox, Safari, Edge, dll. Mereka semua bisa baca HTML, tapi cara render-nya bisa beda sedikit (makanya perlu testing di beberapa browser).

## SEO (Search Engine Optimization)

SEO itu strategi biar website kamu muncul di halaman pertama Google search. Google itu kayak librarian yang pinter, dia baca struktur HTML kamu, lihat keyword, lihat link, terus decide "oke, situs ini layak peringkat berapa".

Kita bahas lebih detail nanti, tapi intinya: **HTML yang terstruktur dengan baik = SEO yang lebih baik.**

---

## 🎯 Latihan Sub-Bab 1

Okay, jadi kamu udah tau basic flow web works. Sekarang coba jawab soal ini buat ngetest pemahaman:

**Soal 1:** Jelaskan dengan singkat, apa bedanya antara domain name sama IP address?

**Soal 2:** Sebutkan 3 komponen frontend development dan fungsinya masing-masing!

**Soal 3:** Kalau kamu akses `www.github.com`, tuliskan proses HTTP request-response-nya step by step.

---

# 2. Struktur Dasar HTML

Alright, sekarang kita mulai coding! HTML itu punya struktur yang kayak rumah, ada fondasi, ada dinding, ada atap.

## !DOCTYPE

DOCTYPE itu deklarasi yang bilang ke browser: "Ey, file ini adalah HTML5 (versi terbaru)". Selalu letakkan di paling awal, sebelum tag apapun.

```html
<!DOCTYPE html>
```

Ini **WAJIB** ada. Tanpa ini, browser bingung dan bisa render aneh-aneh (kayak masuk twilight zone).

## Tag html

`<html>` itu root element. Semua HTML code harus berada di dalam tag ini. Dia kayak rumah, semua konten harus di dalamnya.

```html
<html>
  <!-- semua konten HTML di sini -->
</html>
```

Boleh tambah `lang` attribute biar bahasa jelas:

```html
<html lang="id">
  <!-- Ini website bahasa Indonesia -->
</html>
```

## Tag head

`<head>` itu kayak "metadata" (info tentang dokumen, bukan konten yang dibaca user). Di sini kamu deklarasi judul, link CSS, meta tags, dll.

Konten `<head>` **gak muncul di halaman**, tapi penting banget buat browser sama SEO.

```html
<head>
  <title>Judul Tab Browser</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="styles.css">
</head>
```

## Tag body

`<body>` itu tempat konten yang kelihatan. Semua yang mau ditampilkan (teks, gambar, tombol, dll) harus di dalam `<body>`.

```html
<body>
  <h1>Halo Dunia!</h1>
  <p>Ini konten yang bisa dilihat user.</p>
</body>
```

## Tag meta

`<meta>` itu tag buat deklarasi informasi tambahan tentang dokumen. Paling penting:

```html
<meta charset="UTF-8">
<!-- Bilang browser ini file pake encoding UTF-8 (bisa ngasih diacritics, emoji, dll) -->

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bilang browser ini responsive, cocok di mobile juga -->

<meta name="description" content="Ini deskripsi singkat website kamu">
<!-- Bilang search engine deskripsi website, penting buat SEO -->
```

## Struktur Lengkap HTML

Jadi kalau kamu gabungin semuanya, struktur HTML yang proper:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Judul Website Saya</title>
</head>
<body>
  <h1>Halo Dunia!</h1>
  <p>Ini website pertama saya.</p>
</body>
</html>
```

Ini **boilerplate** HTML yang siap pakai. Setiap file HTML baru biasanya mulai dari struktur ini.

---

## 🎯 Latihan Sub-Bab 2

**Soal 1:** Apa yang akan terjadi kalau kamu lupa menulis `<!DOCTYPE html>` di awal? Jelaskan!

**Soal 2:** Perbedaan antara tag `<head>` dan `<body>` itu apa? Jelaskan dengan singkat.

**Soal 3:** Kalau kamu mau website kamu responsive di HP, tag meta mana yang harus ditambah? Tuliskan lengkap!

---

# 3. Textual Elements & Formatting

Nah, sekarang kita bikin konten teks yang proper. HTML punya banyak tag buat formatting teks, dari judul sampai catatan kecil.

## Heading (h1 sampai h6)

Heading itu judul/subjudul. Ada 6 level, dari yang paling penting (`<h1>`) sampai yang paling kecil (`<h6>`).

```html
<h1>Ini Judul Utama Website</h1>
<h2>Ini Sub Judul</h2>
<h3>Ini Sub-Sub Judul</h3>
<h4>Heading Level 4</h4>
<h5>Heading Level 5</h5>
<h6>Heading Level 6</h6>
```

**Pro Tips:**
- Per halaman **harus ada 1 `<h1>`** (buat SEO sama aksesibilitas)
- Jangan loncat level (jangan langsung `<h1>` ke `<h3>`, pakai `<h2>` dulu)
- Gunakan heading buat struktur konten yang jelas, bukan buat styling

## Paragraph (p)

`<p>` itu tag buat paragraf biasa. Semua teks deskriptif biasanya dibungkus `<p>`.

```html
<p>Ini adalah paragraf pertama. Lorem ipsum dolor sit amet.</p>
<p>Ini adalah paragraf kedua yang terpisah.</p>
```

> **Perhatian:** Jangan pake `<br>` berkali-kali buat bikin paragraf baru! Pakai `<p>` yang terpisah.

## Title Tag

`<title>` itu isi dari tab browser. Gak muncul di halaman, tapi penting buat user dan SEO.

```html
<head>
  <title>Belajar HTML - Tutorial Gratis</title>
</head>
```

Ketika dibuka di browser, tab bakal nunjukin "Belajar HTML - Tutorial Gratis".

## Horizontal Rule (hr)

`<hr>` itu garis pembatas. Gak ngasih konten, cuma garis aja. Self-closing.

```html
<p>Section pertama</p>
<hr>
<p>Section kedua</p>
```

## Line Break (br)

`<br>` itu buat break baris (enter). Self-closing. Tapi **jangan terlalu sering**, pakai `<p>` kalau bisa.

```html
<p>
  Baris pertama<br>
  Baris kedua yang baru
</p>
```

## Bold & Strong

Ada 2 tag buat bold:

- `<b>` = **visual bold** (purely styling, gak ada semantic meaning)
- `<strong>` = **bold yang penting** (semantic, search engine tahu ini penting)

```html
<p>Harga <b>promosi</b> hari ini: Rp 50.000</p>
<p>Ini <strong>sangat penting</strong> dibaca!</p>
```

**Pro Tips:** Gunakan `<strong>` kalau teks itu benar-benar penting, `<b>` buat styling.

## Italic & Emphasis

Mirip bold, ada 2:

- `<i>` = **visual italic** (styling aja, misal nama latin, judul film, dll)
- `<em>` = **emphasis** (semantic, benar-benar penekanan)

```html
<p>Spesies ini bernama <i>Felis catus</i> (murni styling).</p>
<p>Tugas ini <em>harus</em> dikerjakan hari ini!</p>
```

## Mark

`<mark>` buat highlight teks, kayak spidol kuning.

```html
<p>Ini pelajaran penting, <mark>jangan sampai lupa!</mark></p>
```

## Subscript & Superscript

- `<sub>` = subscript (angka/huruf di bawah, misal H₂O)
- `<sup>` = superscript (angka/huruf di atas, misal x²)

```html
<p>Rumus air: H<sub>2</sub>O</p>
<p>Luas lingkaran: πr<sup>2</sup></p>
```

## Pre (Preformatted Text)

`<pre>` buat teks yang formatting-nya penting (misal ASCII art, code, dll). Whitespace dipertahankan.

```html
<pre>
    ___
   /   \
  | o o |
   \ v /
</pre>
```

## Links (Anchor Tag)

`<a>` buat link. Paling penting punya attribute `href` (destination).

```html
<a href="https://google.com">Klik ke Google</a>

<!-- Link ke halaman lain dalam situs -->
<a href="about.html">Tentang Kami</a>

<!-- Link ke section yang sama halaman -->
<a href="#section-2">Lompat ke Section 2</a>
```

> **Perhatian:** Selalu kasih judul link yang jelas! Jangan "klik di sini", tapi "Baca artikel tentang HTML".

## HTML Entities

Ada simbol-simbol khusus yang perlu di-escape di HTML:

```html
&lt;   = <
&gt;   = >
&amp;  = &
&quot; = "
&copy; = ©
&nbsp; = spasi yang gak mati
```

Contoh pakai:

```html
<p>Tag &lt;strong&gt; itu buat text yang penting.</p>
<p>&copy; 2024 by Saya</p>
```

## HTML Comments

Comment buat catatan yang gak ditampilkan:

```html
<!-- Ini adalah comment -->
<!-- TODO: Tambah foto di sini nanti -->
```

Comment bisa multi-line:

```html
<!--
  Bagian ini masih dalam development,
  nanti ditambah fitur loading animation
-->
```

## Whitespace (Spasi & Enter)

HTML itu ignore multiple whitespaces dan line breaks. Jadi:

```html
<p>Halo     dunia</p>
<!-- Sama dengan: -->
<p>Halo dunia</p>

<p>Halo
dunia</p>
<!-- Juga sama, browser render jadi "Halo dunia" -->
```

Kalau mau preserve whitespace, pakai `<pre>`.

---

## 🎯 Latihan Sub-Bab 3

**Soal 1:** Buatlah teks dengan struktur: `<h1>` untuk judul, `<h2>` untuk sub-judul, lalu 2 paragraf dengan minimal 1 kata di-bold pakai `<strong>` dan 1 kata di-highlight pakai `<mark>`.

**Soal 2:** Buatlah link ke halaman eksternal (misal Google) dan link ke dalam file yang sama (anchor link dengan `#`).

**Soal 3:** Jelaskan bedanya `<b>` dan `<strong>`, serta `<i>` dan `<em>`. Kapan masing-masing dipakai?

**Soal 4:** Tuliskan HTML entity buat simbol: `<`, `>`, `&`, dan `©`.

---

# 4. Organisasi Konten & Attributes

Sekarang kita bahas cara ngatur dan memberikan label pada konten. HTML punya tag generik dan attribute standar buat ini.

## Div (Division)

`<div>` itu container generik buat mengelompokkan konten. Kayak kotak kosong yang bisa kamu isi apa aja.

```html
<div>
  <h2>Profil User</h2>
  <p>Nama: Andi</p>
  <p>Email: andi@email.com</p>
</div>
```

`<div>` adalah **block element**, artinya dia ambil satu baris penuh dan push konten lain ke bawah.

## Span

`<span>` itu `<div>` versi inline. Gak bikin baris baru, dia langsung inline dengan teks.

```html
<p>Website ini dibuat oleh <span>Tim Developer</span>.</p>
<!-- Span gak bikin line break -->
```

**Bedanya dengan `<div>`:**
- `<div>` = block (ambil seluruh lebar, elemen berikutnya turun baris)
- `<span>` = inline (hanya ambil space yang diperlukan, elemen berikutnya tetap samping)

## ID Attribute

`id` itu identifier unik buat satu elemen. **Hanya boleh ada 1 elemen dengan ID yang sama.**

```html
<div id="navbar">
  <a href="#home">Home</a>
  <a href="#about">About</a>
</div>

<div id="main-content">
  <h1>Selamat Datang</h1>
</div>
```

Gunanya:
- Link anchor (`<a href="#navbar">`)
- JavaScript targeting
- CSS styling

> **Pro Tips:** ID pakai lowercase, separate dengan dash kalau multi-word (misal `#main-content`, bukan `#MainContent`).

## Class Attribute

`class` itu label yang bisa dipakai berulang kali. Berbeda dengan `id`, banyak elemen bisa punya class yang sama.

```html
<div class="card">
  <h3>Produk 1</h3>
  <p>Harga: Rp 100.000</p>
</div>

<div class="card">
  <h3>Produk 2</h3>
  <p>Harga: Rp 150.000</p>
</div>
```

Dua `<div>` di atas punya class yang sama, jadi styling mereka bisa sama.

**Multi-class:**

```html
<div class="card featured popular">
  <!-- Elemen ini punya 3 class sekaligus -->
</div>
```

## Data Attributes

`data-*` attribute buat menyimpan data custom yang gak ditampilkan tapi bisa diakses JavaScript.

```html
<button data-product-id="123" data-price="50000">
  Beli Sekarang
</button>
```

Nanti JavaScript bisa akses data ini:

```javascript
// Pseudo-code (bahas nanti di modul JavaScript)
const btn = document.querySelector('button');
console.log(btn.dataset.productId);  // Output: "123"
console.log(btn.dataset.price);      // Output: "50000"
```

## Style Attribute

`style` attribute buat CSS inline (langsung styling di HTML, bukan recommended tapi sometimes useful).

```html
<p style="color: red; font-size: 18px;">Teks merah berukuran 18px</p>
```

> **Perhatian:** Jangan over-pakai style attribute. CSS seharusnya di file CSS yang terpisah.

---

## 🎯 Latihan Sub-Bab 4

**Soal 1:** Buatlah struktur HTML dengan 3 produk. Setiap produk punya `<div>` dengan class `product-card`. Tambahkan `id` unik untuk masing-masing (misal `product-1`, `product-2`, `product-3`).

**Soal 2:** Di dalam masing-masing produk, ada `<h3>` nama produk, `<p>` deskripsi, dan `<button>` beli. Tambahkan `data-price` attribute di button dengan harga masing-masing.

**Soal 3:** Gunakan `<span>` untuk highlight harga di dalam teks (misal, "Harga: <span>Rp 100.000</span>").

---

# 5. Tabel

Tabel itu struktur data dalam baris dan kolom. HTML punya tag khusus buat ini.

## Struktur Tabel Dasar

```html
<table>
  <tr>
    <th>Nama</th>
    <th>Umur</th>
    <th>Kota</th>
  </tr>
  <tr>
    <td>Andi</td>
    <td>25</td>
    <td>Jakarta</td>
  </tr>
  <tr>
    <td>Budi</td>
    <td>30</td>
    <td>Bandung</td>
  </tr>
</table>
```

**Tag-tag penting:**
- `<table>` = wrapper tabel
- `<tr>` = table row (baris)
- `<th>` = table header (header, biasanya bold)
- `<td>` = table data (cell biasa)

## Semantic Table

Kalau tabelnya besar, gunakan `<thead>`, `<tbody>`, `<tfoot>` buat clarity:

```html
<table>
  <thead>
    <tr>
      <th>Nama</th>
      <th>Umur</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Andi</td>
      <td>25</td>
    </tr>
    <tr>
      <td>Budi</td>
      <td>30</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">Total: 2 orang</td>
    </tr>
  </tfoot>
</table>
```

> **Perhatian:** Jangan pakai tabel buat layout! Tabel itu **hanya buat data tabular**. Buat layout pakai CSS Grid atau Flexbox.

## Colspan & Rowspan

`colspan` = merge kolom horizontal, `rowspan` = merge baris vertikal.

```html
<table>
  <tr>
    <th colspan="2">Data Pelajar</th>
  </tr>
  <tr>
    <td>Nama</td>
    <td>Kelas</td>
  </tr>
</table>
```

---

## 🎯 Latihan Sub-Bab 5

**Soal 1:** Buatlah tabel dengan data 5 pelajar. Kolom: Nama, Kelas, Nilai Matematika, Nilai Bahasa. Gunakan `<thead>`, `<tbody>`.

**Soal 2:** Di bawah tabel, tambahkan `<tfoot>` yang nunjukin rata-rata nilai (gunakan `colspan` kalau perlu).

**Soal 3:** Buatlah tabel jadwal pelajaran dengan kolom Hari dan 5 kolom jam pelajaran (08:00-09:00, dll). Gunakan `colspan` untuk judul.

---

# 6. Lists (Daftar)

List itu cara ngatur data secara berurut atau berkelompok. HTML punya 3 tipe list.

## Ordered List (Numbered)

`<ol>` buat list yang berurut (numbered). Cocok buat step-by-step atau ranking.

```html
<ol>
  <li>Persiapkan bahan</li>
  <li>Campur bahan</li>
  <li>Masak di oven</li>
  <li>Sajikan</li>
</ol>
```

Output:
1. Persiapkan bahan
2. Campur bahan
3. Masak di oven
4. Sajikan

## Unordered List (Bullets)

`<ul>` buat list dengan bullets. Cocok buat daftar yang gak ada urutan.

```html
<ul>
  <li>Apel</li>
  <li>Jeruk</li>
  <li>Mangga</li>
</ul>
```

Output:
- Apel
- Jeruk
- Mangga

## Definition List

`<dl>` buat list istilah dan definisinya. Jarang dipakai tapi berguna buat glossary.

```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language, bahasa buat struktur web.</dd>
  
  <dt>CSS</dt>
  <dd>Cascading Style Sheets, bahasa buat styling web.</dd>
</dl>
```

## Nested Lists

List bisa di-nest (masuk dalam list lain):

```html
<ol>
  <li>Persiapkan bahan
    <ul>
      <li>Tepung 200g</li>
      <li>Telur 2 butir</li>
      <li>Gula 100g</li>
    </ul>
  </li>
  <li>Campur bahan</li>
  <li>Masak</li>
</ol>
```

---

## 🎯 Latihan Sub-Bab 6

**Soal 1:** Buatlah `<ol>` dengan 5 step cara membuat website (dari planning sampai deploy). Tiap step punya detail di `<ul>` nested di dalamnya.

**Soal 2:** Buatlah `<ul>` daftar 5 teknologi frontend (HTML, CSS, JavaScript, React, Vue). Buat setiap item punya `<ol>` fitur-fiturnya.

**Soal 3:** Buatlah `<dl>` glossary 3 istilah teknis (misal: API, HTTP, DNS) dengan definisinya.

---

# 7. Media & Embedded Content

Sekarang kita bikin website lebih menarik dengan gambar, audio, video, dan embed konten lain.

## Gambar (img vs figure)

### Tag img

`<img>` buat menampilkan gambar. Wajib punya `src` (path gambar) dan `alt` (deskripsi kalau gambar gak load).

```html
<img src="/img/kucing.png" alt="Foto kucing yang sedang tidur">
```

**Attributes penting:**
- `src` = path gambar (WAJIB)
- `alt` = deskripsi gambar (WAJIB buat aksesibilitas)
- `width` dan `height` = ukuran (opsional, tapi good practice buat prevent layout shift)

```html
<img src="/img/kucing.png" 
     alt="Foto kucing yang sedang tidur" 
     width="300" 
     height="200">
```

### Figure Element

`<figure>` + `<figcaption>` buat gambar dengan caption yang semantic:

```html
<figure>
  <img src="/img/kucing.png" alt="Kucing sedang tidur">
  <figcaption>Gambar 1: Kucing kesayangan saya sedang tidur nyenyak</figcaption>
</figure>
```

Bedanya dengan `<img>` biasa: `<figure>` semantic, cocok buat illustrasi yang punya konteks.

## Audio

`<audio>` buat embed file audio.

```html
<audio controls>
  <source src="/audio/musik.mp3" type="audio/mpeg">
  Browser kamu gak support audio tag.
</audio>
```

**Attributes:**
- `controls` = tampilkan play/pause button
- `autoplay` = main otomatis (gak recommended)
- `loop` = ulangi dari awal

## Video

`<video>` buat embed video.

```html
<video width="320" height="240" controls>
  <source src="/video/tutorial.mp4" type="video/mp4">
  Browser kamu gak support video tag.
</video>
```

Sama seperti audio, bisa pakai `controls`, `autoplay`, `loop`.

## iframe

`<iframe>` buat embed website atau konten external lain (misal YouTube, Google Maps, dll).

```html
<!-- Embed YouTube -->
<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
</iframe>

<!-- Embed Google Maps -->
<iframe src="https://www.google.com/maps/embed?pb=..." width="400" height="300"></iframe>
```

> **Perhatian:** Selalu kasih `alt` text atau fallback untuk aksesibilitas. User yang pake screen reader perlu tahu apa konten yang di-embed.

---

## 🎯 Latihan Sub-Bab 7

**Soal 1:** Buatlah 3 `<figure>` dengan gambar berbeda. Setiap gambar punya `alt` text yang deskriptif dan `<figcaption>`.

**Soal 2:** Buatlah `<audio>` player dengan 2 lagu berbeda. Pakai `controls` dan `loop`.

**Soal 3:** Buatlah `<video>` player dengan kontrol. Sebutkan attributes yang wajib ada!

**Soal 4:** Embed sebuah YouTube video menggunakan `<iframe>`. Jangan lupa `width`, `height`, dan `allow` attribute.

---

# 8. Form & User Input

Form itu cara user input data ke website. Dari login, signup, search, sampai upload file, semua pakai form.

## Labels & Inputs

Input itu elemen buat user kasih data. `<label>` itu judul buat input. Mereka harus connected!

```html
<label for="nama">Nama:</label>
<input type="text" id="nama" name="nama">
```

**Penting:**
- `for` di label harus match `id` di input
- `name` dipakai buat backend buat identifikasi data
- `id` buat styling sama JavaScript targeting

## Input Types

Ada banyak tipe input:

```html
<!-- Text -->
<input type="text" placeholder="Nama lengkap">

<!-- Email -->
<input type="email" placeholder="Email kamu">

<!-- Password -->
<input type="password" placeholder="Password">

<!-- Number -->
<input type="number" min="1" max="100">

<!-- Date -->
<input type="date">

<!-- Checkbox -->
<input type="checkbox" id="agree">
<label for="agree">Saya setuju dengan terms & conditions</label>

<!-- Radio (mutually exclusive) -->
<input type="radio" name="gender" value="male"> Pria
<input type="radio" name="gender" value="female"> Wanita

<!-- Textarea (buat text panjang) -->
<textarea rows="5" cols="40" placeholder="Tulis pesan kamu..."></textarea>

<!-- Select (dropdown) -->
<select>
  <option>-- Pilih Kota --</option>
  <option>Jakarta</option>
  <option>Bandung</option>
  <option>Surabaya</option>
</select>

<!-- Submit Button -->
<button type="submit">Kirim</button>
```

## Form Structure

Form yang proper dibungkus dengan `<form>`:

```html
<form action="https://api.example.com/submit" method="POST">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required>

  <button type="submit">Login</button>
</form>
```

**Attributes:**
- `action` = URL mana data dikirim
- `method` = GET atau POST (POST more secure)
- `required` = field wajib diisi

## File Uploads

Buat upload file:

```html
<input type="file" accept=".jpg,.png,.pdf" multiple>
```

- `accept` = file type yang diterima
- `multiple` = user bisa select banyak file sekaligus

## Form Validation

HTML bisa validasi basic:

```html
<input type="email" required> <!-- Must be valid email -->
<input type="number" min="18" max="60"> <!-- Between 18-60 -->
<input type="text" pattern="[A-Z]{3}" title="3 huruf besar"> <!-- Custom pattern -->
```

> **Perhatian:** Validasi HTML itu frontend. **Selalu validasi juga di backend!** Frontend validation bisa di-bypass.

---

## 🎯 Latihan Sub-Bab 8

**Soal 1:** Buatlah form "Register User" dengan field: nama (text), email (email), password (password), confirm password (password), dan checkbox "Saya setuju dengan T&C".

**Soal 2:** Buatlah form "Survey Kepuasan" dengan: rating (radio, 1-5), feedback (textarea), dan submit button.

**Soal 3:** Buatlah form "Upload Dokumen" dengan file input yang accept hanya `.pdf` dan `.docx`. Pakai `multiple` attribute.

**Soal 4:** Tambahkan validasi HTML ke form pertama (nama wajib diisi, email harus valid format, password minimal 8 karakter).

---

# 9. Semantic Markup & Layout

Semantic HTML = pakai tag yang punya *makna* selain styling. Lebih baik buat SEO dan aksesibilitas.

## Highlighting Changes

Kalau ada perubahan di teks:

```html
<!-- Deleted text -->
<p>Harga lama: <del>Rp 100.000</del> Rp 75.000</p>

<!-- Strikethrough (visual aja, gak ada semantic) -->
<p>Harga: <s>Rp 100.000</s> Rp 75.000</p>

<!-- Inserted/new text -->
<p>Promo <ins>HARGA BARU: Rp 75.000</ins> mulai sekarang!</p>
```

## Quotations & Citations

```html
<!-- Quote pendek -->
<p>Steve Jobs bilang: <q>Innovation distinguishes a leader from a follower.</q></p>

<!-- Quote panjang -->
<blockquote cite="https://example.com">
  <p>Ini adalah quote panjang dari somewhere. Bisa multi-paragraph.</p>
</blockquote>

<!-- Abbreviations -->
<p><abbr title="HyperText Markup Language">HTML</abbr> adalah bahasa buat web.</p>

<!-- Definition -->
<p><dfn>SEO</dfn> adalah proses ngoptimasi website buat search engine.</p>

<!-- Citation (buku, jurnal, dll) -->
<p>Sebagai yang dikatakan di <cite>The Pragmatic Programmer</cite>...</p>

<!-- Address -->
<address>
  PT. Coding Ninja<br>
  Jl. Developer No. 123<br>
  Jakarta 12345<br>
  Email: info@codingninja.com
</address>
```

## Semantic Layout Tags

Layout semantik buat struktur halaman yang jelas:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <!-- Header halaman -->
  <header>
    <h1>Coding Ninja</h1>
    <p>Belajar Programming dari Nol</p>
  </header>

  <!-- Navigasi -->
  <nav>
    <a href="#home">Home</a>
    <a href="#courses">Courses</a>
    <a href="#about">About</a>
  </nav>

  <!-- Main content -->
  <main>
    <!-- Article -->
    <article>
      <h2>Belajar HTML dari Awal</h2>
      <p>HTML adalah...</p>
    </article>

    <!-- Aside (sidebar) -->
    <aside>
      <h3>Recommended Courses</h3>
      <ul>
        <li>CSS Basics</li>
        <li>JavaScript Fundamentals</li>
      </ul>
    </aside>
  </main>

  <!-- Section -->
  <section id="testimonials">
    <h2>Testimoni Alumni</h2>
    <article>
      <p>Rating: 5/5</p>
      <p>Sangat membantu! - Andi</p>
    </article>
  </section>

  <!-- Footer -->
  <footer>
    <p>&copy; 2024 Coding Ninja. All rights reserved.</p>
  </footer>
</body>
</html>
```

**Tag semantik:**
- `<header>` = header halaman/section
- `<nav>` = navigasi
- `<main>` = main content (hanya 1 per halaman)
- `<section>` = section tematik
- `<article>` = konten yang bisa standalone
- `<aside>` = sidebar/content related
- `<footer>` = footer halaman/section

> **Perhatian:** Jangan gunakan `<div>` kalau ada tag semantik yang cocok. Search engine tahu struktur halaman lebih baik kalau pakai semantic tags.

---

## 🎯 Latihan Sub-Bab 9

**Soal 1:** Buatlah layout halaman blog dengan struktur:
- `<header>` dengan judul dan subtitle
- `<nav>` dengan link Home, Blog, Contact
- `<main>` berisi `<article>` (blog post minimal 2 paragraf)
- `<aside>` dengan kategori blog
- `<footer>` dengan copyright

**Soal 2:** Di dalam blog post, gunakan:
- Minimal 1 `<blockquote>`
- 1 teks dengan `<abbr>`
- 1 teks dengan `<ins>` atau `<del>`
- 1 `<cite>`

**Soal 3:** Buatlah halaman dengan 3 `<section>` berbeda tema. Masing-masing `<section>` punya `<h2>` dan minimal 2 artikel.

---

# 10. Styling Basics & JavaScript Integration

Nah, kita sudah bikin HTML yang semantic. Sekarang kita styling sedikit dan kasih interaksi JavaScript.

## Inline CSS

CSS langsung di attribute `style`. Gak recommended tapi sometimes praktis:

```html
<p style="color: blue; font-size: 18px;">Teks berwarna biru</p>

<div style="background-color: #f0f0f0; padding: 20px;">
  Box dengan background abu-abu
</div>
```

**Kekurangan:** Sulit maintain, gak reusable, bikin HTML berantakan.

## Internal CSS

CSS di dalam `<style>` tag di `<head>`:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    h1 {
      color: teal;
      text-align: center;
    }

    p {
      font-size: 16px;
      line-height: 1.6;
    }

    .highlight {
      background-color: yellow;
      padding: 5px;
    }
  </style>
</head>
<body>
  <h1>Judul Website</h1>
  <p>Ini paragraf dengan <span class="highlight">highlight</span>.</p>
</body>
</html>
```

**Keuntungan:** Semua styling di satu tempat. **Kekurangan:** Gak bisa reuse di halaman lain.

## External CSS

CSS di file terpisah dan di-link di `<head>`. **INI YANG TERBAIK:**

**File: styles.css**
```css
h1 {
  color: teal;
  font-size: 32px;
}

.card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
}
```

**File: index.html**
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Halo Dunia</h1>
  <div class="card">Ini adalah card</div>
</body>
</html>
```

**Keuntungan:** Reusable, maintainable, file HTML tetap clean.

## Including JavaScript

JavaScript buat interaksi. Bisa di-include di HTML:

### Inline JavaScript (Jangan gini!)

```html
<button onclick="alert('Tombol diklik!')">Klik Saya</button>
```

### Internal JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <script>
    function greet() {
      alert('Halo ' + document.getElementById('name').value);
    }
  </script>
</head>
<body>
  <input type="text" id="name" placeholder="Nama kamu">
  <button onclick="greet()">Greet</button>
</body>
</html>
```

### External JavaScript (Terbaik!)

**File: script.js**
```javascript
function greet() {
  const name = document.getElementById('name').value;
  alert('Halo ' + name);
}

document.getElementById('greet-btn').addEventListener('click', greet);
```

**File: index.html**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Greeting App</title>
</head>
<body>
  <input type="text" id="name" placeholder="Nama kamu">
  <button id="greet-btn">Greet</button>

  <script src="script.js"></script>
</body>
</html>
```

> **Perhatian:** Selalu letakkan `<script>` di akhir `</body>`, supaya DOM sudah load dulu sebelum JavaScript jalan.

---

## 🎯 Latihan Sub-Bab 10

**Soal 1:** Buatlah 3 file:
- `index.html` dengan struktur: heading, 3 paragraf, 1 tombol
- `styles.css` dengan styling: warna heading, font size paragraf, styling button (background, color, padding)
- Link keduanya di HTML

**Soal 2:** Tambahkan `<script>` internal atau external yang bikin: ketika button diklik, muncul alert "Button berhasil diklik!".

**Soal 3:** Buatlah form dengan 2 input (nama dan email) dan 1 button. Pakai JavaScript buat validasi: kalau nama kosong, alert "Nama harus diisi!". Kalau email kosong, alert "Email harus diisi!".

---

# 📚 Tugas Mandiri: Membuat Portfolio Website

Alright, ini saatnya kamu gabungin **SEMUA** yang udah dipelajari. Tugas ini adalah mini project yang comprehensive tapi gak susah.

## 🎯 Deskripsi Tugas

Buatlah **Portfolio Website Pribadi** dengan struktur dan fitur berikut:

### Struktur Halaman:
1. **Header** - Judul nama kamu dan tagline pendek
2. **Navigation** - Link ke: Home, About, Skills, Projects, Contact
3. **Hero Section** - Gambar/avatar + intro singkat
4. **About Section** - Biodata singkat (3-4 paragraf)
5. **Skills Section** - Tabel list skill (Skill, Level)
6. **Projects Section** - Minimal 3 project dengan:
   - Judul project
   - Deskripsi singkat
   - Gambar/figure (atau placeholder)
   - Link ke project (anchor link ke tempat lain di halaman)
7. **Contact Section** - Form dengan field: nama, email, pesan
8. **Footer** - Copyright dan social media links (dummy aja)

### Requirement Technical:

✅ **HTML:**
- Gunakan semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Minimal 1 tabel (di Skills section)
- Minimal 1 form (Contact section)
- Minimal 2 list (bisa `<ul>` atau `<ol>`)
- Minimal 1 `<figure>` dengan `<figcaption>`
- Link anchor (`#`) untuk navigasi antar section
- Proper heading hierarchy (`<h1>`, `<h2>`, dll)

✅ **Styling:**
- External CSS file (`styles.css`)
- Minimal styling: warna, padding, border, text-align
- Jangan terlalu fancy, yang penting rapi dan bisa dibaca

✅ **JavaScript:**
- Minimal 1 script buat interaksi (misal: validasi form, toggle navigation, dll)
- External JavaScript file (`script.js`) atau internal di `<script>`
- Alert atau console.log kalau ada error

### File Structure:
```
portfolio-website/
├── index.html
├── styles.css
├── script.js
└── img/
    └── (placeholder gambar bisa pakai nama file aja, gak perlu gambar asli)
```

---

## 📝 Kriteria Penilaian

| Kriteria | Point | Catatan |
| --- | --- | --- |
| **Struktur HTML** | 30 | Semantic tags, heading hierarchy, form, table, list |
| **Content Completeness** | 20 | Semua section sudah ada, info lengkap |
| **Styling & Layout** | 20 | Rapi, readable, konsisten |
| **JavaScript Functionality** | 15 | Minimal 1 fitur interaksi yang bekerja |
| **Form Validation** | 10 | Form punya validasi (HTML atau JavaScript) |
| **Accessibility** | 5 | Alt text di gambar, proper labels di form |
| **TOTAL** | 100 | - |

---

## 💡 Tips & Hints:

- Mulai dari struktur HTML dulu, styling belakangan
- Gunakan dummy content (Lorem ipsum) kalau perlu, yang penting struktur benar
- Jangan over-engineer. Simple tapi clean lebih bagus.
- Testing: buka di browser, cek semua link bekerja, form bisa dikirim, button bisa diklik
- Kalau ada yang error, cek console (F12 → Console tab)

---

## 🚀 Bonus (Optional):

- Tambah smooth scroll effect di link navigasi
- Buat responsive design basic (pakai `<meta viewport>` dan CSS media query)
- Tambah footer dengan social media links (Instagram, LinkedIn, GitHub)
- Dark mode toggle (JavaScript)

**Good luck! Ini adalah step pertama kamu jadi web developer. You got this! 💪**

---

# 📖 Ringkasan Materi & Resources

Congrats! Kamu udah belajar HTML dari dasar sampe bisa bikin portfolio website. Ini ringkasan apa yang udah dikuasai:

## ✅ Yang Sudah Dipelajari:

1. ✅ Struktur dasar HTML & semantic markup
2. ✅ Textual elements (heading, paragraph, emphasis, dll)
3. ✅ Attributes (id, class, data-*, style)
4. ✅ Tables, lists, dan form
5. ✅ Media (gambar, audio, video, iframe)
6. ✅ Layout semantic (header, nav, main, section, footer)
7. ✅ Basic CSS styling
8. ✅ JavaScript integration

## 🎓 Next Steps:

Setelah HTML, kamu harus pelajari:
1. **CSS** - Styling yang lebih dalam (flexbox, grid, responsive design)
2. **JavaScript** - Interaksi yang lebih kompleks
3. **Framework** - React, Vue, atau Svelte
4. **Backend** - Node.js, Python, dll

## 📚 Resources:

- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - Reference lengkap
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/) - Interactive tutorial
- [HTML Living Standard](https://html.spec.whatwg.org/) - Official spec (heavy reading)
- [Can I Use](https://caniuse.com/) - Browser compatibility check

---

**Happy Coding! Jangan lupa commit progress kamu, share ke teman-teman, dan terus belajar! 🚀**