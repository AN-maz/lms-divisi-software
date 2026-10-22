# React Intermadiate 

## Daftar Isi 
1. [Pendahuluan](#)
2. [React Router](#)
3. [Context-API](#)
4. [AXIOS](#)
5. [CRUD](#)

# Pendahuluan
Setelah belajar dasar-dasar React seperti JSX, Components, Props, State, hingga penggunaan Hook, sekarang saatnya naik level. Pada modul ini, kita akan mulai membangun aplikasi React yang tidak hanya menampilkan data statis, tetapi juga bisa terhubung dengan backend dan mengelola data secara real-time.

Di dunia pengembangan web saat ini, frontend dan backend biasanya dibuat secara terpisah. React berperan sebagai frontend yang bertugas menampilkan antarmuka dan menerima interaksi dari pengguna, sedangkan backend bertugas mengelola data serta logika aplikasi. Agar keduanya bisa saling berkomunikasi, kita memerlukan REST API sebagai penghubung.

Pada modul ini, kamu akan belajar beberapa teknologi yang sering digunakan dalam pengembangan aplikasi React. Pertama, React Router untuk membuat navigasi antar halaman tanpa perlu me-refresh browser. Selanjutnya, Context API untuk mengelola data yang digunakan oleh banyak komponen tanpa harus mengirim props berulang kali. Setelah itu, kita akan menggunakan Axios untuk mengambil dan mengirim data ke backend melalui REST API. Terakhir, kamu akan mengimplementasikan operasi CRUD (Create, Read, Update, Delete) agar aplikasi dapat menampilkan, menambahkan, mengubah, dan menghapus data.

Di akhir modul, kamu diharapkan sudah mampu membuat aplikasi React yang memiliki navigasi, menggunakan state global, terhubung dengan backend melalui REST API, serta memiliki fitur CRUD. Dengan bekal tersebut, kamu sudah memiliki fondasi yang kuat untuk mulai mengembangkan aplikasi web yang lebih kompleks, seperti dashboard admin, sistem manajemen data, hingga project full-stack.

# React Router
Bayangkan aplikasi web-mu adalah sebuah mal besar. Tanpa React Router, setiap kali kamu ingin pindah dari toko A ke toko B, kamu harus keluar mal, masuk lagi dari pintu utama (reload halaman). Sangat tidak efisien!

React Router adalah **peta dan lorong instan** di dalam mal. Kamu bisa pindah dari toko mana pun ke toko lain dalam sekejap, tanpa harus keluar masuk. Inilah yang disebut **Single Page Application (SPA)** — satu halaman HTML yang pintar mengganti konten tanpa reload.

---

## Konsep Dasar React Router

React Router bekerja dengan prinsip sederhana:

1. URL browser menentukan tampilan mana yang aktif.
2. Saat URL berubah, React Router langsung mengganti komponen yang dirender — tanpa reload.
3. Ada dua mode routing: `BrowserRouter` (menggunakan history API browser) dan `HashRouter` (menggunakan hash `#`).

Di project ini, kita menggunakan **BrowserRouter** yang menghasilkan URL normal seperti `/products`, bukan `/#/products`.

---

## BrowserRouter, Routes, dan Route

### BrowserRouter

Pertama, bungkus seluruh aplikasi dengan `BrowserRouter` agar React Router bisa memantau perubahan URL.

```jsx
// File: App.jsx
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
```

### Routes dan Route

`Routes` adalah wadah untuk mendefinisikan rute. Setiap `Route` menghubungkan sebuah **path** (URL) dengan **element** (komponen).

```jsx
// File: routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
      <Route path="/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
      <Route path="/products/edit/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
```

> **Catatan:** Urutan `Route` di dalam `Routes` tidak penting — React Router otomatis mencocokkan path yang paling spesifik (pencocokan relatif, bukan sekuensial).

---

## Navigasi dengan Link dan NavLink

`<Link>` adalah pengganti tag `<a>` yang tidak menyebabkan reload halaman. Gunakan untuk navigasi normal.

`<NavLink>` adalah versi spesial dari `Link` yang otomatis tahu apakah path-nya sedang aktif — sangat berguna untuk menu navigasi.

```jsx
// File: components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/products', label: 'Products', icon: '📦' },
]

// Di dalam JSX:
<nav>
  {links.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      end={link.to === '/'}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isActive ? 'bg-primary-light text-white' : 'text-white/80 hover:bg-primary-dark'
        }`
      }
    >
      <span>{link.icon}</span>
      <span>{link.label}</span>
    </NavLink>
  ))}
</nav>
```

Properti `end` pada `NavLink` `/` memastikan bahwa link Dashboard hanya aktif saat URL persis `/`, bukan saat di `/products`.

> **Awas Error!:** Jangan gunakan `<a href="/products">` untuk navigasi internal — itu akan me-reload seluruh halaman dan menghilangkan state React.

---

## Navigasi Programmatic dengan useNavigate

Kadang kamu perlu memindahkan halaman secara otomatis, misalnya setelah form login berhasil atau setelah menyimpan data. Gunakan **useNavigate**.

```jsx
// File: pages/Login.jsx (potongan)
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login, token } = useAuth()

  // Redirect otomatis jika sudah login
  if (token) {
    navigate('/', { replace: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(form.username, form.password)
      navigate('/', { replace: true }) // Arahkan ke dashboard
    } catch {
      setError('Login gagal')
    }
  }
  // ...
}
```

Parameter `{ replace: true }` membuat navigasi mengganti history, bukan menumpuknya. Jadi user tidak bisa klik "Back" ke halaman login setelah sukses login.

---

## Membaca Parameter URL dengan useParams

Saat membuat halaman detail atau edit, kamu perlu membaca ID dari URL. Gunakan **useParams**.

```jsx
// File: pages/products/ProductForm.jsx (potongan)
import { useParams, useNavigate } from 'react-router-dom'

export default function ProductForm() {
  const { id } = useParams()  // id dari URL /products/edit/:id
  const navigate = useNavigate()
  const isEdit = !!id

  useEffect(() => {
    if (isEdit) {
      getProduct(id).then((p) => setForm({ ... }))
    }
  }, [id])
  // ...
}
```

Rute `/products/edit/:id` akan cocok dengan URL seperti `/products/edit/5`. Nilai `:id` bisa dibaca dengan `useParams()`, menghasilkan `{ id: "5" }`.

# Context API
Bayangkan kamu tinggal di sebuah kost. Ada paket makanan datang untukmu di pos satpam depan. Tanpa Context API, satpam harus memanggil satu per satu penghuni kost: "Hei, ini paket untuk si Anu... tolong sampaikan ke kamar 3B...".

Ini namanya **prop drilling** — mengoper data dari komponen kakek ke komponen cucu, melewati banyak komponen perantara yang sebenarnya tidak membutuhkan data tersebut.

Context API adalah seperti **papan pengumuman di lobi**. Satpam cukup tempel informasi di papan, dan siapa pun yang butuh tinggal datang membaca. Semua kamar bisa langsung tahu.


## Masalah Prop Drilling

Sebelum Context API, untuk mengirim data dari komponen paling atas ke komponen paling dalam, kamu harus menulis kode seperti ini:

```jsx
// ❌ Tanpa Context — Prop Drilling
function App() {
  const [user, setUser] = useState(null)
  return <Layout user={user} setUser={setUser} />
}

function Layout({ user, setUser }) {
  return (
    <div>
      <Sidebar user={user} />
      <Main user={user} setUser={setUser} />
    </div>
  )
}

function Main({ user, setUser }) {
  return <Dashboard user={user} setUser={setUser} />
}
```

Perhatikan bahwa komponen `Layout` dan `Main` tidak peduli dengan `user`, tapi terpaksa menerimanya hanya untuk dioper lagi ke anaknya. Bayangkan jika ada 10 level kedalaman — sangat tidak efisien dan sulit dirawat.

---

## Konsep Context API

Context API adalah fitur React yang memungkinkan data tersedia secara global di dalam pohon komponen tanpa harus dioper secara manual melalui props.

Ada 3 langkah utama:
1. **createContext** — buat "papan pengumuman" (context object).
2. **Provider** — tempel informasi di papan (menyediakan data).
3. **useContext** — baca informasi dari papan (mengonsumsi data).

---

## Membuat Context dengan createContext

```jsx
// File: context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

// 1. Buat context object dengan nilai default null
const AuthContext = createContext(null)
```

Fungsi `createContext(defaultValue)` mengembalikan object context yang memiliki dua komponen: `Provider` dan `Consumer`. Nilai default hanya dipakai jika komponen tidak dibungkus oleh Provider.

---

## Menyediakan Data dengan Provider

Provider membungkus komponen-komponen yang perlu mengakses data. Semua komponen di dalamnya bisa membaca nilai `value` yang diberikan.

```jsx
// File: context/AuthContext.jsx — lanjutan
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  const login = async (username, password) => {
    const data = await loginUser(username, password)
    setToken(data.accessToken)
    setUser({ id: data.id, username: data.username })
    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

Agar Provider tersedia di seluruh aplikasi, bungkus di komponen paling atas:

```jsx
// File: App.jsx
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
```

Setiap komponen di dalam `<AuthProvider>` (termasuk semua halaman di `AppRoutes`) bisa mengakses `user`, `token`, `login`, dan `logout`.

> **Pro-Tip:** Kamu bisa membuat Provider bertumpuk (nested providers) — misalnya satu untuk Auth, satu untuk Theme, satu untuk Cart.

---

## Mengakses Data dengan useContext

Komponen anak bisa membaca nilai dari context menggunakan hook `useContext`:

```jsx
// File: context/AuthContext.jsx — lanjutan
export const useAuth = () => useContext(AuthContext)
```

Dengan membuat custom hook `useAuth`, komponen lain bisa mengakses context dengan kode yang bersih:

```jsx
// File: components/layout/Sidebar.jsx
import { useAuth } from '../../context/AuthContext'

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside>
      {/* ... */}
      <p>Hi, {user?.username}</p>
      <button onClick={logout}>Logout</button>
    </aside>
  )
}
```

```jsx
// File: routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
```

```jsx
// File: pages/Login.jsx (potongan)
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, token } = useAuth()
  // token → cek apakah sudah login
  // login → fungsi untuk login
}
```

> **Awas Error!:** Pastikan komponen yang menggunakan `useContext` berada **di dalam** Provider. Jika tidak, `useContext` akan mengembalikan nilai default (null) yang bisa menyebabkan error `Cannot read properties of null`.

---

## Studi Kasus: AuthContext di Project

Di project ini, `AuthContext` mengelola tiga hal:

| Data | Fungsi | Digunakan di |
|---|---|---|
| `user` | Menyimpan data user (id, username) | Sidebar (tampilkan nama), Navbar (inisial avatar) |
| `token` | Menyimpan JWT token | ProtectedRoute (cek login), api.js (interceptor) |
| `login()` | Login via API, set token & user | Login page |
| `logout()` | Hapus token & user dari state | Sidebar |

Alur data:
1. User login → `AuthContext.login()` dipanggil → token & user tersimpan di state & localStorage.
2. ProtectedRoute membaca `token` dari context → jika ada, render children; jika tidak, redirect ke `/login`.
3. Sidebar membaca `user` untuk menampilkan nama dan tombol logout.
4. Axios interceptor membaca `token` dari localStorage (bukan context) untuk disertakan di header request.

# AXIOS

Bayangkan kamu ingin memesan Nasi Padang inhoftank. Tanpa Axios, kamu harus telepon langsung ke rumah makan, menyebutkan pesanan, alamat, dan berharap tidak ada gangguan sinyal padahal jangan pernah berharap selain ke Tuhan.

Axios adalah seperti **aplikasi delivery terpadu**. Kamu cukup buka aplikasi, pilih menu yang kamu mau, masukkan alamat, klik "Pesan" — aplikasi mengurus komunikasi dengan rumah makan, menunggu konfirmasi, dan memberitahu kamu hasilnya. Jika ada error (rumah makan tutup), kamu langsung dapat notifikasi.

Di React, **Axios** adalah pustaka HTTP client yang digunakan untuk berkomunikasi dengan API backend. Mulai dari mengambil data (GET), mengirim data (POST), memperbarui (PUT), hingga menghapus (DELETE).


---

## Apa Itu Axios?

Axios adalah promise-based HTTP client untuk browser dan Node.js. Beberapa keunggulan:

| Fitur | Axios | fetch() bawaan |
|---|---|---|
| JSON otomatis | ✅ Otomatis parse | ❌ Perlu `.json()` manual |
| Interceptors | ✅ Ada | ❌ Tidak ada |
| Timeout | ✅ Mudah diatur | ❌ Ribet |
| Base URL | ✅ Bisa diset global | ❌ Harus tulis ulang |
| Error handling | ✅ Lebih detail | ❌ Hanya error jaringan |
| Upload progress | ✅ Ada | ❌ Ribet |

---

## Instalasi dan Setup

Di project ini, Axios sudah terinstal. Jika ingin instal dari awal:

```bash
npm install axios
```

Cek di `package.json`:
```json
"dependencies": {
  "axios": "^1.18.1",
  // ...
}
```

---

## Membuat Instance Axios

Daripada menulis `axios.get('https://dummyjson.com/products')` berulang-ulang, kita buat satu instance dengan konfigurasi dasar. Semua request akan otomatis menggunakan base URL ini.

```javascript
// File: services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

export default api
```

Sekarang, daripada:
```javascript
axios.get('https://dummyjson.com/products')
axios.post('https://dummyjson.com/auth/login', data)
```

Cukup:
```javascript
api.get('/products')
api.post('/auth/login', data)
```

> **Pro-Tip:** Simpan base URL di environment variable (`.env`) agar mudah diganti antara development dan production.

---

## Interceptor: Menyisipkan Token Otomatis

Interceptor adalah "satpam" yang menyisipkan sesuatu ke setiap request yang keluar, atau memproses response yang masuk.

```javascript
// File: services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

// Request interceptor — otomatis tambah header Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
```

Dengan interceptor ini, setiap request API yang membutuhkan autentikasi **tidak perlu manual** menambahkan header `Authorization`. Cukup simpan token di localStorage, dan Axios akan mengurus sisanya.

> **Awas Error!:** Interceptor request harus selalu mengembalikan `config`. Jika lupa `return config`, request akan stuck (tidak pernah terkirim).

---

## Membuat Service Layer

Service layer adalah folder yang berisi fungsi-fungsi yang membungkus panggilan API. Ini membuat kode di komponen tetap bersih dan fokus ke UI.

### Auth Service

```javascript
// File: services/authService.js
import api from './api'

export const loginUser = async (username, password) => {
  const { data } = await api.post('/auth/login', { username, password })
  return data
  // data berisi: { id, username, email, accessToken, ... }
}
```

### Product Service

```javascript
// File: services/productService.js
import api from './api'

// READ ALL
export const getProducts = async () => {
  const { data } = await api.get('/products?limit=30')
  return data.products
}

// READ ONE
export const getProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`)
  return data
}

// CREATE
export const createProduct = async (product) => {
  const { data } = await api.post('/products/add', product)
  return data
}

// UPDATE
export const updateProduct = async (id, product) => {
  const { data } = await api.put(`/products/${id}`, product)
  return data
}

// DELETE
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`)
  return data
}
```

> **Kenapa dipisah?** Dengan service layer, jika API endpoint berubah, kamu cukup edit satu file — bukan puluhan komponen yang memanggilnya.

---

## CRUD dengan Axios di Komponen

### READ — Mengambil Data (useEffect + useState)

```jsx
// File: pages/Dashboard.jsx (potongan)
import { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getProducts().then((products) => {
      const total = products.length
      const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
      setStats({ total, totalStock })
    }).catch(() => {})
  }, [])

  return (
    <div>
      <p>Total Produk: {stats?.total ?? '-'}</p>
    </div>
  )
}
```

### CREATE — Mengirim Data Baru

```jsx
// File: pages/products/ProductForm.jsx (potongan)
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await createProduct({ title, price, description })
    navigate('/products')
  } catch {
    alert('Gagal menyimpan produk')
  }
}
```

### UPDATE — Memperbarui Data

```jsx
// File: pages/products/ProductForm.jsx (potongan)
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    if (isEdit) {
      await updateProduct(id, { title, price, description })
    }
    navigate('/products')
  } catch {
    alert('Gagal menyimpan produk')
  }
}
```

### DELETE — Menghapus Data

```jsx
// File: pages/products/ProductList.jsx (potongan)
const handleDelete = async () => {
  try {
    await deleteProduct(deleteId)
    setProducts((prev) => prev.filter((p) => p.id !== deleteId))
  } catch {
    alert('Gagal menghapus produk')
  }
}
```

---

## Penanganan Error

Selalu bungkus panggilan API dengan try-catch untuk menangani error:

```javascript
try {
  const data = await api.get('/products')
  // sukses
} catch (error) {
  if (error.response) {
    // Server merespon dengan status error (4xx, 5xx)
    console.log(error.response.status)    // 401, 404, 500
    console.log(error.response.data)      // Pesan error dari server
  } else if (error.request) {
    // Request terkirim tapi tidak ada response (jaringan mati)
    console.log('Tidak ada response dari server')
  } else {
    // Error lain (salah konfigurasi)
    console.log('Error:', error.message)
  }
}
```

---

# CRUD


## Pendahuluan

Bayangkan kamu adalah petugas perpustakaan. Setiap hari kamu harus:
- Melihat daftar buku yang tersedia (READ)
- Mendaftarkan buku baru yang datang (CREATE)
- Memperbaiki data buku yang salah (UPDATE)
- Menyingkirkan buku yang sudah rusak (DELETE)

Ini adalah siklus CRUD — **Create, Read, Update, Delete** — operasi dasar yang ada di hampir setiap aplikasi: e-commerce, CMS, dashboard, POS, dll.

Di project ini, kita akan melihat implementasi CRUD lengkap pada halaman **Products** menggunakan React + Axios + React Router.

---

## Struktur Halaman CRUD

Project ini memiliki struktur halaman CRUD sebagai berikut:

```text
src/
├── pages/
│   └── products/
│       ├── ProductList.jsx     → READ + DELETE (daftar produk)
│       └── ProductForm.jsx     → CREATE + UPDATE (form tambah/edit)
├── services/
│   └── productService.js       → Fungsi API untuk CRUD
├── components/
│   └── ui/
│       ├── Table.jsx           → Komponen tabel reusable
│       ├── Modal.jsx           → Komponen konfirmasi hapus
│       ├── Button.jsx          → Tombol reusable
│       └── Input.jsx           → Input field reusable
└── routes/
    └── AppRoutes.jsx           → Routing halaman
```

Setiap operasi CRUD terdiri dari 3 lapisan:

| Lapisan | Tugas | File |
|---|---|---|
| **Service Layer** | Komunikasi dengan API | `productService.js` |
| **Page Component** | Logic UI + state | `ProductList.jsx`, `ProductForm.jsx` |
| **UI Components** | Elemen visual reusable | `Table.jsx`, `Modal.jsx`, dll |

---

## READ — Menampilkan Data Produk

`ProductList.jsx` adalah halaman yang menampilkan semua produk dalam bentuk tabel.

```jsx
// File: pages/products/ProductList.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from '../../services/productService'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProducts = () => {
    setLoading(true)
    getProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProducts() }, [])

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1>Products</h1>
        <Link to="/products/new">
          <Button variant="accent">+ Add Product</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-secondary">Loading...</p>
      ) : (
        <Table headers={['Image', 'Title', 'Price', 'Stock', 'Actions']}>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td><img src={product.thumbnail} className="w-12 h-12 object-cover rounded" /></td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td className="flex gap-2">
                <Link to={`/products/edit/${product.id}`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <Button variant="danger" onClick={() => setDeleteId(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </>
  )
}
```

### Yang Terjadi:
1. `useEffect` memanggil `getProducts()` saat komponen dimuat.
2. Data disimpan ke state `products` dan ditampilkan sebagai tabel.
3. Setiap baris memiliki tombol Edit (link ke `/products/edit/:id`) dan Delete (buka modal).
4. Pagination membagi data menjadi beberapa halaman (6 item per halaman).

> **Pola Penting:** Fungsi `fetchProducts` dipisahkan agar bisa dipanggil ulang setelah operasi CREATE/UPDATE/DELETE tanpa reload halaman.

---

## CREATE — Form Tambah Produk

`ProductForm.jsx` digunakan untuk CREATE (tambah baru) dan UPDATE (edit). Mode ditentukan dari ada/tidaknya `id` di URL.

```jsx
// File: pages/products/ProductForm.jsx (potongan — mode CREATE)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../../services/productService'

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id  // false → mode CREATE
  const [form, setForm] = useState({ title: '', price: '', description: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { ...form, price: Number(form.price) }

      if (isEdit) {
        await updateProduct(id, payload)  // UPDATE
      } else {
        await createProduct(payload)      // CREATE
      }

      navigate('/products')  // Kembali ke daftar setelah sukses
    } catch {
      alert('Gagal menyimpan produk')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Product</h1>
      <Input label="Title" value={form.title} onChange={...} />
      <Input label="Price" type="number" value={form.price} onChange={...} />
      <textarea value={form.description} onChange={...} />
      <Button type="submit">Create Product</Button>
      <Button type="button" onClick={() => navigate('/products')}>Cancel</Button>
    </form>
  )
}
```

### Alur CREATE:
1. Pengguna klik tombol "+ Add Product" → navigasi ke `/products/new`.
2. Form muncul dengan field kosong.
3. Pengguna isi data dan submit → `createProduct` dipanggil.
4. Jika sukses, redirect ke `/products`.
5. Jika gagal, muncul alert error.

> **Awas Error!:** Jangan lupa konversi tipe data. `price` dari input adalah string (`"19.99"`), tapi API menerima number. Gunakan `Number()` sebelum dikirim.

---

## UPDATE — Form Edit Produk

Mode UPDATE aktif saat ada `id` di URL (rute `/products/edit/:id`).

```jsx
// File: pages/products/ProductForm.jsx (potongan — mode UPDATE)
export default function ProductForm() {
  const { id } = useParams()
  const isEdit = !!id
  const [fetchLoading, setFetchLoading] = useState(isEdit)

  useEffect(() => {
    if (isEdit) {
      // Ambil data produk yang akan diedit
      getProduct(id)
        .then((p) => setForm({
          title: p.title,
          price: String(p.price),
          description: p.description
        }))
        .catch(() => alert('Gagal memuat produk'))
        .finally(() => setFetchLoading(false))
    }
  }, [id])
}
```

### Alur UPDATE:
1. Pengguna klik "Edit" → navigasi ke `/products/edit/5`.
2. `useEffect` membaca `id`, memanggil `getProduct(id)`.
3. Data produk diisi ke form via `setForm`.
4. Pengguna ubah data dan submit → `updateProduct(id, payload)` dipanggil.
5. Redirect ke `/products` setelah sukses.

### Perbedaan CREATE vs UPDATE:

| Aspek | CREATE | UPDATE |
|---|---|---|
| URL | `/products/new` | `/products/edit/:id` |
| `useParams()` | `{}` (no id) | `{ id: "5" }` |
| Judul | "Add Product" | "Edit Product" |
| Tombol | "Create Product" | "Update Product" |
| API call | `createProduct()` | `updateProduct(id)` |
| Data awal | Form kosong | Form terisi dari API |

---

## DELETE — Hapus dengan Konfirmasi

DELETE dilakukan dengan modal konfirmasi agar pengguna tidak tidak sengaja menghapus data.

```jsx
// File: pages/products/ProductList.jsx (potongan)
import Modal from '../../components/ui/Modal'

export default function ProductList() {
  const [deleteId, setDeleteId] = useState(null)

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteProduct(deleteId)
      setProducts((prev) => prev.filter((p) => p.id !== deleteId))
    } catch {
      alert('Gagal menghapus produk')
    }
    setDeleteId(null) // Tutup modal
  }

  return (
    <>
      {/* ...tabel produk... */}
      <Button variant="danger" onClick={() => setDeleteId(product.id)}>Delete</Button>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <p>Yakin ingin menghapus produk ini?</p>
        <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal>
    </>
  )
}
```

### Alur DELETE:
1. Klik "Delete" → `setDeleteId(product.id)` → modal terbuka.
2. Jika klik "Cancel" → `setDeleteId(null)` → modal tertutup.
3. Jika klik "Delete" → `deleteProduct(id)` dipanggil → produk dihapus dari state lokal (`filter`) → modal tertutup.

> 💡 **Optimistic Update:** Perhatikan bahwa produk langsung dihapus dari state (`filter`) tanpa menunggu konfirmasi server. Ini disebut optimistic update — UI terasa lebih cepat. Jika API gagal, kita tampilkan error dan user bisa refresh data.

---

## Loading, Error, dan Empty State

Aplikasi CRUD yang baik harus menangani 3 kondisi ini:

### 1. Loading State

Tampilkan indikator loading saat data sedang diambil:

```jsx
// ProductList.jsx
const [loading, setLoading] = useState(true)

if (loading) {
  return <p>Loading...</p>
}
```

```jsx
// ProductForm.jsx (saat mode edit, ambil data dulu)
if (fetchLoading) {
  return <p>Loading...</p>
}
```

### 2. Error State

Tangkap error dari API dan tampilkan pesan yang jelas:

```jsx
// Login.jsx
const [error, setError] = useState('')

catch {
  setError('Login gagal. Periksa username dan password.')
}

// Di JSX
{error && <p className="text-red-500">{error}</p>}
```

### 3. Empty State

Jika data kosong, tampilkan pesan yang informatif:

```jsx
{products.length === 0 && !loading && (
  <p className="text-secondary">Belum ada produk. Tambahkan produk pertama!</p>
)}
```

---

untuk link detail projectnya: 
`https://github.com/AN-maz/pertemuan10`
