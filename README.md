# PANDUAN LMS divisi SOFTWARE

# 📋 Golden Rules (Sistem Halaman & Daftar Isi)

Karena web kita membaca Markdown untuk membuat halaman secara dinamis, aturan nomor satu ini wajib diikuti:

1. Pembagian Halaman Menggunakan Heading 1 (# )
   Web memotong file .md menjadi beberapa halaman (Pagination) berdasarkan Heading 1. Setiap kali ada tanda # di awal baris, web akan menganggap itu sebagai Halaman Baru sekaligus Judul di Daftar Isi (Sidebar).

❌ Salah (Jangan jadikan # sebagai judul kecil):

Markdown

# Pengenalan

Ini teks pengenalan.

# Sub Pengenalan (Ini malah akan jadi halaman baru dan terpotong!)

Ini teks sub pengenalan.
✅ Benar (Satu # untuk satu halaman):

Markdown

# 1. Pengenalan HTML

Ini adalah halaman pertama. (Halaman 1)

# 2. Struktur Dasar HTML

Ini adalah halaman kedua. Semua teks di bawahnya masuk ke halaman 2. (Halaman 2) 2. Gunakan ## atau ### untuk Sub-Bab
Untuk membuat judul di dalam halaman yang sama, gunakan Heading 2 atau Heading 3. Ini akan dirender dengan warna Tosca dan Teal khas UKM-mu.

Markdown

## Apa itu Tag HTML?

Tag HTML adalah blablabla...

### Aturan Penulisan Tag

1. Harus dibuka dan ditutup.
   🎨 Aturan Format Konten (Code, Gambar, & Tabel)
2. Penulisan Blok Kode (Syntax Highlighting)
   Agar kode dirender dengan warna cantik (mirip VS Code), kamu wajib menambahkan nama bahasa pemrograman tepat di sebelah backtick (```).

✅ Benar (Akan berwarna):

❌ Salah (Hanya jadi teks abu-abu biasa):

4. Memasukkan Gambar (Image)
   Karena aplikasi kita tidak menggunakan database, letakkan semua gambar di dalam folder public/img/ di proyek React-mu.

Cara memanggilnya di Markdown harus menggunakan awalan garis miring / (merujuk ke folder public).

Markdown
![Ilustrasi Struktur DOM](/img/struktur-dom.png)
(Catatan: Web sudah kita atur agar gambar otomatis membulat (rounded) dan responsif tidak melebihi layar).

5. Membuat Tabel
   Tabel sudah kita atur agar rapi dan bisa di-scroll menyamping di HP. Gunakan format standar Markdown:

Markdown
| Tipe Data | Keterangan | Contoh |
| --- | --- | --- |
| String | Teks biasa | "Halo" |
| Number | Angka | 100 |
| Boolean | Benar/Salah | true | 6. Catatan Penting (Blockquote)
Untuk memberikan catatan atau warning kepada pembaca, gunakan tanda >. Web akan merendernya menjadi kotak elegan dengan garis kiri berwarna Tosca.

Markdown

> **Perhatian:** Jangan lupa titik koma (;) di akhir baris JavaScript!

```
lms-app/
│
├── public/                  <-- Tempat menyimpan data murni
│   ├── materi/
│   │   ├── pertemuan-1.md   <-- File materi Markdown
│   │   ├── pertemuan-2.md
│   │   └── pertemuan-3.md
│   └── silabus.json         <-- "Database" dummy berisi daftar materi
│
├── src/
│   ├── components/          <-- Komponen yang bisa dipakai berulang
│   │   ├── Navbar.jsx
│   │   ├── MarkdownViewer.jsx <-- Jantung aplikasinya (Render MD to HTML)
│   │   └── CourseCard.jsx
│   │
│   ├── pages/               <-- Komponen Halaman (Views)
│   │   ├── LandingPage.jsx
│   │   ├── SilabusPage.jsx
│   │   └── MateriDetail.jsx
│   │
│   ├── store/               <-- State Management
│   │   └── useProgressStore.js <-- Menyimpan state (materi terbuka/terkunci)
│   │
│   ├── App.jsx              <-- Konfigurasi React Router diletakkan di sini
│   ├── main.jsx
│   └── index.css            <-- Konfigurasi warna kamu di sini
│
├── tailwind.config.js       <-- (Biarkan default, pastikan path 'content' sudah benar)
└── package.json
```

---

# Panduan Kontribusi Soal Knowledge Check

Dokumen ini menjelaskan format dan aturan penambahan soal untuk fitur **Knowledge Check** pada LMS Web.

## Lokasi File

Seluruh data kuis disimpan pada:

```text
public/data/quizzes.json
```

## Relasi dengan Modul

Setiap kuis terhubung ke materi berdasarkan **ID Modul** yang terdapat pada `public/silabus.json`.

Contoh:

```json
{
  "id": 4,
  "title": "Pertemuan 4 - SQL : Penggabungan Tabel (JOIN) dan Subqueries",
  "file": "/materi/pertemuan-4-m4.md"
}
```

Maka seluruh soal untuk materi tersebut harus berada pada key `"4"` di `quizzes.json`.

```json
{
  "4": []
}
```

## Format Soal Pilihan Ganda

```json
{
  "4": [
    {
      "id": 1,
      "question": "Perintah SQL apa yang digunakan untuk menggabungkan baris dari dua tabel berdasarkan kolom yang berelasi?",
      "options": [
        "MERGE",
        "COMBINE",
        "JOIN",
        "APPEND"
      ],
      "correctAnswer": 2
    }
  ]
}
```

### Properti

| Properti        | Keterangan                              |
| --------------- | --------------------------------------- |
| `id`            | Nomor unik soal dalam modul             |
| `question`      | Teks pertanyaan                         |
| `options`       | Daftar pilihan jawaban                  |
| `correctAnswer` | Indeks jawaban benar (dimulai dari `0`) |

Contoh:

```text
0 = MERGE
1 = COMBINE
2 = JOIN ✅
3 = APPEND
```

## Format Soal dengan Blok Kode

Untuk soal yang memerlukan potongan kode, gunakan `codeSnippet` dan `language`.

```json
{
  "4": [
    {
      "id": 2,
      "question": "Berdasarkan query berikut, data apa yang akan dihasilkan?",
      "codeSnippet": "SELECT users.name, orders.total\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;",
      "language": "sql",
      "options": [
        "Semua user beserta total ordernya",
        "Hanya user yang memiliki order",
        "Akan menghasilkan error",
        "Hanya order tanpa user_id"
      ],
      "correctAnswer": 1
    }
  ]
}
```

### Properti Tambahan

| Properti      | Keterangan                                   |
| ------------- | -------------------------------------------- |
| `codeSnippet` | Potongan kode yang akan ditampilkan          |
| `language`    | Bahasa pemrograman untuk syntax highlighting |

Nilai `language` yang umum digunakan:

```text
javascript
html
css
sql
json
```

## Aturan Kontribusi

1. Pastikan format JSON valid dan tidak mengandung trailing comma.
2. Gunakan ID modul sebagai key string, misalnya `"1"`, `"2"`, `"3"`.
3. Verifikasi file dengan JSON Validator sebelum melakukan commit.
4. Jika sebuah modul belum memiliki kuis, sistem akan menganggap modul tersebut lulus secara otomatis.
5. Nilai kelulusan Knowledge Check adalah **70%**.
