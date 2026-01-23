// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - AI SERVICE (MULTI-MODEL)
// Version: 1.0.0
// Supports: Gemini, Claude, GPT, Groq
// ============================================================================

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AppStore, AIModel, GenerateAIResult } from "../types/ReportTypes";
import {
	reportStore,
	updateStore,
	generateNomorDokumen,
} from "../stores/reportStore";

// ============================================================================
// API KEYS CONFIGURATION
// ============================================================================
const API_KEYS = {
	gemini: import.meta.env.PUBLIC_GEMINI_API_KEY || "",
	claude: import.meta.env.PUBLIC_CLAUDE_API_KEY || "",
	gpt: import.meta.env.PUBLIC_OPENAI_API_KEY || "",
	groq: import.meta.env.PUBLIC_GROQ_API_KEY || "",
	together: import.meta.env.PUBLIC_TOGETHER_API_KEY || "", // Free tier
	deepseek: import.meta.env.PUBLIC_DEEPSEEK_API_KEY || "", // Very cheap
};

// ============================================================================
// MODEL CONFIGURATIONS - OPTIMIZED FOR FREE & INTENSIVE USE
// ============================================================================
const MODEL_CONFIGS = {
	gemini: {
		model: "gemini-2.0-flash-exp", // Free & fast
		maxTokens: 8000,
		temperature: 0.7,
	},
	claude: {
		model: "claude-sonnet-4-20250514", // Paid but efficient
		maxTokens: 4000,
		temperature: 0.7,
	},
	gpt: {
		model: "gpt-4o-mini", // Cheaper OpenAI model
		maxTokens: 4000,
		temperature: 0.7,
	},
	groq: {
		model: "llama-3.3-70b-versatile", // Free & very fast
		maxTokens: 8000,
		temperature: 0.7,
	},
};

// ============================================================================
// PROMPT BUILDER
// ============================================================================

const buildSystemPrompt = (): string => {
	return `ROLE: Anda adalah Asisten Administrasi ASN (Aparatur Sipil Negara) Profesional yang ahli dalam menyusun dokumen laporan kinerja pegawai di lingkungan instansi pemerintah Indonesia.

EXPERTISE:
- Menguasai format dan struktur laporan kinerja pegawai ASN
- Memahami terminologi dan regulasi kepegawaian Indonesia
- Mampu menyusun narasi formal sesuai kaidah bahasa Indonesia yang baik dan benar
- Mengetahui standar dokumentasi administrasi pemerintahan

BEHAVIOR:
- Selalu menggunakan Bahasa Indonesia baku dan formal
- Menyusun kalimat dengan struktur yang jelas dan sistematis
- Menggunakan istilah teknis yang tepat sesuai konteks kepegawaian
- Objektif dan profesional dalam menyampaikan informasi

OUTPUT STANDARDS:
- Format: Markdown yang rapi dan terstruktur
- Tone: Formal birokrasi Indonesia
- Style: Objektif, faktual, dan profesional
- Length: Sesuai kebutuhan, tidak bertele-tele namun lengkap`;
};

const buildUserPrompt = (store: AppStore): string => {
	const { pegawai, akademik, kinerja, config, instansi } = store;

	const namaBulan = new Date(
		parseInt(config.tahun),
		parseInt(config.bulan) - 1,
	).toLocaleString("id-ID", { month: "long" });

	let konteksAkademik = "";
	if (pegawai.jenis === "Guru" || pegawai.jenis === "GTT" || pegawai.jabatan.toLowerCase().includes('guru')) {
		konteksAkademik = `

KONTEKS PEMBELAJARAN:
- Mata Pelajaran: ${akademik.mapel}
- Kelas: ${akademik.kelas}
- Kurikulum: ${akademik.kurikulum}
- Jumlah Siswa: ${akademik.jumlahSiswa} siswa
- Beban Mengajar: ${akademik.jamMengajar} jam pelajaran per minggu
- Ekstrakurikuler: ${akademik.ekskul || "Tidak ada"}
- Tahun Pelajaran: ${akademik.tahunPelajaran}
- Semester: ${akademik.semester}`;
	}

	const prompt = `TASK: Buat ISI LAPORAN KINERJA BULANAN (Tanpa Kop Surat dan Tanda Tangan)

===========================================
DATA PEGAWAI
===========================================
- Nama Lengkap: ${pegawai.nama}
- NIP: ${pegawai.nip}
- Jabatan: ${pegawai.jabatan}
- Golongan/Ruang: ${pegawai.golongan}
- Unit Kerja: ${pegawai.unitKerja}
- Jenis Kepegawaian: ${pegawai.jenis}
- Masa Kerja: ${pegawai.masaKerjaTahun} tahun ${pegawai.masaKerjaBulan} bulan

===========================================
PERIODE LAPORAN
===========================================
- Bulan Laporan: ${namaBulan} ${config.tahun}
${akademik.tahunPelajaran ? `- Tahun Pelajaran: ${akademik.tahunPelajaran}` : ''}
${akademik.semester ? `- Semester: ${akademik.semester}` : ''}
${konteksAkademik}

===========================================
DATA KINERJA
===========================================
Tugas Pokok:
${kinerja.tugasPokok}

Tugas Tambahan:
${kinerja.tugasTambahan}

Target Capaian Tahunan (IKU):
${kinerja.targetTahunan}

Target Kuantitatif:
${kinerja.targetKuantitatif || "Belum ditentukan"}

Target Kualitatif:
${kinerja.targetKualitatif || "Belum ditentukan"}

Hambatan/Kendala Bulan Ini:
${kinerja.hambatan || "Tidak ada hambatan yang signifikan"}

Solusi/Tindak Lanjut:
${kinerja.solusi || "Terus meningkatkan kualitas layanan dan optimalisasi kinerja"}

===========================================
INSTRUKSI OUTPUT
===========================================
1. JANGAN buat Kop Surat (sudah ada di sistem)
2. JANGAN buat bagian Tanda Tangan (sudah ada di sistem)
3. Format OUTPUT harus dalam MARKDOWN yang rapi
4. Gunakan Bahasa Indonesia Formal sesuai kaidah penulisan dokumen pemerintah
5. PENTING: Gunakan data Tahun Pelajaran "${akademik.tahunPelajaran}" dan Semester "${akademik.semester}" yang sudah diberikan
6. Jangan menggunakan tahun pelajaran lain selain "${akademik.tahunPelajaran}"

===========================================
STRUKTUR LAPORAN (WAJIB DIIKUTI)
===========================================

## BAB I: PENDAHULUAN

### 1.1 Latar Belakang
Jelaskan konteks tugas dan tanggung jawab pegawai dalam ${namaBulan} ${config.tahun}${akademik.tahunPelajaran ? ` pada Tahun Pelajaran ${akademik.tahunPelajaran}` : ''}. Kaitkan dengan visi misi instansi ${instansi.header3}.

### 1.2 Tujuan Laporan
Tujuan penyusunan laporan kinerja ini adalah:
1. [Tujuan 1]
2. [Tujuan 2]
3. [Tujuan 3]

### 1.3 Ruang Lingkup
Laporan ini mencakup pelaksanaan tugas dan kinerja selama bulan ${namaBulan} ${config.tahun}${akademik.tahunPelajaran ? ` dalam Tahun Pelajaran ${akademik.tahunPelajaran} Semester ${akademik.semester}` : ''}.

---

## BAB II: PELAKSANAAN TUGAS BULANAN

### 2.1 Uraian Tugas Pokok
[Jelaskan pelaksanaan tugas pokok berdasarkan data kinerja di atas]

### 2.2 Tugas Tambahan
[Jelaskan pelaksanaan tugas tambahan berdasarkan data di atas]

### 2.3 Rincian Kegiatan Harian

Berikut adalah rincian kegiatan yang dilaksanakan selama bulan ${namaBulan} ${config.tahun}:

| No | Tanggal | Uraian Kegiatan | Output/Hasil | Keterangan |
|:--:|:-------:|-----------------|--------------|------------|
| 1 | ${config.tahun}-${config.bulan.padStart(2, "0")}-01 | [Kegiatan hari 1] | [Output 1] | [Ket] |
| 2 | ${config.tahun}-${config.bulan.padStart(2, "0")}-02 | [Kegiatan hari 2] | [Output 2] | [Ket] |

**PENTING:** 
- Buat minimal 15-20 baris kegiatan yang variatif dan realistis
- Tanggal harus tersebar di sepanjang bulan ${namaBulan}
- Kegiatan harus relevan dengan tugas pokok dan jabatan
- Output harus konkret dan terukur
- Hindari kegiatan yang repetitif

---

## BAB III: CAPAIAN KINERJA DAN EVALUASI

### 3.1 Capaian Target
Berdasarkan target IKU "${kinerja.targetTahunan}", berikut adalah capaian kinerja bulan ini:

1. **Aspek Kuantitatif**
   - [Jelaskan capaian kuantitatif]
   
2. **Aspek Kualitatif**
   - [Jelaskan capaian kualitatif]

### 3.2 Analisis Kinerja
[Analisis objektif terhadap kinerja yang telah dilaksanakan]

### 3.3 Hambatan dan Kendala
${kinerja.hambatan ? `Dalam pelaksanaan tugas bulan ${namaBulan} ${config.tahun}, ditemukan beberapa hambatan:\n\n${kinerja.hambatan}` : `Seluruh kegiatan pada bulan ${namaBulan} ${config.tahun} berjalan dengan lancar tanpa hambatan yang berarti.`}

### 3.4 Solusi dan Tindak Lanjut
${kinerja.solusi ? `Untuk mengatasi hambatan tersebut, telah dilakukan upaya:\n\n${kinerja.solusi}` : `Untuk periode selanjutnya, akan terus dilakukan upaya peningkatan kualitas layanan dan optimalisasi kinerja.`}

---

## BAB IV: PENUTUP

### 4.1 Kesimpulan
[Simpulkan secara singkat pelaksanaan kinerja bulan ${namaBulan} ${config.tahun}]

### 4.2 Rekomendasi
[Berikan rekomendasi untuk perbaikan di bulan berikutnya]

---

**CATATAN PENTING:**
- Demikian laporan kinerja ini dibuat dengan sebenar-benarnya
- Laporan ini dapat digunakan sebagai bahan evaluasi dan perencanaan bulan berikutnya

===========================================
INSTRUKSI TAMBAHAN DARI USER
===========================================
${config.customInstruction || "Tidak ada instruksi tambahan"}

===========================================
QUALITY CHECKLIST
===========================================
Pastikan output Anda memenuhi kriteria:
✓ Bahasa Indonesia baku dan formal
✓ Struktur BAB I-IV lengkap
✓ Tabel kegiatan minimal 15 baris dengan tanggal variatif
✓ Konten relevan dengan data pegawai dan tugas
✓ Output terukur dan konkret
✓ Tidak ada placeholder atau [...]
✓ Total panjang dokumen 1500-2500 kata
✓ GUNAKAN TAHUN PELAJARAN: ${akademik.tahunPelajaran} (WAJIB)
✓ GUNAKAN SEMESTER: ${akademik.semester} (WAJIB)
✓ Laporan ini dibuat oleh pribadi (jangan gunakan "... oleh Saudara ..")

MULAI GENERATE SEKARANG!`;

	return prompt;
};

// ============================================================================
// AI MODEL GENERATORS
// ============================================================================

const generateWithGemini = async (
	systemPrompt: string,
	userPrompt: string,
): Promise<GenerateAIResult> => {
	const apiKey = API_KEYS.gemini;
	if (!apiKey) {
		return {
			success: false,
			error: "API Key Gemini tidak ditemukan. Silakan cek file .env",
		};
	}

	try {
		const genAI = new GoogleGenerativeAI(apiKey);
		const config = MODEL_CONFIGS.gemini;
		const model = genAI.getGenerativeModel({
			model: config.model,
			systemInstruction: systemPrompt,
		});

		const result = await model.generateContent({
			contents: [{ role: "user", parts: [{ text: userPrompt }] }],
			generationConfig: {
				temperature: config.temperature,
				maxOutputTokens: config.maxTokens,
			},
		});

		const response = result.response;
		let text = response.text();

		text = text
			.replace(/^```markdown\s*/i, "")
			.replace(/^```\s*/i, "")
			.replace(/```\s*$/i, "")
			.trim();

		return {
			success: true,
			content: text,
			tokensUsed: response.usageMetadata?.totalTokenCount || 0,
		};
	} catch (error: any) {
		console.error("Gemini Error:", error);
		return {
			success: false,
			error: error.message || "Gagal menghubungi Gemini API",
		};
	}
};

const generateWithClaude = async (
	systemPrompt: string,
	userPrompt: string,
): Promise<GenerateAIResult> => {
	const apiKey = API_KEYS.claude;
	if (!apiKey) {
		return {
			success: false,
			error: "API Key Claude tidak ditemukan. Silakan cek file .env",
		};
	}

	try {
		const config = MODEL_CONFIGS.claude;
		const response = await fetch("https://api.anthropic.com/v1/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": apiKey,
				"anthropic-version": "2023-06-01",
			},
			body: JSON.stringify({
				model: config.model,
				max_tokens: config.maxTokens,
				temperature: config.temperature,
				system: systemPrompt,
				messages: [
					{
						role: "user",
						content: userPrompt,
					},
				],
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error?.message || "Claude API request failed");
		}

		const data = await response.json();
		const text = data.content[0].text;

		return {
			success: true,
			content: text,
			tokensUsed: data.usage.input_tokens + data.usage.output_tokens,
		};
	} catch (error: any) {
		console.error("Claude Error:", error);
		return {
			success: false,
			error: error.message || "Gagal menghubungi Claude API",
		};
	}
};

const generateWithGPT = async (
	systemPrompt: string,
	userPrompt: string,
): Promise<GenerateAIResult> => {
	const apiKey = API_KEYS.gpt;
	if (!apiKey) {
		return {
			success: false,
			error: "API Key OpenAI tidak ditemukan. Silakan cek file .env",
		};
	}

	try {
		const config = MODEL_CONFIGS.gpt;
		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: config.model,
				max_tokens: config.maxTokens,
				temperature: config.temperature,
				messages: [
					{ role: "system", content: systemPrompt },
					{ role: "user", content: userPrompt },
				],
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error?.message || "OpenAI API request failed");
		}

		const data = await response.json();
		const text = data.choices[0].message.content;

		return {
			success: true,
			content: text,
			tokensUsed: data.usage.total_tokens,
		};
	} catch (error: any) {
		console.error("GPT Error:", error);
		return {
			success: false,
			error: error.message || "Gagal menghubungi OpenAI API",
		};
	}
};

const generateWithGroq = async (
	systemPrompt: string,
	userPrompt: string,
): Promise<GenerateAIResult> => {
	const apiKey = API_KEYS.groq;
	if (!apiKey) {
		return {
			success: false,
			error: "API Key Groq tidak ditemukan. Silakan cek file .env",
		};
	}

	try {
		const config = MODEL_CONFIGS.groq;
		const response = await fetch(
			"https://api.groq.com/openai/v1/chat/completions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					model: config.model,
					max_tokens: config.maxTokens,
					temperature: config.temperature,
					messages: [
						{ role: "system", content: systemPrompt },
						{ role: "user", content: userPrompt },
					],
				}),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error?.message || "Groq API request failed");
		}

		const data = await response.json();
		const text = data.choices[0].message.content;

		return {
			success: true,
			content: text,
			tokensUsed: data.usage.total_tokens,
		};
	} catch (error: any) {
		console.error("Groq Error:", error);
		return {
			success: false,
			error: error.message || "Gagal menghubungi Groq API",
		};
	}
};

const generateWithTogether = async (
	systemPrompt: string,
	userPrompt: string,
): Promise<GenerateAIResult> => {
	const apiKey = API_KEYS.together;
	if (!apiKey) {
		return {
			success: false,
			error: "API Key Together AI tidak ditemukan. Silakan cek file .env",
		};
	}

	try {
		const response = await fetch(
			"https://api.together.xyz/v1/chat/completions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
					max_tokens: 4000,
					temperature: 0.7,
					messages: [
						{ role: "system", content: systemPrompt },
						{ role: "user", content: userPrompt },
					],
				}),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error?.message || "Together AI API request failed");
		}

		const data = await response.json();
		const text = data.choices[0].message.content;

		return {
			success: true,
			content: text,
			tokensUsed: data.usage?.total_tokens || 0,
		};
	} catch (error: any) {
		console.error("Together AI Error:", error);
		return {
			success: false,
			error: error.message || "Gagal menghubungi Together AI API",
		};
	}
};

const generateWithDeepSeek = async (
	systemPrompt: string,
	userPrompt: string,
): Promise<GenerateAIResult> => {
	const apiKey = API_KEYS.deepseek;
	if (!apiKey) {
		return {
			success: false,
			error: "API Key DeepSeek tidak ditemukan. Silakan cek file .env",
		};
	}

	try {
		const response = await fetch(
			"https://api.deepseek.com/v1/chat/completions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					model: "deepseek-chat",
					max_tokens: 4000,
					temperature: 0.7,
					messages: [
						{ role: "system", content: systemPrompt },
						{ role: "user", content: userPrompt },
					],
				}),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error?.message || "DeepSeek API request failed");
		}

		const data = await response.json();
		const text = data.choices[0].message.content;

		return {
			success: true,
			content: text,
			tokensUsed: data.usage?.total_tokens || 0,
		};
	} catch (error: any) {
		console.error("DeepSeek Error:", error);
		return {
			success: false,
			error: error.message || "Gagal menghubungi DeepSeek API",
		};
	}
};

// ============================================================================
// MAIN GENERATE FUNCTION
// ============================================================================

export const generateLaporan = async (
	model?: AIModel,
): Promise<GenerateAIResult> => {
	const store = reportStore.get();
	const selectedModel = model || store.config.modelAI;

	const systemPrompt = buildSystemPrompt();
	const userPrompt = buildUserPrompt(store);

	let result: GenerateAIResult;

	switch (selectedModel) {
		case "gemini":
			result = await generateWithGemini(systemPrompt, userPrompt);
			break;
		case "claude":
			result = await generateWithClaude(systemPrompt, userPrompt);
			break;
		case "gpt":
			result = await generateWithGPT(systemPrompt, userPrompt);
			break;
		case "groq":
			result = await generateWithGroq(systemPrompt, userPrompt);
			break;
		case "together":
			result = await generateWithTogether(systemPrompt, userPrompt);
			break;
		case "deepseek":
			result = await generateWithDeepSeek(systemPrompt, userPrompt);
			break;
		default:
			result = {
				success: false,
				error: `Model AI "${selectedModel}" tidak didukung`,
			};
	}

	if (result.success && result.content) {
		const nomorDokumen = generateNomorDokumen();
		const timestamp = new Date().toISOString();

		updateStore("output", {
			...store.output,
			content: result.content,
			lastUpdated: timestamp,
			titimangsa: {
				...store.output.titimangsa,
				tanggal: new Date().toLocaleDateString("id-ID", {
					day: "numeric",
					month: "long",
					year: "numeric",
				}),
			},
			tte: {
				...store.output.tte,
				nomorDokumen,
				timestamp,
			},
		});
	}

	return result;
};



export const checkAPIKey = (model: AIModel): boolean => {
	return !!API_KEYS[model];
};

export const getAvailableModels = (): AIModel[] => {
	const available: AIModel[] = [];

	if (API_KEYS.gemini) available.push("gemini");
	if (API_KEYS.claude) available.push("claude");
	if (API_KEYS.gpt) available.push("gpt");
	if (API_KEYS.groq) available.push("groq");
	if (API_KEYS.together) available.push("together");
	if (API_KEYS.deepseek) available.push("deepseek");

	return available;
};