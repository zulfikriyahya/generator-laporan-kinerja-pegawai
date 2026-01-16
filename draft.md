# Project Files

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
│   │   ├── forms
│   │   │   ├── KopSuratConfig.astro
│   │   │   ├── SelectGroup.astro
│   │   │   └── TabNavigation.astro
│   │   ├── HistoryPanel.astro
│   │   ├── InputGroup.astro
│   │   ├── TextAreaGroup.astro
│   │   └── ui
│   │       └── ToastContainer.astro
│   ├── layouts
│   │   └── Layout.astro
│   ├── pages
│   │   └── index.astro
│   ├── services
│   │   └── aiService.ts
│   ├── stores
│   │   ├── reportStore.ts
│   │   └── toastStore.ts
│   ├── styles
│   │   └── global.css
│   └── utils
│       └── markdown.ts
└── tsconfig.json
```

12 directories, 20 files

# File Contents

## ./src/layouts/Layout.astro

```astro
---
import "../styles/global.css";
import { pwaInfo } from "virtual:pwa-info";
interface Props {
	title: string;
}
const { title } = Astro.props;
---

<!doctype html>
<html lang="id" class="dark scroll-smooth">
	<head>
		<meta charset="UTF-8" />
		<meta name="description" content="Generator Laporan Kinerja Pegawai AI" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
		/>
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="theme-color" content="#0f172a" />
		<title>{title}</title>
		{pwaInfo && <Fragment set:html={pwaInfo.webManifest.linkTag} />}
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
			rel="stylesheet"
		/>
	</head>
	<body
		class="bg-slate-900 text-slate-100 min-h-screen font-sans antialiased selection:bg-blue-500/30 overflow-x-hidden"
	>
		<div
			class="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900 pointer-events-none -z-10"
		>
		</div>
		<slot />
		<script>
			import { registerSW } from "virtual:pwa-register";
			registerSW({
				immediate: true,
				onNeedRefresh() {
					if (confirm("Versi baru tersedia. Refresh sekarang?")) {
						window.location.reload();
					}
				},
				onOfflineReady() {
					console.log("Aplikasi siap digunakan offline");
				},
			});
		</script>
	</body>
</html>

```

---

## ./src/utils/markdown.ts

```typescript
import { marked } from "marked";
import DOMPurify from "dompurify";

export const parseMarkdown = async (text: string): Promise<string> => {
	if (!text) return "";

	marked.use({
		breaks: true,
		gfm: true,
	});

	try {
		const rawHtml = await marked.parse(text);
		return DOMPurify.sanitize(rawHtml as string);
	} catch (error) {
		console.error("Markdown parsing error", error);
		return `<p class="text-red-400">Gagal merender format laporan.</p><pre>${text}</pre>`;
	}
};
```

---

## ./src/styles/global.css

```css
@import "tailwindcss";

@theme {
	--font-sans: "Lexend", system-ui, sans-serif;
}

@layer base {
	body {
		@apply bg-slate-900 text-slate-100 min-h-screen;
		background-image: radial-gradient(
				at 0% 0%,
				rgba(56, 189, 248, 0.15) 0px,
				transparent 50%
			), radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.15) 0px, transparent
					50%);
	}
}

@layer components {
	.glass-panel {
		@apply bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-xl;
	}

	.glass-input {
		@apply w-full bg-slate-950/30 border border-white/10 rounded-lg px-4 py-2.5 
    text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 
    transition-all placeholder:text-slate-500;
	}

	.btn-primary {
		@apply bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 
    text-white font-medium py-2.5 px-6 rounded-lg shadow-lg shadow-blue-900/20 
    transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed;
	}
}
```

---

## ./src/stores/reportStore.ts

```typescript
import { persistentMap } from "@nanostores/persistent";

export type ReportData = {
	instansiNama: string;
	instansiAlamat: string;
	logoBase64: string;
	nama: string;
	nip: string;
	gender: string;
	email: string;
	telepon: string;
	jenisPegawai: string;
	unitKerja: string;
	statusKepegawaian: string;
	golongan: string;
	jabatan: string;
	tglMulai: string;
	jenjang: string;
	mapel: string;
	kelas: string;
	jamMengajar: string;
	kurikulum: string;
	jmlSiswa: string;
	tugasPokok: string;
	tugasTambahan: string;
	tugasKhusus: string;
	ekskul: string;
	bulan: string;
	tahun: string;
	hariKerja: string;
	jenisLaporan: string;
	modelAI: string;
	detailLevel: string;
	bahasa: string;
	tone: string;
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
	tglMulai: "",
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
	bulan: new Date().getMonth().toString(),
	tahun: new Date().getFullYear().toString(),
	hariKerja: "Senin-Jumat",
	jenisLaporan: "Bulanan",
	modelAI: "gemini-3-flash-preview",
	detailLevel: "Standar",
	bahasa: "Indonesia",
	tone: "Formal",
	generatedContent: "",
	lastUpdated: new Date().toISOString(),
};
export const reportStore = persistentMap<ReportData>(
	"laporan-live:",
	defaultState
);
export const historyStore = persistentMap<{ items: HistoryItem[] }>(
	"laporan-history:",
	{
		items: [],
	}
);
export const resetStore = () => {
	reportStore.set(defaultState);
};
export const saveToHistory = (): boolean => {
	const currentData = reportStore.get();
	if (!currentData.generatedContent) return false;
	const newItem: HistoryItem = {
		id: Date.now().toString(),
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
```

---

## ./src/stores/toastStore.ts

```typescript
import { atom } from "nanostores";

export type ToastType = "success" | "error" | "info";

export type Toast = {
	id: number;
	message: string;
	type: ToastType;
};

export const $toasts = atom<Toast[]>([]);

export const addToast = (message: string, type: ToastType = "info") => {
	const id = Date.now();
	$toasts.set([...$toasts.get(), { id, message, type }]);

	setTimeout(() => {
		$toasts.set($toasts.get().filter((t) => t.id !== id));
	}, 3000);
};
```

---

## ./src/components/forms/SelectGroup.astro

```astro
---
interface Props {
	label: string;
	name: string;
	model: string;
	options: { val: string; label: string }[];
}
const { label, name, model, options } = Astro.props;
---

<div class="flex flex-col gap-2 group">
	<label
		class="text-xs font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors"
	>
		{label}
	</label>
	<div class="relative">
		<select
			x-model={model}
			class="w-full appearance-none bg-slate-950/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all cursor-pointer"
		>
			{options.map((opt) => <option value={opt.val}>{opt.label}</option>)}
		</select>
		<div
			class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400"
		>
			<svg class="h-4 w-4 fill-current" viewBox="0 0 20 20"
				><path
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				></path></svg
			>
		</div>
	</div>
</div>

```

---

## ./src/components/forms/KopSuratConfig.astro

```astro
---
import InputGroup from "../components/InputGroup.astro";
---

<div class="space-y-4">
	<h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
		Identitas Instansi
	</h3>
	<InputGroup
		label="Nama Instansi (Header 1)"
		name="instansi"
		model="form.instansiNama"
		placeholder="PEMERINTAH PROVINSI..."
	/>
	<InputGroup
		label="Alamat / Sub-Header"
		name="alamat"
		model="form.instansiAlamat"
		placeholder="Alamat lengkap..."
	/>
	<div class="flex flex-col gap-2 group">
		<label class="text-xs font-bold text-slate-400 uppercase tracking-wider"
			>Logo Instansi</label
		>
		<div class="flex items-center gap-4">
			<div
				class="w-16 h-16 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden relative"
			>
				<template x-if="form.logoBase64">
					<img :src="form.logoBase64" class="w-full h-full object-contain" />
				</template>
				<template x-if="!form.logoBase64">
					<span class="text-xs text-slate-500">No Logo</span>
				</template>
				<button
					x-show="form.logoBase64"
					@click="form.logoBase64 = ''"
					class="absolute inset-0 bg-black/60 flex items-center justify-center text-red-400 opacity-0 hover:opacity-100 transition"
				>
					✕
				</button>
			</div>
			<div class="flex-1">
				<input
					type="file"
					accept="image/*"
					@change="handleLogoUpload"
					class="block w-full text-sm text-slate-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-xs file:font-semibold
            file:bg-blue-500/10 file:text-blue-400
            hover:file:bg-blue-500/20 cursor-pointer"
				/>
				<p class="text-[10px] text-slate-500 mt-1">
					Maks 100KB (PNG/JPG). Disimpan lokal.
				</p>
			</div>
		</div>
	</div>
</div>
<script></script>

```

---

## ./src/components/forms/TabNavigation.astro

```astro
<div
	class="flex overflow-x-auto gap-2 p-1 mb-6 bg-slate-950/50 rounded-xl border border-white/5 scrollbar-hide"
>
	<template x-for="tab in tabs" :key="tab.id">
		<button
			@click="activeTab = tab.id"
			:class="activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'"
			class="px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
			x-text="tab.label"></button>
	</template>
</div>

```

---

## ./src/components/InputGroup.astro

```astro
---
interface Props {
	label: string;
	name: string;
	type?: "text" | "number" | "date" | "email";
	placeholder?: string;
	model: string;
}
const { label, name, type = "text", placeholder, model } = Astro.props;
---

<div class="flex flex-col gap-2 group">
	<label
		for={name}
		class="text-xs font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors"
	>
		{label}
	</label>
	<input
		type={type}
		id={name}
		name={name}
		x-model={model}
		placeholder={placeholder}
		class="w-full bg-slate-950/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 focus:bg-slate-900/50 transition-all placeholder:text-slate-600"
	/>
</div>

```

---

## ./src/components/TextAreaGroup.astro

```astro
---
interface Props {
	label: string;
	name: string;
	model: string;
	rows?: string;
}
const { label, name, model, rows = "4" } = Astro.props;
---

<div class="flex flex-col gap-2 group">
	<label
		for={name}
		class="text-xs font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors"
	>
		{label}
	</label>
	<textarea
		id={name}
		name={name}
		x-model={model}
		rows={rows}
		class="w-full bg-slate-950/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 focus:bg-slate-900/50 transition-all resize-none custom-scrollbar"
	></textarea>
</div>

```

---

## ./src/components/HistoryPanel.astro

```astro
<div class="glass-panel p-4 h-full flex flex-col">
	<h3 class="text-white font-semibold mb-4 flex items-center gap-2">
		<span class="w-1 h-5 bg-orange-500 rounded-full"></span> Riwayat Laporan
	</h3>
	<div class="flex-1 overflow-y-auto space-y-2 pr-2" x-data="historyApp">
		<template x-if="items.length === 0">
			<div class="text-center text-slate-500 text-sm py-4">
				Belum ada riwayat tersimpan.
			</div>
		</template>
		<template x-for="item in items" :key="item.id">
			<div
				class="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition group"
			>
				<div class="flex justify-between items-start mb-1">
					<span class="text-xs text-orange-400" x-text="item.date"></span>
					<button
						@click="remove(item.id)"
						class="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
						>✕</button
					>
				</div>
				<div
					class="text-sm font-medium text-slate-200 truncate"
					x-text="item.title"
				>
				</div>
				<button
					@click="load(item.id)"
					class="mt-2 w-full py-1.5 text-xs bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 rounded border border-transparent hover:border-blue-500/30 transition"
				>
					Load Data
				</button>
			</div>
		</template>
	</div>
</div>
<script>
	import Alpine from "alpinejs";
	import {
		historyStore,
		loadFromHistory,
		deleteHistory,
	} from "../stores/reportStore";
	import { addToast } from "../stores/toastStore";
	document.addEventListener("alpine:init", () => {
		Alpine.data("historyApp", () => ({
			items: [],
			init() {
				this.items = historyStore.get().items;
				historyStore.subscribe((val) => {
					this.items = val.items;
				});
			},
			load(id) {
				if (
					confirm(
						"Load data ini? Data yang belum disimpan di form sekarang akan tertimpa."
					)
				) {
					loadFromHistory(id);
					addToast("Data berhasil dimuat dari riwayat", "success");
				}
			},
			remove(id) {
				if (confirm("Hapus riwayat ini?")) {
					deleteHistory(id);
					addToast("Riwayat dihapus", "info");
				}
			},
		}));
	});
</script>

```

---

## ./src/components/ui/ToastContainer.astro

```astro
<div
	x-data="{ toasts: [] }"
	x-init="
    $store.toasts.subscribe(val => toasts = val);
  "
	class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
>
	<template x-for="toast in toasts" :key="toast.id">
		<div
			class="pointer-events-auto px-4 py-3 rounded-lg shadow-lg border backdrop-blur-md flex items-center gap-3 animate-slide-in min-w-[300px]"
			:class="{
        'bg-emerald-500/10 border-emerald-500/20 text-emerald-400': toast.type === 'success',
        'bg-red-500/10 border-red-500/20 text-red-400': toast.type === 'error',
        'bg-blue-500/10 border-blue-500/20 text-blue-400': toast.type === 'info'
      }"
		>
			<span
				x-text="toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'"
				class="font-bold"></span>
			<span x-text="toast.message" class="text-sm font-medium"></span>
		</div>
	</template>
</div>

<script>
	import Alpine from "alpinejs";
	import { $toasts } from "../../stores/toastStore";

	document.addEventListener("alpine:init", () => {
		Alpine.store("toasts", {
			subscribe: (cb) => $toasts.subscribe(cb),
		});
	});
</script>

<style>
	.animate-slide-in {
		animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}
	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>

```

---

## ./src/services/aiService.ts

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
import { reportStore } from "../stores/reportStore";

const API_KEY = import.meta.env.PUBLIC_GEMINI_API_KEY;

export const generateLaporan = async () => {
	if (!API_KEY) throw new Error("API Key Missing");

	const data = reportStore.get();
	const genAI = new GoogleGenerativeAI(API_KEY);
	const model = genAI.getGenerativeModel({ model: data.modelAI });
	let konteksGuru = "";
	if (data.jenisPegawai === "Guru") {
		konteksGuru = `
      Detail Mengajar:
      - Mapel: ${data.mapel}
      - Kelas: ${data.kelas}
      - Jam/Minggu: ${data.jamMengajar}
      - Kurikulum: ${data.kurikulum}
    `;
	}

	const prompt = `
    Buat Laporan Kinerja ${data.jenisLaporan} untuk pegawai berikut:
    
    DATA DIRI:
    Nama: ${data.nama}, NIP: ${data.nip}, Jabatan: ${data.jabatan}
    Status: ${data.statusKepegawaian}, Unit: ${data.unitKerja}
    
    ${konteksGuru}

    AKTIVITAS:
    - Tugas Pokok: ${data.tugasPokok}
    - Tugas Tambahan: ${data.tugasTambahan}
    - Proyek Khusus: ${data.tugasKhusus}
    
    PERIODE: Bulan ${data.bulan} Tahun ${data.tahun}
    
    INSTRUKSI OUTPUT:
    - Bahasa: ${data.bahasa}
    - Gaya Bahasa: ${data.tone}
    - Detail: ${data.detailLevel}
    - Format: Markdown (Gunakan tabel untuk rincian kegiatan).
    - Struktur: Header (Kop), Pendahuluan, Rincian Kegiatan (Tabel), Kendala & Solusi, Penutup.
  `;

	try {
		const result = await model.generateContent(prompt);
		const text = result.response.text();
		reportStore.setKey("generatedContent", text);
		reportStore.setKey("lastUpdated", new Date().toISOString());
		return text;
	} catch (error) {
		console.error("AI Error:", error);
		throw error;
	}
};
```

---

## ./src/pages/index.astro

```astro
---
import Layout from "../layouts/Layout.astro";
import InputGroup from "../components/InputGroup.astro";
import SelectGroup from "../components/forms/SelectGroup.astro";
import TextAreaGroup from "../components/TextAreaGroup.astro";
import TabNavigation from "../components/forms/TabNavigation.astro";
import ToastContainer from "../components/ui/ToastContainer.astro";
import HistoryPanel from "../components/HistoryPanel.astro";
import { Bot, FileText, Printer, Copy, Save, RefreshCw } from "@lucide/astro";
import KopSuratConfig from "../components/forms/KopSuratConfig.astro";
---

<Layout title="Generator Laporan Kinerja AI">
	<ToastContainer />
	<main
		class="container mx-auto px-4 py-6 max-w-[1600px] min-h-screen flex flex-col"
		x-data="appFinal"
	>
		<header
			class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-white/10 pb-6"
		>
			<div>
				<h1 class="text-2xl font-bold text-white tracking-tight">
					Generator Laporan Kinerja
				</h1>
				<p class="text-slate-400 text-sm mt-1">
					Sistem Otomasi Pelaporan Pegawai Berbasis AI
				</p>
			</div>
			<div class="flex items-center gap-3">
				<div
					class="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
				>
					Status: Ready
				</div>
			</div>
		</header>
		<div
			class="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 h-[calc(100vh-160px)] min-h-[600px]"
		>
			<div
				class="lg:col-span-4 xl:col-span-3 flex flex-col h-full bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden"
			>
				<div class="p-4 border-b border-white/5">
					<TabNavigation />
				</div>
				<div class="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
					<div
						x-show="activeTab === 'instansi'"
						class="space-y-4 animate-fade-in"
					>
						<KopSuratConfig />
					</div>
					<div
						x-show="activeTab === 'pribadi'"
						class="space-y-4 animate-fade-in"
					>
						<div class="space-y-4">
							<h3
								class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3"
							>
								Data Diri
							</h3>
							<InputGroup
								label="Nama Lengkap & Gelar"
								name="nama"
								model="form.nama"
								placeholder="Contoh: Yahya Zulfikri"
							/>
							<InputGroup label="NIP / NUPTK" name="nip" model="form.nip" />
							<div class="grid grid-cols-2 gap-3">
								<SelectGroup
									label="Gender"
									name="gender"
									model="form.gender"
									options={[
										{ val: "L", label: "Laki-laki" },
										{ val: "P", label: "Perempuan" },
									]}
								/>
								<InputGroup label="Email" name="email" model="form.email" />
							</div>
						</div>
					</div>
					<div
						x-show="activeTab === 'pegawai'"
						class="space-y-4 animate-fade-in"
					>
						<div class="space-y-4">
							<h3
								class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3"
							>
								Status Kerja
							</h3>
							<div class="grid grid-cols-2 gap-3">
								<SelectGroup
									label="Jenis Pegawai"
									name="jenis"
									model="form.jenisPegawai"
									options={[
										{ val: "Guru", label: "Guru" },
										{ val: "Staf", label: "Staf Admin" },
									]}
								/>
								<SelectGroup
									label="Status"
									name="status"
									model="form.statusKepegawaian"
									options={[
										{ val: "PNS", label: "PNS" },
										{ val: "PPPK", label: "PPPK" },
										{ val: "Honorer", label: "Honorer" },
									]}
								/>
							</div>
							<InputGroup
								label="Unit Kerja / Sekolah"
								name="unit"
								model="form.unitKerja"
							/>
							<InputGroup label="Jabatan" name="jabatan" model="form.jabatan" />
							<InputGroup
								label="Golongan"
								name="gol"
								model="form.golongan"
								placeholder="III/a (Opsional)"
							/>
						</div>
					</div>
					<div
						x-show="activeTab === 'dikjar'"
						class="space-y-4 animate-fade-in"
					>
						<template x-if="form.jenisPegawai === 'Guru'">
							<div class="space-y-4">
								<h3
									class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3"
								>
									Detail Mengajar
								</h3>
								<div class="grid grid-cols-2 gap-3">
									<SelectGroup
										label="Jenjang"
										name="jenjang"
										model="form.jenjang"
										options={[
											{ val: "SD", label: "SD" },
											{ val: "SMP", label: "SMP" },
											{ val: "SMA", label: "SMA/SMK" },
										]}
									/>
									<InputGroup
										label="Jam/Minggu"
										name="jam"
										model="form.jamMengajar"
										type="number"
									/>
								</div>
								<InputGroup
									label="Mata Pelajaran"
									name="mapel"
									model="form.mapel"
								/>
								<InputGroup
									label="Kelas Ajar"
									name="kelas"
									model="form.kelas"
									placeholder="X-1, XI-2, XII-1"
								/>
								<SelectGroup
									label="Kurikulum"
									name="kurikulum"
									model="form.kurikulum"
									options={[
										{ val: "Merdeka", label: "Kurikulum Merdeka" },
										{ val: "K13", label: "K13 Revisi" },
									]}
								/>
							</div>
						</template>
						<template x-if="form.jenisPegawai !== 'Guru'">
							<div
								class="flex flex-col items-center justify-center py-10 text-slate-500 text-sm text-center border border-dashed border-white/10 rounded-lg"
							>
								<p>Menu ini khusus untuk</p>
								<p class="font-bold text-slate-400">Pegawai Fungsional Guru</p>
							</div>
						</template>
					</div>
					<div x-show="activeTab === 'tugas'" class="space-y-4 animate-fade-in">
						<div class="space-y-4">
							<h3
								class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3"
							>
								Uraian Tugas
							</h3>
							<TextAreaGroup
								label="Tugas Pokok"
								name="pokok"
								model="form.tugasPokok"
							/>
							<TextAreaGroup
								label="Tugas Tambahan"
								name="tambahan"
								model="form.tugasTambahan"
							/>
							<TextAreaGroup
								label="Proyek/Kendala"
								name="khusus"
								model="form.tugasKhusus"
							/>
						</div>
					</div>
					<div
						x-show="activeTab === 'config'"
						class="space-y-4 animate-fade-in"
					>
						<div class="space-y-4">
							<h3
								class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3"
							>
								Parameter Laporan
							</h3>
							<div class="grid grid-cols-2 gap-3">
								<SelectGroup
									label="Bulan"
									name="bulan"
									model="form.bulan"
									options={Array.from({ length: 12 }, (_, i) => ({
										val: String(i + 1),
										label: new Date(0, i).toLocaleString("id-ID", {
											month: "long",
										}),
									}))}
								/>
								<InputGroup
									label="Tahun"
									name="tahun"
									model="form.tahun"
									type="number"
								/>
							</div>
							<div class="grid grid-cols-2 gap-3">
								<SelectGroup
									label="Model AI"
									name="model"
									model="form.modelAI"
									options={[
										{ val: "gemini-3-flash-preview", label: "Gemini Flash" },
										{ val: "gemini-3-pro-preview", label: "Gemini Pro" },
									]}
								/>
								<SelectGroup
									label="Gaya Bahasa"
									name="tone"
									model="form.tone"
									options={[
										{ val: "Formal", label: "Formal" },
										{ val: "Naratif", label: "Naratif" },
									]}
								/>
							</div>
						</div>
					</div>
				</div>
				<div
					class="p-4 border-t border-white/10 bg-slate-900/80 backdrop-blur space-y-3 z-10"
				>
					<button
						@click="generate"
						:disabled="loading"
						class="btn-primary w-full flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
					>
						<RefreshCw x-show="loading" class="w-4 h-4 animate-spin" />
						<Bot x-show="!loading" class="w-4 h-4" />
						<span x-text="loading ? 'Menyusun...' : 'Generate AI'"></span>
					</button>

					<button
						@click="saveHistory"
						class="w-full py-2.5 text-xs font-medium text-slate-400 hover:text-white border border-white/10 hover:bg-white/5 rounded-lg transition flex justify-center items-center gap-2"
					>
						<Save class="w-3 h-3" /> Simpan Draft
					</button>
				</div>
			</div>
			<div
				class="lg:col-span-8 xl:col-span-7 flex flex-col h-full glass-panel overflow-hidden relative"
			>
				<div
					class="bg-slate-950/40 p-3 border-b border-white/10 flex justify-between items-center backdrop-blur-sm z-20"
				>
					<span
						class="text-slate-300 font-medium text-sm flex items-center gap-2 px-2"
					>
						<FileText class="w-4 h-4 text-blue-400" /> Preview
					</span>
					<div class="flex gap-2">
						<button
							@click="copyText"
							class="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition"
							title="Copy Text"
						>
							<Copy class="w-4 h-4" />
						</button>
						<button
							@click="printPDF"
							class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium flex gap-2 items-center transition shadow-lg shadow-blue-900/20"
						>
							<Printer class="w-4 h-4" /> PDF
						</button>
					</div>
				</div>
				<div
					class="flex-1 bg-white overflow-y-auto p-8 md:p-12 relative group scroll-smooth"
				>
					<div
						id="report-preview"
						class="relative z-10 text-slate-900 min-h-[800px] flex flex-col"
					>
						<div
							x-html="renderedHtml"
							class="prose prose-sm md:prose-base max-w-none
                prose-headings:font-bold prose-headings:text-slate-900
                prose-h1:text-xl prose-h1:uppercase prose-h1:text-center prose-h1:mb-8
                prose-h2:text-lg prose-h2:border-b prose-h2:border-slate-300 prose-h2:pb-2 prose-h2:mt-6
                prose-p:text-justify prose-p:leading-relaxed
                prose-table:w-full prose-table:border-collapse prose-table:text-sm prose-table:my-4
                prose-th:border prose-th:border-slate-400 prose-th:bg-slate-100 prose-th:p-2 prose-th:text-left
                prose-td:border prose-td:border-slate-400 prose-td:p-2 prose-td:align-top
                prose-ul:list-disc prose-ul:pl-5"
						>
						</div>
						<div
							class="w-20 h-20 flex-shrink-0 flex items-center justify-center"
						>
							<template x-if="form.logoBase64">
								<img
									:src="form.logoBase64"
									class="max-w-full max-h-full object-contain"
								/>
							</template>
						</div>
						<div class="flex-1 text-center uppercase">
							<h2
								class="text-xl font-bold leading-tight"
								x-text="form.instansiNama"
							>
							</h2>
							<p class="text-sm font-normal mt-1" x-text="form.instansiAlamat">
							</p>
						</div>
						<div class="w-20"></div>
					</div>
					<div class="text-center mb-6" x-show="renderedHtml">
						<h1 class="text-lg font-bold underline">LAPORAN KINERJA PEGAWAI</h1>
						<p class="text-sm">
							Periode: <span x-text="getMonthName(form.bulan)"></span>
							<span x-text="form.tahun"></span>
						</p>
					</div>
					<div
						x-html="renderedHtml"
						class="prose prose-sm md:prose-base max-w-none
                prose-headings:text-slate-900 prose-p:text-justify ..."
					>
					</div>
					<div class="mt-12 pt-8 break-inside-avoid" x-show="renderedHtml">
						<div class="flex justify-end text-right">
							<div class="flex flex-col items-center w-64">
								<p class="mb-4">
									Pandeglang, <span
										x-text="new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})"
									></span>
								</p>
								<p class="font-bold mb-2">Yang Melaporkan,</p>
								<div
									class="w-24 h-24 bg-slate-100 mb-2 border border-slate-200"
								>
									<img
										:src="qrCodeUrl"
										class="w-full h-full"
										x-show="qrCodeUrl"
									/>
								</div>
								<p class="font-bold underline" x-text="form.nama"></p>
								<p class="text-sm">NIP. <span x-text="form.nip"></span></p>
							</div>
						</div>
						<div class="text-[10px] text-slate-400 mt-8 border-t pt-2 italic">
							Dokumen ini digenerate secara otomatis oleh sistem AI Laporan
							Kinerja. Scan QR Code untuk verifikasi data digital. ID: <span
								x-text="Date.now()"></span>
						</div>
					</div>
					<template x-if="!renderedHtml && !loading">
						<div
							class="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-4"
						>
							<div class="p-4 rounded-full bg-slate-100">
								<Bot class="w-8 h-8 text-slate-300" />
							</div>
							<p class="text-sm">Isi data formulir dan klik Generate</p>
						</div>
					</template>
				</div>
			</div>
		</div>
		<div class="hidden xl:block xl:col-span-2 h-full">
			<HistoryPanel />
		</div>
	</main>
</Layout>
<script>
	import Alpine from "alpinejs";
	import { reportStore, saveToHistory } from "../stores/reportStore";
	import { addToast } from "../stores/toastStore";
	import { generateLaporan } from "../services/aiService";
	import { parseMarkdown } from "../utils/markdown";
	import html2pdf from "html2pdf.js";
	import QRCode from "qrcode";
	document.addEventListener("alpine:init", () => {
		Alpine.data("appFinal", () => ({
			loading: false,
			renderedHtml: "",
			activeTab: "pribadi",
			qrCodeUrl: "",
			form: reportStore.get(),
			saveTimeout: null,
			tabs: [
				{ id: "instansi", label: "Instansi" },
				{ id: "pribadi", label: "Data Diri" },
				{ id: "pegawai", label: "Kerja" },
				{ id: "dikjar", label: "Dikjar" },
				{ id: "tugas", label: "Tugas" },
				{ id: "config", label: "Opsi" },
			],
			async init() {
				if (this.form.generatedContent) {
					this.renderedHtml = await parseMarkdown(this.form.generatedContent);
				}
				this.$watch("form", (val) => {
					if (this.saveTimeout) clearTimeout(this.saveTimeout);
					this.saveTimeout = setTimeout(() => {
						reportStore.set({ ...val });
					}, 1000);
				});
				reportStore.subscribe((newState) => {
					if (
						newState.generatedContent !== this.form.generatedContent ||
						newState.nama !== this.form.nama
					) {
						this.form = { ...newState };
						this.renderedHtml = "";
						parseMarkdown(newState.generatedContent).then(
							(html) => (this.renderedHtml = html)
						);
					}
				});
			},
			getMonthName(idx) {
				return new Date(0, idx - 1).toLocaleString("id-ID", { month: "long" });
			},
			handleLogoUpload(e) {
				const file = e.target.files[0];
				if (!file) return;
				if (file.size > 1000 * 1024) {
					// Limit 1MB
					alert("Ukuran logo terlalu besar (Maks 1MB).");
					return;
				}
				const reader = new FileReader();
				reader.onload = (event) => {
					this.form.logoBase64 = event.target.result;
				};
				reader.readAsDataURL(file);
			},
			async generateQR() {
				const data = `Dokumen Sah: ${this.form.nama}\nNIP: ${this.form.nip}\nUnit: ${this.form.unitKerja}\nPeriode: ${this.form.bulan}/${this.form.tahun}\nValidasi Sistem AI.`;
				try {
					this.qrCodeUrl = await QRCode.toDataURL(data, {
						width: 150,
						margin: 1,
					});
				} catch (err) {
					console.error(err);
				}
			},
			async generate() {
				if (!this.form.nama) {
					addToast("Nama pegawai wajib diisi!", "error");
					this.activeTab = "pribadi";
					return;
				}
				reportStore.set({ ...this.form });
				this.loading = true;
				try {
					const rawMarkdown = await generateLaporan();
					this.renderedHtml = await parseMarkdown(rawMarkdown);
					await this.generateQR();
					this.renderedHtml = await parseMarkdown(rawMarkdown);
					this.form.generatedContent = rawMarkdown;
					saveToHistory();
					addToast("Laporan berhasil disusun", "success");
					this.form.generatedContent = rawMarkdown;
					saveToHistory();
					addToast("Laporan berhasil disusun", "success");
				} catch (e) {
					console.error(e);
					addToast("Gagal: " + (e.message || "Cek API Key"), "error");
				} finally {
					this.loading = false;
				}
			},
			saveHistory() {
				if (!this.renderedHtml) {
					addToast("Belum ada laporan", "info");
					return;
				}
				if (saveToHistory()) addToast("Draft disimpan", "success");
			},
			async copyText() {
				if (!this.form.generatedContent) return;
				try {
					await navigator.clipboard.writeText(this.form.generatedContent);
					addToast("Teks disalin", "success");
				} catch (e) {
					addToast("Gagal menyalin", "error");
				}
			},
			printPDF() {
				if (!this.renderedHtml) return;
				const element = document.getElementById("report-preview");
				const fileName = `Laporan_${this.form.nama.replace(/\s+/g, "_")}.pdf`;
				const opt = {
					margin: [15, 15, 15, 15],
					filename: fileName,
					image: { type: "jpeg", quality: 0.98 },
					html2canvas: { scale: 2, useCORS: true },
					jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
					pagebreak: { mode: ["avoid-all", "css", "legacy"] },
				};
				addToast("Membuat PDF...", "info");
				html2pdf().set(opt).from(element).save();
			},
		}));
	});
</script>
<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.02);
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}
	.animate-fade-in {
		animation: fadeIn 0.3s ease-out forwards;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>

```

---

## ./package.json

```json
{
	"name": "generator-laporan-kinerja",
	"type": "module",
	"version": "1.0.0",
	"scripts": {
		"dev": "astro dev",
		"build": "astro build",
		"preview": "astro preview",
		"astro": "astro"
	},
	"dependencies": {
		"@astrojs/alpinejs": "^0.4.9",
		"@google/generative-ai": "^0.24.1",
		"@lucide/astro": "^0.562.0",
		"@nanostores/persistent": "^1.2.0",
		"@tailwindcss/vite": "^4.1.18",
		"@vite-pwa/astro": "^1.2.0",
		"alpinejs": "^3.15.4",
		"astro": "^5.16.9",
		"clsx": "^2.1.1",
		"dayjs": "^1.11.19",
		"dompurify": "^3.3.1",
		"gsap": "^3.14.2",
		"html2pdf.js": "^0.14.0",
		"jspdf": "^4.0.0",
		"marked": "^17.0.1",
		"nanostores": "^1.1.0",
		"qrcode": "^1.5.4",
		"tailwind-merge": "^3.4.0",
		"tailwindcss": "^4.1.18",
		"workbox-window": "^7.4.0"
	}
}
```

---

## ./tsconfig.json

```json
{
	"extends": "astro/tsconfigs/strict",
	"include": [".astro/types.d.ts", "**/*"],
	"exclude": ["dist"]
}
```

---

## ./.env

```env
PUBLIC_GEMINI_API_KEY=AIzaSyDHlKs8T7pXJUbjezQQ5Kxqcw3-0IhzZQ8
# gemini-3-pro-preview
```

---

## ./astro.config.mjs

```javascript
import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";

export default defineConfig({
	integrations: [
		alpinejs(),
		AstroPWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Generator Laporan Kinerja Pegawai",
				short_name: "Laporan Kineja Pegawai",
				description:
					"Aplikasi penyusun laporan kinerja pegawai otomatis berbasis AI",
				theme_color: "#0f172a",
				background_color: "#0f172a",
				display: "standalone",
				orientation: "portrait",
				icons: [
					{
						src: "192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
				navigateFallback: "/index.html",
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
```

---
