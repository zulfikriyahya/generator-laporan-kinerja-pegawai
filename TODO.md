## **KATEGORI DATA PRIBADI**

- Masukan Nama Pegawai (text input)
- Masukan NIP/NUPTK (text input)
- Pilih Jenis Kelamin (radio button)
- **Masukan Email (text input - optional)**
- **Masukan Nomor Telepon (text input - optional)**

## **KATEGORI DATA KEPEGAWAIAN**

- Pilih Jenis Pegawai (radio button: Staf, Guru)
- Pilih Unit Kerja (dropdown)
- Pilih Status Kepegawaian (dropdown: PNS, PPPK, Honorer, GTT/PTT)
- Pilih Golongan/Ruang (dropdown - jika PNS/PPPK)
- **Masukan Jabatan/Posisi (text input)**
- **Tanggal Mulai Bertugas (date picker)**

## **KATEGORI DATA PENDIDIKAN & MENGAJAR**

- Pilih Jenjang Pendidikan (dropdown: SD, MI, SMP, MTS, SMA, SMK, MA)
- Pilih Mata Pelajaran (dropdown - **JIKA GURU**)
- Pilih Kelas (checkbox + select all - **JIKA GURU**)
- Jumlah Jam Mengajar per Minggu (number input - **JIKA GURU**)
- **Pilih Kurikulum yang Digunakan (dropdown: K13, Merdeka, dll - JIKA GURU)**
- **Jumlah Siswa yang Diajar (number input - JIKA GURU)**

## **KATEGORI TUGAS & TANGGUNG JAWAB**

- Pilih Tugas Pokok (checkbox + textarea untuk detail)
- Pilih Tugas Tambahan (checkbox + textarea untuk detail)
- Masukan Tugas Khusus/Proyek (textarea - optional)
- **Pilih Kegiatan Ekstrakurikuler (checkbox - jika ada)**

## **KATEGORI PERIODE PELAPORAN**

- Pilih Periode Bulan (dropdown: Januari - Desember)
- Masukan Tahun (number input / year picker)
- Pilih Rentang Tanggal Hari Kerja dalam 1 Bulan (checkbox + select all)
- Pilih Hari Kerja dalam Seminggu (checkbox + select all: Senin - Jumat)
- **Pilih Jenis Periode (dropdown: Bulanan, Triwulan, Semester, Tahunan)**

## **KATEGORI KONFIGURASI AI**

- Pilih Model AI (dropdown - **aktifkan jika token harian masih tersedia**)
  - Gemini [1 - ...]
  - Claude [1 - ...]
  - GPT [1 - ...]
  - GROX [1 - ...]
  - COPILOT [1 - ...]
- Tampilkan Sisa Token Harian (info badge/counter)
- Pilih Tingkat Detail Laporan (dropdown: Ringkas, Standar, Detail)
- **Pilih Bahasa Output (dropdown: Indonesia, Inggris)**
- **Pilih Tone Penulisan (dropdown: Formal, Semi-formal, Naratif)**
- **Aktifkan Auto-Correction Grammar (toggle switch)**

## **KATEGORI AKSI/KONTROL**

- Generate Laporan Lengkap (button primary)
- Generate Ulang Keseluruhan (button secondary)
- Generate Ulang Per Baris Tabel (button secondary)
- Simpan Draft (button outline) [data disimpan di cache browser]
- Reset Form (button outline danger)
- **Load Draft Terakhir (button outline)**
- **Hapus Draft (button outline danger)**
- **Preview Sebelum Generate (button secondary)**

## **KATEGORI OUTPUT/HASIL**

- Preview Laporan (area preview dengan scroll dan dapat diedit)
- Download PDF (button)
- Copy to Clipboard (button)
- Share Link (button - optional)
- **Print Langsung (button)**
- **Bandingkan dengan Laporan Sebelumnya (button - jika ada history)**
- **Edit Manual Laporan (button toggle mode edit)**
- **Simpan sebagai Template (button)**

## **TEKNOLOGI YANG DIGUNAKAN**

- **Framework**: Astro (versi 5)
- **Styling**: TailwindCSS (versi 4) + Glassmorphism
- **Animation**: GSAP
- **PDF**: PDF.js
- **AI Integration**: [@google/generative-ai, @anthropic-ai/sdk, openai, groq-sdk, @azure/openai]
- **Database**: Tanpa database (static)
- **Design**: Responsive & Mobile-first
- **State Management**: Nanostores / Alpine.js (untuk reactive state)\*\*
- **Form Validation**: Zod / Valibot\*\*
- **Date Handling**: Day.js\*\*
- **Rich Text Editor**: Tiptap / Quill (untuk edit preview)\*\*

## **FITUR TAMBAHAN**

- Auto-save ke localStorage
- Dark/Light mode toggle
- Export ke format Word (.docx) dan Excel (.xlsx)
- Template laporan yang bisa dipilih
- History generate terakhir (dari localStorage)
- Progress indicator saat generate
- Validasi form real-time
- Konfirmasi sebelum reset/regenerate
- **Shortcut Keyboard (Ctrl+S save, Ctrl+G generate, dll)**
- **Undo/Redo untuk edit laporan**
- **Search & Replace dalam preview laporan**
- **Watermark/Kop Surat Custom (upload logo institusi)**
- **Accessibility (ARIA labels, keyboard navigation)**
- **Toast Notification untuk feedback user**
- **Loading Skeleton saat generate**
- **Error Boundary & Retry Mechanism**
- **Compress PDF sebelum download**
- **Batch Generate (multiple pegawai sekaligus - optional)**
- **Import Data dari Excel/CSV**
- **QR Code generator untuk verifikasi laporan**
- **Statistik penggunaan AI model (chart)**
- **Panduan/Tutorial first-time user (onboarding)**
- **Login menggunakan google dengan oauth google**
- **PWA**
- **ENV File**
