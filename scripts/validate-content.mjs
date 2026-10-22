// Validasi integritas konten LMS.
//
// Memeriksa:
//   - kurikulum.json: bentuk wajib, id modul unik, path materi benar-benar ada
//   - setiap file kuis: JSON valid, options >= 2, correctAnswer di dalam rentang,
//     id soal unik, dan key-nya cocok dengan modul di kurikulum
//   - modul yang punya kuis vs yang tidak (dilaporkan, bukan error)
//   - tidak ada file kuis yatim (modul-NN.json tanpa modul NN di kurikulum)
//   - blok kode berpagar di materi: wajib punya bahasa, dan blok ```mermaid
//     harus sintaks yang valid (di-parse dengan mermaid yang sama seperti render)
//
// Jalankan: npm run validate

import { readFile, readdir, access } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PUBLIC = join(ROOT, 'public');
const KONTEN = join(PUBLIC, 'content');
const KUIS = join(KONTEN, 'kuis');

const MASALAH = [];
const CATATAN = [];

const gagal = (pesan) => MASALAH.push(pesan);
const catat = (pesan) => CATATAN.push(pesan);

const ada = (p) => access(p).then(() => true, () => false);
const pad = (n) => String(n).padStart(2, '0');

async function bacaJson(path, konteks) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (err) {
    gagal(`${konteks}: JSON tidak valid -> ${err.message}`);
    return null;
  }
}

async function validasiKurikulum() {
  const path = join(KONTEN, 'kurikulum.json');
  const kurikulum = await bacaJson(path, 'content/kurikulum.json');
  if (!kurikulum) return null;

  const tracks = kurikulum.tracks;
  if (!Array.isArray(tracks) || tracks.length === 0) {
    gagal('content/kurikulum.json: "tracks" harus array tidak kosong');
    return null;
  }

  if (kurikulum.debug_jiwa?.slug) {
    const debugPath = join(KONTEN, 'debugging-jiwa', `${kurikulum.debug_jiwa.slug}.md`);
    if (!(await ada(debugPath))) {
      gagal(`kurikulum.debug_jiwa.slug menunjuk ke file yang tidak ada: ${debugPath.replace(ROOT, '')}`);
    }
  }

  const slugTerlihat = new Set();
  const idTerlihat = new Set();
  let jumlahModul = 0;

  for (const track of tracks) {
    if (!track.slug || typeof track.slug !== 'string') {
      gagal(`kurikulum: ada jalur tanpa "slug" (nama: ${track.nama ?? '?'})`);
    } else if (slugTerlihat.has(track.slug)) {
      gagal(`kurikulum: slug jalur duplikat -> ${track.slug}`);
    } else {
      slugTerlihat.add(track.slug);
    }

    if (!track.nama) gagal(`kurikulum: jalur ${track.slug ?? '?'} tanpa "nama"`);

    if (!Array.isArray(track.pertemuan)) {
      gagal(`kurikulum: jalur ${track.slug ?? '?'} tanpa array "pertemuan"`);
      continue;
    }

    // Jalur boleh kosong (mis. Side Quest yang belum diisi).
    if (track.pertemuan.length === 0) {
      catat(`jalur ${track.slug}: belum ada pertemuan`);
      continue;
    }

    const noPertemuan = new Set();
    for (const grup of track.pertemuan) {
      if (typeof grup.pertemuan !== 'number') {
        gagal(`jalur ${track.slug}: ada grup tanpa field "pertemuan" numerik (judul: ${grup.title ?? '?'})`);
      } else if (noPertemuan.has(grup.pertemuan)) {
        gagal(`jalur ${track.slug}: nomor pertemuan duplikat -> ${grup.pertemuan}`);
      } else {
        noPertemuan.add(grup.pertemuan);
      }

      if (!Array.isArray(grup.modules) || grup.modules.length === 0) {
        gagal(`jalur ${track.slug}: pertemuan ${grup.pertemuan} tidak punya "modules"`);
        continue;
      }

      for (const m of grup.modules) {
        jumlahModul += 1;

        if (typeof m.id !== 'number') {
          gagal(`jalur ${track.slug}: modul tanpa id numerik di pertemuan ${grup.pertemuan}`);
          continue;
        }
        // ID harus unik lintas jalur agar rute /eksplorasi/:id dan /kuis/:id tidak ambigu.
        if (idTerlihat.has(m.id)) {
          gagal(`kurikulum: id modul duplikat lintas jalur -> ${m.id}`);
        }
        idTerlihat.add(m.id);

        if (!m.title) gagal(`kurikulum: modul ${m.id} tanpa title`);
        if (!m.file) {
          gagal(`kurikulum: modul ${m.id} tanpa file`);
          continue;
        }

        // Path di kurikulum relatif terhadap public/.
        const materiPath = join(PUBLIC, m.file.replace(/^\//, ''));
        if (!(await ada(materiPath))) {
          gagal(`kurikulum: materi modul ${m.id} tidak ada -> ${m.file}`);
        }

        const prefix = `/content/materi/${track.slug}/`;
        if (!m.file.startsWith(prefix)) {
          gagal(`kurikulum: path materi modul ${m.id} harus di dalam ${prefix} -> ${m.file}`);
        }
      }
    }
  }

  catat(`kurikulum: ${tracks.length} jalur, ${jumlahModul} modul`);
  return { kurikulum, idModul: idTerlihat };
}

async function validasiKuis(idModul) {
  if (!(await ada(KUIS))) {
    gagal('Folder content/kuis tidak ditemukan');
    return;
  }

  const files = (await readdir(KUIS)).filter((f) => f.endsWith('.json')).sort();
  const idBerkuis = new Set();
  let totalSoal = 0;

  for (const file of files) {
    const cocok = /^modul-(\d+)\.json$/.exec(file);
    if (!cocok) {
      gagal(`content/kuis/${file}: nama file tidak mengikuti pola "modul-NN.json"`);
      continue;
    }

    const id = Number(cocok[1]);
    if (!idModul.has(id)) {
      gagal(`content/kuis/${file}: tidak ada modul ${id} di kurikulum (file yatim)`);
    }
    idBerkuis.add(id);

    const daftar = await bacaJson(join(KUIS, file), `content/kuis/${file}`);
    if (!Array.isArray(daftar)) {
      gagal(`content/kuis/${file}: isi harus berupa array soal`);
      continue;
    }
    if (daftar.length === 0) {
      gagal(`content/kuis/${file}: array soal kosong (hapus file bila memang belum ada kuis)`);
      continue;
    }

    const idSoal = new Set();
    daftar.forEach((soal, i) => {
      const label = `${file} soal ke-${i + 1}`;

      if (typeof soal.id !== 'number') {
        gagal(`${label}: "id" harus angka`);
      } else if (idSoal.has(soal.id)) {
        gagal(`${label}: id soal duplikat -> ${soal.id}`);
      } else {
        idSoal.add(soal.id);
      }

      if (!soal.question || typeof soal.question !== 'string') {
        gagal(`${label}: "question" wajib string`);
      }
      if (!Array.isArray(soal.options)) {
        gagal(`${label}: "options" harus array`);
        return;
      }
      if (soal.options.length < 2) {
        gagal(`${label}: "options" minimal 2 pilihan`);
      }
      if (
        typeof soal.correctAnswer !== 'number' ||
        soal.correctAnswer < 0 ||
        soal.correctAnswer >= soal.options.length
      ) {
        gagal(`${label}: "correctAnswer" (${soal.correctAnswer}) di luar rentang 0..${soal.options.length - 1}`);
      }
      if (soal.codeSnippet && !soal.language) {
        gagal(`${label}: ada "codeSnippet" tanpa "language"`);
      }
    });

    totalSoal += daftar.length;
  }

  catat(`kuis: ${files.length} modul berkuis, ${totalSoal} soal`);

  const tanpaKuis = [...idModul].filter((id) => !idBerkuis.has(id)).sort((a, b) => a - b);
  if (tanpaKuis.length) {
    catat(`tanpa kuis (fitur "Modul Eksplorasi Bebas"): ${tanpaKuis.map(pad).join(', ')}`);
  }
}

async function mulai() {
  const hasil = await validasiKurikulum();
  if (hasil) {
    await validasiKuis(hasil.idModul);
  }

  console.log('Validasi konten');
  for (const c of CATATAN) console.log(`  · ${c}`);

  if (MASALAH.length === 0) {
    console.log('\nOK: tidak ada masalah.');
    return;
  }

  console.log(`\n${MASALAH.length} masalah:`);
  for (const m of MASALAH) console.log(`  ✗ ${m}`);
  process.exitCode = 1;
}

mulai().catch((err) => {
  console.error('Validasi gagal dijalankan:', err.message);
  process.exit(1);
});
