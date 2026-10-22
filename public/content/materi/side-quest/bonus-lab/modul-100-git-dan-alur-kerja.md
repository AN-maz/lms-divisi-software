# Git & Alur Kerja Kolaborasi

Ini materi contoh untuk **Side Quest**. Halaman ini hanya placeholder agar struktur jalur bisa diuji. Silakan ganti isinya.

# 1. Kenapa Git Penting

Git melacak setiap perubahan pada kode sehingga kamu bisa kembali ke versi sebelumnya, bekerja paralel di banyak fitur, dan menggabungkan hasil kerja tim tanpa saling menimpa.

## Tiga Area Utama

| Area | Fungsi |
| --- | --- |
| Working Directory | Berkas yang sedang kamu ubah |
| Staging Area | Perubahan yang sudah dipilih untuk di-commit |
| Repository | Riwayat commit yang tersimpan permanen |

# 2. Alur Kerja Dasar

Ritme harian yang paling sering dipakai:

1. `git pull` untuk mengambil perubahan terbaru dari tim.
2. Buat branch baru untuk fitur yang dikerjakan.
3. `git add` lalu `git commit` perubahanmu.
4. `git push` dan buka pull request.

## Contoh Perintah

```bash
git checkout -b feat/bagian-login
git add .
git commit -m "feat: tambah form login"
git push -u origin feat/bagian-login
```

> **Catatan:** satu branch sebaiknya fokus pada satu fitur agar review-nya mudah.

# 3. Menyelesaikan Konflik

Konflik muncul ketika dua orang mengubah baris yang sama.

1. Jalankan `git merge` atau `git pull` sampai Git menandai berkas yang bentrok.
2. Buka berkas tersebut, pilih versi yang benar, lalu hapus penanda `<<<<<<<`, `=======`, dan `>>>>>>>`.
3. `git add` berkas yang sudah dibereskan, lalu lanjutkan merge dengan `git commit`.
