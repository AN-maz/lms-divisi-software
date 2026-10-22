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
   Letakkan gambar di dalam `public/img/` (buat foldernya bila belum ada) agar bisa diakses sebagai aset statis.

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
├── public/                        <-- Tempat menyimpan data murni
│   ├── content/                   <-- Semua konten kurikulum
│   │   ├── kurikulum.json         <-- MANIFEST: daftar pertemuan + modul
│   │   ├── materi/                <-- Materi Markdown, 1 file per modul
│   │   │   ├── pertemuan-01/
│   │   │   │   └── modul-01-dasar-dasar-html.md
│   │   │   ├── pertemuan-02/
│   │   │   │   └── modul-02-konsep-dasar-css.md
│   │   │   └── ... (sampai pertemuan-10, 19 modul)
│   │   ├── kuis/                  <-- Soal kuis, 1 file JSON per modul
│   │   │   ├── modul-01.json
│   │   │   ├── modul-02.json
│   │   │   └── ... (modul-13, 16-19 belum punya kuis)
│   │   └── debugging-jiwa/
│   │       └── kesadaran-organik.md
│   └── data/                      <-- Data aplikasi (bukan kurikulum)
│       └── mentors.json           <-- Data tim pengurus
│
├── scripts/
│   ├── migrate-content.mjs        <-- Migrasi konten (sekali pakai)
│   └── validate-content.mjs       <-- Validasi integritas konten
│
├── .aislop/                       <-- Konfigurasi quality gate "aislop"
│   ├── config.yml
│   └── rules.yml
│
├── src/
│   ├── components/        <-- Komponen yang bisa dipakai berulang
│   │   ├── FloatTimeIndicator.jsx <-- Timer Pomodoro & indikator status
│   │   ├── GerbangSanksi.jsx      <-- Anti-tab switch quiz
│   │   └── MarkdownViewer.jsx     <-- Jantung aplikasinya (Render MD to HTML)
│   │
│   ├── hooks/             <-- Custom React Hook
│   │   └── useDataLoader.js       <-- Hook pemuat data (loading/error/refetch)
│   │
│   ├── pages/            <-- Komponen Halaman (Views)
│   │   ├── EksplorasiPage.jsx      <-- Halaman membaca materi Markdown
│   │   ├── LandingPage.jsx         <-- Halaman beranda dengan hero & tim
│   │   ├── ModuleHubPage.jsx       <-- Pusat kontrol modul
│   │   ├── QuizPage.jsx           <-- Halaman kuis interaktif
│   │   └── SilabusPage.jsx         <-- Halaman peta jalan belajar
│   │
│   ├── services/         <-- Service layer untuk data handling
│   │   └── dataService.js        <-- fetchData + cache + dataSources (kurikulum/mentors/kuis)
│   │
│   ├── store/           <-- State Management (Zustand)
│   │   └── useProgressStore.js   <-- Menyimpan state (materi terbuka/terkunci)
│   │
│   ├── utils/           <-- Utility functions
│   │   └── index.js             <-- shuffleArray, calculateQuizScore
│   │
│   ├── App.jsx          <-- Konfigurasi React Router
│   ├── main.jsx
│   └── index.css        <-- Konfigurasi warna & styling
│
└── package.json
```

---

# Panduan Kontribusi Konten

Semua konten (materi & kuis) berada di dalam `public/content/`, satu file per modul. Tujuannya: satu modul = satu PR, diff kecil, tidak ada merge conflict di file raksasa.

## 1. Menambah / Mengubah Materi

**Lokasi file** — di dalam folder pertemuan, dengan nama `modul-NN-slug.md`:

```text
public/content/materi/pertemuan-04/
├── modul-05-pengenalan-ddl.md
├── modul-06-dml-dan-constraints.md
└── ...
```

`NN` = **ID modul**, sama dengan `id` di `kurikulum.json`.

**Konvensi Heading** — lihat **Golden Rules** di atas. Setiap `#` (Heading 1) memotong halaman jadi satu section di sidebar. Gunakan `##`/`###` untuk sub-bab.

**Daftarkan di manifest** — tambahkan entri di `public/content/kurikulum.json`:

```json
{
  "id": 20,
  "title": "Judul Modul Baru",
  "file": "/content/materi/pertemuan-11/modul-20-judul-modul-baru.md"
}
```

Modul baru harus ditaruh di dalam `pertemuan` yang sesuai (tambah objek pertemuan baru bila perlu).

## 2. Menambah / Mengubah Soal Kuis

**Lokasi file** — satu file JSON per modul, dinamai mengikuti ID modul:

```text
public/content/kuis/modul-05.json
```

Isinya array soal (bukan lagi di-key per modul):

```json
[
  {
    "id": 1,
    "question": "Perintah SQL apa yang digunakan untuk menggabungkan baris dari dua tabel berdasarkan kolom yang berelasi?",
    "options": ["MERGE", "COMBINE", "JOIN", "APPEND"],
    "correctAnswer": 2
  }
]
```

### Properti

| Properti        | Keterangan                              |
| --------------- | --------------------------------------- |
| `id`            | Nomor unik soal dalam modul (mulai `1`) |
| `question`      | Teks pertanyaan                         |
| `options`       | Daftar pilihan jawaban (minimal 2)      |
| `correctAnswer` | Indeks jawaban benar (dimulai dari `0`) |
| `codeSnippet`   | (opsional) Potongan kode                |
| `language`      | (wajib bila ada `codeSnippet`)          |

Contoh indeks jawaban benar:

```text
0 = MERGE
1 = COMBINE
2 = JOIN ✅
3 = APPEND
```

Nilai `language` yang umum: `javascript`, `html`, `css`, `sql`, `json`.

Contoh soal dengan kode:

```json
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
```

## 3. Aturan Kontribusi

1. Nama file kuis **wajib** `modul-NN.json`, cocok dengan ID modul di `kurikulum.json`.
2. Modul yang belum punya kuis: **jangan** buat file kosong. Cukup tidak ada filenya — fitur "Modul Eksplorasi Bebas" akan menanganinya (modul dianggap lulus otomatis).
3. Nilai kelulusan Knowledge Check adalah **70%**.
4. Sebelum commit, jalankan:

   ```bash
   npm run validate   # cek integritas konten (path, id, correctAnswer, file yatim)
   npm run lint       # cek kode
   npm run build      # pastikan build sukses
   npm run aislop     # quality gate untuk kode
   ```

5. `npm run validate` akan menolak: JSON tidak valid, `correctAnswer` di luar rentang, id soal duplikat, path materi tidak ada, dan file kuis yatim.

## 4. Menambah Pertemuan (Bab) Baru

1. Buat folder `public/content/materi/pertemuan-NN/`.
2. Taruh file materi di dalamnya dengan pola `modul-NN-slug.md`.
3. Tambahkan objek pertemuan baru di `public/content/kurikulum.json`.
4. (Opsional) Buat file kuis `modul-NN.json` bila modul itu punya Knowledge Check.
5. Jalankan `npm run validate`.

## 5. Skrip Bantu

| Perintah                 | Fungsi                                                        |
| ------------------------ | ------------------------------------------------------------- |
| `npm run validate`       | Validasi integritas seluruh konten                            |
| `npm run migrate:content`| Migrasi ulang struktur konten (hanya untuk arsip, idempoten)   |
| `npm run aislop`         | Scan kualitas kode (quality gate)                             |
| `npm run aislop:ci`      | Scan hanya file yang berubah (untuk CI/PR)                    |
| `npm run lint`           | ESLint                                                        |
| `npm run build`          | Build produksi                                                |

