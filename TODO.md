# DRAFT PROJECT

## Generator Laporan Kinerja Pegawai Berbasis AI

---

## 1. INFORMASI PROJECT

### 1.1 Identitas Aplikasi

- **Nama Aplikasi**: Generator Laporan Kinerja Pegawai
- **Versi**: 1.0.0
- **Deskripsi**: Tools generate laporan kinerja pegawai berbasis Artificial Intelligence untuk mempermudah pembuatan laporan kinerja bulanan secara otomatis
- **Tipe Aplikasi**: Progressive Web App (PWA)
- **Lisensi**: MIT / Proprietary

### 1.2 Tim Developer

- **Developer**: Yahya Zulfikri
- **Role**: FullStack Developer
- **Email**: zulfikriyahya18@gmail.com
- **Phone**: +62 895-3518-56267
- **Repository**: https://github.com/zulfikriyahya/generator-laporan-kinerja-pegawai.git

---

## 2. DATA MASTER APLIKASI

### 2.1 DATA IDENTITAS INSTANSI

- **Logo Utama**: [Upload file .png/.svg]
- **Logo Institusi**: [Upload file .png/.svg]
- **Logo Instansi**: [Upload file .png/.svg]
- **Header 1**: [Isi nama instansi tingkat 1]
- **Header 2**: [Isi nama instansi tingkat 2]
- **Header 3**: [Isi nama instansi tingkat 3]
- **Alamat Lengkap**: [Jalan, Kelurahan, Kecamatan, Kota, Provinsi, Kode Pos]
- **Nomor Telepon**: [Isi nomor telepon]
- **Email Instansi**: [Isi email]
- **Website**: [Isi URL website]
- **Kepala Instansi**:
  - Nama: [Isi nama lengkap]
  - NIP: [Isi NIP]
  - Pangkat/Golongan: [Isi pangkat]
  - TTD Digital: [Upload file]
- **Kepala Tata Usaha**:
  - Nama: [Isi nama lengkap]
  - NIP: [Isi NIP]
  - Pangkat/Golongan: [Isi pangkat]
  - TTD Digital: [Upload file]

### 2.2 DATA IDENTITAS PEGAWAI

- **Nama Lengkap**: [Isi sesuai KTP]
- **NIP**: [18 digit]
- **NUPTK**: [16 digit] (untuk guru)
- **NIK**: [16 digit]
- **Jenis Pegawai**: [PNS/PPPK/Honorer/GTT/PTT]
- **Status Kepegawaian**: [Aktif/Cuti/Tugas Belajar]
- **Pangkat/Golongan**: [Contoh: Penata Muda/III-a]
- **Jabatan**: [Isi jabatan]
- **Unit Kerja**: [Isi unit kerja]
- **Tempat, Tanggal Lahir**: [Kota, DD-MM-YYYY]
- **Jenis Kelamin**: [L/P]
- **Alamat**: [Alamat lengkap]
- **No. Handphone**: [Isi nomor]
- **Email**: [Isi email]
- **Foto Pegawai**: [Upload .jpg/.png, 3x4, max 500KB]
- **Pendidikan Terakhir**: [S1/S2/S3 - Jurusan]
- **Masa Kerja**: [Tahun, Bulan]

### 2.3 DATA AKADEMIK

#### 2.3.1 Data Kurikulum

- **Jenis Kurikulum**: [Kurikulum 2013/Kurikulum Merdeka/KTSP]
- **Tahun Implementasi**: [Isi tahun]
- **Status**: [Aktif/Tidak Aktif]

#### 2.3.2 Data Mata Pelajaran

- **ID Mata Pelajaran**: [Auto generate]
- **Nama Mata Pelajaran**:
  - Matematika
  - Bahasa Indonesia
  - Bahasa Inggris
  - IPA (Ilmu Pengetahuan Alam)
  - IPS (Ilmu Pengetahuan Sosial)
  - Pendidikan Agama
  - PJOK (Pendidikan Jasmani)
  - Seni Budaya
  - Prakarya
  - Informatika
  - [Tambah mapel lainnya]
- **Kategori**: [Wajib/Peminatan/Muatan Lokal]
- **Beban Jam/Minggu**: [Isi jumlah jam]
- **KKM**: [Kriteria Ketuntasan Minimal]

#### 2.3.3 Data Kelas

- **ID Kelas**: [Auto generate]
- **Nama Kelas**: [Contoh: VII-A, VIII-B, IX-C]
- **Tingkat**: [7/8/9 untuk SMP/MTs, 10/11/12 untuk SMA/SMK/MA]
- **Jurusan**: [IPA/IPS/Bahasa] (untuk SMA/SMK/MA)
- **Wali Kelas**: [Nama wali kelas]
- **Jumlah Siswa**: [Isi jumlah]
- **Tahun Pelajaran**: [Contoh: 2025/2026]

#### 2.3.4 Data Jadwal Pelajaran

- **ID Jadwal**: [Auto generate]
- **Kelas**: [Pilih dari data kelas]
- **Mata Pelajaran**: [Pilih dari data mapel]
- **Guru Pengampu**: [Nama guru]
- **Hari**: [Senin/Selasa/Rabu/Kamis/Jumat/Sabtu]
- **Jam Pelajaran**:
  - Jam ke-: [1-10]
  - Waktu Mulai: [HH:MM]
  - Waktu Selesai: [HH:MM]
- **Ruang Kelas**: [Nama ruangan]
- **Semester**: [Ganjil/Genap]

#### 2.3.5 Data Kalender Pendidikan

- **Tahun Pelajaran**: [Contoh: 2025/2026]
- **Semester**: [Ganjil/Genap]
- **Tanggal Mulai Semester**: [DD-MM-YYYY]
- **Tanggal Akhir Semester**: [DD-MM-YYYY]
- **Hari Kerja Efektif**: [Isi jumlah hari]

**Jadwal Libur:**

- Libur Semester: [Tanggal mulai - Tanggal selesai]
- Libur Nasional: [Daftar tanggal libur nasional]
- Libur Keagamaan: [Daftar tanggal]
- Libur Khusus: [Tanggal dan keterangan]

**Jadwal Kegiatan:**

- PTS (Penilaian Tengah Semester): [Tanggal]
- PAS (Penilaian Akhir Semester): [Tanggal]
- PAT (Penilaian Akhir Tahun): [Tanggal]
- PPDB: [Tanggal]
- MOS/MPLS: [Tanggal]
- Ujian Sekolah: [Tanggal]
- Kegiatan Ekstrakurikuler: [Daftar kegiatan dan jadwal]

**Jadwal Cuti:**

- Cuti Bersama: [Daftar tanggal]
- Cuti Khusus: [Jenis dan tanggal]

#### 2.3.6 Data Periode Penilaian

- **Bulan Penilaian**: [Januari-Desember]
- **Tahun**: [YYYY]
- **Tahun Pelajaran**: [Contoh: 2024/2025]
- **Semester**: [Ganjil/Genap]
- **Minggu ke-**: [1-4]
- **Periode**: [Tanggal mulai - Tanggal selesai]

### 2.4 DATA KINERJA PEGAWAI

#### 2.4.1 Jobs Description (Uraian Tugas)

**Tugas Pokok:**

- [Uraian tugas pokok 1]
- [Uraian tugas pokok 2]
- [Uraian tugas pokok 3]
- [Dst...]

**Tugas Tambahan:**

- [Uraian tugas tambahan 1]
- [Uraian tugas tambahan 2]
- [Dst...]

**Fungsi Jabatan:**

- [Uraian fungsi 1]
- [Uraian fungsi 2]
- [Dst...]

**Target Kinerja:**

- [Target kinerja 1]
- [Target kinerja 2]
- [Dst...]

#### 2.4.2 Data Rencana Kerja

**Per Aktivitas:**

- **Nama Kegiatan**: [Isi nama kegiatan]
- **Deskripsi**: [Detail kegiatan]
- **Waktu**:
  - Tanggal Mulai: [DD-MM-YYYY]
  - Tanggal Selesai: [DD-MM-YYYY]
  - Durasi: [Jumlah hari/jam]
  - Estimasi Waktu: [Jam per hari]
- **Biaya**:
  - Anggaran: [Rp. nominal]
  - Realisasi: [Rp. nominal]
  - Sumber Dana: [APBN/APBD/BOS/Mandiri]
- **Kuantitas**:
  - Target: [Angka dan satuan]
  - Realisasi: [Angka dan satuan]
  - Persentase: [%]
- **Kualitas**:
  - Indikator Mutu: [Deskripsi indikator]
  - Target Mutu: [Standar yang diharapkan]
  - Capaian Mutu: [Hasil yang dicapai]
  - Status: [Tercapai/Belum Tercapai/Melebihi]
- **Kategori**: [Pembelajaran/Administrasi/Pengembangan/Lainnya]
- **Output**: [Hasil yang diharapkan]
- **Bukti Fisik**: [Upload dokumen pendukung]

#### 2.4.3 Data Target Capaian Tahunan

**Target Tahunan:**

- **Tahun**: [YYYY]
- **Indikator Kinerja Utama (IKU)**:
  1. [Nama IKU 1]: Target [angka], Satuan [unit]
  2. [Nama IKU 2]: Target [angka], Satuan [unit]
  3. [Dst...]
- **Target Kuantitatif**:
  - Jam Mengajar: [Jumlah jam/tahun]
  - Jumlah Siswa: [Jumlah siswa/tahun]
  - Prestasi Siswa: [Target jumlah]
  - Publikasi/Karya: [Target jumlah]
- **Target Kualitatif**:
  - Nilai Rata-rata Siswa: [Target nilai]
  - Tingkat Kelulusan: [Target %]
  - Kepuasan Stakeholder: [Target skala]
- **Rencana Pengembangan Diri**:
  - Pelatihan: [Jenis dan jumlah]
  - Sertifikasi: [Target sertifikasi]
  - Penelitian: [Target penelitian]

#### 2.4.4 Data CKH (Capaian Kinerja Harian) Pimpinan

**Kepala Satuan Kerja:**

- **Nama**: [Isi nama]
- **NIP**: [Isi NIP]
- **Jabatan**: [Kepala Sekolah/Kepala Dinas/dll]
- **Status Verifikasi**: [Disetujui/Ditolak/Menunggu]
- **Tanggal Verifikasi**: [DD-MM-YYYY]
- **Catatan**: [Catatan dari pimpinan]
- **TTD Digital**: [Upload file atau tanda tangan digital]

**Kepala Unit Kerja:**

- **Nama**: [Isi nama]
- **NIP**: [Isi NIP]
- **Jabatan**: [Wakil Kepala/Koordinator/dll]
- **Status Verifikasi**: [Disetujui/Ditolak/Menunggu]
- **Tanggal Verifikasi**: [DD-MM-YYYY]
- **Catatan**: [Catatan dari kepala unit]
- **TTD Digital**: [Upload file atau tanda tangan digital]

### 2.5 DATA DOKUMEN OUTPUT

#### 2.5.1 Data Footer Dokumen

- **Titimangsa** (Tempat, Tanggal):
  - Tempat: [Nama kota]
  - Format Tanggal: [DD Month YYYY]
  - Bahasa: [Indonesia/Inggris]
- **TTE (Tanda Tangan Elektronik)**:
  - QR Code: [Auto generate dengan metadata]
  - Nomor Dokumen: [Format: XXX/LPKP/Tahun]
  - Hash Dokumen: [Auto generate SHA-256]
  - Timestamp: [Auto generate]
  - Status Validasi: [Valid/Invalid]

#### 2.5.2 Template Dokumen

- **Header Template**: [Desain header]
- **Footer Template**: [Desain footer]
- **Watermark**: [Text/Image watermark]
- **Format Halaman**: [A4/Letter]
- **Orientasi**: [Portrait/Landscape]
- **Margin**: [Atas, Bawah, Kiri, Kanan dalam cm]

### 2.6 DATA INTEGRASI AI

#### 2.6.1 Konfigurasi AI LLM

**Multi Model AI:**

1. **Google Gemini**
   - API Key: [Isi API key]
   - Model: [gemini-3-flash-preview/gemini-3-pro-preview]
   - Max Token: [Isi limit]
   - Temperature: [0.0-1.0]
   - Status: [Aktif/Nonaktif]

2. **Anthropic Claude**
   - API Key: [Isi API key]
   - Model: [claude-3-opus/claude-3-sonnet]
   - Max Token: [Isi limit]
   - Temperature: [0.0-1.0]
   - Status: [Aktif/Nonaktif]

3. **OpenAI GPT**
   - API Key: [Isi API key]
   - Model: [gpt-4/gpt-3.5-turbo]
   - Max Token: [Isi limit]
   - Temperature: [0.0-1.0]
   - Status: [Aktif/Nonaktif]

4. **Groq**
   - API Key: [Isi API key]
   - Model: [mixtral/llama2]
   - Max Token: [Isi limit]
   - Temperature: [0.0-1.0]
   - Status: [Aktif/Nonaktif]

**Token Management:**

- **Limit Token Harian**: [2000 token/hari default]
- **Sisa Token**: [Auto calculate]
- **Reset Token**: [Setiap 00:00 WIB]
- **Notifikasi Token Rendah**: [Alert ketika < 500]
- **Log Penggunaan**: [Tracking penggunaan per model]

**Prompt Engineering:**

- **System Prompt**: [Template prompt sistem]
- **User Prompt Template**: [Template untuk user]
- **Context Window**: [Jumlah context yang dikirim]
- **Response Format**: [JSON/Text/Markdown]

---

## 3. FITUR & WORKFLOW APLIKASI

### 3.1 Workflow Utama

#### STEP 1: Import Data

1. **Download Template Excel**
   - Format: .xlsx
   - Sheet: [Identitas Instansi, Pegawai, Jadwal, dll]
   - Validasi Format: [Auto check]

2. **Upload File Excel**
   - Validasi: [Auto validasi struktur]
   - Error Handling: [Tampilkan error jika ada]
   - Preview Data: [Tampilkan preview sebelum import]

3. **Pilih Pegawai**
   - Filter: [Berdasarkan unit kerja, jabatan]
   - Multi Select: [Ya, jika data > 1]
   - Search: [Cari berdasarkan nama/NIP]

#### STEP 2: Generate Laporan

1. **Pilih Model AI**
   - Dropdown: [Gemini/Claude/GPT/Groq]
   - Cek Token: [Tampilkan sisa token]
   - Disable Button: [Jika token < 2000]
   - Estimasi Token: [Tampilkan estimasi penggunaan]

2. **Generate Options**
   - **Generate All**: Semua kolom otomatis
   - **Regenerate All**: Refresh semua kolom
   - **Generate Per Kolom**: Pilih kolom spesifik
   - **Edit Manual**: Edit langsung per kolom

3. **Preview Hasil**
   - Live Preview: [Tampilan real-time]
   - Edit Mode: [Toggle edit mode]
   - Save Draft: [Simpan draft]

#### STEP 3: Export & Distribusi

1. **Export Format**
   - PDF: [Download .pdf]
   - DOCX: [Download .docx]
   - Print: [Direct print]

2. **Upload Options**
   - **Direct Upload Bank Data**:
     - Auto upload ke server
     - Generate shareable link
     - Copy link untuk E-Kinerja

   - **Manual Upload Google Drive**:
     - Path: EKINERJA/[Tahun]/[Bulan]/[NamaLengkap].pdf
     - Generate link
     - Copy link untuk E-Kinerja

3. **Penyimpanan Lokal**
   - Save to Local Storage: [Auto save]
   - Browser Storage: [IndexedDB/LocalStorage]
   - Export Data: [Backup ke file JSON]

### 3.2 Fitur Tambahan

#### 3.2.1 Manajemen Data

- **CRUD Operations**: [Create, Read, Update, Delete]
- **Bulk Actions**: [Edit/Delete multiple data]
- **Import/Export**: [Excel, JSON, CSV]
- **Backup/Restore**: [Backup otomatis dan manual]
- **Data Validation**: [Validasi input otomatis]

#### 3.2.2 Reporting

- **Dashboard**: [Statistik dan grafik]
- **Filter & Search**: [Advanced filtering]
- **Sort**: [Multi-column sorting]
- **Pagination**: [Table pagination]
- **Export Chart**: [Export grafik ke image]

#### 3.2.3 Security

- **Authentication**: [Login system jika diperlukan]
- **Authorization**: [Role-based access]
- **Data Encryption**: [Encrypt sensitive data]
- **Audit Log**: [Track semua aktivitas]
- **Session Management**: [Cookie-based session]

#### 3.2.4 UI/UX

- **Responsive Design**: [Mobile, Tablet, Desktop]
- **Dark/Light Mode**: [Toggle theme]
- **Accessibility**: [ARIA labels, keyboard navigation]
- **Loading States**: [Skeleton, spinner, progress bar]
- **Toast Notifications**: [Success, error, warning]
- **Modal/Dialog**: [Confirmation, form]

---

## 4. TEKNOLOGI & TOOLS

### 4.1 Frontend Framework

- **Astro**: [v5.x.x]
  - Static Site Generation
  - Partial Hydration
  - Component Islands
- **React.js**: [v19.x.x]
  - Komponen UI interaktif
  - State management
  - Hooks

- **Package Manager**: PNPM
  - Fast installation
  - Disk space efficient

### 4.2 Styling

- **Tailwind CSS**: [v4.x.x]
  - Utility-first CSS
  - Responsive design
  - Custom configuration

- **Design System**:
  - Glassmorphism effect
  - Custom color palette
  - Typography system
  - Spacing system

### 4.3 Libraries & Plugins

#### 4.3.1 PDF Processing

- **PDF.js**:
  - Render PDF di browser
  - Extract text dari PDF
  - Generate PDF dari HTML

#### 4.3.2 Data Management

- **NanoStorage**:
  - LocalStorage wrapper
  - Auto serialization
  - TypeScript support

- **Cookie**:
  - Session management
  - Preferences storage
  - Secure cookie handling

#### 4.3.3 UI Components

- **QR Code Generator**:
  - Generate QR untuk TTE
  - Customizable design
  - Error correction level

- **GSAP Animation**:
  - Smooth animations
  - Page transitions
  - Scroll animations
  - Timeline control

#### 4.3.4 Office Documents

- **SheetJS (xlsx)**:
  - Read Excel files
  - Write Excel files
  - Multiple sheet support

- **Docx Generator**:
  - Generate .docx files
  - Template support
  - Styling support

### 4.4 PWA Features

- **Service Worker**:
  - Offline support
  - Cache management
  - Background sync

- **Web App Manifest**:
  - Installable app
  - App icons
  - Splash screen
  - Standalone mode

- **Push Notifications**: [Optional]
  - Update notifications
  - Reminder notifications

### 4.5 Development Tools

- **TypeScript**: [Type safety]
- **ESLint**: [Code linting]
- **Prettier**: [Code formatting]
- **Git**: [Version control]
- **GitHub**: [Code repository]

---

## 5. STRUKTUR PROJECT

### 5.1 Folder Structure

```
.
├── astro.config.mjs
├── package.json
├── public
│   ├── 192x192.png
│   ├── 512x512.png
│   └── favicon.svg
├── src
│   ├── components
│   │   ├── common
│   │   ├── forms
│   │   │   ├── FormAkademik.astro
│   │   │   ├── FormInstansi.astro
│   │   │   ├── FormKinerja.astro
│   │   │   ├── FormPegawai.astro
│   │   │   ├── KopSuratConfig.astro
│   │   │   ├── SelectGroup.astro
│   │   │   └── TabNavigation.astro
│   │   ├── HistoryPanel.astro
│   │   ├── InputGroup.astro
│   │   ├── layout
│   │   ├── reports
│   │   ├── TextAreaGroup.astro
│   │   └── ui
│   │   ├── AutoSaveIndicator.astro
│   │   ├── DocumentStats.astro
│   │   ├── KeyboardShortcuts.astro
│   │   ├── ProgressBar.astro
│   │   ├── Skeleton.astro
│   │   ├── ToastContainer.astro
│   │   └── ZoomControl.astro
│   ├── config
│   │   └── constants.ts
│   ├── layouts
│   │   └── Layout.astro
│   ├── pages
│   │   └── index.astro
│   ├── services
│   │   ├── aiService.ts
│   │   ├── excelService.ts
│   │   ├── exportService.ts
│   │   ├── pdf
│   │   ├── storage
│   │   └── tteService.ts
│   ├── stores
│   │   ├── reportStore.ts
│   │   └── toastStore.ts
│   ├── styles
│   │   └── global.css
│   ├── types
│   │   └── ReportTypes.ts
│   └── utils
│   ├── helpers.ts
│   └── markdown.ts
└── tsconfig.json
```

### 5.2 File Naming Convention

- **Components**: PascalCase (e.g., DataTable.tsx)
- **Utils**: camelCase (e.g., formatDate.ts)
- **Types**: PascalCase (e.g., Pegawai.types.ts)
- **Pages**: lowercase (e.g., index.astro)

---

## 6. DEPLOYMENT

### 6.1 Build Configuration

- **Build Command**: `pnpm build`
- **Output Directory**: `dist/`
- **Environment Variables**:
  - `GEMINI_API_KEY`
  - `CLAUDE_API_KEY`
  - `OPENAI_API_KEY`
  - `GROQ_API_KEY`
  - `BASE_URL`
