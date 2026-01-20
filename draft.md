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
│   │       ├── Skeleton.astro
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

12 directories, 21 files
```

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
			href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap"
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

	// Pastikan gfm (Github Flavored Markdown) true agar Tabel dirender
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

/* UTILITIES KHUSUS LAPORAN */
@layer utilities {
	.prose-report {
		font-family: "Lexend", Inter, sans-serif;
		color: #000000 !important;
		line-height: 1.5;
	}

	.prose-report table {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
		font-size: 0.85rem;
		border: 1px solid #000000;
	}

	.prose-report th {
		border: 1px solid #000000;
		background-color: #f3f4f6;
		color: #000000;
		padding: 6px;
		font-weight: bold;
		text-align: center;
		text-transform: uppercase;
		font-size: 0.75rem;
		font-family: Lexend, sans-serif;
	}

	.prose-report td {
		border: 1px solid #000000;
		color: #000000;
		padding: 6px;
		vertical-align: top;
		text-align: left;
	}

	.prose-report h1,
	.prose-report h2,
	.prose-report h3 {
		color: #000000 !important;
		font-family: Lexend, Inter, sans-serif;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.prose-report p,
	.prose-report li {
		margin-bottom: 0.5rem;
		text-align: justify;
	}

	.prose-report ul,
	.prose-report ol {
		padding-left: 1.5rem;
		margin-bottom: 1rem;
	}
}

/* MEDIA PRINT (Ctrl+P) */
@media print {
	body {
		background: none !important;
		color: black !important;
	}

	/* Sembunyikan UI Web */
	header,
	aside,
	.glass-panel > div:first-child,
	.btn-primary,
	button,
	.toast-container,
	.no-print,
	nav,
	footer,
	::-webkit-scrollbar {
		display: none !important;
	}

	/* Reset Layout */
	main {
		display: block !important;
		padding: 0 !important;
		margin: 0 !important;
		max-width: 100% !important;
	}
	.glass-panel {
		background: none !important;
		border: none !important;
		box-shadow: none !important;
		overflow: visible !important;
	}
	div {
		overflow: visible !important;
	}

	#report-preview {
		box-shadow: none !important;
		margin: 0 !important;
		width: 100% !important;
	}
}
```

---

## ./src/stores/reportStore.ts

```typescript
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
	instansiAlamat:
		"Jl. Raya Labuan Km. 5,7 Palurahan, Kaduhejo, Pandeglang - Banten 42253",
	instansiWebsite:
		"Website: https://mtsn1pandeglang.sch.id | Email: adm@mtsn1pandeglang.sch.id",
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
	tglMulai: new Date().toISOString().split("T")[0],
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
	modelAI: "gemini-3-flash-preview",
	detailLevel: "Standar",
	bahasa: "Indonesia",gemini
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

	const uniqueId =
		Date.now().toString() + "-" + Math.random().toString(36).substr(2, 5);

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
import InputGroup from "../InputGroup.astro";
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
	placeholder?: string;
}
const { label, name, model, rows = "4", placeholder } = Astro.props;
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
		placeholder={placeholder}
		class="w-full bg-slate-950/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 focus:bg-slate-900/50 transition-all resize-none custom-scrollbar placeholder:text-slate-600"
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

## ./src/components/ui/Skeleton.astro

```astro
<div class="animate-pulse w-full max-w-3xl mx-auto p-4 space-y-4">
	<div class="flex gap-4 items-center border-b border-gray-200 pb-4">
		<div class="w-16 h-16 bg-slate-200 rounded-lg"></div>
		<div class="flex-1 space-y-2">
			<div class="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
			<div class="h-3 bg-slate-200 rounded w-1/2 mx-auto"></div>
		</div>
	</div>
	<div class="h-6 bg-slate-200 rounded w-1/3 mx-auto my-6"></div>
	<div class="space-y-2">
		<div class="h-3 bg-slate-200 rounded w-full"></div>
		<div class="h-3 bg-slate-200 rounded w-full"></div>
		<div class="h-3 bg-slate-200 rounded w-5/6"></div>
	</div>
	<div class="border border-slate-200 rounded mt-6 p-2">
		<div class="h-8 bg-slate-100 mb-2 rounded"></div>
		<div class="h-4 bg-slate-50 mb-1 rounded"></div>
		<div class="h-4 bg-slate-50 mb-1 rounded"></div>
	</div>
</div>

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

	const model = genAI.getGenerativeModel({
		model: data.modelAI,
		safetySettings: [
			{
				category: HarmCategory.HARM_CATEGORY_HARASSMENT,
				threshold: HarmBlockThreshold.BLOCK_NONE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
				threshold: HarmBlockThreshold.BLOCK_NONE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
				threshold: HarmBlockThreshold.BLOCK_NONE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
				threshold: HarmBlockThreshold.BLOCK_NONE,
			},
		],
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
    
    *Isi tabel dengan menjabarkan "${
			data.tugasPokok
		}" menjadi kegiatan harian/mingguan yang logis dan variatif. Masukkan juga "${
		data.tugasTambahan
	}" dan "${data.tugasKhusus}".*

    ### III. KENDALA DAN SOLUSI
    (Uraikan hambatan teknis/non-teknis yang dihadapi bulan ini serta tindak lanjutnya).

    ### IV. PENUTUP
    (Kalimat penutup singkat).
    
    Gunakan bahasa ${data.bahasa} dengan gaya ${data.tone}.
  `;

	try {
		const result = await model.generateContent(prompt);
		const text = result.response.text();

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
import Skeleton from "../components/ui/Skeleton.astro";
import KopSuratConfig from "../components/forms/KopSuratConfig.astro";
import {
	Bot,
	FileText,
	Printer,
	Copy,
	Save,
	RefreshCw,
	FileDown,
	RotateCcw,
	Upload,
	Download,
} from "@lucide/astro";
---

<Layout title="Generator Laporan Kinerja AI">
	<ToastContainer />

	<main
		class="container mx-auto px-4 py-4 max-w-[1600px] min-h-screen flex flex-col"
		x-data="appFinal"
		@keydown.window.prevent.ctrl.s="saveHistory()"
		@keydown.window.prevent.ctrl.g="generate()"
	>
		<header
			class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-white/10 pb-4 no-print"
		>
			<div>
				<h1
					class="text-2xl font-bold text-white tracking-tight flex items-center gap-2"
				>
					<Bot class="text-blue-500" /> Generator Laporan Kinerja
				</h1>
				<p class="text-slate-400 text-xs mt-1">
					Sistem Otomasi Pelaporan Pegawai Berbasis AI • <span
						class="text-slate-500">v3.0 Final</span
					>
				</p>
			</div>
			<div class="flex items-center gap-3">
				<div
					class="hidden md:flex flex-col items-end text-[10px] text-slate-500 font-mono"
				>
					<span>Ctrl+G: Generate</span>
					<span>Ctrl+S: Save Draft</span>
				</div>
			</div>
		</header>

		<div
			class="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 h-[calc(100vh-140px)] min-h-[600px]"
		>
			<div
				class="lg:col-span-4 xl:col-span-3 flex flex-col h-full bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden shadow-2xl glass-panel"
			>
				<div class="p-3 border-b border-white/5 bg-slate-950/30">
					<TabNavigation />
				</div>

				<div
					class="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar scroll-smooth"
				>
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
						<h3
							class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 border-b border-white/5 pb-2"
						>
							Kategori Data Pribadi
						</h3>
						<InputGroup
							label="Nama Lengkap & Gelar"
							name="nama"
							model="form.nama"
							placeholder="Contoh: Yahya Zulfikri, S.Kom"
						/>
						<div class="grid grid-cols-2 gap-3">
							<InputGroup label="NIP / NUPTK" name="nip" model="form.nip" />
							<SelectGroup
								label="Gender"
								name="gender"
								model="form.gender"
								options={[
									{ val: "L", label: "Laki-laki" },
									{ val: "P", label: "Perempuan" },
								]}
							/>
						</div>
						<div class="grid grid-cols-2 gap-3">
							<InputGroup
								label="Email (Opsional)"
								name="email"
								model="form.email"
								type="email"
								placeholder="email@contoh.com"
							/>
							<InputGroup
								label="No. Telepon"
								name="hp"
								model="form.telepon"
								type="text"
								placeholder="0812..."
							/>
						</div>
					</div>

					<div
						x-show="activeTab === 'pegawai'"
						class="space-y-4 animate-fade-in"
					>
						<h3
							class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 border-b border-white/5 pb-2"
						>
							Kategori Kepegawaian
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
									{ val: "GTT/PTT", label: "GTT/PTT" },
								]}
							/>
						</div>
						<InputGroup
							label="Unit Kerja / Sekolah"
							name="unit"
							model="form.unitKerja"
						/>
						<InputGroup label="Jabatan" name="jabatan" model="form.jabatan" />
						<div class="grid grid-cols-2 gap-3">
							<InputGroup
								label="Golongan"
								name="gol"
								model="form.golongan"
								placeholder="III/a (Opsional)"
							/>
							<InputGroup
								label="Tgl Mulai"
								name="tgl"
								model="form.tglMulai"
								type="date"
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
									class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 border-b border-white/5 pb-2"
								>
									Kategori Pendidikan
								</h3>
								<div class="grid grid-cols-2 gap-3">
									<SelectGroup
										label="Jenjang"
										name="jenjang"
										model="form.jenjang"
										options={[
											{ val: "SD", label: "SD/MI" },
											{ val: "SMP", label: "SMP/MTS" },
											{ val: "SMA", label: "SMA/MA" },
											{ val: "SMK", label: "SMK" },
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
								<div class="grid grid-cols-2 gap-3">
									<SelectGroup
										label="Kurikulum"
										name="kurikulum"
										model="form.kurikulum"
										options={[
											{ val: "Merdeka", label: "Kur. Merdeka" },
											{ val: "K13", label: "K13 Revisi" },
										]}
									/>
									<InputGroup
										label="Jml Siswa"
										name="jmlSiswa"
										model="form.jmlSiswa"
										type="number"
									/>
								</div>
							</div>
						</template>
						<template x-if="form.jenisPegawai !== 'Guru'">
							<div
								class="flex flex-col items-center justify-center py-10 text-slate-500 text-sm text-center border border-dashed border-white/10 rounded-lg bg-white/5"
							>
								<p>Menu ini khusus untuk</p>
								<p class="font-bold text-slate-400">Pegawai Fungsional Guru</p>
							</div>
						</template>
					</div>

					<div x-show="activeTab === 'tugas'" class="space-y-4 animate-fade-in">
						<h3
							class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 border-b border-white/5 pb-2"
						>
							Tugas & Tanggung Jawab
						</h3>
						<TextAreaGroup
							label="Tugas Pokok (Uraikan singkat)"
							name="pokok"
							model="form.tugasPokok"
							rows="3"
						/>
						<TextAreaGroup
							label="Tugas Tambahan"
							name="tambahan"
							model="form.tugasTambahan"
							rows="3"
						/>
						<TextAreaGroup
							label="Tugas Khusus / Proyek"
							name="khusus"
							model="form.tugasKhusus"
							rows="2"
						/>
						<template x-if="form.jenisPegawai === 'Guru'">
							<InputGroup
								label="Ekstrakurikuler"
								name="ekskul"
								model="form.ekskul"
								placeholder="Pramuka, OSIS, dll"
							/>
						</template>
					</div>

					<div
						x-show="activeTab === 'config'"
						class="space-y-4 animate-fade-in"
					>
						<h3
							class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 border-b border-white/5 pb-2"
						>
							Konfigurasi Laporan
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
								label="Periode"
								name="jenisLap"
								model="form.jenisLaporan"
								options={[
									{ val: "Bulanan", label: "Bulanan" },
									{ val: "Triwulan", label: "Triwulan" },
									{ val: "Tahunan", label: "Tahunan" },
								]}
							/>
							<InputGroup
								label="Hari Kerja"
								name="hariKerja"
								model="form.hariKerja"
								placeholder="Senin - Jumat"
							/>
						</div>

						<div class="h-px bg-white/10 my-2"></div>

						<div class="grid grid-cols-2 gap-3">
							<SelectGroup
								label="Model AI"
								name="model"
								model="form.modelAI"
								options={[
									{
										val: "gemini-1.5-flash",
										label: "Gemini 1.5 Flash (Cepat)",
									},
									{
										val: "gemini-2.0-flash",
										label: "Gemini 2.0 Flash (Cepat)",
									},
									{
										val: "gemini-2.5-flash",
										label: "Gemini 2.5 Flash (Cepat)",
									},
									{
										val: "gemini-3-flash-preview",
										label: "Gemini 3 Flash (Cepat)",
									},
									{
										val: "gemini-3-pro-preview",
										label: "Gemini 3 Pro (Pintar)",
									},
								]}
							/>
							<SelectGroup
								label="Detail Level"
								name="detail"
								model="form.detailLevel"
								options={[
									{ val: "Ringkas", label: "Ringkas" },
									{ val: "Standar", label: "Standar" },
									{ val: "Detail", label: "Sangat Detail" },
								]}
							/>
						</div>
						<TextAreaGroup
							label="Instruksi Tambahan (Opsional)"
							name="customAI"
							model="form.customInstruction"
							rows="2"
							placeholder="Contoh: Fokus pada kegiatan MPLS..."
						/>

						<div class="mt-4 pt-4 border-t border-white/10">
							<h4 class="text-[10px] text-slate-500 uppercase font-bold mb-2">
								Manajemen Data
							</h4>
							<div class="grid grid-cols-2 gap-2">
								<button
									@click="exportData"
									class="flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-white/5 transition"
								>
									<Download class="w-3 h-3" /> Backup JSON
								</button>
								<label
									class="flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-white/5 transition cursor-pointer"
								>
									<Upload class="w-3 h-3" /> Restore JSON
									<input
										type="file"
										accept=".json"
										class="hidden"
										@change="importData"
									/>
								</label>
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
						class="btn-primary w-full flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-wait group relative overflow-hidden"
					>
						<div
							class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
						>
						</div>
						<RefreshCw x-show="loading" class="w-4 h-4 animate-spin" />
						<Bot x-show="!loading" class="w-4 h-4" />
						<span
							x-text="loading ? 'Sedang Menyusun Laporan...' : 'GENERATE AI'"
							class="relative font-bold tracking-wide"></span>
					</button>

					<div class="flex gap-2">
						<button
							@click="resetForm"
							class="flex-1 py-2 text-xs text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded-lg transition flex justify-center items-center gap-2"
							title="Reset Form"
						>
							<RotateCcw class="w-3 h-3" /> Reset
						</button>
						<button
							@click="saveHistory"
							class="flex-[2] py-2 text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:bg-white/5 rounded-lg transition flex justify-center items-center gap-2"
						>
							<Save class="w-3 h-3" /> Simpan Draft
						</button>
					</div>
				</div>
			</div>

			<div
				class="lg:col-span-8 xl:col-span-7 flex flex-col h-full glass-panel overflow-hidden relative"
			>
				<div
					class="bg-slate-950/60 p-3 border-b border-white/10 flex justify-between items-center backdrop-blur-sm z-20 no-print"
				>
					<span
						class="text-slate-300 font-medium text-sm flex items-center gap-2 px-2"
					>
						<FileText class="w-4 h-4 text-blue-400" /> Preview Dokumen
					</span>
					<div class="flex gap-2">
						<button
							@click="copyText"
							class="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition"
							title="Copy Text"
						>
							<Copy class="w-4 h-4" />
						</button>
						<div class="h-8 w-px bg-white/10 mx-1"></div>
						<button
							@click="exportWord"
							class="px-3 py-1.5 bg-blue-700/50 hover:bg-blue-600/50 text-blue-100 border border-blue-500/30 rounded-lg text-xs font-medium flex gap-2 items-center transition"
						>
							<FileDown class="w-3.5 h-3.5" /> Word .docx
						</button>
						<button
							@click="printPDF"
							class="px-3 py-1.5 bg-rose-700/50 hover:bg-rose-600/50 text-rose-100 border border-rose-500/30 rounded-lg text-xs font-medium flex gap-2 items-center transition"
						>
							<Printer class="w-3.5 h-3.5" /> PDF
						</button>
					</div>
				</div>

				<div
					class="flex-1 bg-white overflow-y-auto p-8 md:p-12 relative group scroll-smooth"
				>
					<div
						x-show="loading"
						class="absolute inset-0 bg-slate-900/10 backdrop-blur-sm z-50 flex items-start pt-20 justify-center"
					>
						<div
							class="bg-slate-800 rounded-xl shadow-2xl border border-white/10 p-2 max-w-md w-full mx-4"
						>
							<Skeleton />
							<p class="text-center text-slate-400 text-sm pb-4 animate-pulse">
								Sedang berpikir dan mengetik...
							</p>
						</div>
					</div>

					<template x-if="!renderedHtml && !loading">
						<div
							class="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-4 select-none"
						>
							<div
								class="p-6 rounded-full bg-slate-100/50 border-4 border-slate-100"
							>
								<Bot class="w-12 h-12 text-slate-300" />
							</div>
							<div class="text-center">
								<p class="font-bold text-slate-500 text-lg">
									Siap Menyusun Laporan
								</p>
								<p class="text-sm text-slate-400 mt-1 max-w-xs mx-auto">
									Lengkapi data di panel kiri, lalu tekan tombol Generate AI.
								</p>
							</div>
						</div>
					</template>

					<div
						id="report-preview"
						class="relative z-10 text-black min-h-[800px] flex flex-col max-w-[210mm] mx-auto bg-white shadow-sm"
						x-show="renderedHtml"
						style="background-color: #ffffff; color: #000000;"
					>
						<div
							class="flex items-center gap-4 border-b-4 border-double border-black pb-4 mb-6"
						>
							<div
								class="w-24 h-24 flex-shrink-0 flex items-center justify-center"
							>
								<template x-if="form.logoBase64">
									<img
										:src="form.logoBase64"
										class="max-w-full max-h-full object-contain"
									/>
								</template>
							</div>
							<div class="flex-1 text-center uppercase text-black">
								<h2
									class="text-xl font-bold leading-tight tracking-wide font-serif"
									x-text="form.instansiNama"
									style="font-family: Lexend, Inter, sans-serif;"
								>
								</h2>
								<p
									class="text-sm font-normal mt-1"
									x-text="form.instansiAlamat"
									style="font-family: Lexend, Inter, sans-serif;"
								>
								</p>
							</div>
							<div class="w-24"></div>
						</div>

						<div class="text-center mb-8 text-black">
							<h1
								class="text-lg font-bold underline uppercase tracking-wider mb-1"
								style="font-family: Lexend, Inter, sans-serif;"
							>
								LAPORAN KINERJA PEGAWAI
							</h1>
							<p class="text-sm font-medium">
								Nomor: <span
									class="bg-yellow-100 px-1 italic text-slate-400 print:bg-transparent print:text-black"
									>[Nomor Surat]</span
								>
							</p>
						</div>

						<div class="w-full overflow-x-auto">
							<div
								x-html="renderedHtml"
								class="prose-report max-w-none text-black mb-8 min-w-[100%]"
							>
							</div>
						</div>

						<div class="mt-8 pt-8 break-inside-avoid text-black">
							<div class="flex justify-end text-right">
								<div class="flex flex-col items-center w-64 text-center">
									<p class="mb-6 text-sm">
										<span
											x-text="form.unitKerja ? form.unitKerja.split(' ')[0] : 'Jakarta'"
										></span>,
										<span
											x-text="new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})"
										></span>
									</p>
									<p class="font-bold mb-2 text-sm">Yang Melaporkan,</p>

									<div class="w-20 h-20 my-2 relative">
										<img
											:src="qrCodeUrl"
											class="w-full h-full object-contain opacity-80"
											x-show="qrCodeUrl"
										/>
									</div>

									<p
										class="font-bold underline text-sm uppercase"
										x-text="form.nama"
									>
									</p>
									<p class="text-sm">NIP. <span x-text="form.nip"></span></p>
								</div>
							</div>

							<div
								class="mt-12 pt-2 border-t border-slate-300 flex justify-between items-center text-[9px] text-slate-500 italic"
							>
								<span>Dokumen digital generated by AI System.</span>
								<span
									>ID: <span x-text="Date.now().toString().slice(-8)"
									></span></span
								>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="hidden xl:block xl:col-span-2 h-full no-print">
				<HistoryPanel />
			</div>
		</div>
	</main>
</Layout>

<script>
	import Alpine from "alpinejs";
	import {
		reportStore,
		saveToHistory,
		resetStore,
	} from "../stores/reportStore";
	import { addToast } from "../stores/toastStore";
	import { generateLaporan } from "../services/aiService";
	import { parseMarkdown } from "../utils/markdown";

	import html2pdf from "html2pdf.js";
	import { asBlob } from "html-docx-js-typescript";
	import { saveAs } from "file-saver";
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
				{ id: "pribadi", label: "Pribadi" },
				{ id: "pegawai", label: "Kerja" },
				{ id: "dikjar", label: "Dikjar" },
				{ id: "tugas", label: "Tugas" },
				{ id: "config", label: "Opsi" },
			],

			async init() {
				if (this.form.generatedContent) {
					this.renderedHtml = await parseMarkdown(this.form.generatedContent);
					await this.generateQR();
				}

				this.$watch("form", (val) => {
					if (this.saveTimeout) clearTimeout(this.saveTimeout);
					this.saveTimeout = setTimeout(() => {
						reportStore.set({ ...val });
					}, 500);
				});

				reportStore.subscribe(async (newState) => {
					if (JSON.stringify(newState) !== JSON.stringify(this.form)) {
						this.form = { ...newState };
						if (newState.generatedContent) {
							this.renderedHtml = await parseMarkdown(
								newState.generatedContent
							);
							await this.generateQR();
						}
					}
				});
			},

			async generateQR() {
				if (!this.form.nama) return;
				const data = `DIGITAL SIGNATURE\nNama: ${this.form.nama}\nNIP: ${this.form.nip}\nUnit: ${this.form.unitKerja}\nPeriode: ${this.form.bulan}/${this.form.tahun}\nValid: true`;
				try {
					this.qrCodeUrl = await QRCode.toDataURL(data, {
						width: 120,
						margin: 0,
						color: { dark: "#000000", light: "#ffffff" },
					});
				} catch (err) {
					console.error(err);
				}
			},

			async generate() {
				if (!this.form.nama || !this.form.nip) {
					addToast("Nama dan NIP wajib diisi!", "error");
					this.activeTab = "pribadi";
					return;
				}

				this.loading = true;
				try {
					const rawMarkdown = await generateLaporan();
					this.renderedHtml = await parseMarkdown(rawMarkdown);
					await this.generateQR();
					this.form.generatedContent = rawMarkdown;
					addToast("Laporan berhasil disusun!", "success");
					saveToHistory();
				} catch (e) {
					console.error(e);
					addToast("Gagal: " + (e.message || "Cek Koneksi"), "error");
				} finally {
					this.loading = false;
				}
			},

			resetForm() {
				if (confirm("Yakin ingin mereset formulir? Data akan hilang.")) {
					resetStore();
					this.renderedHtml = "";
					this.qrCodeUrl = "";
					addToast("Formulir direset", "info");
				}
			},

			saveHistory() {
				if (!this.renderedHtml) {
					addToast("Belum ada laporan", "info");
					return;
				}
				if (saveToHistory()) addToast("Draft tersimpan", "success");
			},

			async copyText() {
				if (!this.form.generatedContent) return;
				try {
					await navigator.clipboard.writeText(this.form.generatedContent);
					addToast("Markdown berhasil disalin", "success");
				} catch (e) {
					addToast("Gagal menyalin", "error");
				}
			},

			async exportWord() {
				if (!this.renderedHtml) {
					addToast("Laporan belum dibuat", "error");
					return;
				}

				addToast("Menyiapkan dokumen Word...", "info");

				const contentElement = document.getElementById("report-preview");
				if (!contentElement) return;

				const htmlString = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Laporan Kinerja</title>
                        <style>
                            body { font-family: 'Lexend', sans-serif; font-size: 11pt; line-height: 1.15; }
                            table { width: 100%; border-collapse: collapse; margin: 10pt 0; }
                            td, th { border: 1px solid black; padding: 5pt; vertical-align: top; }
                            th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
                            h1, h2, h3 { color: black; font-family: Lexend, sans-serif; }
                        </style>
                    </head>
                    <body>
                        ${contentElement.innerHTML}
                    </body>
                    </html>
                `;

				try {
					const blob = await asBlob(htmlString, {
						orientation: "portrait",
						margins: { top: 720, right: 720, bottom: 720, left: 720 },
					});

					saveAs(blob, `Laporan_${this.form.nama.replace(/\s+/g, "_")}.docx`);
					addToast("Berhasil export ke .docx", "success");
				} catch (error) {
					console.error(error);
					addToast("Gagal export Word", "error");
				}
			},

			printPDF() {
				if (!this.renderedHtml) return;

				const element = document.getElementById("report-preview");
				if (!element) return;

				const fileName = `Laporan_${this.form.nama.replace(/\s+/g, "_")}.pdf`;

				const opt = {
					margin: [15, 15, 15, 15],
					filename: fileName,
					image: { type: "jpeg", quality: 0.98 },
					html2canvas: {
						scale: 2,
						useCORS: true,
						logging: false,
						backgroundColor: "#ffffff",
					},
					jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
					pagebreak: { mode: ["avoid-all", "css", "legacy"] },
				};

				addToast("Memproses PDF (Mohon tunggu)...", "info");

				html2pdf()
					.set(opt)
					.from(element)
					.save()
					.then(() => {
						addToast("PDF berhasil diunduh", "success");
					})
					.catch((err) => {
						console.error("PDF Error:", err);
						addToast("Gagal export PDF", "error");
					});
			},

			exportData() {
				const data = reportStore.get();
				const blob = new Blob([JSON.stringify(data, null, 2)], {
					type: "application/json",
				});
				saveAs(
					blob,
					`Backup_Laporan_${data.nama || "User"}_${new Date().toISOString().slice(0, 10)}.json`
				);
				addToast("Backup JSON berhasil diunduh", "success");
			},

			importData(event) {
				const file = event.target.files[0];
				if (!file) return;
				const reader = new FileReader();
				reader.onload = (e) => {
					try {
						const json = JSON.parse(e.target.result);
						if (json.instansiNama !== undefined) {
							reportStore.set(json);
							this.form = json;
							addToast("Data berhasil dipulihkan", "success");
						} else {
							throw new Error("Format JSON tidak valid");
						}
					} catch (err) {
						addToast("Gagal restore: File rusak", "error");
					}
				};
				reader.readAsText(file);
				event.target.value = "";
			},
		}));
	});
</script>

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
		"@types/file-saver": "^2.0.7",
		"@vite-pwa/astro": "^1.2.0",
		"alpinejs": "^3.15.4",
		"astro": "^5.16.9",
		"clsx": "^2.1.1",
		"dayjs": "^1.11.19",
		"dompurify": "^3.3.1",
		"file-saver": "^2.0.5",
		"gsap": "^3.14.2",
		"html-docx-js-typescript": "^0.1.5",
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
PUBLIC_GEMINI_API_KEY=AIzaSyDcOY5vi3_9CfT6UeXcLjjkPVhAUOZWjVE
# PUBLIC_GEMINI_API_KEY=AIzaSyDHlKs8T7pXJUbjezQQ5Kxqcw3-0IhzZQ8
# gemini-3-pro-preview
# gemini-3-flash-preview
# gemini-2.5-flash
# gemini-2.0-flash
# gemini-1.5-flash
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
