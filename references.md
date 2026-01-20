# DATA

- Identitas Instansi : [Logo, Header 1, Header 2, Header 3, Alamat, Kontak, Logo Institusi, Logo Instansi, Kepala Instansi, Kepala Tata Usaha]
- Identitas Pegawai : [Nama Lengkap, NIP, Jenis Pegawai, Pangkat/Golongan, Foto]
- Data Jadwal Pelajaran : [Kelas, ID Mata Pelajaran, Data Jam Pelajaran]
- Data Kalender Pendidikan : [Libur, Cuti, Kegiatan, Hari Kerja]
- Data Periode Penilaian : [Bulan, Tahun, Tahun Pelajaran]
- Data Kelas : [Nama Kelas, Tingkat]
- Data Mata Pelajaran : [IPA, IPS, Matematika, dst...]
- Data Footer : [Titimangsa, TTE]
- Data Jobs Description : [Uraian Jobdesk]
- Data Kurikulum : [Jenis Kurikulum (Merdeka, K13), ]
- Data AI LLM : Multi Agent and Multi Model AI [Gemini, Claude, GPT, Grox]
- Data CKH Pimpinan yang di interverensi [Kepala Satuan Kerja, Kepala Unit Kerja]
- Data Rencana Kerja : [Waktu, Biaya, Kuantitas, Kualitas]
- Data Target Capaian dalam 1 Tahun

# ALUR KERJA

- Import .excel data master
- Pilih Pegawai Jika Data lebih dari 1 Orang
- Export .pdf, .docx
- Generate All / Regenerate All
- Edit Manual Perkolom Tabel / Generate Per Kolom Tabel
- Direct Upload ke Bank Data -> Salin Link (Untuk diisikan pada E-Kinerja)
- Upload Manual Ke Bank Data/Google Drive (Path : EKINERJA/Tahun/Bulan/{NamaLengkap}.pdf) -> Salin Link (Untuk diisikan pada E-Kinerja)
- Download PDF/Print PDF
- Download Template Data
- Pilih Model AI LLM (Disable Button jika Token Habis atau kurang dari 2000 token harian, tampilkan Jumlah sisa token)
- Simpan data di Local Storage Device (Tanpa Database)

# Teknologi

- Astro dengan PNPM
- PDFjs
- QR Code
- NanoStorage
- Tailwind
- Glassmorphism
- ReactJs
- PWA (Installable)
- Cookie
- Animation GSAP
- Footer

# Meta Data

- Author : [Name: Yahya Zulfikri, Phone: 62895351856267, Role: FullStack Developer, Repository : https://github.com/zulfikriyahya/generator-laporan-kinerja-pegawai.git]
- App Name : Generator Laporan Kinerja Pegawai
- Description : Tools Generate Laporan Kinerja Pegawai Berbasis Artificial Intelligence
