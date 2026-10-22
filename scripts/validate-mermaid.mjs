// Validasi sintaks diagram Mermaid di file materi.
//
// Mengecek setiap blok kode berpagar:
//   - blok ```mermaid wajib memiliki bahasa -> `mermaid`;
//   - konten blok harus punya sintaks flowchart dasar (minimal 2 node dan panah);
//   - di-parse secara manual (tidak memerlukan pustaka external di Node).
//
// Jalankan: npm run validate-mermaid

import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = join(process.cwd(), 'public/content/materi');
const MASALAH = [];

function gagal(msg) {
  MASALAH.push(msg);
}

// Evaluasi diagram flowchart dasar tanpa pustaka external.
function evalBlok(blok) {
  const nodeRegex = /\w+(?:\s*\[\"?[^\"\]]*\"?\])?/gi;
  const arrowRegex = /(->|-->|<--|<->|---)/g;

  const nodeMatches = blok.match(nodeRegex) || [];
  const nodeCount = nodeMatches.length;
  const arrowMatches = blok.match(arrowRegex) || [];
  const arrowCount = arrowMatches.length;

  if (nodeCount < 2) {
    return `Diagram minimal perlu ${2 - nodeCount} node lagi; ditemukan ${nodeCount}`;
  }
  if (arrowCount < 1) {
    return `Diagram harus punya setidaknya 1 panah (temukan ${arrowCount})`;
  }
  return null;
}

async function validasiFile(path) {
  const isi = await readFile(path, 'utf8');
  const lines = isi.split('\n');
  let startIdx = -1;
  let bahasa = '';
  let buf = [];

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const m = /^```([\w-]+)$/.exec(l);
    if (m) {
      if (startIdx !== -1) {
        const end = i;
        const blok = buf.join('\n');
        // Validasi bahasa yang diperlukan.
        if (bahasa === 'mermaid') {
          const err = evalBlok(blok);
          if (err) {
            gagal(`${path}:${startIdx + 1}: blok \`mermaid\` tidak valid: ${err}\n\`\n${blok}\n\`\n`);
          }
        } else if (!bahasa) {
          // Blok tanpa bahasa -> tandai sebagai kesalahan (dinilai nanti oleh validate-content.mjs).
          if (blok.trim().length > 0) {
            gagal(`${path}:${startIdx + 1}: blok tanpa bahasa: ${blok.substring(0, 40)}...`);
          }
        }
      }
      startIdx = i;
      bahasa = m[1].toLowerCase();
      buf = [];
      continue;
    }
    if (startIdx !== -1 && /^```$/.test(l)) {
      const end = i;
      const blok = buf.join('\n');
      if (bahasa === 'mermaid') {
        const err = evalBlok(blok);
        if (err) {
          gagal(`${path}:${startIdx + 1}: blok \`mermaid\` tidak valid: ${err}\n\`\n${blok}\n\`\n`);
        }
      } else if (!bahasa) {
        if (blok.trim().length > 0) {
          gagal(`${path}:${startIdx + 1}: blok tanpa bahasa: ${blok.substring(0, 40)}...`);
        }
      }
      startIdx = -1;
      buf = [];
      bahasa = '';
    }
    if (startIdx !== -1) {
      buf.push(l);
    }
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      await walk(p);
    } else if (e.name.endsWith('.md')) {
      await validasiFile(p);
    }
  }
}

async function mulai() {
  await walk(ROOT);

  console.log('Validasi sintaks Mermaid:');
  if (MASALAH.length > 0) {
    for (const m of MASALAH) console.log(m);
    console.error(`\n${MASALAH.length} masalah ditemukan`);
    process.exitCode = 1;
    return;
  }
  console.log('OK: semua blok mermaid valid');
}

mulai().catch((err) => {
  console.error('Validasi gagal dijalankan:', err.message);
  process.exit(1);
});