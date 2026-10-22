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
│   │   ├── kurikulum.json         <-- MANIFEST: daftar jalur -> pertemuan -> modul
│   │   ├── materi/                <-- Materi Markdown, 1 file per modul
│   │   │   ├── main-quest/        <-- Jalur utama (Main Quest)
│   │   │   │   ├── pertemuan-01/
│   │   │   │   │   └── modul-01-dasar-dasar-html.md
│   │   │   │   └── ... (sampai pertemuan-10, 19 modul)
│   │   │   └── side-quest/        <-- Jalur tambahan (Side Quest)
│   │   │       └── bonus-lab/
│   │   │           └── modul-100-git-dan-alur-kerja.md
│   │   ├── kuis/                  <-- Soal kuis, 1 file JSON per modul
│   │   │   ├── modul-01.json
│   │   │   ├── modul-02.json
│   │   │   └── ... (modul-13, 16-19, 100 belum punya kuis)
│   │   └── debugging-jiwa/
│   │       └── kesadaran-organik.md
│   └── data/                      <-- Data aplikasi (bukan kurikulum)
│       └── mentors.json           <-- Data tim pengurus
│
├── scripts/
│   ├── migrate-content.mjs        <-- Migrasi konten (arsip, sekali pakai)
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
│   │   ├── LayarPenuh.jsx         <-- Pembungkus layar loading/kosong/error/hasil
│   │   ├── ThemeToggle.jsx        <-- Tombol ganti mode terang/gelap
│   │   └── MarkdownViewer.jsx     <-- Jantung aplikasinya (Render MD to HTML)
│   │
│   ├── hooks/             <-- Custom React Hook
│   │   ├── useDataLoader.js       <-- Hook pemuat data (loading/error/refetch)
│   │   └── useTrackSlug.js        <-- Resolve slug jalur dari id modul
│   │
│   ├── pages/            <-- Komponen Halaman (Views)
│   │   ├── TrackPickerPage.jsx     <-- Halaman pemilih jalur ("Pilih Jalur Kelaz")
│   │   ├── SilabusPage.jsx         <-- Daftar pertemuan dalam satu jalur
│   │   ├── ModuleHubPage.jsx       <-- Pusat kontrol modul
│   │   ├── EksplorasiPage.jsx      <-- Halaman membaca materi Markdown
│   │   ├── QuizPage.jsx           <-- Halaman kuis interaktif
│   │   └── LandingPage.jsx         <-- Halaman beranda dengan hero & tim
│   │
│   ├── services/         <-- Service layer untuk data handling
│   │   └── dataService.js        <-- fetchData + cache + dataSources + helper jalur
│   │
│   ├── store/           <-- State Management (Zustand)
│   │   ├── useProgressStore.js   <-- Menyimpan state (materi terbuka/terkunci)
│   │   └── useThemeStore.js      <-- Mode terang/gelap (persist di localStorage)
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

## Alur Navigasi

```text
/                       Beranda
/materi                 Pilih Jalur Kelaz   (pemilih jalur)
/materi/:track          daftar pertemuan    (mis. /materi/main-quest)
/materi/:track/:id      hub modul
/eksplorasi/:id         baca materi
/kuis/:id               knowledge check
```

`/materi/:id` (tautan lama) otomatis dialihkan ke jalur yang benar.

## Jalur Belajar (Track)

| Jalur        | Slug         | Isi                                                  |
| ------------ | ------------ | ---------------------------------------------------- |
| **Main Quest** | `main-quest` | Kurikulum inti, persis pertemuan 1-10 (modul id 1-19) |
| **Side Quest** | `side-quest` | Materi tambahan di luar kurikulum (modul id mulai 100) |

ID modul Side Quest dimulai dari **100** supaya tidak bentrok dengan Main Quest. Ini penting karena rute `/eksplorasi/:id` dan `/kuis/:id` hanya memakai ID, tanpa slug jalur.

## Mode Terang / Gelap

Tema disimpan di `localStorage` (key `lms-tema`) dan diterapkan lewat atribut `data-theme="dark|light"` pada `<html>`. Bila belum pernah memilih, tema mengikuti preferensi sistem.

Tombol ganti tema (`ThemeToggle`) tersedia di **semua** halaman:

| Halaman | Posisi tombol |
| --- | --- |
| Beranda | kanan atas (navbar) + footer |
| Pilih Jalur Kelaz | sebaris tombol "Kembali ke Beranda" |
| Daftar pertemuan | sebaris tombol "Pilih Jalur Kelaz" |
| Hub modul | sebaris tombol kembali jalur |
| Baca materi | sidebar (desktop), bar atas & sidebar (mobile) |
| Kuis | sidebar navigator; layar loading/kosong/error/hasil: pojok kanan atas |

### Menambah warna baru

Jangan pakai hex hardcoded. Pakai token di `src/index.css`:

| Token | Kegunaan |
| --- | --- |
| `--lms-bg`, `--lms-bg-deep` | latar halaman |
| `--lms-surface` … `--lms-surface-5` | kartu & panel (bertingkat) |
| `--lms-border`, `--lms-border-strong`, `--lms-border-soft` | garis |
| `--lms-text`, `--lms-text-strong`, `--lms-text-body`, `--lms-text-muted`, `--lms-text-faint`, `--lms-text-ghost` | teks (dari paling terang ke paling redup) |
| `--lms-accent-text`, `--lms-accent-2-text` | teks beraksen (aman di dua mode) |
| `--lms-accent-bg`, `--lms-accent-bg-hover` | latar tombol aksen |

Contoh: `className="bg-[var(--lms-surface)] text-[var(--lms-text-muted)] border border-[var(--lms-border)]"`.

Untuk latar/tombol utama boleh tetap memakai `--color-software-tosca` / `--color-software-bright` (warna brand, sama di kedua mode), tetapi **teks** di atas latar terang wajib memakai token `--lms-accent-*-text`.

---

# Panduan Kontribusi Konten

Semua konten (materi & kuis) berada di dalam `public/content/`, satu file per modul. Tujuannya: satu modul = satu PR, diff kecil, tidak ada merge conflict di file raksasa.

## 0. Dua Jalur Belajar

Kurikulum dibagi jadi **jalur (track)**, didefinisikan di `kurikulum.json`:

- **Main Quest** (`main-quest`) — kurikulum inti, pertemuan 1-10, modul id 1-19.
- **Side Quest** (`side-quest`) — materi tambahan, modul id mulai 100.

Aturan penting: **ID modul harus unik lintas jalur**, karena rute `/eksplorasi/:id` dan `/kuis/:id` hanya memakai ID.

## 1. Menambah / Mengubah Materi

**Lokasi file** — di dalam folder jalur, lalu pertemuan, dengan nama `modul-NN-slug.md`:

```text
public/content/materi/main-quest/pertemuan-04/
├── modul-05-pengenalan-ddl.md
├── modul-06-dml-dan-constraints.md
└── ...
```

`NN` = **ID modul**, sama dengan `id` di `kurikulum.json`.

**Konvensi Heading** — lihat **Golden Rules** di atas. Setiap `#` (Heading 1) memotong halaman jadi satu section di sidebar. Gunakan `##`/`###` untuk sub-bab.

**Daftarkan di manifest** — tambahkan entri di dalam `pertemuan` milik jalur yang sesuai di `public/content/kurikulum.json`:

```json
{
  "id": 20,
  "title": "Judul Modul Baru",
  "file": "/content/materi/main-quest/pertemuan-11/modul-20-judul-modul-baru.md"
}
```

Path materi **wajib** berada di dalam `/content/materi/<slug-jalur>/`, jika tidak `npm run validate` akan menolak.

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
2. ID modul **wajib unik di seluruh jalur** (Main Quest dan Side Quest).
3. Modul yang belum punya kuis: **jangan** buat file kosong. Cukup tidak ada filenya — fitur "Modul Eksplorasi Bebas" akan menanganinya (modul dianggap lulus otomatis).
4. Nilai kelulusan Knowledge Check adalah **70%**.
5. Sebelum commit, jalankan:

   ```bash
   npm run validate   # cek integritas konten (jalur, path, id, correctAnswer, file yatim)
   npm run lint       # cek kode
   npm run build      # pastikan build sukses
   npm run aislop     # quality gate untuk kode
   ```

## 4. Menambah Modul di Side Quest

1. Buat file di `public/content/materi/side-quest/<kelompok>/modul-NN-slug.md` (mis. `<kelompok>` = `bonus-lab`).
2. Pilih ID mulai 100 (lanjutkan dari yang terakhir dipakai).
3. Tambahkan grup pertemuan baru (atau modul ke grup yang ada) di jalur `side-quest` pada `kurikulum.json`.
4. Jalankan `npm run validate`.

## 5. Menambah Jalur (Track) Baru

1. Tambah objek baru di array `tracks` pada `kurikulum.json`:

   ```json
   {
     "slug": "challenge",
     "nama": "Challenge Arena",
     "tagline": "Tantangan mingguan untuk menguji pemahamanmu.",
     "ikon": "compass",
     "pertemuan": []
   }
   ```

2. Taruh materinya di `public/content/materi/challenge/...`.
3. Kalau memakai ikon baru, tambahkan pemetaannya di `src/pages/TrackPickerPage.jsx` (objek `IKON`).
4. Jalankan `npm run validate`.

## 6. Skrip Bantu

| Perintah                 | Fungsi                                                        |
| ------------------------ | ------------------------------------------------------------- |
| `npm run validate`       | Validasi integritas seluruh konten                            |
| `npm run migrate:content`| Migrasi konten lama (arsip; berhenti sendiri bila tak perlu)  |
| `npm run aislop`         | Scan kualitas kode (quality gate)                             |
| `npm run aislop:ci`      | Scan hanya file yang berubah (untuk CI/PR)                    |
| `npm run lint`           | ESLint                                                        |
| `npm run build`          | Build produksi                                                |

