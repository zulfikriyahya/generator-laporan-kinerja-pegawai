import { persistentMap } from "@nanostores/persistent";

export type ReportData = {
	// Instansi
	instansiNama: string;
	instansiAlamat: string;
	logoBase64: string;
	
	// Pribadi
	nama: string;
	nip: string;
	gender: string;
	email: string;
	telepon: string;
	
	// Kepegawaian
	jenisPegawai: "Guru" | "Staf";
	unitKerja: string;
	statusKepegawaian: string;
	golongan: string;
	jabatan: string;
	tglMulai: string;
	
	// Pendidikan (Khusus Guru)
	jenjang: string;
	mapel: string;
	kelas: string;
	jamMengajar: string;
	kurikulum: string;
	jmlSiswa: string;
	
	// Tugas
	tugasPokok: string;
	tugasTambahan: string;
	tugasKhusus: string;
	ekskul: string;
	
	// Periode
	bulan: string;
	tahun: string;
	hariKerja: string;
	jenisLaporan: string;
	
	// Config AI
	modelAI: string;
	detailLevel: string;
	bahasa: string;
	tone: string;
	customInstruction: string; // <-- New Feature
	
	// System
	generatedContent: string;
	lastUpdated: string;
};

export type HistoryItem = {
	id: string;
	date: string;
	title: string;
	data: ReportData;
};

const defaultState: ReportData = {
	instansiNama: "DINAS PENDIDIKAN PROVINSI DKI JAKARTA",
	instansiAlamat: "SMA NEGERI 1 CONTOH - Jl. Pendidikan No. 1, Jakarta",
	logoBase64: "",
	nama: "",
	nip: "",
	gender: "L",
	email: "",
	telepon: "",
	jenisPegawai: "Guru",
	unitKerja: "",
	statusKepegawaian: "PNS",
	golongan: "",
	jabatan: "",
	tglMulai: new Date().toISOString().split('T')[0],
	jenjang: "SMA",
	mapel: "",
	kelas: "",
	jamMengajar: "24",
	kurikulum: "Merdeka",
	jmlSiswa: "",
	tugasPokok: "",
	tugasTambahan: "",
	tugasKhusus: "",
	ekskul: "",
	bulan: (new Date().getMonth() + 1).toString(),
	tahun: new Date().getFullYear().toString(),
	hariKerja: "Senin - Jumat",
	jenisLaporan: "Bulanan",
	modelAI: "gemini-3-flash-preview", // Updated Model
	detailLevel: "Standar",
	bahasa: "Indonesia",
	tone: "Formal",
	customInstruction: "",
	generatedContent: "",
	lastUpdated: new Date().toISOString(),
};

// Ganti key version (v3) agar store lama yang error ter-reset otomatis
export const reportStore = persistentMap<ReportData>(
	"laporan-live-v3:",
	defaultState
);

export const historyStore = persistentMap<{ items: HistoryItem[] }>(
	"laporan-history-v3:", 
	{ items: [] }
);

export const resetStore = () => {
	reportStore.set(defaultState);
};

export const saveToHistory = (): boolean => {
	const currentData = reportStore.get();
	if (!currentData.generatedContent) return false;
	
	// Fix: Unique ID Generator to prevent duplicate key error
	const uniqueId = Date.now().toString() + "-" + Math.random().toString(36).substr(2, 5);
	
	const newItem: HistoryItem = {
		id: uniqueId,
		date: new Date().toLocaleDateString("id-ID", {
			day: "numeric",
			month: "short",
			hour: "2-digit",
			minute: "2-digit",
		}),
		title: `${currentData.nama} - ${currentData.bulan}/${currentData.tahun}`,
		data: JSON.parse(JSON.stringify(currentData)),
	};
	const currentHistory = historyStore.get().items || [];
	const newHistory = [newItem, ...currentHistory].slice(0, 20); // Simpan max 20 history
	historyStore.setKey("items", newHistory);
	return true;
};

export const loadFromHistory = (id: string): boolean => {
	const item = historyStore.get().items.find((i) => i.id === id);
	if (item) {
		reportStore.set(item.data);
		return true;
	}
	return false;
};

export const deleteHistory = (id: string) => {
	const current = historyStore.get().items;
	historyStore.setKey(
		"items",
		current.filter((i) => i.id !== id)
	);
};