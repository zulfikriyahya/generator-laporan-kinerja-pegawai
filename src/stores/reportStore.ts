import { persistentMap } from "@nanostores/persistent";

export type ReportData = {
	// Instansi
	institusiBarisSatuNama: string;
	institusiBarisDuaNama: string;
	instansiNama: string;
	instansiAlamat: string;
	instansiWebsite: string;
	logoInstitusiBase64: string;
	logoInstansiBase64: string;
	titimangsa: string;
	
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
	customInstruction: string;
	
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
	institusiBarisSatuNama: "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
	institusiBarisDuaNama: "KANTOR KEMENTERIAN AGAMA KABUPATEN PANDEGLANG",
	instansiNama: "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
	instansiAlamat: "Jl. Raya Labuan Km. 5,7 Palurahan, Kaduhejo, Pandeglang - Banten 42253",
	instansiWebsite: "Website: https://mtsn1pandeglang.sch.id | Email: adm@mtsn1pandeglang.sch.id",
	logoInstitusiBase64: "",
	logoInstansiBase64: "",
	titimangsa: "Pandeglang, 31 Januari 2026",
	nama: "",
	nip: "",
	gender: "",
	email: "",
	telepon: "",
	jenisPegawai: "",
	unitKerja: "",
	statusKepegawaian: "",
	golongan: "",
	jabatan: "",
	tglMulai: new Date().toISOString().split('T')[0],
	jenjang: "",
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
	modelAI: "gemini-2.5-flash",
	detailLevel: "Standar",
	bahasa: "Indonesia",
	tone: "Formal",
	customInstruction: "",
	generatedContent: "",
	lastUpdated: new Date().toISOString(),
};

export const reportStore = persistentMap<ReportData>(
	"laporan-live-v1:",
	defaultState
);

export const historyStore = persistentMap<{ items: HistoryItem[] }>(
	"laporan-history-v1:", 
	{ items: [] }
);

export const resetStore = () => {
	reportStore.set(defaultState);
};

export const saveToHistory = (): boolean => {
	const currentData = reportStore.get();
	if (!currentData.generatedContent) return false;
	
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
	const newHistory = [newItem, ...currentHistory].slice(0, 20);
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