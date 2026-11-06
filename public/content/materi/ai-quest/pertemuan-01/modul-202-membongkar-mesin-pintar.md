# Membongkar Cara Kerja AI: Dari Angka Menjadi Keputusan

## Daftar Isi

1. Pendahuluan
2. Dunia di Luar Chatbot
3. Bahasa Rahasia Mesin: Angka, Angka, dan Angka
4. Bagaimana Mesin Tahu Dua Hal Itu Mirip?
5. Bagaimana AI Belajar?
6. Mesin Pasti vs Mesin Peluang
7. Latihan
8. Tugas Mandiri
9. Referensi

---

# 1. Pendahuluan

### Apa yang Akan Kamu Pelajari?

Di pertemuan pertama ini, kamu akan membongkar misteri di balik cara kerja AI. Bukan sekadar teori abstrak, tapi penjelasan konkret tentang bagaimana mesin mengubah data menjadi keputusan cerdas.

Setelah selesai modul ini, kamu akan:

- Memahami bahwa AI bukan cuma chatbot, tapi sistem cerdas yang sudah ada di sekitar kita.
- Mengerti bagaimana mesin mengubah kata, gambar, dan data lain menjadi angka (vektor).
- Tahu cara mesin mengukur kemiripan antar data menggunakan matematika sederhana.
- Memahami proses pembelajaran mesin secara intuitif tanpa rumus rumit.
- Bisa membedakan sistem deterministik (pasti) dan probabilistik (menebak).

### Estimasi Waktu Belajar

**45 – 60 menit** (bacaan mandiri + kuis cepat di akhir)

### Untuk Siapa Modul Ini?

Modul ini ditujukan untuk kamu yang:

- Penasaran bagaimana AI bekerja di balik layar.
- Ingin memahami konsep AI secara mendalam tapi tidak mau pusing dengan rumus matematika yang ribet.
- Berencana mengintegrasikan AI ke aplikasi web tapi masih bingung mulai dari mana.

---

# 2. Dunia di Luar Chatbot

### AI Itu Lebih dari Sekadar Ngobrol

Saat mendengar kata "AI" atau "Artificial Intelligence", mungkin yang langsung terbayang di pikiranmu adalah ChatGPT, robot yang bisa ngobrol, atau asisten virtual seperti Siri. Tapi sebenarnya, AI itu jauh lebih luas dari sekadar chatbot.

Coba pikirkan: kenapa aplikasi ojek online bisa tahu rute tercepat ke sekolahmu? Kenapa Netflix bisa merekomendasikan film yang kamu suka padahal kamu belum pernah bilang ke siapa-siapa tentang selera filmmu? Kenapa bank bisa langsung mendeteksi kalau ada transaksi mencurigakan di kartu debitmu?

Semua itu adalah AI yang bekerja diam-diam di belakang layar.

### Contoh Nyata AI di Indonesia

Mari kita lihat beberapa contoh penerapan AI yang mungkin sudah kamu gunakan sehari-hari:

#### 1. Deteksi Penipuan Transaksi Perbankan

Bank menggunakan AI untuk memantau jutaan transaksi setiap detik. Sistem AI ini mempelajari pola transaksi normal kamu:

- Biasanya belanja di mana
- Jam berapa kamu sering bertransaksi
- Rentang nominal yang wajar

Kalau tiba-tiba ada yang mencurigakan (misalnya kartu kamu dipakai belanja di luar negeri padahal kamu lagi di rumah, atau ada transaksi Rp 50 juta padahal biasanya kamu cuma belanja Rp 100 ribu), sistem langsung memblokir transaksi tersebut dan mengirim notifikasi ke HP-mu.

Tidak ada obrolan di sini. Tapi cerdas.

#### 2. Rekomendasi Produk E-Commerce

Tokopedia, Shopee, atau Lazada bisa menyarankan barang yang mungkin kamu suka berdasarkan:

- Riwayat browsing-mu
- Produk yang pernah kamu beli
- Produk yang dibeli orang lain dengan pola serupa denganmu

Sistem AI menganalisis jutaan data pengguna, menemukan pola, dan menebak: "Kalau orang ini suka produk A dan B, kemungkinan besar dia juga suka produk C."

Dan seringkali tebakannya akurat.

#### 3. Navigasi Cerdas Ojek Online

Gojek atau Grab tidak hanya menunjukkan jalan dari titik A ke titik B. Aplikasi ini:

- Memprediksi kemacetan berdasarkan data real-time dari ribuan pengemudi lain
- Menghitung waktu tempuh yang realistis
- Menyarankan rute alternatif kalau ada jalan yang ditutup atau macet parah

Semua ini terjadi dalam hitungan detik, tanpa kamu perlu berbicara dengan sistem.

### Kesimpulan Bagian Ini

Chatbot hanyalah satu antarmuka dari sekian banyak cara AI bekerja. AI sebenarnya adalah sistem yang bisa mengenali pola, membuat prediksi, dan mengambil keputusan berdasarkan data.

Dan yang paling penting: **AI tidak selalu terlihat**. Banyak AI yang bekerja di background tanpa kamu sadari.

---

# 3. Bahasa Rahasia Mesin: Angka, Angka, dan Angka

### Mesin Hanya Mengerti Satu Hal: Angka

Manusia membaca huruf, melihat warna, mendengar suara, merasakan tekstur. Tapi mesin? Mesin hanya mengerti angka.

Komputer tidak tahu apa itu kata "anjing" atau "kucing". Komputer tidak bisa melihat foto sunset di pantai dan merasakan keindahannya. Yang bisa dilakukan komputer hanya satu hal: **menghitung angka dengan sangat cepat**.

Lalu bagaimana cara mesin memahami data seperti teks, gambar, atau suara?

Jawabannya sederhana: **dengan mengubah semuanya menjadi angka**.

### Dari Kata Menjadi Koordinat

Bayangkan setiap kata adalah sebuah titik di dalam peta raksasa berdimensi banyak (bayangkan peta dengan ratusan atau bahkan ribuan sumbu koordinat).

Kata "anjing" mungkin berada di koordinat:

```
[0.8, 0.3, -0.5, 0.2, -0.1, ...]
```

Sedangkan kata "kucing" ada di koordinat:

```
[0.7, 0.4, -0.4, 0.3, -0.1, ...]
```

Kalau kamu perhatikan, kedua koordinat itu sangat dekat. Kenapa? Karena "anjing" dan "kucing" adalah hewan peliharaan yang punya makna serupa dalam kehidupan manusia.

Sebaliknya, kata "mobil" mungkin berada di koordinat yang jauh sekali dari "anjing":

```
[-0.2, 0.9, 0.6, -0.7, 0.4, ...]
```

Inilah yang disebut **vektor** atau **embedding**.

### Apa Itu Vektor?

Vektor adalah deretan angka yang merepresentasikan sesuatu. Mari kita lihat hierarki dimensi data:

#### Skalar (0 Dimensi)

Satu angka saja.

Contoh:

```
Suhu: 30
Umur: 18
Harga: 50000
```

#### Vektor (1 Dimensi)

Deretan angka dalam satu baris.

Contoh:

```
Posisi dalam ruang 3D: [2, 5, 8]
Representasi kata "kucing": [0.7, 0.4, -0.4, 0.3, -0.1]
```

#### Matriks (2 Dimensi)

Deretan angka dalam bentuk tabel atau grid.

Contoh:

```
Foto hitam-putih ukuran 3x3 pixel:
[
  [255, 200, 100],
  [180, 150, 120],
  [50,  30,  10]
]
```

Setiap angka mewakili tingkat kecerahan satu pixel (0 = hitam, 255 = putih).

#### Tensor (N Dimensi)

Deretan angka dengan banyak dimensi.

Contoh:

```
Video berwarna: [jumlah_frame, tinggi, lebar, 3_channel_RGB]
```

### Analogi Sederhana: Ruangan 3D

Bayangkan ruang kelasmu sebagai ruang 3D dengan sumbu X, Y, dan Z.

Kamu meletakkan:

- Apel di koordinat `[1, 2, 3]`
- Jeruk di koordinat `[1, 2, 4]`
- Laptop di koordinat `[10, -5, 8]`

Tanpa perlu melihat bentuk atau warna benda-benda itu, hanya dengan melihat koordinatnya, kamu sudah bisa tahu:

- Apel dan jeruk itu dekat → kemungkinan besar sejenis
- Laptop jauh banget dari apel dan jeruk → pasti beda kategori

Begitulah cara mesin "memahami" data. Bukan dengan melihat, tapi dengan mengukur posisi angka di dalam ruang multi-dimensi.

### Kesimpulan Bagian Ini

Dengan cara ini, mesin bisa "membaca" apapun:

- Kata dan kalimat → Vektor embedding
- Foto dan gambar → Matriks atau tensor pixel
- Video → Tensor frame
- Profil pengguna → Vektor fitur (umur, lokasi, minat, dll)

Semua diubah jadi angka. Dan dari angka inilah, mesin bisa mulai "berpikir".

---

# 4. Bagaimana Mesin Tahu Dua Hal Itu Mirip?

### Mengukur Kedekatan dalam Ruang Angka

Sekarang mesin sudah punya angka. Tapi bagaimana mesin tahu bahwa "anjing" dan "kucing" itu mirip, sedangkan "anjing" dan "mobil" itu jauh berbeda?

Jawabannya: **dengan mengukur jarak atau sudut antara dua vektor**.

### Dua Cara Mengukur Kemiripan

Ada dua pendekatan utama:

#### 1. Euclidean Distance (Jarak Lurus)

Mengukur jarak lurus antara dua titik, seperti mengukur jarak dengan penggaris.

Contoh:

```
Vektor A: [1, 2]
Vektor B: [4, 6]

Jarak = √((4-1)² + (6-2)²)
      = √(9 + 16)
      = √25
      = 5
```

Semakin kecil jaraknya, semakin mirip.

#### 2. Cosine Similarity (Sudut Kedekatan)

Mengukur sudut antara dua vektor, bukan jaraknya.

Kenapa sudut? Karena kadang dua vektor bisa punya panjang berbeda tapi arahnya sama. Artinya, maknanya mirip.

**Cosine Similarity** mengukur seberapa "searah" dua vektor. Hasilnya adalah angka antara `-1` sampai `1`:

- `1` = sangat mirip (searah penuh, sudut 0°)
- `0` = tidak ada hubungan (tegak lurus, sudut 90°)
- `-1` = berlawanan total (sudut 180°)

### Contoh Praktis

Misalnya kamu punya tiga dokumen:

**Dokumen A**: "Anjing adalah hewan peliharaan yang setia"
**Dokumen B**: "Kucing adalah hewan peliharaan yang lucu"
**Dokumen C**: "Mobil adalah kendaraan bermotor roda empat"

Setelah diubah jadi vektor, mesin menghitung:

```
Similarity(A, B) = 0.85  → Sangat mirip
Similarity(A, C) = 0.12  → Hampir tidak ada hubungan
Similarity(B, C) = 0.10  → Hampir tidak ada hubungan
```

Inilah fondasi dari:

- **Pencarian cerdas di Google** → Mencari dokumen yang mirip dengan query-mu
- **Rekomendasi lagu di Spotify** → Mencari lagu yang mirip dengan yang sedang kamu dengarkan
- **Saran konten di TikTok** → Mencari video yang mirip dengan yang kamu tonton lama

### Kesimpulan Bagian Ini

Mesin tidak perlu "memahami" makna kata dalam arti filosofis. Mesin cukup mengukur kedekatan angka di ruang multi-dimensi. Dan ternyata, matematika sederhana ini sangat efektif untuk menangkap kemiripan makna.

---

# 5. Bagaimana AI Belajar?

### Mencoba, Salah, Lalu Memperbaiki Diri

Sekarang pertanyaan besarnya: bagaimana mesin bisa pintar?

Jawabannya sederhana: **dengan mencoba, salah, lalu memperbaiki diri**.

Bayangkan kamu sedang belajar melempar bola ke ring basket. Di awal, kamu pasti sering meleset. Tapi setiap kali meleset, kamu melihat seberapa jauh bola melenceng, lalu menyesuaikan kekuatan dan sudut lemparan berikutnya.

Lama-lama, lemparanmu semakin akurat.

Begitu juga dengan AI.

### Loss Function: Pengukur Kesalahan

**Loss Function** (fungsi kerugian) adalah cara mesin mengukur seberapa besar kesalahannya.

Contoh:

Model AI memprediksi harga rumah:

```
Prediksi model: Rp 500 juta
Harga asli:     Rp 600 juta

Loss (Kesalahan) = Rp 100 juta
```

Semakin kecil loss, semakin akurat prediksi model.

Di awal training, loss-nya besar banget (prediksi acak). Tapi seiring waktu, model belajar dan loss-nya mengecil.

### Gradient Descent: Menuruni Gunung Kesalahan

Lalu bagaimana cara memperkecil kesalahan?

Bayangkan kamu tersesat di puncak gunung berkabut tebal. Kamu ingin turun ke lembah (titik terendah), tapi kamu tidak bisa melihat jauh ke depan. Kabut terlalu tebal.

Yang bisa kamu lakukan hanya satu: **meraba kemiringan tanah di bawah kakimu, lalu melangkah ke arah yang paling menurun**.

Itulah **Gradient Descent**.

- **Gradient** = kemiringan
- **Descent** = turun

Jadi Gradient Descent adalah metode untuk turun ke titik kesalahan terendah dengan cara melangkah sedikit demi sedikit mengikuti arah lereng yang paling curam.

### Proses Training Secara Sederhana

Mari kita lihat proses training dalam langkah-langkah:

**1. Inisialisasi**
Model dimulai dengan tebakan acak (angka random).

**2. Prediksi**
Model mencoba memprediksi output dari data input.

**3. Hitung Loss**
Bandingkan prediksi dengan jawaban yang benar. Hitung kesalahannya.

**4. Hitung Gradient**
Cari tahu ke arah mana model harus "melangkah" supaya kesalahannya mengecil.

**5. Update Parameter**
Ubah angka-angka di dalam model sedikit ke arah yang benar.

**6. Ulangi**
Lakukan ribuan atau bahkan jutaan kali hingga loss-nya sangat kecil.

### Training vs Inference: Perbedaan Penting

Ada dua fase penting dalam AI yang wajib kamu pahami:

#### Training (Pelatihan)

- Fase di mana model belajar dari jutaan data
- Prosesnya berat dan butuh komputer canggih (GPU mahal)
- Butuh waktu lama (bisa berhari-hari atau berbulan-bulan)
- Mahal (biaya listrik dan infrastruktur)
- Tapi ini cuma dilakukan sekali (atau beberapa kali saja)

#### Inference (Eksekusi/Prediksi)

- Fase di mana model yang sudah jadi tinggal dipakai
- Prosesnya cepat dan ringan
- Bisa jalan di laptop biasa atau bahkan HP
- Murah
- Inilah yang terjadi saat kamu pakai ChatGPT, filter Instagram, atau fitur rekomendasi Netflix

### Implikasi untuk Developer

Jadi, kalau kamu mau integrasikan AI ke aplikasi webmu, **kamu tidak perlu training sendiri**.

Kamu tinggal pakai model yang sudah jadi (lewat API atau library). Itulah kenapa sekarang integrasi AI jadi mudah dan terjangkau.

Contoh:

```javascript
// Kamu tidak perlu training. Tinggal pakai model jadi.
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Halo AI!" }],
});
```

Training sudah dilakukan oleh OpenAI. Kamu tinggal pakai (inference).

### Kesimpulan Bagian Ini

AI belajar dengan cara mencoba, salah, dan memperbaiki diri secara bertahap. Prosesnya seperti menuruni gunung kesalahan sedikit demi sedikit hingga mencapai titik terendah (prediksi paling akurat).

Dan yang paling penting: kamu tidak perlu melakukan training sendiri untuk menggunakan AI.

---

# 6. Mesin Pasti vs Mesin Peluang

### Perbedaan Fundamental

Sekarang kita masuk ke bagian yang paling penting: **perbedaan antara program biasa dan AI**.

Ini adalah konsep kunci yang akan mengubah cara pandangmu terhadap teknologi.

### Deterministik: Selalu Sama, Selalu Pasti

Program biasa bersifat **deterministik**, artinya kalau kamu kasih input yang sama, hasilnya pasti sama. Tidak ada keraguan. Tidak ada variasi.

#### Contoh 1: Kalkulator

```
2 + 2 = 4
```

Tidak peduli kamu hitung kapan, di mana, atau pakai kalkulator apa, hasilnya tetap `4`. Selalu. Selamanya.

#### Contoh 2: Database Query

```sql
SELECT * FROM users WHERE id = 10;
```

Kalau kamu jalankan query ini 100 kali, hasilnya pasti sama (selama data di database tidak berubah).

#### Contoh 3: Fungsi Backend

```javascript
function tambah(a, b) {
  return a + b;
}

tambah(5, 3); // Selalu 8
```

Tidak ada kejutan. Tidak ada keraguan. Begitu juga dengan kode backend biasa:

- Kalau kamu simpan data ke database, pasti tersimpan
- Kalau kamu panggil API dengan parameter yang sama, hasilnya pasti sama
- Kalau kamu validasi email, aturannya pasti konsisten

### Probabilistik: Menebak yang Paling Mungkin

AI bersifat **probabilistik**, artinya AI tidak memberikan jawaban pasti. AI memberikan **tebakan terbaik** berdasarkan pola yang pernah dipelajari.

#### Analogi Sederhana

Bayangkan dua jenis koki:

**Koki Deterministik (Program Biasa)**

- Menimbang tepung dengan timbangan digital → Pasti pas 100 gram
- Mengukur garam dengan sendok takar → Pasti pas 5 gram
- Mengikuti resep persis seperti tertulis

**Koki Probabilistik (AI)**

- Menaburkan garam dengan "kira-kira" berdasarkan pengalaman
- Merasakan adonan dan menyesuaikan secara intuitif
- Kadang hasilnya sedikit berbeda meski pakai bahan yang sama

Koki probabilistik bisa menghasilkan masakan yang enak, tapi tidak selalu identik setiap kali masak.

### Bagaimana AI Menebak?

Mari kita lihat contoh konkret.

Kamu tanya AI: **"Apa ibukota Prancis?"**

AI tidak "tahu" jawabannya dalam arti sebenarnya. AI hanya menghitung peluang berdasarkan pola yang pernah dipelajari:

```
Peluang jawaban "Paris"  : 95%
Peluang jawaban "London" : 3%
Peluang jawaban "Berlin" : 2%
```

AI memilih "Paris" karena peluangnya paling tinggi berdasarkan:

- Kata "Paris" muncul paling sering setelah frasa "ibukota Prancis" di data training
- Konteks kalimat sangat cocok dengan pola yang pernah dipelajari

Tapi perhatikan: AI tetap ada kemungkinan (meski kecil) menjawab "London" atau bahkan "Berlin" kalau parameter random-nya kebetulan jatuh di sana.

### Softmax: Mengubah Skor Menjadi Persentase

Bagaimana AI menghitung persentase peluang?

Jawabannya: dengan fungsi **Softmax**.

Misalnya, AI punya tiga pilihan jawaban dengan skor mentah (logits) dari perhitungan internal:

```
Paris  : 10.5
London : 2.3
Berlin : 1.8
```

Angka-angka ini tidak bisa langsung dipakai karena:

- Tidak dalam skala 0-100%
- Totalnya tidak 100%

**Softmax** mengubah skor mentah ini menjadi distribusi probabilitas yang totalnya tepat 100%:

```
Paris  : 88%
London : 10%
Berlin : 2%
```

Jadi, AI memilih "Paris" karena peluangnya paling tinggi.

### Kenapa AI Bisa Salah (Halusinasi)?

Karena AI hanya menebak berdasarkan pola, kadang AI bisa salah total. Bahkan kadang menjawab dengan percaya diri padahal jawabannya ngawur. Ini disebut **halusinasi**.

#### Contoh Halusinasi

Kamu tanya: **"Siapa presiden Indonesia tahun 2090?"**

AI mungkin menjawab dengan percaya diri:

> "Presiden Indonesia tahun 2090 adalah Joko Widodo, yang terpilih untuk masa jabatan ketujuh berturut-turut."

Padahal:

- Tahun 2090 belum terjadi
- AI tidak punya data masa depan
- Jokowi tidak mungkin masih jadi presiden (usia dan batasan periode)

**Kenapa AI bisa menjawab?**

Karena di data training:

- Kata "Joko Widodo" dan "presiden Indonesia" sering muncul berdekatan
- Pola kalimat pertanyaan mirip dengan pertanyaan tentang presiden lain
- Softmax tetap memilih jawaban dengan peluang tertinggi, meski basis datanya tidak relevan

Jadi AI menebak itu jawaban yang paling mungkin, meskipun faktanya salah.

### Implikasi Praktis untuk Developer

Saat kamu integrasikan AI ke aplikasi, kamu harus:

**1. Validasi Output AI**
Jangan langsung percaya 100%. Tambahkan layer validasi kalau memang kritikal.

**2. Berikan Konteks yang Jelas**
Semakin jelas konteks yang kamu berikan, semakin akurat prediksi AI.

**3. Set Ekspektasi User**
Beritahu user bahwa AI bisa salah. Jangan buat user mengira AI itu sempurna.

**4. Gunakan Temperature Parameter**

- Temperature rendah (0.1-0.3) → Lebih deterministik, lebih konsisten
- Temperature tinggi (0.8-1.0) → Lebih kreatif, lebih bervariasi

### Tabel Perbandingan

| Aspek          | Deterministik (Program Biasa)             | Probabilistik (AI)                             |
| -------------- | ----------------------------------------- | ---------------------------------------------- |
| **Output**     | Selalu sama dengan input yang sama        | Bisa bervariasi meski input sama               |
| **Cara Kerja** | Mengikuti aturan pasti (if-else, loop)    | Menebak berdasarkan pola probabilitas          |
| **Kelebihan**  | Dapat diprediksi, konsisten, reliable     | Fleksibel, bisa handle data baru               |
| **Kekurangan** | Kaku, tidak bisa adaptasi                 | Bisa salah (halusinasi)                        |
| **Contoh**     | Database query, kalkulator, validasi form | ChatGPT, rekomendasi Netflix, face recognition |

### Kesimpulan Bagian Ini

Perbedaan deterministik vs probabilistik adalah fondasi pemahaman AI. Dengan paham ini, kamu tidak akan kaget kalau AI kadang menghasilkan output yang aneh, dan kamu tahu cara mengatasi atau meminimalkan risikonya.

---

# 7. Latihan

### Latihan 1: Identifikasi AI di Sekitarmu

**Instruksi:**
Buka smartphone-mu dan identifikasi minimal 3 fitur yang menggunakan AI (bukan chatbot). Jelaskan apa yang dilakukan fitur tersebut dan kenapa kamu yakin itu menggunakan AI.

**Contoh Jawaban:**

1. **Google Photos - Pengelompokan Wajah**
   - Apa yang dilakukan: Secara otomatis mengelompokkan foto berdasarkan orang yang ada di foto.
   - Kenapa ini AI: Karena sistem belajar mengenali wajah yang sama meski sudah ganti gaya rambut, memakai kacamata, atau foto dari sudut berbeda.

2. **Instagram - Filter Wajah AR**
   - Apa yang dilakukan: Mendeteksi posisi wajah dan menambahkan efek 3D yang mengikuti gerakan wajah.
   - Kenapa ini AI: Karena menggunakan Computer Vision untuk melacak titik kontur wajah (*landmark detection*) secara real-time.

3. **Keyboard Smartphone (Predictive Text / Gboard)**
   - Apa yang dilakukan: Menebak kata berikutnya saat kamu mengetik pesan.
   - Kenapa ini AI: Karena model menghitung probabilitas urutan kata berdasarkan konteks kalimat dan kebiasaan mengetikmu.

---

# 8. Tugas Mandiri

### Skenario: Arsitektur Fitur Pintar "WarungDigital"

Kamu ditunjuk merancang alur sistem cerdas untuk aplikasi kasir UMKM bernama **WarungDigital**:

1. **Prediksi Penjualan:** Menebak stok beras yang harus dibeli minggu depan berdasarkan pola penjualan 3 bulan terakhir.
   - *Jenis Sistem:* Machine Learning Klasik (Tabular).
   - *Format Data Masuk:* Angka & tabel riwayat transaksi (SQL/Excel).

2. **Scan Bukti Transfer:** Membaca nominal uang dari screenshot m-banking yang diunggah pembeli.
   - *Jenis Sistem:* Computer Vision (OCR).
   - *Format Data Masuk:* Matriks piksel gambar.

3. **Perhitungan Total Belanja:** Menjumlahkan harga barang dan pajak 11%.
   - *Jenis Sistem:* Deterministik (Kode Biasa).
   - *Alasan:* Perhitungan uang harus 100% pasti dan tidak boleh menebak peluang.

---

# 9. Referensi

- **Panduan Standar Format Model Ringan:** *ONNX Runtime Guide* (onnxruntime.ai)
- **Aturan Praktis Rekayasa Sistem Cerdas:** *Rules of Machine Learning* oleh Martin Zinkevich (Google)
- **Dasar Pola Integrasi Sistem AI Modern:** *Machine Learning Engineering in Production* (DeepLearning.AI)
