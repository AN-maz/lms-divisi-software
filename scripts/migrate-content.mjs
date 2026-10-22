// Migrasi satu kali (ARSIP): dari struktur lama ke struktur saat ini.
//
//   public/materi/*.md       -> public/content/materi/main-quest/pertemuan-NN/modul-NN-slug.md
//   public/materi/<debug>.md -> public/content/debugging-jiwa/kesadaran-organik.md
//   public/data/quizzes.json -> public/content/kuis/modul-NN.json  (1 file per modul)
//   public/silabus.json      -> public/content/kurikulum.json      (skema multi-jalur "tracks")
//
// Skrip ini SUDAH DIJALANKAN. Sumbernya (public/silabus.json, public/data/quizzes.json,
// public/materi/) sudah dihapus, jadi sekarang skrip ini akan berhenti dengan pesan.
// Disimpan sebagai rujukan bila suatu saat perlu mengulang migrasi dari git history.
//
// Jalankan: npm run migrate:content

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PUBLIC = join(ROOT, 'public');
const KONTEN = join(PUBLIC, 'content');

const SILABUS_LAMA = join(PUBLIC, 'silabus.json');
const KUIS_LAMA = join(PUBLIC, 'data', 'quizzes.json');

// slug URL-friendly untuk nama file materi, dipetakan per id modul.
const SLUG_MODUL = {
  1: 'dasar-dasar-html',
  2: 'konsep-dasar-css',
  3: 'javascript-dasar',
  4: 'javascript-dom',
  5: 'pengenalan-ddl',
  6: 'dml-dan-constraints',
  7: 'dql-dan-agregasi',
  8: 'join-dan-subqueries',
  9: 'fungsi-bawaan-dan-kondisional',
  10: 'window-function-cte-view',
  11: 'transaksi-indexing-keamanan',
  12: 'konsep-backend',
  13: 'build-simple-project-backend',
  14: 'konsep-frontend-vite-tailwind',
  15: 'fetch-api',
  16: 'pengenalan-react',
  17: 'react-lanjutan-lifecycle',
  18: 'mini-project-multipage',
  19: 'react-intermediate',
};

const pad = (n) => String(n).padStart(2, '0');
const namaModul = (id) => `modul-${pad(id)}-${SLUG_MODUL[id]}`;
const namaPertemuan = (n) => `pertemuan-${pad(n)}`;

// Jalur yang dipakai skema tracks saat ini.
const TRACK_UTAMA = 'main-quest';
const TRACK_TAMBAHAN = 'side-quest';

const baca = async (p) => JSON.parse(await readFile(p, 'utf8'));
const ada = (p) => access(p).then(() => true, () => false);

const catat = (aksi, dari, ke) => ({ aksi, dari, ke });

async function salinBila(tindakan, dari, ke) {
  if (!(await ada(dari))) return null;
  await mkdir(dirname(ke), { recursive: true });
  await writeFile(ke, await readFile(dari));
  tindakan.push(catat('salin', dari.replace(ROOT, ''), ke.replace(ROOT, '')));
  return true;
}

async function jalan() {
  const tindakan = [];
  const masalah = [];

  if (!(await ada(SILABUS_LAMA))) {
    console.log('Migrasi tidak dijalankan: sumber lama sudah tidak ada.');
    console.log(`  ${SILABUS_LAMA.replace(ROOT, '')} tidak ditemukan.`);
    console.log('Konten sudah berada di struktur baru (public/content/). Tidak ada yang perlu dilakukan.');
    return;
  }

  const silabus = await baca(SILABUS_LAMA);
  const semuaModul = silabus.flatMap((g) => (g.modules ?? []).map((m) => ({ ...m, pertemuan: g.pertemuan })));

  // 1. Materi: satu file per modul, dikelompokkan per pertemuan di dalam jalur utama.
  for (const m of semuaModul) {
    if (!SLUG_MODUL[m.id]) {
      masalah.push(`Modul ${m.id} belum punya slug di SLUG_MODUL`);
      continue;
    }
    const dari = join(PUBLIC, m.file.replace(/^\//, ''));
    const ke = join(KONTEN, 'materi', TRACK_UTAMA, namaPertemuan(m.pertemuan), `${namaModul(m.id)}.md`);
    if (!(await salinBila(tindakan, dari, ke))) {
      masalah.push(`File materi modul ${m.id} tidak ada: ${m.file}`);
    }
  }

  // 2. Materi "Debugging Jiwa" (dipakai bersama semua modul).
  const debugAsal = semuaModul.find((m) => m.debug_jiwa)?.debug_jiwa;
  let debugTujuan = null;
  if (debugAsal) {
    const dari = join(PUBLIC, 'materi', `${debugAsal.slug}.md`);
    debugTujuan = join(KONTEN, 'debugging-jiwa', 'kesadaran-organik.md');
    if (!(await salinBila(tindakan, dari, debugTujuan))) {
      masalah.push(`File debug tidak ada: /materi/${debugAsal.slug}.md`);
    }
  } else {
    masalah.push('Tidak ada entri debug_jiwa di silabus lama');
  }

  // 3. Kuis: pecah satu file besar menjadi satu file per modul.
  if (await ada(KUIS_LAMA)) {
    const kuis = await baca(KUIS_LAMA);
    for (const [id, daftarSoal] of Object.entries(kuis)) {
      const ke = join(KONTEN, 'kuis', `modul-${pad(id)}.json`);
      await mkdir(dirname(ke), { recursive: true });
      await writeFile(ke, `${JSON.stringify(daftarSoal, null, 2)}\n`);
      tindakan.push(catat('pecah-kuis', `public/data/quizzes.json[${id}]`, ke.replace(ROOT, '')));
    }
  } else {
    masalah.push(`Tidak menemukan ${KUIS_LAMA}`);
  }

  // 4. Manifest baru (skema tracks): metadata saja, path kuis TIDAK dicatat.
  //    Pertemuan lama dibungkus ke jalur "main-quest".
  const kurikulum = {
    debug_jiwa: debugAsal ? { title: debugAsal.title, slug: 'kesadaran-organik' } : null,
    tracks: [
      {
        slug: TRACK_UTAMA,
        nama: 'Main Quest',
        tagline: 'Misi utama mingguan: dari fondasi web sampai integrasi backend.',
        ikon: 'compass',
        pertemuan: silabus.map((g) => ({
          pertemuan: g.pertemuan,
          title: g.title,
          description: g.description,
          modules: (g.modules ?? []).map((m) => ({
            id: m.id,
            title: m.title,
            file: `/content/materi/${TRACK_UTAMA}/${namaPertemuan(g.pertemuan)}/${namaModul(m.id)}.md`,
          })),
        })),
      },
      {
        slug: TRACK_TAMBAHAN,
        nama: 'Side Quest',
        tagline: 'Misi sampingan di luar kurikulum: tooling, studi kasus, dan eksperimen bebas.',
        ikon: 'flask',
        pertemuan: [],
      },
    ],
  };

  const manifestTujuan = join(KONTEN, 'kurikulum.json');
  await mkdir(dirname(manifestTujuan), { recursive: true });
  await writeFile(manifestTujuan, `${JSON.stringify(kurikulum, null, 2)}\n`);
  tindakan.push(catat('tulis-manifest', 'public/silabus.json', manifestTujuan.replace(ROOT, '')));

  // Laporan.
  const laporan = {
    dijalankanPada: new Date().toISOString(),
    totalModul: semuaModul.length,
    tindakan,
    masalah,
    sisaUntukDihapus: [
      'public/silabus.json',
      'public/data/quizzes.json',
      'public/materi/',
    ],
  };
  const laporanPath = join(ROOT, 'scripts', 'migrate-content.report.json');
  await writeFile(laporanPath, `${JSON.stringify(laporan, null, 2)}\n`);

  console.log(`Migrasi selesai: ${tindakan.length} tindakan, ${masalah.length} masalah.`);
  if (masalah.length) {
    console.log('\nMasalah:');
    for (const m of masalah) console.log(`  - ${m}`);
  }
  console.log(`\nLaporan: ${laporanPath.replace(ROOT, '')}`);
  console.log('\nFile lama dibiarkan (verifikasi dulu, lalu hapus):');
  for (const s of laporan.sisaUntukDihapus) console.log(`  - ${s}`);

  if (masalah.length) process.exitCode = 1;
}

jalan().catch((err) => {
  console.error('Migrasi gagal:', err.message);
  process.exit(1);
});
