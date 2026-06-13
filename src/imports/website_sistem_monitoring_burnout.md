# Website Sistem Monitoring Burnout Pegawai

## 1. Ringkasan Proyek

Website ini adalah **Sistem Monitoring Burnout Pegawai** berbasis web yang bertujuan membantu perusahaan, khususnya divisi **Human Resource (HR)**, dalam memantau kondisi burnout pegawai secara lebih cepat, terstruktur, dan terorganisir.

Sistem ini menyediakan fitur utama berupa:

- Login untuk admin/HR dan pegawai
- Form assessment burnout pegawai
- Penyimpanan hasil assessment
- Dashboard monitoring burnout
- Grafik visualisasi hasil assessment
- Pengelolaan data pegawai

Website dikembangkan sebagai sistem internal perusahaan, bukan aplikasi publik umum.

---

## 2. Tujuan Website

Tujuan utama website ini adalah:

1. Membantu HR memantau kondisi burnout pegawai.
2. Menyediakan media assessment burnout secara digital.
3. Menampilkan hasil assessment dalam bentuk dashboard dan grafik.
4. Memudahkan pengelolaan data pegawai secara terpusat.
5. Membantu perusahaan mengenali potensi burnout lebih dini.

---

## 3. Target Pengguna

### 3.1 HR / Admin

HR adalah pengguna utama sistem. HR dapat:

- Login ke dashboard admin.
- Melihat ringkasan kondisi burnout pegawai.
- Melihat grafik hasil assessment.
- Mengelola data pegawai.
- Melihat detail hasil assessment setiap pegawai.

### 3.2 Pegawai

Pegawai adalah pengguna yang mengisi assessment burnout. Pegawai dapat:

- Login ke sistem.
- Mengisi form assessment burnout.
- Melihat status atau hasil assessment miliknya.

---

## 4. Struktur Halaman Website

## 4.1 Landing Page

Landing page berfungsi sebagai halaman awal sistem.

### Konten yang ditampilkan:

- Nama sistem: **Sistem Monitoring Burnout Pegawai**
- Deskripsi singkat sistem
- Tombol login
- Penjelasan singkat manfaat sistem
- Ilustrasi dashboard/monitoring karyawan

### Contoh copywriting:

> Pantau kondisi burnout pegawai secara lebih cepat, terukur, dan terorganisir melalui sistem assessment dan dashboard monitoring berbasis web.

### Komponen UI:

- Navbar
- Hero section
- Card manfaat sistem
- Section fitur utama
- Footer sederhana

---

## 4.2 Login Page

Halaman login digunakan oleh HR/Admin dan Pegawai.

### Field:

- Email / Username
- Password
- Pilihan role: HR/Admin atau Pegawai

### Validasi:

- Email/username tidak boleh kosong.
- Password tidak boleh kosong.
- Role harus dipilih.
- Jika login gagal, tampilkan pesan error.

---

## 4.3 Dashboard HR/Admin

Dashboard HR adalah halaman utama untuk memantau kondisi burnout pegawai.

### Informasi yang ditampilkan:

- Total pegawai
- Jumlah pegawai dengan burnout rendah
- Jumlah pegawai dengan burnout sedang
- Jumlah pegawai dengan burnout tinggi
- Grafik distribusi tingkat burnout
- Tabel hasil assessment terbaru

### Komponen UI:

- Sidebar navigation
- Statistik card
- Grafik bar/pie chart
- Tabel pegawai
- Filter berdasarkan departemen atau tingkat burnout

---

## 4.4 Halaman Assessment Burnout

Halaman ini digunakan pegawai untuk mengisi assessment burnout.

### Isi assessment:

Assessment dapat dibuat berdasarkan beberapa dimensi burnout, yaitu:

1. Kelelahan emosional
2. Depersonalisasi
3. Penurunan pencapaian diri

### Contoh pertanyaan:

1. Saya merasa lelah secara emosional setelah bekerja.
2. Saya merasa pekerjaan saya semakin berat untuk dijalani.
3. Saya merasa kurang termotivasi dalam menyelesaikan pekerjaan.
4. Saya merasa sulit fokus saat bekerja.
5. Saya merasa pencapaian kerja saya menurun.

### Skala jawaban:

Gunakan skala Likert 1-5:

| Nilai | Keterangan |
|---|---|
| 1 | Sangat Tidak Setuju |
| 2 | Tidak Setuju |
| 3 | Netral |
| 4 | Setuju |
| 5 | Sangat Setuju |

### Output assessment:

Setelah pegawai mengisi assessment, sistem menghitung total skor dan menentukan kategori:

| Rentang Skor | Kategori |
|---|---|
| 0-40% | Burnout Rendah |
| 41-70% | Burnout Sedang |
| 71-100% | Burnout Tinggi |

---

## 4.5 Halaman Data Pegawai

Halaman ini digunakan HR untuk mengelola data pegawai.

### Fitur:

- Tambah data pegawai
- Edit data pegawai
- Hapus data pegawai
- Cari pegawai
- Filter pegawai berdasarkan departemen

### Data pegawai:

- ID pegawai
- Nama lengkap
- Email
- Departemen
- Jabatan
- Role
- Status assessment terakhir

---

## 4.6 Halaman Detail Pegawai

Halaman ini menampilkan detail data pegawai dan riwayat assessment.

### Informasi yang ditampilkan:

- Nama pegawai
- Departemen
- Jabatan
- Riwayat assessment
- Skor burnout terakhir
- Kategori burnout
- Grafik perkembangan burnout

---

## 4.7 Halaman Laporan Monitoring

Halaman ini digunakan HR untuk melihat ringkasan monitoring burnout secara keseluruhan.

### Fitur:

- Rekap assessment seluruh pegawai
- Filter tanggal assessment
- Filter kategori burnout
- Export laporan ke PDF atau Excel

---

## 5. Role dan Hak Akses

| Role | Hak Akses |
|---|---|
| HR/Admin | Mengelola data pegawai, melihat dashboard, melihat semua hasil assessment, melihat laporan |
| Pegawai | Mengisi assessment, melihat hasil assessment pribadi |

---

## 6. Alur Sistem

### 6.1 Alur Pegawai

1. Pegawai membuka website.
2. Pegawai login menggunakan akun yang sudah terdaftar.
3. Pegawai masuk ke halaman assessment.
4. Pegawai mengisi form assessment burnout.
5. Sistem menghitung skor burnout.
6. Sistem menyimpan hasil assessment ke database.
7. Pegawai dapat melihat hasil assessment pribadinya.

### 6.2 Alur HR/Admin

1. HR membuka website.
2. HR login sebagai admin.
3. HR masuk ke dashboard monitoring.
4. HR melihat ringkasan kondisi burnout pegawai.
5. HR dapat melihat grafik, tabel, dan detail pegawai.
6. HR dapat mengelola data pegawai.
7. HR dapat membuat atau mengunduh laporan monitoring.

---

## 7. Desain UI/UX

### 7.1 Gaya Desain

Gunakan desain yang bersih, profesional, dan mudah dibaca.

### Rekomendasi gaya visual:

- Warna utama: biru atau teal
- Warna pendukung: putih, abu-abu muda, hijau, kuning, merah
- Font: Inter, Poppins, atau Roboto
- Layout: dashboard modern dengan sidebar
- Komponen: card, table, chart, badge status

### 7.2 Warna Status Burnout

| Status | Warna |
|---|---|
| Rendah | Hijau |
| Sedang | Kuning/Oranye |
| Tinggi | Merah |

---

## 8. Rekomendasi Teknologi

Website dapat dibuat menggunakan stack berikut:

### Frontend

- React.js / Next.js
- Tailwind CSS
- Chart.js atau Recharts

### Backend

- Node.js + Express
- Laravel
- Golang

### Database

- MySQL
- PostgreSQL
- Supabase

### Deployment

- Vercel untuk frontend
- Railway/Render untuk backend
- Supabase/Neon untuk database

---

## 9. Struktur Folder Rekomendasi

```txt
burnout-monitoring-web/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   └── assets/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## 10. Rancangan Database

## 10.1 Tabel users

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | INT / UUID | Primary key |
| name | VARCHAR | Nama pengguna |
| email | VARCHAR | Email pengguna |
| password | VARCHAR | Password terenkripsi |
| role | ENUM | admin / pegawai |
| created_at | DATETIME | Waktu dibuat |
| updated_at | DATETIME | Waktu diperbarui |

## 10.2 Tabel employees

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | INT / UUID | Primary key |
| user_id | INT / UUID | Relasi ke users |
| employee_number | VARCHAR | Nomor pegawai |
| department | VARCHAR | Departemen |
| position | VARCHAR | Jabatan |
| created_at | DATETIME | Waktu dibuat |
| updated_at | DATETIME | Waktu diperbarui |

## 10.3 Tabel assessments

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | INT / UUID | Primary key |
| employee_id | INT / UUID | Relasi ke employees |
| emotional_exhaustion_score | INT | Skor kelelahan emosional |
| depersonalization_score | INT | Skor depersonalisasi |
| personal_accomplishment_score | INT | Skor pencapaian diri |
| total_score | INT | Total skor burnout |
| burnout_level | ENUM | rendah / sedang / tinggi |
| created_at | DATETIME | Tanggal assessment |

## 10.4 Tabel assessment_answers

| Field | Tipe Data | Keterangan |
|---|---|---|
| id | INT / UUID | Primary key |
| assessment_id | INT / UUID | Relasi ke assessments |
| question_text | TEXT | Pertanyaan assessment |
| answer_value | INT | Nilai jawaban 1-5 |

---

## 11. API Endpoint Rekomendasi

## 11.1 Auth

```txt
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

## 11.2 Pegawai

```txt
GET    /api/employees
GET    /api/employees/:id
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id
```

## 11.3 Assessment

```txt
GET  /api/assessments
GET  /api/assessments/:id
POST /api/assessments
GET  /api/employees/:id/assessments
```

## 11.4 Dashboard

```txt
GET /api/dashboard/summary
GET /api/dashboard/burnout-distribution
GET /api/dashboard/recent-assessments
```

---

## 12. Fitur Minimum yang Harus Jadi

Untuk versi prototype, minimal sistem harus memiliki:

1. Login admin dan pegawai
2. Dashboard HR sederhana
3. Form assessment burnout
4. Perhitungan skor burnout
5. Tabel hasil assessment
6. Grafik distribusi burnout
7. CRUD data pegawai

---

## 13. Checklist Pengembangan

### Tahap 1: Setup Project

- [ ] Membuat repository project
- [ ] Setup frontend
- [ ] Setup backend
- [ ] Setup database
- [ ] Setup environment variable

### Tahap 2: Auth

- [ ] Membuat halaman login
- [ ] Membuat API login
- [ ] Membuat role admin dan pegawai
- [ ] Membuat proteksi halaman berdasarkan role

### Tahap 3: Assessment

- [ ] Membuat form assessment
- [ ] Membuat skala jawaban 1-5
- [ ] Membuat logic perhitungan skor
- [ ] Menyimpan hasil assessment ke database

### Tahap 4: Dashboard

- [ ] Membuat card statistik
- [ ] Membuat grafik burnout
- [ ] Membuat tabel assessment terbaru
- [ ] Membuat filter kategori burnout

### Tahap 5: Data Pegawai

- [ ] Membuat tabel pegawai
- [ ] Membuat fitur tambah pegawai
- [ ] Membuat fitur edit pegawai
- [ ] Membuat fitur hapus pegawai
- [ ] Membuat fitur pencarian pegawai

### Tahap 6: Testing

- [ ] Testing login
- [ ] Testing assessment
- [ ] Testing dashboard
- [ ] Testing CRUD pegawai
- [ ] Testing penyimpanan data

---

## 14. Prompt untuk AI Website Builder

Gunakan prompt berikut jika ingin membuat website menggunakan AI website builder seperti Lovable, Bolt, Cursor, atau v0.

```txt
Buatkan website Sistem Monitoring Burnout Pegawai berbasis web untuk kebutuhan internal perusahaan.

Website memiliki dua role pengguna, yaitu HR/Admin dan Pegawai.

Fitur utama:
1. Landing page profesional dengan penjelasan sistem.
2. Login page untuk HR/Admin dan Pegawai.
3. Dashboard HR/Admin yang menampilkan:
   - Total pegawai
   - Jumlah burnout rendah, sedang, dan tinggi
   - Grafik distribusi burnout
   - Tabel hasil assessment terbaru
4. Halaman assessment burnout untuk pegawai menggunakan skala Likert 1-5.
5. Sistem menghitung skor burnout dan mengategorikan hasil menjadi rendah, sedang, atau tinggi.
6. Halaman data pegawai dengan fitur tambah, edit, hapus, cari, dan filter.
7. Halaman detail pegawai yang menampilkan riwayat assessment dan grafik perkembangan burnout.
8. Halaman laporan monitoring yang dapat difilter berdasarkan tanggal dan kategori burnout.

Gunakan desain modern, bersih, profesional, dan mudah digunakan.
Gunakan sidebar untuk dashboard admin.
Gunakan warna utama biru atau teal.
Gunakan badge status hijau untuk burnout rendah, kuning/oranye untuk burnout sedang, dan merah untuk burnout tinggi.

Tech stack yang disarankan:
- Frontend: React atau Next.js
- Styling: Tailwind CSS
- Chart: Recharts atau Chart.js
- Backend: Node.js/Express atau Laravel
- Database: PostgreSQL/MySQL/Supabase

Buatkan struktur halaman, komponen UI, dummy data, dan flow antarhalaman secara lengkap.
```

---

## 15. Catatan Batasan Sistem

Sistem ini memiliki beberapa batasan:

- Website hanya digunakan untuk kebutuhan internal perusahaan.
- Sistem tidak mencakup payroll, absensi, konsultasi psikolog profesional, atau manajemen karyawan lainnya.
- Sistem tidak dikembangkan dalam bentuk mobile app.
- Sistem belum mencakup keamanan tingkat lanjut seperti SSO atau sertifikasi keamanan khusus.
- Data assessment hanya digunakan untuk kebutuhan monitoring internal.

---

## 16. Output Akhir yang Diharapkan

Output akhir website adalah prototype sistem monitoring burnout pegawai yang mampu:

1. Menerima input assessment dari pegawai.
2. Menghitung tingkat burnout pegawai.
3. Menyimpan data assessment.
4. Menampilkan dashboard monitoring untuk HR.
5. Menampilkan grafik dan tabel hasil assessment.
6. Mengelola data pegawai.

---

## 17. Referensi Isi Proyek

Dokumen ini disusun berdasarkan laporan akhir proyek **Sistem Monitoring Burnout Pegawai** Kelompok 9, Program Studi S1 Teknologi Informasi, Fakultas Informatika, Telkom University, 2026.
