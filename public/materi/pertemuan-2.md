# 1. Pengenalan CSS

Yo, welcome to CSS! Kalau HTML itu kerangka rumah, CSS itu pelukis yang bikin rumah jadi cantik. Let's dive in!

## Apa itu CSS?

CSS singkat dari **Cascading Style Sheets**. Bahasa buat ngasih style (warna, ukuran, layout, animasi, dll) ke elemen HTML.

Tanpa CSS, web itu kayak rumah yang cuma punya dinding putih, gak ada furniture, gak ada cat. Boring banget.

Dengan CSS, kamu bisa:

- Ganti warna
- Atur ukuran
- Bikin layout
- Kasih animation
- Bikin responsive (bisa dilihat di mobile juga)

## Kenapa CSS?

**HTML sendiri gak cukup.** HTML cuma bisa ngasih _struktur_ (ini judul, ini paragraf, dll). Tapi kalau mau makin cantik dan rapi, butuh CSS.

Bayangkan:

- HTML = blueprint bangunan
- CSS = cat, furniture, dekorasi

## Anatomy of CSS

Struktur dasar CSS:

```css
h1 {
  color: blue;
  font-size: 32px;
  margin: 20px;
}
```

Breakdown:

- **Selector** (`h1`) = target elemen yang mau di-style
- **Property** (`color`, `font-size`, `margin`) = apa yang mau diubah
- **Value** (`blue`, `32px`, `20px`) = nilai property
- **Declaration** (property + value) = satu instruksi styling
- **Rule Set** (selector + declarations dalam `{}`) = satu CSS rule lengkap

---

# 2. Selectors

Selector itu kunci. Kalau selector salah, styling bakal ngenai elemen yang gak tepat. Ada banyak cara ngasih target elemen.

## Universal Selector

`*` = semua elemen. Biasanya buat reset margin dan padding:

```css
* {
  margin: 0;
  padding: 0;
}
```

Ini ngehapus default margin/padding semua elemen. Praktis banget buat mulai fresh.

## Element Selector

Target elemen berdasarkan tag:

```css
p {
  color: darkgray;
  line-height: 1.6;
}

h1 {
  color: navy;
}

div {
  background-color: #f0f0f0;
}
```

Semua `<p>` bakal punya style ini. Simple tapi powerful.

## Class Selector

Target berdasarkan class (dengan titik `.`):

```css
.highlight {
  background-color: yellow;
  padding: 5px;
}

.primary-btn {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
```

Di HTML:

```html
<p class="highlight">Teks ini di-highlight</p>
<button class="primary-btn">Klik Saya</button>
```

Class bisa dipakai berkali-kali di banyak elemen. Bagus buat reusable styling.

## ID Selector

Target berdasarkan ID (dengan hash `#`):

```css
#navbar {
  background-color: #333;
  padding: 15px;
}

#navbar a {
  color: white;
  text-decoration: none;
  margin-right: 15px;
}

#main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
```

```html
<!-- Navbar -->
<div id="navbar">
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</div>

<!-- Main Content -->
<div id="main-content">
  <h1>Selamat Datang</h1>
  <p>
    Ini adalah contoh main content dengan max-width 1200px dan posisi di tengah
    menggunakan <code>margin: 0 auto;</code>.
  </p>
</div>
```

ID itu unik, harusnya hanya 1 elemen punya ID tertentu. Gunakan kalau emang spesifik.

> **Pro Tips:** Class lebih recommended dari ID buat styling. ID lebih bagus buat JavaScript targeting.

## Attribute Selector

Target berdasarkan attribute:

```css
/* Semua input type="email" */
input[type="email"] {
  border: 2px solid blue;
  padding: 8px;
}

/* Semua link dengan href yang mengandung "external" */
a[href*="external"] {
  color: red;
}

/* Input dengan placeholder */
input[placeholder] {
  background-color: #f9f9f9;
}

/* Link yang di-awal dengan "https" */
a[href^="https"] {
  color: green;
}
```

```html
<h1>Contoh Attribute Selector</h1>

<h2>Input Email</h2>
<input type="email" placeholder="Masukkan email" />

<br /><br />

<h2>Input Username</h2>
<input type="text" placeholder="Masukkan username" />

<br /><br />

<h2>Link External</h2>
<a href="https://external-site.com"> Kunjungi External Site </a>

<br /><br />

<h2>Link HTTPS</h2>
<a href="https://google.com"> Buka Google </a>

<br /><br />

<h2>Link Biasa</h2>
<a href="http://websitebiasa.com"> Website HTTP </a>
```

## Grouping Selectors

Multiple selectors dengan comma:

```css
h1,
h2,
h3 {
  color: navy;
  margin-bottom: 20px;
}

.btn,
.button,
a.link {
  cursor: pointer;
  text-decoration: none;
}
```

```html
<!-- Heading -->
<h1>Ini Heading H1</h1>
<h2>Ini Heading H2</h2>
<h3>Ini Heading H3</h3>

<!-- Button dan Link -->
<button class="btn">Button .btn</button>

<div class="button">Div dengan class .button</div>

<a href="#" class="link"> Link dengan class .link </a>
```

Semua `<h1>`, `<h2>`, `<h3>` bakal punya style yang sama. Nghemat kode!

## Chaining Selectors

Target elemen yang punya multiple conditions (tanpa comma):

```css
/* <div> dengan class "card" */
div.card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
}

/* <a> dengan class "btn" dan "primary" */
a.btn.primary {
  background-color: blue;
  color: white;
}

/* <input> dengan type="text" dan class "search" */
input[type="text"].search {
  width: 300px;
  padding: 10px;
}
```

```html
<h1>Demo Attribute Selector</h1>

<!-- Input Email -->
<h2>Input Email</h2>
<input type="email" placeholder="Masukkan email" />

<br /><br />

<!-- Input Text -->
<h2>Input Text dengan Placeholder</h2>
<input type="text" placeholder="Masukkan username" />

<br /><br />

<!-- Link External -->
<h2>Link Mengandung 'external'</h2>
<a href="https://external-website.com"> External Website </a>

<br /><br />

<!-- Link HTTPS -->
<h2>Link HTTPS</h2>
<a href="https://google.com"> Google </a>

<br /><br />

<!-- Link HTTP -->
<h2>Link HTTP Biasa</h2>
<a href="http://example.com"> Example HTTP </a>
```

Lebih spesifik, ngenai elemen yang punya semua kondisi.

## Combinators

Selector buat relationship antar elemen:

### Descendant Combinator (space)

Elemen yang ada di dalam elemen lain (nested):

```css
/* Semua <p> yang ada di dalam <div> */
div p {
  color: gray;
}

/* Semua <span> di dalam <nav> */
nav span {
  font-weight: bold;
}
```

HTML:

```html
<div>
  <p>Ini paragraph di dalam div (kena styling)</p>
</div>

<p>Ini paragraph di luar div (gak kena styling)</p>
```

### Child Combinator (>)

Elemen yang langsung jadi child (bukan nested lebih dalam):

```css
/* <li> yang langsung jadi child <ul> */
ul > li {
  list-style: disc;
}

/* <span> yang langsung jadi child <p> */
p > span {
  color: red;
}
```

```html
<h1>Contoh Child Selector</h1>

<!-- Contoh UL -->
<h2>List</h2>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>

  <div>
    <li>Item di dalam div (tidak terkena selector)</li>
  </div>
</ul>

<!-- Contoh Paragraph -->
<h2>Paragraph</h2>
<p>
  Ini adalah
  <span>span langsung di dalam p</span>
</p>

<p>
  Ini paragraph lain
  <strong>
    <span>Span di dalam strong (tidak terkena selector)</span>
  </strong>
</p>
```

### Adjacent Sibling Combinator (+)

Elemen yang langsung berada setelah elemen lain:

```css
/* <h2> yang langsung di-follow <h1> */
h1 + h2 {
  margin-top: 0;
}

/* <p> yang langsung di-follow <img> */
img + p {
  margin-left: 20px;
}
```

### General Sibling Combinator (~)

Elemen yang berada setelah elemen lain (tapi gak harus langsung):

```css
/* Semua <p> yang ada setelah <h1> (sibling) */
h1 ~ p {
  color: darkgray;
}
```

---

# 3. Colors

Warna itu fundamental di CSS. Ada 4 cara ngasih warna: color names, RGB/RGBA, HEX, HSL/HSLA.

## Color Names

CSS punya 140+ nama warna yang bisa langsung dipake:

```css
body {
  background-color: white;
}

p {
  color: darkgray;
}

button {
  background-color: royalblue;
}

.warning {
  color: orangered;
}
```

Contoh: `red`, `blue`, `green`, `orange`, `purple`, `navy`, `teal`, `crimson`, dll.

> **Kekurangan:** Limited, gak bisa fine-tuning. Kalau mau warna spesifik, pakai RGB/HEX.

## RGB & RGBA

RGB = Red, Green, Blue (0-255 masing-masing). A = Alpha (transparansi 0-1).

```css
.box {
  background-color: rgb(255, 0, 0); /* Red murni */
}

.text {
  color: rgb(100, 150, 200); /* Blue muda */
}

.transparent-box {
  background-color: rgba(255, 0, 0, 0.5); /* Red dengan 50% transparansi */
}

.semi-transparent {
  background-color: rgba(0, 0, 0, 0.8); /* Hitam 80% opacity */
}
```

Praktis kalau mau presisi atau transparansi.

## HEX

Hexadecimal color codes (6 digit karakter). Paling populer karena ringkas:

```css
.primary {
  background-color: #3498db; /* Blue */
}

.danger {
  color: #e74c3c; /* Red */
}

.success {
  background-color: #2ecc71; /* Green */
}

.dark {
  background-color: #1a1a1a; /* Almost black */
}

/* Shorthand (kalau digit sama) */
.light-red {
  color: #ff0000; /* Bisa disingkat #f00 */
}
```

HEX lebih ringkas dari RGB dan lebih presisi dari color names.

## HSL & HSLA

HSL = Hue (0-360 derajat), Saturation (0-100%), Lightness (0-100%). A = Alpha.

```css
.pastel-blue {
  background-color: hsl(200, 70%, 60%);
}

.dark-green {
  color: hsl(120, 100%, 25%);
}

.transparent-yellow {
  background-color: hsla(60, 100%, 50%, 0.5);
}
```

Gampang banget ngatur nuansa. Hue 0-360 buat warna, saturation buat intensity, lightness buat brightness.

---

# 4. Text & Typography

Text styling itu banyak banget. Dari font, ukuran, weight, spacing, dll. Ini yang bikin website jadi readable atau jelek.

## Color

Warna teks:

```css
p {
  color: #333; /* Dark gray, typical text color */
}

h1 {
  color: navy;
}

.warning {
  color: #e74c3c; /* Red */
}
```

## Font Family

Jenis font. Ada serif, sans-serif, monospace. Kalau gak ada font yang diminta, browser pake fallback:

```css
body {
  font-family: Arial, sans-serif;
}

.elegant {
  font-family: Georgia, serif;
}

code {
  font-family: "Courier New", monospace;
}

/* Multiple fallbacks */
h1 {
  font-family: "Trebuchet MS", "Lucida Grande", sans-serif;
}
```

Browser coba font pertama, kalau gak ada pakai fallback.

## Font Size

Ukuran font. Bisa pakai px, em, rem, %, dll:

```css
body {
  font-size: 16px; /* Base size */
}

h1 {
  font-size: 32px;
}

small {
  font-size: 12px;
}

.large {
  font-size: 1.5em; /* 1.5x dari parent size */
}

.heading {
  font-size: 2rem; /* 2x dari root (html) size */
}
```

`rem` dan `em` lebih fleksibel dari `px` karena responsive.

## Font Weight

Ketebalan font (100, 300, 400, 700, 900):

```css
p {
  font-weight: 400; /* Normal */
}

strong {
  font-weight: 700; /* Bold */
}

.light-text {
  font-weight: 300; /* Light */
}

.heavy-text {
  font-weight: 900; /* Extra bold */
}
```

## Font Style

Italic atau normal:

```css
em {
  font-style: italic;
}

.normal {
  font-style: normal;
}

.italic {
  font-style: italic;
}

.oblique {
  font-style: oblique;
}
```

## Text Align

Alignment teks (left, center, right, justify):

```css
h1 {
  text-align: center;
}

.left-align {
  text-align: left;
}

.right-align {
  text-align: right;
}

.justify {
  text-align: justify;
}
```

## Line Height

Tinggi baris (spacing vertikal antar baris). Penting buat readability:

```css
p {
  line-height: 1.6; /* 1.6x font size */
}

.compact {
  line-height: 1.2;
}

.spacious {
  line-height: 2;
}
```

## Letter Spacing & Word Spacing

Spasi antar huruf dan kata:

```css
h1 {
  letter-spacing: 2px; /* Lebih renggang */
}

.narrow {
  letter-spacing: -1px; /* Lebih rapat */
}

.spread {
  word-spacing: 5px; /* Spasi antar kata */
}
```

## Text Decoration

Garis di teks (underline, overline, line-through):

```css
a {
  text-decoration: none; /* Hilangkan default underline di link */
}

.underline {
  text-decoration: underline;
}

.line-through {
  text-decoration: line-through;
}

.overline {
  text-decoration: overline;
}
```

## Text Transform

Kapitalisasi otomatis:

```css
h1 {
  text-transform: uppercase; /* SEMUA BESAR */
}

h2 {
  text-transform: lowercase; /* semua kecil */
}

h3 {
  text-transform: capitalize; /* Setiap Kata Besar Depan */
}

.normal {
  text-transform: none; /* Normal */
}
```

## Text Shadow

Shadow di teks:

```css
h1 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  /* offset-x, offset-y, blur-radius, color */
}

.glow {
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
}

.multiple-shadow {
  text-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.3),
    -2px -2px 4px rgba(255, 255, 255, 0.5);
}
```

## Web Fonts (Google Fonts)

Font dari internet (bukan default system fonts). Google Fonts paling populer:

```html
<!-- Di <head> -->
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

```css
body {
  font-family: "Roboto", sans-serif;
}

h1 {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
}
```

Google Fonts punya ratusan font gratis. Kunjungi [fonts.google.com](https://fonts.google.com).

---

# 5. Box Model

Setiap elemen HTML adalah kotak. Box model terdiri dari 4 layer: content, padding, border, margin. **Ini fundamental!**

Visualisasi:

![box-model](/materi-ss/box-model.png)

## Content

Isi sebenarnya (teks, gambar, dll). Ukuran bisa di-set dengan `width` dan `height`:

```css
.box {
  width: 300px;
  height: 200px;
  background-color: lightblue;
}

.responsive-box {
  width: 100%; /* 100% dari parent */
  height: auto; /* Auto adjust ke content */
}

.max-width {
  width: 100%;
  max-width: 1200px; /* Gak pernah lebih dari 1200px */
}
```

## Padding

Spasi **di dalam** elemen (antara content dan border):

```css
.box {
  padding: 20px; /* Semua sisi 20px */
}

.box-uneven {
  padding: 10px 20px; /* Top/Bottom 10px, Left/Right 20px */
}

.box-specific {
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
}

/* Shorthand: top, right, bottom, left (clockwise) */
.box-clockwise {
  padding: 10px 20px 10px 20px;
}
```

## Border

Garis di sekitar elemen:

```css
.border-basic {
  border: 1px solid black;
  /* width, style, color */
}

.border-thick {
  border: 5px solid navy;
}

.border-dashed {
  border: 2px dashed red;
}

.border-dotted {
  border: 1px dotted gray;
}

/* Specific sides */
.border-bottom {
  border-bottom: 2px solid blue;
}

.border-all-different {
  border-top: 1px solid red;
  border-right: 2px solid green;
  border-bottom: 3px solid blue;
  border-left: 4px solid yellow;
}
```

## Margin

Spasi **di luar** elemen (antara border dan elemen lain):

```css
.box {
  margin: 20px; /* Semua sisi */
}

.box-uneven {
  margin: 10px 20px; /* Top/Bottom 10px, Left/Right 20px */
}

.center-margin {
  margin-left: auto;
  margin-right: auto; /* Centering horizontal */
}

/* Or shorthand */
.center-shorthand {
  margin: 0 auto; /* Top/Bottom 0, Left/Right auto */
}
```

## Box Sizing

Default behavior CSS itu `box-sizing: content-box`, artinya width/height hanya content, padding dan border ditambah di atas itu.

Kalau `box-sizing: border-box`, width/height include padding dan border:

```css
/* Default (confusing) */
.box-content {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 300 + 20*2 + 5*2 = 370px! */
}

/* Better */
.box-border {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 300px (tetap!) */
}
```

**Pro Tips:** Pakai `box-sizing: border-box` di awal CSS (di `*`):

```css
* {
  box-sizing: border-box;
}
```

Ini bikin life lebih mudah. Width yang kamu set itu akurat.

---

# 6. Display Property

Display itu ngatur cara elemen ditampilkan dan bagaimana elemen lain berinteraksi dengannya.

## Block

Block element ambil satu baris penuh, elemen berikutnya otomatis pindah baris:

```css
div {
  display: block; /* Default untuk <div>, <p>, <h1>, etc */
  width: 100%;
  background-color: lightblue;
  margin: 10px 0;
}
```

Contoh block elements default: `<div>`, `<p>`, `<h1>-<h6>`, `<section>`, `<header>`, dll.

```html
<div>Box 1</div>
<div>Box 2</div>
<div>Box 3</div>
<!-- Masing-masing turun baris -->
```

## Inline

Inline element hanya ambil space yang diperlukan, tetap samping dengan elemen lain:

```css
span {
  display: inline; /* Default untuk <span>, <a>, <strong> */
  background-color: yellow;
  padding: 5px;
}
```

> **Catatan:** Kalau pakai `width` dan `height` di inline element, bakal di-ignore. Gunakan padding dan margin aja.

```html
<p>Ini <span>inline element</span> dalam teks.</p>
<!-- Span tetap samping, gak buat baris baru -->
```

## Inline-Block

Kombinasi block dan inline. Ambil space yang diperlukan (seperti inline) tapi bisa kasih width/height:

```css
.button {
  display: inline-block;
  width: 150px;
  padding: 10px;
  background-color: blue;
  color: white;
  text-align: center;
  margin: 5px;
}
```

Practical untuk buttons, badges, small cards:

```html
<button class="button">Button 1</button>
<button class="button">Button 2</button>
<button class="button">Button 3</button>
<!-- Buttons tetap samping, bisa punya width/height -->
```

## None

Elemen gak ditampilkan sama sekali, kayak hilang dari halaman:

```css
.hidden {
  display: none;
}

.modal.closed {
  display: none;
}
```

Sering dipakai dengan JavaScript buat show/hide elemen.

> **Berbeda dengan `visibility: hidden`** yang elemen masih ambil space tapi gak kelihatan. `display: none` elemen gak ambil space sama sekali.

---

# 7. Positioning

Positioning itu ngatur posisi elemen relatif ke parent atau viewport. Ada 5 type: static, relative, absolute, fixed, sticky.

## Static

Default behavior. Elemen mengikuti normal document flow:

```css
p {
  position: static; /* Default, gak perlu di-tulis */
}
```

## Relative

Elemen di-posisi relatif ke posisi normal-nya sendiri. Masih ambil space di document flow:

```css
.box {
  position: relative;
  top: 20px; /* Geser 20px dari atas */
  left: 30px; /* Geser 30px dari kiri */
}
```

Elemen masih ambil space original-nya, tapi visual-nya bergeser.

## Absolute

Elemen di-keluarkan dari document flow (gak ambil space), di-posisi relatif ke parent yang punya `position` (bukan static):

```css
.container {
  position: relative; /* Parent butuh position bukan static */
}

.absolute-box {
  position: absolute;
  top: 50px;
  left: 50px;
}
```

> **Important:** Kalau parent gak ada `position: relative/absolute/fixed`, absolute element akan relatif ke `<body>` atau `<html>`.

## Fixed

Elemen di-fix di viewport (window browser). Gak bergerak meskipun di-scroll:

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: navy;
  z-index: 1000; /* Supaya di atas elemen lain */
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
```

Praktis buat navbar, floating buttons, chat widgets.

## Sticky

Elemen stick di viewport ketika scroll mendekatinya, tapi tetap part of document flow:

```css
.header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
}
```

Elemen bakal tetap di atas saat scroll sampai parent-nya selesai.

## Z-Index

Atur stacking order (siapa di atas, siapa di bawah) ketika elemen overlap:

```css
.background {
  position: absolute;
  z-index: 1;
}

.content {
  position: absolute;
  z-index: 2; /* Di atas background */
}

.modal {
  position: fixed;
  z-index: 1000; /* Paling atas */
}
```

Nilai lebih tinggi = lebih atas.

> **Catatan:** Z-index hanya bekerja di elemen yang punya `position` (bukan static).

---

# 8. Backgrounds

Background itu layer di belakang content. Bisa solid color, image, gradient, dll.

## Background Color

Warna solid di belakang:

```css
body {
  background-color: #f5f5f5;
}

.card {
  background-color: white;
}

.header {
  background-color: navy;
}
```

## Background Image

Image sebagai background:

```css
.hero {
  background-image: url("/img/hero.jpg");
  width: 100%;
  height: 400px;
}

.pattern {
  background-image: url("/img/pattern.png");
}
```

> **Catatan:** Kalau image gak ada atau error, background bakal kosong. Bagus buat kasih background-color fallback.

## Background Repeat

Kontrol cara image di-repeat:

```css
.tile {
  background-image: url("/img/tile.png");
  background-repeat: repeat; /* Repeat horizontal dan vertikal */
}

.stripe {
  background-image: url("/img/stripe.png");
  background-repeat: repeat-x; /* Repeat hanya horizontal */
}

.line {
  background-image: url("/img/line.png");
  background-repeat: repeat-y; /* Repeat hanya vertikal */
}

.no-repeat {
  background-image: url("/img/icon.png");
  background-repeat: no-repeat; /* Gak repeat */
}
```

## Background Position

Posisi image di dalam background:

```css
.hero {
  background-image: url("/img/hero.jpg");
  background-position: center; /* Center image */
  background-size: cover;
}

.top-left {
  background-position: top left;
}

.custom {
  background-position: 50px 100px; /* 50px dari kiri, 100px dari atas */
}

.percentage {
  background-position: 50% 50%; /* Center dengan percentage */
}
```

## Background Size

Ukuran image background:

```css
.cover {
  background-image: url("/img/bg.jpg");
  background-size: cover; /* Cover seluruh area, bisa crop */
  width: 100%;
  height: 300px;
}

.contain {
  background-size: contain; /* Fit seluruh image tanpa crop */
}

.specific {
  background-size: 200px 150px; /* Width 200px, height 150px */
}

.percentage {
  background-size: 50% 50%; /* 50% dari container */
}
```

## Gradients (Linear & Radial)

Background gradient biar smooth dari satu warna ke warna lain.

### Linear Gradient

```css
.gradient-right {
  background: linear-gradient(to right, blue, red);
  height: 100px;
}

.gradient-diagonal {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.gradient-multi {
  background: linear-gradient(
    to right,
    #ff0000 0%,
    #ffff00 25%,
    #00ff00 50%,
    #00ffff 75%,
    #0000ff 100%
  );
}
```

### Radial Gradient

```css
.gradient-circle {
  background: radial-gradient(circle, yellow, red);
  height: 200px;
  width: 200px;
}

.gradient-ellipse {
  background: radial-gradient(ellipse, blue, green);
}

.gradient-positioned {
  background: radial-gradient(circle at 30% 30%, white, black);
}
```

---

# 9. Borders & Shadows

Border dan shadow bikin elemen jadi lebih depth dan visual.

## Border Width, Style, Color

```css
.border-basic {
  border: 1px solid black;
  /* width, style, color */
}

.border-thick {
  border: 5px dashed red;
}

.border-specific {
  border-top: 2px solid blue;
  border-right: 1px dotted green;
  border-bottom: 3px double purple;
  border-left: 4px solid orange;
}

/* Styles: solid, dashed, dotted, double, groove, ridge, inset, outset */
.border-styles {
  border: 2px solid black; /* Solid */
  border-style: dashed; /* Dashed */
  border-style: dotted; /* Dotted */
  border-style: double; /* Double */
}
```

## Border Radius

Rounded corner:

```css
.slight-round {
  border-radius: 5px; /* Semua corner 5px */
}

.very-round {
  border-radius: 20px;
}

.pill-shape {
  border-radius: 50px; /* Full rounded */
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%; /* Perfect circle */
}

.custom-radius {
  border-radius: 10px 20px 30px 40px;
  /* top-left, top-right, bottom-right, bottom-left */
}
```

## Box Shadow

Shadow di sekitar elemen:

```css
.subtle-shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* offset-x, offset-y, blur-radius, color */
}

.dramatic-shadow {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.colored-shadow {
  box-shadow: 5px 5px 0 #ff0000; /* Red shadow, no blur */
}

.multiple-shadows {
  box-shadow:
    1px 1px 0 #000,
    2px 2px 0 #111,
    3px 3px 0 #222;
  /* Layered effect */
}

.inset-shadow {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  /* Shadow di dalam elemen */
}
```

---

# 10. Flexbox Layout

Flexbox itu powerful layout system. Buat align dan distribute items dengan mudah. Ini era modern CSS yang bakal kamu pakai terus!

## Flex Container vs Flex Items

Container = parent dengan `display: flex`. Items = children di dalamnya.

```html
<!-- Container -->
<div class="flex-container">
  <!-- Items -->
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>
```

```css
.flex-container {
  display: flex; /* Ini jadi flex container */
}

.flex-item {
  /* Ini otomatis jadi flex items */
}
```

## Flex Direction

Arah items (horizontal atau vertikal):

```css
.flex-row {
  display: flex;
  flex-direction: row; /* Default, horizontal L-R */
}

.flex-column {
  display: flex;
  flex-direction: column; /* Vertical T-B */
}

.flex-reverse {
  display: flex;
  flex-direction: row-reverse; /* Horizontal R-L */
}
```

## Justify Content

Align items dalam axis utama (horizontal kalau `flex-direction: row`):

```css
.justify-start {
  display: flex;
  justify-content: flex-start; /* Items di kiri (default) */
}

.justify-center {
  display: flex;
  justify-content: center; /* Items di tengah */
}

.justify-end {
  display: flex;
  justify-content: flex-end; /* Items di kanan */
}

.justify-space-between {
  display: flex;
  justify-content: space-between; /* Items spread dengan space sama antara */
}

.justify-space-around {
  display: flex;
  justify-content: space-around; /* Items spread dengan space sama */
}

.justify-space-evenly {
  display: flex;
  justify-content: space-evenly; /* Perfectly even spacing */
}
```

## Align Items & Align Self

Align items dalam axis cross (vertikal kalau `flex-direction: row`):

```css
.align-start {
  display: flex;
  align-items: flex-start; /* Items di atas */
}

.align-center {
  display: flex;
  align-items: center; /* Items di tengah vertikal */
  height: 200px; /* Butuh height biar keliatan */
}

.align-end {
  display: flex;
  align-items: flex-end; /* Items di bawah */
}

.align-stretch {
  display: flex;
  align-items: stretch; /* Items stretch penuh (default) */
}
```

`align-self` buat individual item:

```css
.flex-item.special {
  align-self: center; /* Item ini center, yang lain normal */
}
```

## Flex Wrap

Kontrol apakah items wrap ke baris/kolom baru:

```css
.no-wrap {
  display: flex;
  flex-wrap: nowrap; /* Default, semua items dalam 1 baris */
}

.wrap {
  display: flex;
  flex-wrap: wrap; /* Items wrap ke baris baru kalau perlu */
}

.wrap-reverse {
  display: flex;
  flex-wrap: wrap-reverse; /* Wrap tapi reverse direction */
}
```

## Flex Grow, Shrink, Basis

Kontrol ukuran individual items:

```css
.flex-item {
  flex-basis: 100px; /* Base width */
  flex-grow: 1; /* Grow 1x dari available space */
  flex-shrink: 1; /* Shrink 1x kalau kurang space */
}

/* Shorthand */
.flex-item {
  flex: 1 1 100px; /* grow, shrink, basis */
}

.flex-double {
  flex: 2; /* Grow 2x dari yang lain */
}
```

## Gap

Spasi antar items (lebih praktis dari margin):

```css
.flex-container {
  display: flex;
  gap: 20px; /* Spasi 20px antar items */
}

.uneven-gap {
  display: flex;
  gap: 10px 20px; /* Row gap 10px, column gap 20px */
}
```

---

# 11. CSS Grid Layout

Grid itu 2D layout system. Lebih powerful dari flexbox kalau mau complex layouts. Flexbox = 1D (row atau column), Grid = 2D (row DAN column).

## Grid Container vs Grid Items

```html
<div class="grid-container">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
  <!-- More items -->
</div>
```

```css
.grid-container {
  display: grid; /* Ini grid container */
}
```

## Grid Template Columns / Rows

Define ukuran kolom dan baris:

```css
/* 3 kolom dengan width sama */
.grid-3col {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

/* 3 kolom dengan width berbeda */
.grid-mixed {
  display: grid;
  grid-template-columns: 200px 1fr 300px;
  /* Fixed, flexible, fixed */
}

/* Define baris */
.grid-rows {
  display: grid;
  grid-template-rows: 100px 200px auto;
}

/* Repeat */
.grid-repeat {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 kolom equal */
}

/* Auto fit */
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* Responsive, minimal 200px, maksimal 1fr */
}
```

## Grid Gap

Spasi antar cells:

```css
.grid-gap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; /* Spasi 20px */
}

.uneven-gap {
  display: grid;
  gap: 10px 20px; /* Row gap 10px, column gap 20px */
}
```

## Grid Column / Row (Spanning)

Elemen span multiple columns/rows:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.wide-item {
  grid-column: span 2; /* Span 2 kolom */
}

.tall-item {
  grid-row: span 3; /* Span 3 baris */
}

.specific {
  grid-column: 1 / 3; /* Dari kolom 1 ke 3 */
  grid-row: 2 / 4; /* Dari baris 2 ke 4 */
}
```

## Justify / Align Items & Content

Align items dan content dalam grid:

```css
.grid-center {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  justify-items: center; /* Center items horizontal */
  align-items: center; /* Center items vertikal */
}

.grid-space {
  display: grid;
  justify-content: space-between; /* Spread columns */
  align-content: space-between; /* Spread rows */
}
```

---

# 12. Media Queries & Responsiveness

Responsiveness = website looks good di semua ukuran screen. Media queries = CSS rules yang apply kalau kondisi tertentu terpenuhi (misal screen width).

## Viewport Meta Tag

Di HTML `<head>`, **WAJIB ada** buat responsive:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Ini bilang browser: "Gunakan device width sebagai viewport width, zoom default 1x."

## Mobile-First vs Desktop-First

**Mobile-First:** Style buat mobile dulu, terus add styles buat desktop:

```css
/* Base styles (mobile) */
body {
  font-size: 14px;
}

.container {
  width: 100%;
}

/* Desktop */
@media (min-width: 768px) {
  body {
    font-size: 16px;
  }

  .container {
    width: 750px;
  }
}
```

**Desktop-First:** Style buat desktop dulu, terus override buat mobile:

```css
/* Base styles (desktop) */
body {
  font-size: 16px;
}

.container {
  width: 1200px;
}

/* Mobile */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }

  .container {
    width: 100%;
  }
}
```

> **Rekomendasi:** Pakai mobile-first. Lebih practical dan performant.

## Breakpoints

Ukuran screen yang jadi "batas" styling. Standar:

```css
/* Mobile: 0-599px */
/* Tablet: 600-999px */
/* Desktop: 1000px+ */

@media (min-width: 600px) {
  /* Tablet styles */
}

@media (min-width: 1000px) {
  /* Desktop styles */
}

/* Custom breakpoints */
@media (min-width: 768px) {
  /* Your breakpoint */
}
```

Contoh lengkap:

```css
/* Mobile first */
.container {
  width: 100%;
  padding: 10px;
  font-size: 14px;
}

@media (min-width: 600px) {
  .container {
    width: 90%;
    padding: 20px;
    font-size: 15px;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 1000px;
    padding: 30px;
    font-size: 16px;
  }
}
```

---

# 13. Pseudo-classes & Pseudo-elements

Pseudo-classes dan pseudo-elements itu cara select elemen dalam state tertentu atau bagian specific. Banyak banget kegunaan!

## Pseudo-classes

Pseudo-classes select elemen dalam state tertentu.

### Common Pseudo-classes:

```css
/* Link states */
a:link {
  color: blue;
}

a:visited {
  color: purple;
}

a:hover {
  color: red;
  text-decoration: underline;
}

a:active {
  color: darkred;
}

/* Focus (keyboard atau click) */
input:focus {
  outline: 2px solid blue;
  background-color: lightyellow;
}

/* Disabled */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Hover */
.button:hover {
  background-color: darkblue;
  transform: scale(1.05);
}

/* First dan last child */
li:first-child {
  font-weight: bold;
}

li:last-child {
  margin-bottom: 0;
}

/* nth-child */
tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:nth-child(odd) {
  background-color: white;
}

/* nth-child formula */
li:nth-child(3n) {
  color: red; /* Every 3rd item */
}

/* Type-based selection */
li:nth-of-type(2) {
  color: green; /* 2nd <li> diantara siblings */
}

/* Empty */
p:empty {
  display: none;
}

/* Not (negation) */
p:not(.skip) {
  margin-bottom: 20px;
}
```

## Pseudo-elements

Pseudo-elements create "virtual" elements atau bagian specific dari elemen.

### Common Pseudo-elements:

```css
/* ::before - Insert content sebelum elemen */
.quote::before {
  content: '"';
  font-size: 2em;
}

.quote::after {
  content: '"';
  font-size: 2em;
}

/* Practical: Icon pseudo-element */
.icon-star::before {
  content: "★";
  color: gold;
  margin-right: 5px;
}

/* ::first-line - Style baris pertama */
p::first-line {
  font-weight: bold;
  color: navy;
}

/* ::first-letter - Style huruf pertama */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
  color: red;
}

/* ::selection - Style saat text di-select */
p::selection {
  background-color: yellow;
  color: black;
}

/* ::placeholder - Style placeholder di input */
input::placeholder {
  color: gray;
  font-style: italic;
}
```

---

# 14. Transitions & Animations

Transitions dan animations bikin website lebih smooth dan interactive. Ini yang bikin UX lebih oke!

## Transitions

Smooth change dari satu state ke state lain (misal hover):

```css
.button {
  background-color: blue;
  color: white;
  transition: background-color 0.3s ease;
  /* property, duration, timing-function */
}

.button:hover {
  background-color: darkblue;
}
```

Waktu transisi 0.3 detik, smooth (ease).

### Transition Properties:

```css
.element {
  /* Transition all properties */
  transition: all 0.3s ease;

  /* Specific property */
  transition: background-color 0.5s linear;

  /* Multiple properties */
  transition:
    background-color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

/* Separate properties */
.element {
  transition-property: background-color, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-delay: 0.1s; /* Delay sebelum transition start */
}
```

### Timing Functions:

```css
.ease {
  transition-timing-function: ease; /* Default, slow start/end */
}

.linear {
  transition-timing-function: linear; /* Constant speed */
}

.ease-in {
  transition-timing-function: ease-in; /* Slow start */
}

.ease-out {
  transition-timing-function: ease-out; /* Slow end */
}

.ease-in-out {
  transition-timing-function: ease-in-out; /* Slow start & end */
}

.cubic {
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

## Keyframes & Animations

Keyframes define animation steps. Lebih complex dari transitions:

```css
/* Define keyframes */
@keyframes slide-in {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Apply animation */
.banner {
  animation: slide-in 1s ease-in-out;
}
```

### Animation Properties:

```css
.element {
  animation-name: slide-in;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-delay: 0.2s;
  animation-iteration-count: 1; /* Berapa kali repeat (atau infinite) */
  animation-direction: normal; /* normal, reverse, alternate */
}

/* Shorthand */
.element {
  animation: slide-in 1s ease-in-out 0.2s 1 normal;
  /* name, duration, timing, delay, count, direction */
}
```

### Contoh Animations:

```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.fading-element {
  animation: fade-in 1s ease;
}

.bouncing-ball {
  animation: bounce 1s infinite;
}

.spinning-loader {
  animation: rotate 2s linear infinite;
}
```

---

# 15. CSS Variables (Custom Properties)

CSS variables (custom properties) = reusable values di CSS. Praktis buat warna, ukuran, font yang repeat berkali-kali.

## Declaring Variables

Variable di-deklarasi dengan `--nama-variable`:

```css
/* Global variables */
:root {
  --primary-color: #3498db;
  --secondary-color: #e74c3c;
  --padding-standard: 20px;
  --font-family-main: "Arial", sans-serif;
  --border-radius: 8px;
}

/* Local variables (dalam selector) */
.container {
  --local-width: 1200px;
}
```

## Using Variables

Pakai `var(--nama-variable)`:

```css
button {
  background-color: var(--primary-color);
  padding: var(--padding-standard);
  border-radius: var(--border-radius);
  font-family: var(--font-family-main);
}

.alert {
  color: var(--secondary-color);
  padding: var(--padding-standard);
}

.container {
  width: var(--local-width);
}
```

## Global vs Local Scope

```css
:root {
  --global-color: blue;
}

.parent {
  --local-color: red;
}

.parent .child {
  color: var(--local-color); /* Red, dari parent */
}

.other {
  color: var(--global-color); /* Blue, dari root */
}
```

## Fallback Values

Kalau variable gak ada, pakai fallback:

```css
.element {
  color: var(--primary-color, blue); /* Fallback: blue */
  padding: var(--custom-padding, 15px); /* Fallback: 15px */
}
```

## Responsive Variables

Variables bisa berubah di media queries:

```css
:root {
  --font-size-body: 14px;
  --padding: 10px;
}

@media (min-width: 768px) {
  :root {
    --font-size-body: 16px;
    --padding: 20px;
  }
}

body {
  font-size: var(--font-size-body);
  padding: var(--padding);
}
```

---

# 16. Flexbox & Grid Best Practices + Pengayaan

Sekarang kita gabungkan semuanya dan bikin layout yang actual, praktis, dan modern!

## Navbar dengan Flexbox

Navbar itu classic use case flexbox:

```html
<nav class="navbar">
  <div class="navbar-brand">MyLogo</div>
  <ul class="navbar-menu">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: navy;
  padding: 15px 30px;
}

.navbar-brand {
  color: white;
  font-weight: bold;
  font-size: 20px;
}

.navbar-menu {
  display: flex;
  list-style: none;
  gap: 30px;
}

.navbar-menu a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar-menu a:hover {
  color: yellow;
}
```

## Card Grid Layout

Cards itu common pattern. Responsive card grid:

```html
<div class="cards-container">
  <div class="card">
    <img src="/img/project.jpg" alt="Project" />
    <h3>Project Title</h3>
    <p>Description</p>
  </div>
  <!-- More cards -->
</div>
```

```css
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card h3 {
  padding: 15px;
  margin: 0;
}

.card p {
  padding: 0 15px 15px;
}
```

## Complex Layout (Header, Sidebar, Main, Footer)

Ini layout website typical:

```html
<div class="app-layout">
  <header class="app-header">Header</header>
  <div class="app-body">
    <aside class="app-sidebar">Sidebar</aside>
    <main class="app-main">Main Content</main>
  </div>
  <footer class="app-footer">Footer</footer>
</div>
```

```css
.app-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.app-header {
  background-color: #333;
  color: white;
  padding: 20px;
  grid-column: 1 / -1;
}

.app-body {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
}

.app-sidebar {
  background-color: #f0f0f0;
  padding: 20px;
  overflow-y: auto;
}

.app-main {
  padding: 20px;
}

.app-footer {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .app-body {
    grid-template-columns: 1fr;
  }

  .app-sidebar {
    order: 2; /* Push sidebar ke bawah di mobile */
  }

  .app-main {
    order: 1;
  }
}
```

---

# 🎓 Tugas Mandiri: Redesign Portfolio dengan CSS Modern

Alright! Ini saatnya kamu apply **SEMUA** CSS yang udah dipelajari dalam project yang actual.

## 🎯 Deskripsi Tugas

Kamu akan **redesign portfolio website** yang udah dibuat di modul HTML dengan CSS modern. Fokus pada:

- Layout yang rapih (flexbox/grid)
- Typography yang bagus
- Colors & styling yang cohesive
- Hover effects dan transitions
- Responsive design

## 📋 Requirement Technical:

### CSS Features yang WAJIB dipakai:

✅ **Selectors:**

- Minimal 2 type dari: class, ID, attribute, pseudo-class
- Minimal 1 combinator (descendant atau child)

✅ **Colors & Typography:**

- Minimal 2 dari: color names, HEX, RGB, HSL
- Font family dari Google Fonts
- Text styling (weight, size, line-height, align)

✅ **Box Model:**

- Proper padding, margin, border di card/containers
- `box-sizing: border-box` di `*`

✅ **Layouts:**

- Minimal 1 flexbox (navbar, button group, atau hero)
- Minimal 1 grid (cards, atau section layout)

✅ **Interactive Effects:**

- Minimal 2 transitions (hover pada link, button, card)
- Minimal 1 pseudo-class (`:hover`, `:focus`, `:nth-child`, dll)

✅ **Responsive:**

- Mobile-first approach
- Minimal 2 breakpoints (tablet 600px+, desktop 1000px+)

✅ **Advanced (Bonus):**

- CSS variables (colors, spacing)
- Pseudo-elements (`:before`, `:after`)
- Animation (fade-in, bounce, dll)
- Box shadow & border-radius

### File Structure:

```
portfolio-redesigned/
├── index.html
├── styles.css
├── script.js (buat mobile navbar/yang lainnya)
└── img/
    └── (placeholder gambar)
```

---

## 📝 Kriteria Penilaian

| Aspek                      | Point | Catatan                                           |
| -------------------------- | ----- | ------------------------------------------------- |
| **Layout (Flexbox/Grid)**  | 25    | Navbar, cards, sections structured properly       |
| **Typography & Colors**    | 20    | Font pakai Google Fonts, color scheme cohesive    |
| **Responsive Design**      | 20    | Mobile, tablet, desktop semua responsive          |
| **Interactive Effects**    | 15    | Smooth transitions, hover effects, pseudo-classes |
| **CSS Features Usage**     | 15    | Selectors, box model, advanced CSS dipakai        |
| **Overall Visual Quality** | 5     | Rapi, professional, tidak berantakan              |
| **TOTAL**                  | 100   | - |

---

## 💡 Tips & Hints:

1. **Mulai dari struktur (sudah dari HTML modul)**
2. **Reset default styles:**

   ```css
   * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
   }
   ```

3. **Bikin color scheme dulu** (pakai CSS variables):

   ```css
   :root {
     --primary-color: #3498db;
     --secondary-color: #2c3e50;
     --accent-color: #e74c3c;
   }
   ```

4. **Mobile-first approach:**
   - Style mobile base dulu (100% width, single column, etc)
   - Terus add media queries buat tablet/desktop

5. **Typography hierarchy:**
   - H1 paling besar (32-36px)
   - H2 medium (24-28px)
   - Body text normal (14-16px)
   - Line-height minimal 1.5 buat readability

6. **Spacing consistency:**
   - Pakai CSS variables buat padding/margin standard (10px, 20px, 30px)
   - Jangan random values

7. **Testing:**
   - Check di mobile (F12 → device toolbar)
   - Check hover effects bekerja
   - Check transitions smooth
   - Check responsive breakpoints

---

## 🌟 Visual Checklist:

- [ ] Navbar looks professional dengan logo dan menu
- [ ] Hero section eye-catching dengan background/gradient
- [ ] About section readable dengan good typography
- [ ] Skills table styled rapih dengan proper spacing
- [ ] Projects cards look polished dengan hover effects
- [ ] Contact form clean dan usable
- [ ] Footer proper styling dan contact info
- [ ] Responsive design works di semua screen sizes
- [ ] Colors consistent throughout
- [ ] No layout breaks di mobile/tablet/desktop

---

## 🚀 Bonus Challenge (Optional):

- Buat animated hamburger menu buat mobile (flexbox + JavaScript)
- Buat sticky navbar yang stick saat scroll
- Buat smooth scroll ke section (pakai anchor links)
- Buat dark mode toggle (CSS variables + JavaScript)
- Buat loading animation di hero section
- Buat card flip effect pakai 3D transforms

**Good luck! Portfolio ini adalah showcase CSS skill kamu. Bikin yang terbaik! 💪**

---

# 📖 Ringkasan & Next Steps

Congrats! Kamu udah menguasai CSS fundamental sampai advanced! Ini ringkas apa yang udah dipelajari:

## ✅ Yang Sudah Dikuasai:

1. ✅ CSS Fundamentals (selectors, properties, values)
2. ✅ Colors (HEX, RGB, HSL)
3. ✅ Typography (fonts, sizes, styling)
4. ✅ Box Model (padding, margin, border)
5. ✅ Display & Positioning
6. ✅ Backgrounds & Gradients
7. ✅ Borders & Shadows
8. ✅ Flexbox (1D Layout)
9. ✅ CSS Grid (2D Layout)
10. ✅ Responsive Design (Media Queries)
11. ✅ Pseudo-classes & Pseudo-elements
12. ✅ Transitions & Animations
13. ✅ CSS Variables
14. ✅ Modern Layout Patterns

## 🎓 Next Steps:

1. **Practicum:** Build websites, lots of them!
2. **SCSS/SASS** - CSS preprocessor, lebih powerful
3. **Tailwind CSS / Bootstrap** - CSS frameworks
4. **CSS Methodologies** - BEM, SMACSS (organize large CSS)
5. **Performance** - Optimize CSS loading
6. **Accessibility** - a11y CSS patterns

## 📚 Resources:

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS) - Lengkap & resmi
- [CSS Tricks](https://css-tricks.com/) - Tips dan tricks
- [Flexbox Froggy](https://flexboxfroggy.com/) - Game buat learn flexbox
- [Grid Garden](https://cssgridgarden.com/) - Game buat learn grid
- [Animista](https://animista.net/) - Animation library
- [Coolors](https://coolors.co/) - Color palette generator

---

**Selamat! Kamu sudah expert di CSS. Saatnya gabung HTML + CSS + JavaScript dan bikin sesuatu yang keren! 🚀**