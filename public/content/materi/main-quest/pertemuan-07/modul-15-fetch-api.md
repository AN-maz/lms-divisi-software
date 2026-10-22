# 1. Target & Prasyarat

## Target Pembelajaran

Setelah menyelesaikan materi ini, kamu bisa:

- Memakai `fetch()` untuk GET / POST / PUT / DELETE dengan benar
- Menangani error dengan benar (HTTP error vs network error)
- Menambahkan timeout & cancel menggunakan `AbortController`
- Membuat wrapper `request()` yang rapi untuk dipakai ulang
- *(Opsional)* Retry selektif + concurrency limit

## Prasyarat

| Kebutuhan | Keterangan |
| --- | --- |
| Browser modern | Chrome / Edge / Firefox |
| Node.js 18+ | Untuk tooling (Vite / server lokal) — disarankan |
| Editor | VS Code |

# 2. Setup Latihan

Node.js 18+ sudah punya `fetch` built-in, jadi kita bisa langsung latihan tanpa browser.

## Langkah 1 — Buat Folder & Init Project

```bash
mkdir fetch-node-lab
cd fetch-node-lab
npm init -y
```

## Langkah 2 — Aktifkan ESM di package.json

```json
{
  "type": "module"
}
```

## Langkah 3 — Buat File index.js

```js
const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
console.log("status:", res.status);

if (!res.ok) throw new Error(`HTTP ${res.status}`);

const data = await res.json();
console.log(data);
```

## Langkah 4 — Jalankan

```bash
node index.js
```

# 3. Mental Model Fetch API

Sebelum masuk ke kode, ada satu konsep paling penting yang wajib dipahami dulu.

## fetch() Tidak Gagal Saat 404 atau 500

`fetch()` akan **resolve** (berhasil) selama request berhasil dikirim dan mendapat respons HTTP — meskipun statusnya 404 atau 500.

`fetch()` baru akan **reject / throw** untuk hal-hal berikut:

| Kondisi | Penjelasan |
| --- | --- |
| Network error | Offline, DNS gagal, dll. |
| CORS diblokir | Server tidak mengizinkan request |
| Request di-abort | Dibatalkan via `AbortController` |

> **Penting:** Selalu cek `response.ok` atau `response.status` setelah fetch. Jangan asumsikan fetch berhasil berarti datanya valid!

## Cara Membaca Response dengan Aman

Response body **hanya bisa dibaca sekali**. Jangan panggil `res.json()` dua kali.

| Properti / Method | Keterangan |
| --- | --- |
| `res.ok` | `true` jika status 200–299 |
| `res.status` | Kode status HTTP (200, 404, 500, dst.) |
| `res.statusText` | Teks status ("OK", "Not Found", dst.) |
| `res.headers.get("content-type")` | Cek tipe konten respons |
| `await res.json()` | Baca body sebagai JSON |
| `await res.text()` | Baca body sebagai teks biasa |
| `await res.blob()` | Baca body sebagai file/gambar |

# 4. Wrapper GET JSON

Daripada menulis logika yang sama berulang kali, kita buat satu fungsi wrapper yang rapi.

## Kode: getJson()

Buat file `api.js`:

```js
export async function getJson(url, { signal } = {}) {
  const res = await fetch(url, { signal });

  // Tangani HTTP error
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
  }

  // Pastikan response benar-benar JSON
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    throw new Error(`Expected JSON, got: ${ct}`);
  }

  return res.json();
}
```

> **Catatan:** Parameter `signal` digunakan nanti untuk membatalkan request (AbortController). Kita sudah siapkan dari sekarang agar wrapper ini bisa dipakai di berbagai situasi.

# 5. Query Params & POST JSON

## Query Params — Hindari String Manual

Jangan gabungkan query params secara manual seperti `url + "?limit=" + n`. Gunakan `URL` dan `searchParams` agar lebih aman.

```js
export function buildUrl(base, query = {}) {
  const url = new URL(base);

  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null) continue;
    url.searchParams.set(k, String(v));
  }

  return url.toString();
}
```

Contoh pemakaian:

```js
const url = buildUrl("https://jsonplaceholder.typicode.com/posts", {
  _limit: 5,
  userId: 1,
});

const data = await getJson(url);
```

## POST / PUT JSON yang Benar

```js
export async function sendJson(url, { method = "POST", data, signal } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify(data),
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  // Status 204 No Content: tidak ada body untuk di-parse
  if (res.status === 204) return null;

  return res.json();
}
```

> **Catatan:** Di JSONPlaceholder, POST tidak benar-benar menyimpan data ke server — tapi responsnya sudah cukup untuk latihan.

# 6. Timeout & AbortController

Fetch **tidak punya timeout bawaan**. Kita harus membuatnya sendiri menggunakan `AbortController`.

## Cara Kerja AbortController

`AbortController` adalah objek yang punya satu tombol "batal". Kita tempelkan `signal`-nya ke fetch, lalu panggil `.abort()` kapan pun kita mau membatalkan request.

## Kode: fetchWithTimeout()

```js
export async function fetchWithTimeout(url, init = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(t); // Selalu bersihkan timer meski fetch gagal
  }
}
```

Versi `getJson` dengan timeout:

```js
export async function getJsonWithTimeout(url, { timeoutMs = 8000 } = {}) {
  const res = await fetchWithTimeout(url, {}, timeoutMs);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

## Membedakan Jenis Error

```js
try {
  await getJsonWithTimeout("...", { timeoutMs: 1000 });
} catch (err) {
  if (err.name === "AbortError") {
    console.log("Timeout atau request dibatalkan");
  } else {
    console.log("Error lain:", err.message);
  }
}
```

| Jenis Error | `err.name` | Penyebab |
| --- | --- | --- |
| Timeout / Cancel | `"AbortError"` | `controller.abort()` dipanggil |
| Network error | `"TypeError"` | Offline, DNS gagal |
| HTTP error | Custom (dari kita) | Status 4xx / 5xx |

# 7. Retry Selektif (Opsional)

Untuk aplikasi yang lebih tangguh, kita bisa otomatis mencoba ulang request yang gagal — tapi hanya untuk kondisi yang memang sementara.

## Kapan Boleh Retry?

| Kondisi | Retry? | Alasan |
| --- | --- | --- |
| Network error (fetch throw) | ✅ Ya | Mungkin koneksi sesaat putus |
| Status 502 / 503 / 504 | ✅ Ya | Server sedang overload sementara |
| Status 400 / 401 / 404 | ❌ Tidak | Error dari sisi client, retry tidak akan membantu |

## Kode: getJsonWithRetry()

```js
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export async function getJsonWithRetry(url, { retries = 2 } = {}) {
  let attempt = 0;

  while (true) {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        const retryable = [502, 503, 504].includes(res.status);

        if (retryable && attempt < retries) {
          attempt++;
          await sleep(200 * 2 ** (attempt - 1)); // Jeda: 200ms, 400ms, 800ms...
          continue;
        }

        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} - ${text}`);
      }

      return await res.json();

    } catch (err) {
      if (err.name !== "AbortError" && attempt < retries) {
        attempt++;
        await sleep(200 * 2 ** (attempt - 1));
        continue;
      }
      throw err;
    }
  }
}
```

> **Catatan:** Pola jeda yang makin lama (200ms → 400ms → 800ms) disebut **Exponential Backoff**. Ini standar industri agar server yang sedang sibuk tidak langsung dibombardir retry berulang kali.

# 8. Lab Praktikum

Saatnya praktik! Berikut 7 lab yang bisa langsung kamu jalankan.

## Lab 1 — GET List

**Target:** Tampilkan 5 post pertama.

**Endpoint:** `https://jsonplaceholder.typicode.com/posts?_limit=5`

Gunakan `getJson()` yang sudah kamu buat. Pastikan kamu mengecek `res.ok` sebelum parse JSON.

## Lab 2 — GET dengan Query Builder

**Target:** Ambil post `userId=1` limit 5 menggunakan `buildUrl()`.

```js
const url = buildUrl("https://jsonplaceholder.typicode.com/posts", {
  userId: 1,
  _limit: 5,
});
const data = await getJson(url);
console.log(data);
```

## Lab 3 — Error Handling HTTP (404)

**Target:** Panggil URL yang salah, pastikan error message berisi status HTTP.

**Endpoint:** `https://jsonplaceholder.typicode.com/unknown`

Pastikan output error menyebutkan `HTTP 404`.

## Lab 4 — POST JSON

**Target:** POST data berikut dan tampilkan respons server.

**Endpoint:** `https://jsonplaceholder.typicode.com/posts`

```js
const result = await sendJson("https://jsonplaceholder.typicode.com/posts", {
  data: {
    title: "Hello",
    body: "World",
    userId: 1,
  },
});
console.log(result);
```

## Lab 5 — Paksa Timeout

**Target:** Gunakan `timeoutMs: 1` untuk memaksa timeout, lalu tangani `AbortError`.

```js
try {
  await getJsonWithTimeout(
    "https://jsonplaceholder.typicode.com/posts/1",
    { timeoutMs: 1 }
  );
} catch (err) {
  if (err.name === "AbortError") {
    console.log("Request timeout!");
  }
}
```

## Lab 6 — Cancel Request Sebelumnya (Kasus Search)

**Target:** Saat user mengetik, request lama otomatis dibatalkan sebelum request baru dikirim.

```js
let currentController = null;

async function searchPosts(q) {
  // Batalkan request sebelumnya jika masih berjalan
  if (currentController) currentController.abort();
  currentController = new AbortController();

  const url = buildUrl("https://jsonplaceholder.typicode.com/posts", {});
  const data = await getJson(url, { signal: currentController.signal });

  // Filter di client (API ini tidak punya fitur search)
  return data.filter(p => p.title.includes(q));
}
```

> **Catatan:** Pola ini sangat umum dipakai di fitur search/autocomplete. Tanpa cancel, bisa terjadi **race condition** — response lama datang belakangan dan menimpa hasil terbaru.

## Lab 7 — Retry Selektif

**Target:** Bungkus request dengan `getJsonWithRetry()` dan amati perilakunya.

Untuk menguji, coba:
- Putuskan internet sebentar untuk mensimulasikan network error
- Atau panggil URL yang tidak ada untuk melihat HTTP error

# 9. Struktur Mini API Client

Kalau kamu pakai Vite atau ingin kode yang rapi dan reusable, gunakan struktur berikut sebagai template project.

## Struktur Folder

```
src/
└── api/
    ├── client.js      ← request wrapper (buildUrl, getJson, sendJson, timeout, retry)
    └── endpoints.js   ← fungsi per-endpoint (listPosts, createPost, dst.)
```

## client.js — Fungsi Low-Level

```js
// buildUrl, request, getJson, sendJson, fetchWithTimeout, getJsonWithRetry
// Semua utility dasar dikumpulkan di sini
```

## endpoints.js — Fungsi Per-Endpoint

```js
import { getJson, sendJson, buildUrl } from "./client.js";

export function listPosts({ limit, userId } = {}) {
  const url = buildUrl("https://jsonplaceholder.typicode.com/posts", {
    _limit: limit,
    userId,
  });
  return getJson(url);
}

export function createPost(payload) {
  return sendJson("https://jsonplaceholder.typicode.com/posts", {
    data: payload,
  });
}
```

> **Tips:** Dengan memisahkan `client.js` dan `endpoints.js`, kamu bisa mengganti base URL atau logika auth di satu tempat tanpa menyentuh semua endpoint.