import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { reportStore } from "../stores/reportStore";

const API_KEY = import.meta.env.PUBLIC_GEMINI_API_KEY;

export const generateLaporan = async () => {
	if (!API_KEY) throw new Error("API Key Missing. Cek .env file.");

	const data = reportStore.get();
	const genAI = new GoogleGenerativeAI(API_KEY);
	
	const model = genAI.getGenerativeModel({ 
		model: data.modelAI,
		safetySettings: [
			{ category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
			{ category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
			{ category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
			{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
		]
	});

	let konteksSpesifik = "";
	if (data.jenisPegawai === "Guru") {
		konteksSpesifik = `
      PERAN: GURU
      - Jenjang: ${data.jenjang}
      - Mapel: ${data.mapel}
      - Kelas Ajar: ${data.kelas}
      - Jumlah Siswa: ${data.jmlSiswa || "Sesuai Dapodik"}
      - Jam Mengajar: ${data.jamMengajar} Jam/Minggu
      - Kurikulum: ${data.kurikulum}
      - Ekstrakurikuler: ${data.ekskul || "-"}
    `;
	} else {
		konteksSpesifik = `
      PERAN: STAF / TENAGA KEPENDIDIKAN
      - Unit Kerja: ${data.unitKerja}
      - Tugas Spesifik: Administrasi dan Pelayanan
    `;
	}

	const prompt = `
    Bertindaklah sebagai mesin generator konten laporan otomatis.
    Tugasmu adalah mengisi **BAGIAN ISI (BODY)** laporan saja.
    
    DATA PEGAWAI:
    - Nama: ${data.nama}
    - Jabatan: ${data.jabatan}
    - Unit Kerja: ${data.unitKerja}
    - Periode: Bulan ${data.bulan} Tahun ${data.tahun}

    ${konteksSpesifik}

    AKTIVITAS:
    1. TUGAS POKOK: ${data.tugasPokok}
    2. TUGAS TAMBAHAN: ${data.tugasTambahan}
    3. TUGAS KHUSUS: ${data.tugasKhusus || "Tidak ada"}
    
    INSTRUKSI KHUSUS USER: "${data.customInstruction || "-"}"

    ATURAN OUTPUT (STRICT RULES):
    1. **JANGAN** membuat Kop Surat atau Judul Laporan (misal: "LAPORAN KINERJA..."). Judul sudah ada di sistem.
    2. **JANGAN** ada kata pembuka seperti "Berikut adalah draf..." atau "Tentu, ini laporannya...".
    3. **JANGAN** menulis identitas pegawai lagi di awal.
    4. **LANGSUNG** mulai output dengan Heading Bab 1.
    5. Gunakan Format Markdown.

    STRUKTUR KONTEN YANG HARUS DIBUAT:
    
    ### I. PENDAHULUAN
    (Tuliskan latar belakang pelaksanaan tugas, dasar hukum singkat, dan tujuan kinerja pada bulan ini).

    ### II. PELAKSANAAN TUGAS DAN CAPAIAN KINERJA
    (WAJIB: Gunakan Tabel Markdown).
    Kolom Tabel: | No | Tanggal | Uraian Kegiatan | Output/Hasil | Keterangan |
    
    *Isi tabel dengan menjabarkan "${data.tugasPokok}" menjadi kegiatan harian/mingguan yang logis dan variatif. Masukkan juga "${data.tugasTambahan}" dan "${data.tugasKhusus}".*

    ### III. KENDALA DAN SOLUSI
    (Uraikan hambatan teknis/non-teknis yang dihadapi bulan ini serta tindak lanjutnya).

    ### IV. PENUTUP
    (Kalimat penutup singkat).
    
    Gunakan bahasa ${data.bahasa} dengan gaya ${data.tone}.
  `;

	try {
		const result = await model.generateContent(prompt);
		const text = result.response.text();
		
        // Membersihkan output jika AI masih bandel
        let cleanText = text.replace(/^Berikut adalah.*:/i, "").trim(); 
        cleanText = cleanText.replace(/^Tentu.*:/i, "").trim();

		reportStore.setKey("generatedContent", cleanText);
		reportStore.setKey("lastUpdated", new Date().toISOString());
		return cleanText;
	} catch (error) {
		console.error("AI Error:", error);
		throw error;
	}
};