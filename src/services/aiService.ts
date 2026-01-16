import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";
import { reportStore } from "../stores/reportStore";

const API_KEY = import.meta.env.PUBLIC_GEMINI_API_KEY;

export const generateLaporan = async () => {
	if (!API_KEY) throw new Error("API Key Missing. Cek .env file.");

	const data = reportStore.get();
	const genAI = new GoogleGenerativeAI(API_KEY);

	// Hitung nama bulan
	const namaBulan = new Date(parseInt(data.tahun), parseInt(data.bulan) - 1).toLocaleString('id-ID', { month: 'long' });

	const model = genAI.getGenerativeModel({
		model: data.modelAI,
		safetySettings: [
			{ category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
			{ category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
			{ category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
			{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
		],
	});

	let konteksSpesifik = "";
	if (data.jenisPegawai === "Guru") {
		konteksSpesifik = `
      PERAN: GURU
      - Sekolah: ${data.instansiNama}
      - Jenjang: ${data.jenjang}
      - Mapel: ${data.mapel}
      - Kelas Ajar: ${data.kelas}
      - Jam Mengajar: ${data.jamMengajar} Jam/Minggu
      - Kurikulum: ${data.kurikulum}
      - Siswa: ±${data.jmlSiswa}
      - Ekskul: ${data.ekskul || "-"}
    `;
	} else {
		konteksSpesifik = `
      PERAN: STAF / TENDIK
      - Unit Kerja: ${data.unitKerja}
      - Instansi: ${data.instansiNama}
    `;
	}

	const prompt = `
    Bertindaklah sebagai asisten administrasi yang menyusun ISI LAPORAN KINERJA PEGAWAI Milik saya (saya membuat laporan kinerja untuk saya sendiri).
    
    DATA PEGAWAI:
    - Nama: ${data.nama}
    - Jabatan: ${data.jabatan}
    - Unit Kerja: ${data.unitKerja}
    - Periode: ${namaBulan} ${data.tahun}
    - Hari Kerja: ${data.hariKerja}
    
    ${konteksSpesifik}

    AKTIVITAS KINERJA:
    1. TUGAS UTAMA: ${data.tugasPokok}
    2. TUGAS TAMBAHAN: ${data.tugasTambahan}
    3. TUGAS LAIN: ${data.tugasKhusus || "Tidak ada"}
    
    INSTRUKSI TAMBAHAN: "${data.customInstruction || "Buat laporan formal"}"
    DETAIL: ${data.detailLevel}

    ATURAN FORMAT OUTPUT:
    1. JANGAN buat Kop Surat atau Tanda Tangan (Sudah ada di sistem).
    2. Langsung mulai dengan Heading Bab 1.
    3. Gunakan Bahasa Indonesia Baku Formal.
    4. Gunakan Markdown Standard.
    
    STRUKTUR:
    ### I. PENDAHULUAN
    (Latar belakang tugas dan tujuan bulan ini).

    ### II. PELAKSANAAN TUGAS
    Buat Tabel Markdown:
    | No | Tanggal | Uraian Kegiatan | Output/Hasil | Keterangan |
    (Jabarkan tugas utama & tambahan ke dalam kegiatan spesifik).

    ### III. KENDALA DAN SOLUSI
    (Hambatan teknis/non-teknis dan solusinya).

    ### IV. PENUTUP
    (Kalimat penutup).

    
  `;

	try {
		const result = await model.generateContent(prompt);
		const text = result.response.text();
		let cleanText = text.replace(/^```markdown/i, "").replace(/^```/i, "").trim();
		cleanText = cleanText.replace(/^Berikut adalah.*:/i, "").trim();
		
		reportStore.setKey("generatedContent", cleanText);
		reportStore.setKey("lastUpdated", new Date().toISOString());
		return cleanText;
	} catch (error) {
		console.error("AI Error:", error);
		throw error;
	}
};