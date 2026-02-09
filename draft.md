# File Contents

## astro.config.mjs

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
      devOptions: {
        enabled: false, // Matikan PWA saat mode dev untuk debugging
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        navigateFallback: "/index.html",
        // PENTING: Jangan cache/intercept request ke API
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api"),
            handler: "NetworkOnly", // Paksa request ke jaringan, jangan cache
          },
        ],
      },
      manifest: {
        name: "E-Kinerja AI",
        short_name: "E-Kinerja",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        // Opsional: Proxy agar tidak kena CORS di local
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  },
});
```

---

## package.json

```json
{
  "name": "ekinerja-frontend",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/alpinejs": "^0.4.9",
    "@lucide/astro": "^0.562.0",
    "@nanostores/persistent": "^1.2.0",
    "@tailwindcss/vite": "^4.1.18",
    "@vite-pwa/astro": "^1.2.0",
    "alpinejs": "^3.15.4",
    "astro": "^5.16.14",
    "axios": "^1.6.7",
    "clsx": "^2.1.1",
    "dayjs": "^1.11.19",
    "docx": "^8.5.0",
    "dompurify": "3.3.1",
    "file-saver": "^2.0.5",
    "html-docx-js-typescript": "^0.1.5",
    "html2pdf.js": "^0.14.0",
    "marked": "17.0.1",
    "nanostores": "^1.1.0",
    "qrcode": "^1.5.4",
    "tailwind-merge": "^3.4.0",
    "tailwindcss": "^4.1.18",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@types/dompurify": "3.2.0",
    "@types/file-saver": "^2.0.7",
    "@types/qrcode": "^1.5.6",
    "prettier": "^3.8.1",
    "prettier-plugin-astro": "^0.14.1",
    "typescript": "^5.9.3"
  }
}
```

---

## tsconfig.json

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

---

## src/components/InputGroup.astro

````astro
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
	<label for={name} class="text-xs font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors">
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
</div>```

---

## src/components/ui/ZoomControl.astro

```astro
<div x-data="zoomControl" class="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 no-print">
	<div class="glass-panel px-4 py-2 flex items-center gap-3 shadow-xl border border-white/10">
		<input type="range" x-model="zoom" min="50" max="150" step="10" class="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer" />
		<span class="text-xs font-medium text-white w-10 text-right" x-text="zoom + '%'"></span>
		<button @click="resetZoom" class="px-3 py-1 text-xs font-medium hover:bg-white/10 rounded transition">Reset</button>
	</div>
</div>

<script>
	document.addEventListener("alpine:init", () => {
		Alpine.data("zoomControl", () => ({
			zoom: 100,
			init() {
				this.$watch("zoom", (value) => {
					const preview = document.getElementById("document-preview");
					if (preview) {
						preview.style.transform = `scale(${value / 100})`;
						preview.style.transformOrigin = "top center";
					}
				});
			},
			resetZoom() { this.zoom = 100; },
		}));
	});
</script>```

---

## src/components/ui/ToastContainer.astro

```astro
<div x-data="toastContainer" class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
  <template x-for="toast in toasts" :key="toast.id">
    <div
      class="pointer-events-auto px-4 py-3 rounded-lg shadow-lg border backdrop-blur-md flex items-center gap-3 animate-slide-in min-w-[300px]"
      :class="{
        'bg-emerald-500/10 border-emerald-500/20 text-emerald-400': toast.type === 'success',
        'bg-red-500/10 border-red-500/20 text-red-400': toast.type === 'error',
        'bg-blue-500/10 border-blue-500/20 text-blue-400': toast.type === 'info'
      }"
    >
      <span x-text="toast.message" class="text-sm font-medium"></span>
    </div>
  </template>
</div>

<script>
  import { $toasts } from '../../stores/toastStore';
  document.addEventListener('alpine:init', () => {
    Alpine.data('toastContainer', () => ({
      toasts: [],
      init() {
        $toasts.subscribe((value) => { this.toasts = value; });
      }
    }));
  });
</script>

<style>
  .animate-slide-in { animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
</style>```

---

## src/components/ui/AutoSaveIndicator.astro

```astro
<div
	x-data="autoSaveIndicator"
	x-show="visible"
	x-transition:enter="transition ease-out duration-300"
	x-transition:enter-start="opacity-0 translate-y-2"
	x-transition:enter-end="opacity-100 translate-y-0"
	x-transition:leave="transition ease-in duration-200"
	x-transition:leave-start="opacity-100 translate-y-0"
	x-transition:leave-end="opacity-0 translate-y-2"
	class="fixed bottom-4 right-4 z-50 no-print"
>
	<div
		class="flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg border backdrop-blur-md"
		:class="{
			'bg-emerald-500/10 border-emerald-500/20 text-emerald-400': status === 'saved',
			'bg-blue-500/10 border-blue-500/20 text-blue-400': status === 'saving',
			'bg-red-500/10 border-red-500/20 text-red-400': status === 'error'
		}"
	>
		<span class="text-xs font-medium" x-text="message"></span>
	</div>
</div>

<script>
	document.addEventListener("alpine:init", () => {
		Alpine.data("autoSaveIndicator", () => ({
			visible: false,
			status: "saving",
			message: "",
			timeout: null,
			init() {
				window.addEventListener("autosave:start", () => this.show("saving", "Menyimpan..."));
				window.addEventListener("autosave:success", () => { this.show("saved", "Tersimpan"); this.hideAfter(2000); });
				window.addEventListener("autosave:error", () => { this.show("error", "Gagal menyimpan"); this.hideAfter(3000); });
			},
			show(status, message) {
				clearTimeout(this.timeout);
				this.status = status;
				this.message = message;
				this.visible = true;
			},
			hideAfter(delay) {
				this.timeout = setTimeout(() => { this.visible = false; }, delay);
			},
		}));
	});
</script>```

---

## src/components/ui/DocumentStats.astro

```astro
<div
	x-data="documentStats"
	x-show="hasContent"
	class="fixed top-20 right-8 z-20 no-print"
	style="display: none;"
>
	<div class="glass-panel px-4 py-3 min-w-[200px]">
		<h4 class="text-xs font-bold text-slate-400 uppercase mb-3">Stats</h4>
		<div class="space-y-2">
			<div class="flex justify-between items-center">
				<span class="text-xs text-slate-300">Words</span>
				<span class="text-sm font-bold" x-text="wordCount"></span>
			</div>
		</div>
	</div>
</div>

<script>
	document.addEventListener("alpine:init", () => {
		Alpine.data("documentStats", () => ({
			wordCount: 0,
			hasContent: false,
			init() {
				this.$watch("$store.appCore?.form?.output?.content", (content) => {
					if (content) {
						this.calculateStats(content);
						this.hasContent = true;
					} else {
						this.hasContent = false;
					}
				});
			},
			calculateStats(content) {
				if (!content) return;
				const plainText = content.replace(/[#*_`~\[\]]/g, "");
				this.wordCount = plainText.trim().split(/\s+/).filter((w) => w.length > 0).length;
			},
		}));
	});
</script>```

---

## src/components/ui/ProgressBar.astro

```astro
<div
	x-data="progressBar"
	x-show="isGenerating"
	class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center no-print"
	style="display: none;"
>
	<div class="glass-panel p-6 max-w-md w-full mx-4">
		<div class="flex items-center gap-3 mb-4">
			<div class="flex-1">
				<h3 class="text-white font-bold">Generating Report</h3>
				<p class="text-xs text-slate-400" x-text="currentStep"></p>
			</div>
		</div>
		<div class="mb-4">
			<div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
				<div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-500 ease-out" :style="`width: ${progress}%`"></div>
			</div>
		</div>
		<button @click="cancel" class="mt-4 w-full py-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition">Cancel</button>
	</div>
</div>

<script>
	document.addEventListener("alpine:init", () => {
		Alpine.data("progressBar", () => ({
			isGenerating: false,
			progress: 0,
			currentStep: "",
			progressInterval: null,
			init() {
				window.addEventListener("generate:start", () => this.start());
				window.addEventListener("generate:complete", () => this.complete());
				window.addEventListener("generate:error", () => this.error());
			},
			start() {
				this.isGenerating = true;
				this.progress = 0;
				this.animateProgress();
			},
			animateProgress() {
				this.progressInterval = setInterval(() => {
					if (this.progress < 90) this.progress += Math.random() * 10;
				}, 500);
			},
			complete() {
				clearInterval(this.progressInterval);
				this.progress = 100;
				setTimeout(() => { this.isGenerating = false; }, 1000);
			},
			error() {
				clearInterval(this.progressInterval);
				this.isGenerating = false;
			},
			cancel() {
				clearInterval(this.progressInterval);
				this.isGenerating = false;
				window.dispatchEvent(new CustomEvent("generate:cancel"));
			},
		}));
	});
</script>```

---

## src/components/ui/KeyboardShortcuts.astro

```astro
<script>
	document.addEventListener("alpine:init", () => {
		Alpine.data("keyboardShortcuts", () => ({
			init() {
				document.addEventListener("keydown", (e) => {
					if (e.ctrlKey || e.metaKey) {
						switch (e.key) {
							case "Enter": e.preventDefault(); this.triggerGenerate(); break;
							case "s": e.preventDefault(); this.triggerSave(); break;
							case "p": e.preventDefault(); this.triggerExportPDF(); break;
						}
					}
				});
			},
			triggerGenerate() { window.dispatchEvent(new CustomEvent("shortcut:generate")); },
			triggerSave() { window.dispatchEvent(new CustomEvent("shortcut:save")); },
			triggerExportPDF() { window.dispatchEvent(new CustomEvent("shortcut:export-pdf")); },
		}));
	});
</script>
<div x-data="keyboardShortcuts"></div>```

---

## src/components/forms/SelectGroup.astro

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
	<label class="text-xs font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors">
		{label}
	</label>
	<div class="relative">
		<select
			x-model={model}
			class="w-full appearance-none bg-slate-950/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all cursor-pointer"
		>
			{options.map((opt) => <option value={opt.val}>{opt.label}</option>)}
		</select>
	</div>
</div>```

---

## src/components/forms/FormKinerja.astro

```astro
---
import TextAreaGroup from "../TextAreaGroup.astro";
---

<div class="space-y-4 animate-fade-in">
	<TextAreaGroup label="Tugas Pokok" name="tp" model="form.kinerja.tugasPokok" rows="3" />
	<TextAreaGroup label="Tugas Tambahan" name="tt" model="form.kinerja.tugasTambahan" rows="2" />
	<div class="pt-4 border-t border-white/5">
		<h4 class="text-xs font-bold text-slate-500 uppercase mb-2">Analisis</h4>
		<TextAreaGroup label="Target Tahunan" name="iku" model="form.kinerja.targetTahunan" rows="2" />
		<TextAreaGroup label="Hambatan" name="hambat" model="form.kinerja.hambatan" rows="2" />
		<TextAreaGroup label="Solusi" name="solusi" model="form.kinerja.solusi" rows="2" />
	</div>
</div>```

---

## src/components/forms/FormAkademik.astro

```astro
---
import InputGroup from "../InputGroup.astro";
import SelectGroup from "./SelectGroup.astro";
---

<div class="space-y-4 animate-fade-in">
	<SelectGroup
		label="Kurikulum"
		name="kur"
		model="form.akademik.kurikulum"
		options={[
			{ val: "Kurikulum Merdeka", label: "Kurikulum Merdeka" },
			{ val: "Kurikulum 2013", label: "Kurikulum 2013" },
		]}
	/>
	<div class="grid grid-cols-2 gap-3">
		<InputGroup label="Tahun Pelajaran" name="tapel" model="form.akademik.tahunPelajaran" />
		<SelectGroup
			label="Semester"
			name="sem"
			model="form.akademik.semester"
			options={[{ val: "Ganjil", label: "Ganjil" }, { val: "Genap", label: "Genap" }]}
		/>
	</div>
	<InputGroup label="Mata Pelajaran" name="mapel" model="form.akademik.mapel" />
	<InputGroup label="Kelas" name="kls" model="form.akademik.kelas" />
	<div class="grid grid-cols-2 gap-3">
		<InputGroup label="Jam Mengajar" name="jam" model="form.akademik.jamMengajar" type="number" />
		<InputGroup label="Jumlah Siswa" name="siswa" model="form.akademik.jumlahSiswa" type="number" />
	</div>
</div>```

---

## src/components/forms/TabNavigation.astro

```astro
<div class="flex overflow-x-auto gap-2 p-1 mb-6 bg-slate-950/50 rounded-xl border border-white/5 scrollbar-hide">
	<template x-for="tab in tabs" :key="tab.id">
		<button
			@click="activeTab = tab.id"
			:class="activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'"
			class="px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
			x-text="tab.label"></button>
	</template>
</div>```

---

## src/components/forms/FormInstansi.astro

```astro
---
import InputGroup from "../InputGroup.astro";
---

<div class="space-y-6 animate-fade-in pb-10">
	<div class="space-y-3">
		<h3 class="text-xs font-bold text-blue-400 uppercase border-b border-white/10 pb-1">Identitas Instansi</h3>
		<InputGroup label="Header 1" name="h1" model="form.instansi.header1" placeholder="KEMENTERIAN..." />
		<InputGroup label="Header 2" name="h2" model="form.instansi.header2" placeholder="KANTOR..." />
		<InputGroup label="Header 3" name="h3" model="form.instansi.header3" placeholder="MADRASAH..." />
		<InputGroup label="Alamat" name="addr" model="form.instansi.alamat" />
		<div class="grid grid-cols-2 gap-3">
			<InputGroup label="Website" name="web" model="form.instansi.website" />
			<InputGroup label="Email" name="mail" model="form.instansi.email" />
		</div>
	</div>
	<div class="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
		<div class="bg-slate-800 p-3 rounded text-center">
			<span class="text-xs text-slate-400 block mb-2">Logo Kiri</span>
			<input type="file" accept="image/*" @change="handleUpload($event, 'instansi.logoUtama')" class="w-full text-[10px]" />
		</div>
		<div class="bg-slate-800 p-3 rounded text-center">
			<span class="text-xs text-slate-400 block mb-2">Logo Kanan</span>
			<input type="file" accept="image/*" @change="handleUpload($event, 'instansi.logoInstansi')" class="w-full text-[10px]" />
		</div>
	</div>
	<div class="space-y-3 pt-4 border-t border-white/10">
		<InputGroup label="Titimangsa" name="titimangsa" model="form.instansi.titimangsa" />
		<div class="p-3 bg-white/5 rounded-lg border border-white/5">
			<InputGroup label="Nama Kepala" name="k_nama" model="form.instansi.kepala.nama" />
			<div class="grid grid-cols-2 gap-2 mt-2">
				<InputGroup label="NIP" name="k_nip" model="form.instansi.kepala.nip" />
				<InputGroup label="Pangkat" name="k_pgkt" model="form.instansi.kepala.pangkat" />
			</div>
		</div>
	</div>
</div>```

---

## src/components/forms/FormPegawai.astro

```astro
---
import InputGroup from "../InputGroup.astro";
import SelectGroup from "./SelectGroup.astro";
---

<div class="space-y-4 animate-fade-in pb-10">
	<h3 class="text-xs font-bold text-blue-400 uppercase border-b border-white/10 pb-1">Data Pegawai</h3>
	<InputGroup label="Nama Lengkap" name="nama" model="form.pegawai.nama" />
	<div class="grid grid-cols-2 gap-3">
		<InputGroup label="NIP" name="nip" model="form.pegawai.nip" />
		<InputGroup label="NUPTK / NIK" name="nuptk" model="form.pegawai.nuptk" />
	</div>
	<div class="grid grid-cols-2 gap-3">
		<SelectGroup
			label="Status"
			name="stts"
			model="form.pegawai.jenis"
			options={[
				{ val: "PNS", label: "PNS" },
				{ val: "PPPK", label: "PPPK" },
				{ val: "Honorer", label: "Honorer" },
				{ val: "Guru", label: "Guru" },
			]}
		/>
		<InputGroup label="Golongan" name="gol" model="form.pegawai.golongan" />
	</div>
	<InputGroup label="Jabatan" name="jab" model="form.pegawai.jabatan" />
	<InputGroup label="Unit Kerja" name="unit" model="form.pegawai.unitKerja" />
	<div class="grid grid-cols-2 gap-3">
		<InputGroup label="Masa Kerja (Tahun)" name="mkt" model="form.pegawai.masaKerjaTahun" type="number" />
		<InputGroup label="Masa Kerja (Bulan)" name="mkb" model="form.pegawai.masaKerjaBulan" type="number" />
	</div>
</div>```

---

## src/components/TextAreaGroup.astro

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
	<label for={name} class="text-xs font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors">
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
</div>```

---

## src/config/constants.ts

```typescript
export const API_KEYS = {
  gemini: import.meta.env.PUBLIC_GEMINI_API_KEY || "",
  claude: import.meta.env.PUBLIC_CLAUDE_API_KEY || "",
  gpt: import.meta.env.PUBLIC_OPENAI_API_KEY || "",
  groq: import.meta.env.PUBLIC_GROQ_API_KEY || "",
  together: import.meta.env.PUBLIC_TOGETHER_API_KEY || "",
  deepseek: import.meta.env.PUBLIC_DEEPSEEK_API_KEY || "",
};

export const MODEL_CONFIGS = {
  gemini: {
    model: "gemini-2.0-flash",
    maxTokens: 8000,
    temperature: 0.7,
  },
  claude: {
    model: "claude-3-sonnet-20240229",
    maxTokens: 4000,
    temperature: 0.7,
  },
  gpt: {
    model: "gpt-4o-mini",
    maxTokens: 4000,
    temperature: 0.7,
  },
  groq: {
    model: "llama-3.3-70b-versatile",
    maxTokens: 8000,
    temperature: 0.7,
  },
};
````

---

## src/env.d.ts

```typescript
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GEMINI_API_KEY: string;
  readonly PUBLIC_CLAUDE_API_KEY: string;
  readonly PUBLIC_OPENAI_API_KEY: string;
  readonly PUBLIC_GROQ_API_KEY: string;
  readonly PUBLIC_TOGETHER_API_KEY: string;
  readonly PUBLIC_DEEPSEEK_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## src/pages/register.astro

````astro
---
import Layout from "../layouts/Layout.astro";
---

<Layout title="Register - E-Kinerja">
  <div class="min-h-screen flex items-center justify-center bg-slate-900 px-4" x-data="registerApp">
    <div class="max-w-md w-full bg-slate-800 rounded-xl p-8 border border-white/10 shadow-2xl">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-white mb-2">Buat Akun</h1>
        <p class="text-slate-400 text-sm">Daftar untuk mulai membuat laporan</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Nama Lengkap</label>
          <input type="text" x-model="name" class="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Email</label>
          <input type="email" x-model="email" class="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Password</label>
          <input type="password" x-model="password" class="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" required minlength="8" />
        </div>

        <div x-show="error" class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm" x-text="error"></div>

        <button type="submit" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition disabled:opacity-50 flex justify-center items-center">
          <span x-show="!loading">Daftar</span>
          <svg x-show="loading" class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-slate-400">
        Sudah punya akun? <a href="/login" class="text-blue-400 hover:text-blue-300">Login disini</a>
      </div>
    </div>
  </div>
</Layout>

<script>
  import Alpine from 'alpinejs';
  import { register } from '../services/authService';

  document.addEventListener('alpine:init', () => {
    Alpine.data('registerApp', () => ({
      name: '',
      email: '',
      password: '',
      loading: false,
      error: '',

      async handleRegister() {
        this.loading = true;
        this.error = '';

        const result = await register({
          name: this.name,
          email: this.email,
          password: this.password
        });

        if (result.success) {
          window.location.href = '/';
        } else {
          this.error = result.error;
        }

        this.loading = false;
      }
    }));
  });
</script>```

---

## src/pages/login.astro

```astro
---
import Layout from "../layouts/Layout.astro";
---

<Layout title="Login - E-Kinerja">
  <div class="min-h-screen flex items-center justify-center bg-slate-900 px-4" x-data="loginApp">
    <div class="max-w-md w-full bg-slate-800 rounded-xl p-8 border border-white/10 shadow-2xl">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-white mb-2">E-Kinerja AI</h1>
        <p class="text-slate-400 text-sm">Masuk untuk mengelola laporan kinerja</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input type="email" x-model="email" class="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Password</label>
          <input type="password" x-model="password" class="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
        </div>

        <div x-show="error" class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm" x-text="error"></div>

        <button type="submit" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition disabled:opacity-50 flex justify-center items-center">
          <span x-show="!loading">Masuk</span>
          <svg x-show="loading" class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-slate-400">
        Belum punya akun? <a href="/register" class="text-blue-400 hover:text-blue-300">Daftar sekarang</a>
      </div>
    </div>
  </div>
</Layout>

<script>
  import Alpine from 'alpinejs';
  import { login } from '../services/authService';

  document.addEventListener('alpine:init', () => {
    Alpine.data('loginApp', () => ({
      email: '',
      password: '',
      loading: false,
      error: '',

      async handleLogin() {
        this.loading = true;
        this.error = '';

        const result = await login({ email: this.email, password: this.password });

        if (result.success) {
          window.location.href = '/';
        } else {
          this.error = result.error;
        }

        this.loading = false;
      }
    }));
  });
</script>```

---

## src/pages/index.astro

```astro
---
import Layout from "../layouts/Layout.astro";
import FormInstansi from "../components/forms/FormInstansi.astro";
import FormPegawai from "../components/forms/FormPegawai.astro";
import FormAkademik from "../components/forms/FormAkademik.astro";
import FormKinerja from "../components/forms/FormKinerja.astro";
import SelectGroup from "../components/forms/SelectGroup.astro";
import InputGroup from "../components/InputGroup.astro";
import ToastContainer from "../components/ui/ToastContainer.astro";
import AutoSaveIndicator from "../components/ui/AutoSaveIndicator.astro";
import KeyboardShortcuts from "../components/ui/KeyboardShortcuts.astro";
import ZoomControl from "../components/ui/ZoomControl.astro";
import ProgressBar from "../components/ui/ProgressBar.astro";
import DocumentStats from "../components/ui/DocumentStats.astro";
import { Bot, Download, FileText, Save, History, Printer, RefreshCw, LogOut } from "@lucide/astro";
---

<Layout title="Generator Laporan Kinerja Pegawai AI">
  <!-- UI Components -->
  <ToastContainer />
  <AutoSaveIndicator />
  <KeyboardShortcuts />
  <ZoomControl />
  <ProgressBar />
  <DocumentStats />

  <main class="w-full min-h-screen flex flex-col bg-[#0f172a]" x-data="appCore">
    <!-- Header -->
    <header class="h-16 border-b border-white/10 bg-slate-900/90 backdrop-blur flex items-center justify-between px-6 fixed top-0 w-full z-40 no-print">
      <div class="flex items-center gap-3">
        <div class="bg-blue-600 p-2 rounded-lg"><Bot class="text-white w-5 h-5" /></div>
        <h1 class="text-sm font-bold text-white">E-KINERJA AI</h1>
      </div>
      <div class="flex items-center gap-2">
        <button @click="downloadTemplate" class="btn-icon"><Download class="w-3.5 h-3.5" /> Template</button>
        <label class="btn-icon cursor-pointer">
          Import <input type="file" class="hidden" accept=".xlsx" @change="handleImportExcel" />
        </label>
        <button @click="exportPDF" class="btn-icon text-red-400 border-red-500/30 bg-red-600/20"><FileText class="w-3.5 h-3.5" /> PDF</button>
        <button @click="exportDOCX" class="btn-icon text-blue-400 border-blue-500/30 bg-blue-600/20"><FileText class="w-3.5 h-3.5" /> DOCX</button>
        <button @click="saveDraft" class="text-slate-400 hover:text-white" title="Simpan Draft"><Save class="w-5 h-5" /></button>
        <button @click="toggleHistory" class="text-slate-400 hover:text-white" title="Riwayat"><History class="w-5 h-5" /></button>
        <div class="w-px h-6 bg-white/10 mx-2"></div>
        <button @click="handleLogout" class="text-red-400 hover:text-red-300" title="Logout"><LogOut class="w-5 h-5" /></button>
      </div>
    </header>

    <div class="flex-1 mt-16 flex overflow-hidden h-[calc(100vh-64px)]">
      <!-- Sidebar Form -->
      <aside class="w-[420px] flex flex-col border-r border-white/10 bg-slate-900 overflow-hidden no-print z-30">
        <div class="p-4 bg-slate-800/50 border-b border-white/5 space-y-3">
          <div class="grid grid-cols-2 gap-2">
            <SelectGroup label="Bulan" name="bln" model="form.config.bulan" options={Array.from({length: 12}, (_, i) => ({val: String(i+1), label: String(i+1)}))} />
            <InputGroup label="Tahun" name="thn" model="form.config.tahun" type="number" />
          </div>
          <!-- Model list disesuaikan dengan backend -->
          <SelectGroup label="Model AI" name="ai" model="form.config.modelAI"
            options={[
              {val: "gemini", label: "Gemini 2.0 (Fast)"},
              {val: "groq", label: "Groq Llama 3 (Ultra Fast)"},
              {val: "claude", label: "Claude Sonnet (Smart)"},
              {val: "gpt", label: "GPT-4o Mini"},
              {val: "deepseek", label: "DeepSeek (Economical)"},
              {val: "together", label: "Together AI"}
            ]}
          />
          <InputGroup label="Token Limit" name="tkn" model="form.config.tokenLimit" type="number" />
        </div>

        <div class="flex border-b border-white/5 bg-slate-950/30">
          <template x-for="tab in tabs" :key="tab.id">
            <button @click="activeTab = tab.id" :class="activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400 bg-white/5' : 'text-slate-500 hover:text-white'" class="flex-1 py-3 text-xs font-medium transition text-center" x-text="tab.label"></button>
          </template>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
          <div x-show="activeTab === 'instansi'"><FormInstansi /></div>
          <div x-show="activeTab === 'pegawai'"><FormPegawai /></div>
          <div x-show="activeTab === 'akademik'"><FormAkademik /></div>
          <div x-show="activeTab === 'kinerja'"><FormKinerja /></div>
        </div>

        <div class="p-4 border-t border-white/10 bg-slate-900 z-50">
          <button @click="generateLaporan" :disabled="loading" class="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold text-sm flex justify-center items-center gap-2 transition disabled:opacity-50">
            <RefreshCw :class="loading && 'animate-spin'" class="w-4 h-4" /> GENERATE & SAVE
          </button>
        </div>
      </aside>

      <!-- Document Preview -->
      <section class="flex-1 bg-slate-200 overflow-y-auto relative flex flex-col items-center py-10 print:p-0 print:bg-white custom-scrollbar">
        <div class="fixed top-24 right-8 z-20 flex flex-col gap-3 no-print">
          <button @click="printDoc" class="p-3 bg-slate-800 text-white rounded-full shadow-xl hover:bg-slate-700"><Printer class="w-6 h-6" /></button>
        </div>

        <div id="document-preview" class="w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none p-[2cm] text-black relative origin-top transition-transform duration-300">
          <!-- Kop Surat -->
          <header class="mb-6 pb-2 border-b-4 border-black">
            <div class="grid grid-cols-[80px_1fr_80px] gap-4 items-center mb-2">
              <div class="h-20 flex items-center justify-center">
                <template x-if="form.instansi.logoUtama"><img :src="form.instansi.logoUtama" class="max-w-full max-h-full object-contain" /></template>
              </div>
              <div class="text-center">
                <h3 class="font-bold text-[13px] uppercase" x-text="form.instansi.header1"></h3>
                <h2 class="font-bold text-[13px] uppercase" x-text="form.instansi.header2"></h2>
                <h1 class="font-bold text-[15px] uppercase" x-text="form.instansi.header3"></h1>
                <p class="text-[11px]" x-text="form.instansi.alamat"></p>
              </div>
              <div class="h-20 flex items-center justify-center">
                <template x-if="form.instansi.logoInstansi"><img :src="form.instansi.logoInstansi" class="max-w-full max-h-full object-contain" /></template>
              </div>
            </div>
          </header>

          <div class="text-center mb-8">
            <h2 class="font-bold uppercase text-lg">LAPORAN KINERJA PEGAWAI</h2>
            <p class="text-sm font-medium mt-1">Periode: <span x-text="form.config.bulan + '/' + form.config.tahun"></span></p>
            <p class="text-xs mt-1 text-gray-500" x-show="form.output.tte.nomorDokumen">No. Dok: <span x-text="form.output.tte.nomorDokumen"></span></p>
          </div>

          <div x-show="!form.output.content" class="text-center py-20 text-gray-400">
            <p>Konten laporan akan muncul di sini setelah di-generate.</p>
          </div>

          <article class="prose-report text-justify leading-relaxed font-serif" x-html="renderedHTML"></article>

          <div class="mt-12 flex justify-end break-inside-avoid">
            <div class="text-center w-64">
              <p class="mb-1"><span x-text="form.instansi.titimangsa"></span>, <span x-text="getCurrentDate()"></span></p>
              <p class="font-bold mb-16">Pejabat Penilai,</p>
              <p class="font-bold underline uppercase text-sm" x-text="form.instansi.kepala.nama"></p>
              <p class="text-sm">NIP. <span x-text="form.instansi.kepala.nip"></span></p>
            </div>
          </div>
        </div>
        <div class="h-20 w-full"></div>
      </section>
    </div>

    <!-- History Sidebar -->
    <div x-show="showHistory" @click.away="showHistory = false"
      x-transition:enter="transition ease-out duration-300" x-transition:enter-start="translate-x-full" x-transition:enter-end="translate-x-0"
      class="fixed right-0 top-16 bottom-0 w-80 bg-slate-900 border-l border-white/10 z-30 overflow-y-auto no-print shadow-2xl p-4">

      <div class="flex justify-between items-center mb-4">
        <h3 class="text-white font-bold flex items-center gap-2"><History class="w-4 h-4" /> Riwayat Cloud</h3>
        <button @click="refreshHistory" class="text-xs text-blue-400 hover:text-blue-300">Refresh</button>
      </div>

      <div class="space-y-2">
        <template x-if="historyItems.length === 0">
          <div class="text-center text-slate-500 text-xs py-4">Belum ada riwayat</div>
        </template>
        <template x-for="item in historyItems" :key="item.id">
          <div class="p-3 rounded-lg bg-white/5 hover:border-white/20 border border-transparent transition group">
            <div class="flex justify-between items-start mb-1">
              <span class="text-[10px] text-blue-400" x-text="formatDate(item.date)"></span>
              <button @click="deleteItem(item.id)" class="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition">✕</button>
            </div>
            <div class="text-sm font-medium text-slate-200 mb-2 truncate" x-text="item.title"></div>
            <div class="flex justify-between items-center">
               <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400" x-text="item.status || 'DRAFT'"></span>
               <button @click="loadItem(item.id)" class="text-xs text-blue-400 hover:text-blue-300">Buka</button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</Layout>

<style>
  @reference "../styles/global.css";
  .btn-icon {
    @apply px-3 py-1.5 bg-slate-800 rounded-md text-xs flex gap-2 items-center border border-slate-700 hover:bg-slate-700 transition text-slate-300 cursor-pointer;
  }
</style>

<script>
  import { reportStore, historyStore, validateBeforeGenerate } from "../stores/reportStore";
  import { generateLaporan } from "../services/aiService";
  import { importFromExcel, downloadTemplate } from "../services/excelService";
  import { exportToPDF, exportToDOCX, printDocument } from "../services/exportService";
  import { logout } from "../services/authService";
  import { uploadFile } from "../services/fileService";
  import { fetchPegawaiProfile, savePegawaiProfile } from "../services/pegawaiService";
  import { fetchHistory, loadReportDetail, deleteReport } from "../services/historyService";
  import { parseMarkdown } from "../utils/markdown";
  import { addToast } from "../stores/toastStore";

  document.addEventListener("alpine:init", () => {
    Alpine.data("appCore", () => ({
      tabs: [{id: "instansi", label: "1. Instansi"}, {id: "pegawai", label: "2. Pegawai"}, {id: "akademik", label: "3. Akademik"}, {id: "kinerja", label: "4. Kinerja"}],
      activeTab: "pegawai",
      form: reportStore.get(),
      loading: false,
      renderedHTML: "",
      showHistory: false,
      historyItems: [],

      async init() {
        // 1. Render konten jika ada di local state
        if (this.form.output.content) {
            this.renderedHTML = await parseMarkdown(this.form.output.content);
        }

        // 2. Ambil Profil Pegawai dari Backend
        await fetchPegawaiProfile();
        this.form = reportStore.get(); // Refresh UI

        // 3. Ambil Riwayat dari Backend
        await this.refreshHistory();

        // 4. Subscribe ke perubahan store history
        historyStore.subscribe((val) => { this.historyItems = val.items; });

        // 5. Setup Autosave ke Store Lokal (UI responsiveness)
        let timeout;
        this.$watch("form", (val) => {
          clearTimeout(timeout);
          window.dispatchEvent(new CustomEvent("autosave:start"));
          timeout = setTimeout(() => {
            reportStore.set(JSON.parse(JSON.stringify(val)));
            window.dispatchEvent(new CustomEvent("autosave:success"));
          }, 800);
        });

        this.registerShortcuts();
      },

      registerShortcuts() {
        window.addEventListener("shortcut:generate", () => this.generateLaporan());
        window.addEventListener("shortcut:save", () => this.saveDraft());
        window.addEventListener("shortcut:export-pdf", () => this.exportPDF());
      },

      async generateLaporan() {
        const validation = validateBeforeGenerate(this.form);
        if (!validation.valid) {
            addToast("Data belum lengkap: " + validation.errors[0], "error");
            return;
        }

        this.loading = true;
        window.dispatchEvent(new CustomEvent("generate:start"));

        try {
          const result = await generateLaporan();

          if (result.success && result.content) {
            this.renderedHTML = await parseMarkdown(result.content);
            this.form = reportStore.get(); // Refresh UI dengan hasil terbaru
            window.dispatchEvent(new CustomEvent("generate:complete"));
            addToast(`Sukses! ${result.tokensUsed} token digunakan.`, "success");
            await this.refreshHistory(); // Refresh list riwayat
          } else {
            addToast(result.error || "Gagal generate laporan", "error");
            window.dispatchEvent(new CustomEvent("generate:error"));
          }
        } catch (error) {
          window.dispatchEvent(new CustomEvent("generate:error"));
          addToast("Terjadi kesalahan sistem", "error");
        } finally {
          this.loading = false;
        }
      },

      // Upload Handler (General)
      async handleUpload(event, field) {
        const file = event.target.files?.[0];
        if (file) {
          addToast("Mengupload...", "info");
          const category = field.includes('instansi') ? 'LOGO_INSTANSI' : 'FOTO_PEGAWAI';
          const result = await uploadFile(file, category);

          if(result.success) {
            // Update deep nested property
            const path = field.split(".");
            let target = this.form;
            for (let i = 0; i < path.length - 1; i++) target = target[path[i]];
            target[path[path.length - 1]] = result.url;

            // Trigger update store
            reportStore.set({...this.form});
            addToast("Upload berhasil", "success");
          } else {
            addToast("Upload gagal: " + result.error, "error");
          }
        }
      },

      async handleImportExcel(event) {
        const file = event.target.files?.[0];
        if (file) {
          await importFromExcel(file);
          this.form = reportStore.get();
          addToast("Data diimport dari Excel", "success");
        }
      },

      async saveDraft() {
        // Simpan hanya profil pegawai ke backend sebagai draft dasar
        const result = await savePegawaiProfile();
        if(result.success) {
            addToast("Profil pegawai tersimpan di server", "success");
        } else {
            addToast("Gagal menyimpan: " + result.error, "error");
        }
      },

      async refreshHistory() {
        await fetchHistory();
      },

      async loadItem(id) {
        if(confirm("Buka laporan ini? Data yang belum disimpan di editor akan tertimpa.")) {
            const success = await loadReportDetail(id);
            if(success) {
                this.form = reportStore.get();
                if(this.form.output.content) {
                    this.renderedHTML = await parseMarkdown(this.form.output.content);
                }
                this.showHistory = false;
                addToast("Laporan dimuat", "success");
            } else {
                addToast("Gagal memuat laporan", "error");
            }
        }
      },

      async deleteItem(id) {
        if(confirm("Hapus laporan ini secara permanen?")) {
            const success = await deleteReport(id);
            if(success) addToast("Laporan dihapus", "success");
            else addToast("Gagal menghapus", "error");
        }
      },

      handleLogout() { logout(); },
      downloadTemplate() { downloadTemplate(); },
      exportPDF() { exportToPDF(); },
      exportDOCX() { exportToDOCX(); },
      printDoc() { printDocument(); },
      toggleHistory() { this.showHistory = !this.showHistory; },

      getCurrentDate() {
        return new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
      },

      formatDate(isoString) {
        if(!isoString) return '-';
        return new Date(isoString).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: '2-digit' });
      }
    }));
  });
</script>```

---

## src/styles/global.css

```css
@import "tailwindcss";

:root {
  --color-blue-600: #2563eb;
  --color-emerald-500: #10b981;
  --color-red-500: #ef4444;
}

@theme {
  --color-blue-600: #2563eb;
  --color-emerald-500: #10b981;
  --color-red-500: #ef4444;
  --font-sans: "Lexend", system-ui, sans-serif;
}

@layer base {
  body {
    @apply bg-slate-900 text-slate-100 min-h-screen;
    background-image:
      radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.15) 0px, transparent 50%),
      radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.15) 0px, transparent 50%);
  }
}

@layer components {
  .glass-panel {
    @apply bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
}

@layer utilities {
  .prose-report {
    font-family: "Times New Roman", Times, serif;
    color: #000000 !important;
    line-height: 1.4;
    font-size: 12pt;
  }
  .prose-report table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.8rem 0;
    font-size: 11pt;
  }
  .prose-report th,
  .prose-report td {
    border: 1px solid #000000;
    padding: 4px 6px;
    vertical-align: top;
  }
  .prose-report th {
    background-color: #e5e7eb !important;
    font-weight: bold;
    text-align: center;
    print-color-adjust: exact;
  }
  .prose-report h1,
  .prose-report h2,
  .prose-report h3 {
    color: #000000 !important;
    font-weight: bold;
    margin-top: 1.2rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
}

@media print {
  @page {
    margin: 1.5cm 2cm 1.5cm 2cm;
    size: A4 portrait;
  }
  body {
    background: white !important;
    color: black !important;
    visibility: hidden;
  }
  #document-preview {
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    box-shadow: none !important;
    transform: none !important;
  }
  img {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
````

---

## src/types/ReportTypes.ts

```typescript
export interface ReportDTO {
  id?: string;
  modelAI: string;
  bulan: number;
  tahun: number;
  tugasPokok: string;
  tugasTambahan?: string;
  targetTahunan?: string;
  hambatan?: string;
  solusi?: string;
  tokenLimit?: number;
  customInstruction?: string;
}

export interface PegawaiDTO {
  nama: string;
  nip: string;
  nuptk?: string;
  nik?: string;
  jenisPegawai: string;
  statusPegawai: string;
  golongan?: string;
  jabatan: string;
  unitKerja: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  gender: "L" | "P";
  alamat?: string;
  hp?: string;
  email?: string;
  pendidikan?: string;
  masaKerjaTahun?: number;
  masaKerjaBulan?: number;
  fotoPegawai?: string;
}

export interface Pejabat {
  nama: string;
  nip: string;
  pangkat: string;
  ttd: string;
}

export interface InstansiData {
  logoUtama: string;
  logoInstitusi: string;
  logoInstansi: string;
  header1: string;
  header2: string;
  header3: string;
  alamat: string;
  telepon: string;
  email: string;
  website: string;
  kepala: Pejabat;
  kepalaTu: Pejabat;
  titimangsa: string;
}

export interface PegawaiData {
  nama: string;
  nip: string;
  nuptk: string;
  nik: string;
  jenis: "PNS" | "PPPK" | "Honorer" | "GTT" | "PTT" | "Guru";
  status: "Aktif" | "Cuti" | "Tugas Belajar";
  golongan: string;
  jabatan: string;
  unitKerja: string;
  tempatLahir: string;
  tanggalLahir: string;
  gender: "L" | "P";
  alamat: string;
  hp: string;
  email: string;
  fotoPegawai: string;
  pendidikan: string;
  masaKerjaTahun: string;
  masaKerjaBulan: string;
}

export interface AkademikData {
  kurikulum: "Kurikulum 2013" | "Kurikulum Merdeka" | "KTSP";
  tahunPelajaran: string;
  semester: "Ganjil" | "Genap";
  mapel: string;
  kelas: string;
  jamMengajar: string;
  jumlahSiswa: string;
  ekskul: string;
}

export interface KinerjaData {
  tugasPokok: string;
  tugasTambahan: string;
  targetTahunan: string;
  targetKuantitatif: string;
  targetKualitatif: string;
  hambatan: string;
  solusi: string;
}

export interface ConfigData {
  bulan: string;
  tahun: string;
  modelAI: "gemini" | "claude" | "gpt" | "groq" | "together" | "deepseek";
  tokenLimit: number;
  customInstruction: string;
}

export interface TTEData {
  qrCode: string;
  nomorDokumen: string;
  hashDokumen: string;
  timestamp: string;
  statusValidasi: "Valid" | "Invalid" | "Expired";
}

export interface OutputData {
  titimangsa: {
    tempat: string;
    tanggal: string;
    bahasa: "Indonesia" | "Inggris";
  };
  tte: TTEData;
  content: string;
  lastUpdated: string;
}

export interface AppStore {
  instansi: InstansiData;
  pegawai: PegawaiData;
  akademik: AkademikData;
  kinerja: KinerjaData;
  config: ConfigData;
  output: OutputData;
}

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  data: AppStore;
}

export interface HistoryStore {
  items: HistoryItem[];
}

export interface GenerateAIResult {
  success: boolean;
  content?: string;
  tokensUsed?: number;
  error?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ImportExcelResult {
  success: boolean;
  data?: AppStore;
  errors?: ValidationError[];
}

export interface ExportResult {
  success: boolean;
  file?: Blob;
  error?: string;
}
export * from "./ReportTypes";
```

---

## src/stores/reportStore.ts

```typescript
import { persistentMap } from "@nanostores/persistent";
import type { AppStore, HistoryStore, HistoryItem } from "../types/ReportTypes";

const defaultState: AppStore = {
  instansi: {
    logoUtama: "",
    logoInstitusi: "",
    logoInstansi: "",
    header1: "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
    header2: "KANTOR KABUPATEN PANDEGLANG",
    header3: "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
    alamat: "Jl. Raya Labuan Km. 5,7 Pandeglang - Banten 42253",
    telepon: "(0253) 201000",
    email: "mtsn1pandeglang@kemenag.go.id",
    website: "mtsn1pandeglang.sch.id",
    kepala: {
      nama: "",
      nip: "",
      pangkat: "Pembina/IV-a",
      ttd: "",
    },
    kepalaTu: {
      nama: "",
      nip: "",
      pangkat: "Penata/III-c",
      ttd: "",
    },
    titimangsa: "Pandeglang",
  },
  pegawai: {
    nama: "",
    nip: "",
    nuptk: "",
    nik: "",
    jenis: "PNS",
    status: "Aktif",
    golongan: "III/a",
    jabatan: "Guru Ahli Pertama",
    unitKerja: "MTsN 1 Pandeglang",
    tempatLahir: "Pandeglang",
    tanggalLahir: "1990-01-01",
    gender: "L",
    alamat: "",
    hp: "",
    email: "",
    fotoPegawai: "",
    pendidikan: "S1 Pendidikan",
    masaKerjaTahun: "5",
    masaKerjaBulan: "0",
  },
  akademik: {
    kurikulum: "Kurikulum Merdeka",
    tahunPelajaran: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
    semester: "Ganjil",
    mapel: "",
    kelas: "",
    jamMengajar: "24",
    jumlahSiswa: "32",
    ekskul: "",
  },
  kinerja: {
    tugasPokok: "Merencanakan, melaksanakan, dan mengevaluasi pembelajaran.",
    tugasTambahan: "Wali Kelas, Piket Harian",
    targetTahunan: "Meningkatkan ketuntasan belajar siswa minimal 85%",
    targetKuantitatif: "Laporan Kinerja Bulanan, Perangkat Pembelajaran",
    targetKualitatif: "Tercapainya standar kompetensi lulusan",
    hambatan: "",
    solusi: "",
  },
  config: {
    bulan: (new Date().getMonth() + 1).toString(),
    tahun: new Date().getFullYear().toString(),
    modelAI: "gemini",
    tokenLimit: 2000,
    customInstruction: "",
  },
  output: {
    titimangsa: {
      tempat: "Pandeglang",
      tanggal: "",
      bahasa: "Indonesia",
    },
    tte: {
      qrCode: "",
      nomorDokumen: "",
      hashDokumen: "",
      timestamp: "",
      statusValidasi: "Valid",
    },
    content: "",
    lastUpdated: "",
  },
};

export const reportStore = persistentMap<AppStore>(
  "ekinerja-app-v1:",
  defaultState,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export const historyStore = persistentMap<HistoryStore>(
  "ekinerja-history:",
  { items: [] },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export const updateStore = <K extends keyof AppStore>(
  key: K,
  value: AppStore[K],
) => {
  const current = reportStore.get();
  reportStore.set({ ...current, [key]: value });
};

export const saveToHistory = (title?: string) => {
  const current = reportStore.get();
  const history = historyStore.get();
  const id = `history_${Date.now()}`;
  const date = new Date().toISOString();

  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const autoTitle =
    title ||
    `Laporan ${current.pegawai.nama || "Tanpa Nama"} - ${namaBulan[parseInt(current.config.bulan) - 1] || ""} ${current.config.tahun}`;

  const newItem: HistoryItem = {
    id,
    title: autoTitle,
    date,
    data: JSON.parse(JSON.stringify(current)),
  };

  const updatedHistory = {
    items: [newItem, ...history.items].slice(0, 20),
  };

  historyStore.set(updatedHistory);
  return id;
};

export const loadFromHistory = (id: string) => {
  const history = historyStore.get();
  const item = history.items.find((i) => i.id === id);
  if (item) {
    reportStore.set(JSON.parse(JSON.stringify(item.data)));
    return true;
  }
  return false;
};

export const deleteHistory = (id: string) => {
  const history = historyStore.get();
  const updatedHistory = {
    items: history.items.filter((i) => i.id !== id),
  };
  historyStore.set(updatedHistory);
};

export const validateBeforeGenerate = (
  data: AppStore,
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!data.pegawai.nama) errors.push("Nama pegawai harus diisi");
  if (!data.pegawai.nip) errors.push("NIP harus diisi");
  if (!data.pegawai.jabatan) errors.push("Jabatan harus diisi");
  if (!data.config.bulan) errors.push("Bulan laporan harus dipilih");
  if (!data.config.tahun) errors.push("Tahun laporan harus diisi");
  return { valid: errors.length === 0, errors };
};

export const generateNomorDokumen = (): string => {
  const current = reportStore.get();
  const tahun = current.config.tahun;
  const bulan = current.config.bulan.padStart(2, "0");
  const random = Math.floor(Math.random() * 999) + 1;
  const nomorUrut = random.toString().padStart(3, "0");
  return `${nomorUrut}/LPKP/${bulan}/${tahun}`;
};
```

---

## src/stores/authStore.ts

```typescript
import { persistentMap } from "@nanostores/persistent";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthState {
  token: string;
  refreshToken: string;
  user: User | null;
  isAuthenticated: boolean;
}

export const authStore = persistentMap<AuthState>(
  "ekinerja-auth:",
  {
    token: "",
    refreshToken: "",
    user: null,
    isAuthenticated: false,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);
```

---

## src/stores/toastStore.ts

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

## src/utils/api.ts

```typescript
import axios from "axios";
import { getToken, logout } from "../services/authService";

const BASE_URL =
  import.meta.env.PUBLIC_API_URL || "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[API Error]", error.response?.data || error.message);
    if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  },
);

export default api;
```

---

## src/utils/helpers.ts

```typescript
export const generateHash = async (text: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const sanitizeFilename = (name: string): string => {
  return name
    .replace(/[^a-zA-Z0-9_\-]/g, "_")
    .replace(/_+/g, "_")
    .substring(0, 50);
};

export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
```

---

## src/utils/markdown.ts

```typescript
import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: false,
  mangle: false,
});

export const parseMarkdown = async (text: string): Promise<string> => {
  if (!text) return "";
  const renderer = new marked.Renderer();

  renderer.table = (header: string, body: string) => {
    return `<table class="report-table"><thead>${header}</thead><tbody>${body}</tbody></table>`;
  };

  renderer.heading = (text: string, level: number) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
    return `<h${level} id="${escapedText}" class="heading-${level}">${text}</h${level}>`;
  };

  marked.use({ renderer });
  const html = await marked.parse(text);

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "blockquote",
      "code",
      "pre",
      "a",
      "img",
      "div",
      "span",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id"],
  });
};
```

---

## src/layouts/Layout.astro

````astro
---
import "../styles/global.css";
interface Props {
	title: string;
}
const { title } = Astro.props;
---

<!doctype html>
<html lang="id" class="dark scroll-smooth">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<title>{title}</title>
		<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
	</head>
	<body class="bg-slate-900 text-slate-100 min-h-screen font-sans antialiased">
		<slot />
        <script>
            import { checkAuth } from "../services/authService";
            const path = window.location.pathname;
            const publicPages = ['/login', '/register'];

            if (!publicPages.includes(path) && !checkAuth()) {
                window.location.href = '/login';
            }
        </script>
	</body>
</html>```

---

## src/services/excelService.ts

```typescript
import * as XLSX from "xlsx";
import { reportStore } from "../stores/reportStore";

export const downloadTemplate = () => {
  const ws = XLSX.utils.json_to_sheet([
    {
      "Nama Lengkap": "Ahmad Dahlan",
      NIP: "1985...",
      Jabatan: "Guru",
      "Tugas Pokok": "Mengajar...",
    },
  ]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, "Template_Ekinerja.xlsx");
};

export const importFromExcel = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (jsonData.length > 0) {
          const row: any = jsonData[0];
          const current = reportStore.get();
          reportStore.set({
            ...current,
            pegawai: {
              ...current.pegawai,
              nama: row["Nama Lengkap"] || current.pegawai.nama,
              nip: String(row["NIP"] || current.pegawai.nip),
              jabatan: row["Jabatan"] || current.pegawai.jabatan,
            },
            kinerja: {
              ...current.kinerja,
              tugasPokok: row["Tugas Pokok"] || current.kinerja.tugasPokok,
            },
          });
        }
        resolve(true);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};
````

---

## src/services/fileService.ts

```typescript
import api from "../utils/api";

export const uploadFile = async (file: File, category: string = "OTHER") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);

  try {
    const response = await api.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      success: true,
      url: `${import.meta.env.PUBLIC_API_URL}${response.data.url}`,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Upload failed",
    };
  }
};
```

---

## src/services/exportService.ts

```typescript
import { reportStore } from "../stores/reportStore";
import { sanitizeFilename } from "../utils/helpers";

export const exportToPDF = async () => {
  try {
    const element = document.getElementById("document-preview");
    if (!element) throw new Error("Preview not found");

    const html2pdf = (await import("html2pdf.js")).default;
    const store = reportStore.get();

    const opt = {
      margin: [1.5, 2, 1.5, 2],
      filename: `Laporan_${sanitizeFilename(store.pegawai.nama)}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
    };

    await html2pdf().set(opt).from(element).save();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const exportToDOCX = async () => {
  try {
    const store = reportStore.get();
    const { Document, Packer, Paragraph, TextRun } = await import("docx");
    const { saveAs } = await import("file-saver");

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({ children: [new TextRun(store.instansi.header1)] }),
            new Paragraph({ text: store.output.content }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Laporan_${sanitizeFilename(store.pegawai.nama)}.docx`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const printDocument = () => {
  window.print();
};
```

---

## src/services/authService.ts

```typescript
import api from "../utils/api";
import { authStore } from "../stores/authStore";
import type { LoginDto, RegisterDto } from "../types/AuthTypes";

export const login = async (dto: LoginDto) => {
  try {
    const response = await api.post("/auth/login", dto);
    const { accessToken, refreshToken, user } = response.data;

    authStore.set({
      token: accessToken,
      refreshToken,
      user,
      isAuthenticated: true,
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
};

export const register = async (dto: RegisterDto) => {
  try {
    const response = await api.post("/auth/register", dto);
    const { accessToken, refreshToken, user } = response.data;

    authStore.set({
      token: accessToken,
      refreshToken,
      user,
      isAuthenticated: true,
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed",
    };
  }
};

export const logout = () => {
  authStore.set({
    token: "",
    refreshToken: "",
    user: null,
    isAuthenticated: false,
  });
  window.location.href = "/login";
};

export const getToken = () => {
  return authStore.get().token;
};

export const checkAuth = () => {
  return authStore.get().isAuthenticated;
};
```

---

## src/services/pegawaiService.ts

```typescript
import api from "../utils/api";
import { reportStore, updateStore } from "../stores/reportStore";
import type { PegawaiDTO } from "../types/ReportTypes";

// Ambil data pegawai saat login
export const fetchPegawaiProfile = async () => {
  try {
    const response = await api.get("/pegawai/me");
    const data = response.data;

    if (data) {
      // Mapping dari Backend DB ke Frontend Store
      updateStore("pegawai", {
        nama: data.nama,
        nip: data.nip,
        nuptk: data.nuptk || "",
        nik: data.nik || "",
        jenis: data.jenisPegawai,
        status: data.statusPegawai,
        golongan: data.golongan || "",
        jabatan: data.jabatan,
        unitKerja: data.unitKerja,
        tempatLahir: data.tempatLahir || "",
        tanggalLahir: data.tanggalLahir ? data.tanggalLahir.split("T")[0] : "",
        gender: data.gender,
        alamat: data.alamat || "",
        hp: data.hp || "",
        email: data.email || "",
        fotoPegawai: data.fotoPegawai || "",
        pendidikan: data.pendidikan || "",
        masaKerjaTahun: String(data.masaKerjaTahun || 0),
        masaKerjaBulan: String(data.masaKerjaBulan || 0),
      });
      return true;
    }
  } catch (error) {
    console.warn("Belum ada data pegawai:", error);
    return false;
  }
};

// Simpan/Update data pegawai
export const savePegawaiProfile = async () => {
  const store = reportStore.get();

  const payload: PegawaiDTO = {
    nama: store.pegawai.nama,
    nip: store.pegawai.nip,
    nuptk: store.pegawai.nuptk,
    nik: store.pegawai.nik,
    jenisPegawai: store.pegawai.jenis,
    statusPegawai: store.pegawai.status as any, // Sesuaikan enum
    golongan: store.pegawai.golongan,
    jabatan: store.pegawai.jabatan,
    unitKerja: store.pegawai.unitKerja,
    tempatLahir: store.pegawai.tempatLahir,
    tanggalLahir: store.pegawai.tanggalLahir
      ? new Date(store.pegawai.tanggalLahir).toISOString()
      : undefined,
    gender: store.pegawai.gender,
    alamat: store.pegawai.alamat,
    hp: store.pegawai.hp,
    email: store.pegawai.email,
    pendidikan: store.pegawai.pendidikan,
    masaKerjaTahun: parseInt(store.pegawai.masaKerjaTahun),
    masaKerjaBulan: parseInt(store.pegawai.masaKerjaBulan),
    fotoPegawai: store.pegawai.fotoPegawai,
  };

  try {
    // Cek dulu apakah create atau update
    // Strategi simpel: Coba Create, jika error 400 (sudah ada), lakukan Update
    // Tapi karena kita tidak simpan ID pegawai di store, kita coba fetch dulu atau try-catch

    // Coba Update via endpoint PATCH (biasanya butuh ID, tapi kita pakai logic user-bound)
    // Di backend PegawaiController, update butuh ID.
    // Kita cek dulu endpoint getMe untuk dapat ID.

    const check = await api.get("/pegawai/me").catch(() => null);

    if (check && check.data) {
      await api.patch(`/pegawai/${check.data.id}`, payload);
    } else {
      await api.post("/pegawai", payload);
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal menyimpan data pegawai",
    };
  }
};
```

---

## src/services/aiService.ts

```typescript
import api from "../utils/api";
import { reportStore, updateStore } from "../stores/reportStore";
import { savePegawaiProfile } from "./pegawaiService";
import type { GenerateAIResult, ReportDTO } from "../types/ReportTypes";

export const generateLaporan = async (): Promise<GenerateAIResult> => {
  const store = reportStore.get();

  // 1. Simpan Data Pegawai Terlebih Dahulu (Wajib agar backend bisa generate)
  const profileSave = await savePegawaiProfile();
  if (!profileSave.success) {
    return {
      success: false,
      error: `Gagal menyimpan profil: ${profileSave.error}`,
    };
  }

  // 2. Siapkan Payload untuk ReportsService
  const payload: ReportDTO = {
    modelAI: store.config.modelAI,
    bulan: parseInt(store.config.bulan),
    tahun: parseInt(store.config.tahun),
    tugasPokok: store.kinerja.tugasPokok,
    tugasTambahan: store.kinerja.tugasTambahan,
    targetTahunan: store.kinerja.targetTahunan,
    hambatan: store.kinerja.hambatan,
    solusi: store.kinerja.solusi,
    tokenLimit: store.config.tokenLimit,
    customInstruction: store.config.customInstruction,
  };

  try {
    // 3. Panggil API Backend
    const response = await api.post("/reports/generate", payload);
    const data = response.data;

    // 4. Update Store dengan Hasil AI
    if (data && data.content) {
      updateStore("output", {
        ...store.output,
        content: data.content,
        lastUpdated: new Date().toISOString(),
        tte: {
          ...store.output.tte,
          nomorDokumen: data.nomorDokumen,
          timestamp: new Date().toISOString(),
        },
      });

      return {
        success: true,
        content: data.content,
        tokensUsed: data.tokensUsed,
      };
    }

    return { success: false, error: "Respon server tidak valid" };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal generate laporan",
    };
  }
};

export const checkAPIKey = (model: string) => true; // API Key dikelola backend
```

---

## src/services/historyService.ts

```typescript
import api from "../utils/api";
import { historyStore, reportStore } from "../stores/reportStore";

export const fetchHistory = async () => {
  try {
    const response = await api.get("/reports/my-reports?limit=20");
    const reports = response.data.data;

    const items = reports.map((report: any) => ({
      id: report.id,
      title: `Laporan ${report.bulan}/${report.tahun}`,
      date: report.createdAt,
      // Kita simpan referensi minimal, detail diambil saat load
      status: report.status,
    }));

    historyStore.set({ items });
  } catch (error) {
    console.error("Gagal mengambil riwayat:", error);
  }
};

export const loadReportDetail = async (id: string) => {
  try {
    const response = await api.get(`/reports/${id}`);
    const data = response.data;

    // Masukkan data dari DB ke Form Frontend
    const current = reportStore.get();

    reportStore.set({
      ...current,
      config: {
        ...current.config,
        bulan: String(data.bulan),
        tahun: String(data.tahun),
        modelAI: data.modelAI,
      },
      kinerja: {
        ...current.kinerja,
        tugasPokok: data.tugasPokok,
        tugasTambahan: data.tugasTambahan || "",
        targetTahunan: data.targetTahunan || "",
        hambatan: data.hambatan || "",
        solusi: data.solusi || "",
      },
      output: {
        ...current.output,
        content: data.content,
        lastUpdated: data.updatedAt,
        tte: {
          ...current.output.tte,
          nomorDokumen: data.nomorDokumen,
        },
      },
    });

    return true;
  } catch (error) {
    console.error("Gagal memuat laporan:", error);
    return false;
  }
};

export const deleteReport = async (id: string) => {
  try {
    await api.delete(`/reports/${id}`);
    await fetchHistory(); // Refresh list
    return true;
  } catch (error) {
    return false;
  }
};
```

---

## .env

````
PUBLIC_API_URL=http://localhost:3000/api/v1```

---

## .astro/data-store.json

```json
[["Map",1,2],"meta::meta",["Map",3,4,5,6],"astro-version","5.17.1","astro-config-digest","{\"root\":{},\"srcDir\":{},\"publicDir\":{},\"outDir\":{},\"cacheDir\":{},\"compressHTML\":true,\"base\":\"/\",\"trailingSlash\":\"ignore\",\"output\":\"static\",\"scopedStyleStrategy\":\"attribute\",\"build\":{\"format\":\"directory\",\"client\":{},\"server\":{},\"assets\":\"_astro\",\"serverEntry\":\"entry.mjs\",\"redirects\":true,\"inlineStylesheets\":\"auto\",\"concurrency\":1},\"server\":{\"open\":false,\"host\":false,\"port\":4321,\"streaming\":true,\"allowedHosts\":[]},\"redirects\":{},\"image\":{\"endpoint\":{\"route\":\"/_image\"},\"service\":{\"entrypoint\":\"astro/assets/services/sharp\",\"config\":{}},\"domains\":[],\"remotePatterns\":[],\"responsiveStyles\":false},\"devToolbar\":{\"enabled\":true},\"markdown\":{\"syntaxHighlight\":{\"type\":\"shiki\",\"excludeLangs\":[\"math\"]},\"shikiConfig\":{\"langs\":[],\"langAlias\":{},\"theme\":\"github-dark\",\"themes\":{},\"wrap\":false,\"transformers\":[]},\"remarkPlugins\":[],\"rehypePlugins\":[],\"remarkRehype\":{},\"gfm\":true,\"smartypants\":true},\"security\":{\"checkOrigin\":true,\"allowedDomains\":[]},\"env\":{\"schema\":{},\"validateSecrets\":false},\"experimental\":{\"clientPrerender\":false,\"contentIntellisense\":false,\"headingIdCompat\":false,\"preserveScriptOrder\":false,\"liveContentCollections\":false,\"csp\":false,\"staticImportMetaEnv\":false,\"chromeDevtoolsWorkspace\":false,\"failOnPrerenderConflict\":false,\"svgo\":false},\"legacy\":{\"collections\":false}}"]```

---

## .astro/types.d.ts

```typescript
/// <reference types="astro/client" />
````

---

## .astro/content.d.ts

```typescript
declare module "astro:content" {
  export interface RenderResult {
    Content: import("astro/runtime/server/index.js").AstroComponentFactory;
    headings: import("astro").MarkdownHeading[];
    remarkPluginFrontmatter: Record<string, any>;
  }
  interface Render {
    ".md": Promise<RenderResult>;
  }

  export interface RenderedContent {
    html: string;
    metadata?: {
      imagePaths: Array<string>;
      [key: string]: unknown;
    };
  }
}

declare module "astro:content" {
  type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

  export type CollectionKey = keyof AnyEntryMap;
  export type CollectionEntry<C extends CollectionKey> = Flatten<
    AnyEntryMap[C]
  >;

  export type ContentCollectionKey = keyof ContentEntryMap;
  export type DataCollectionKey = keyof DataEntryMap;

  type AllValuesOf<T> = T extends any ? T[keyof T] : never;
  type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
    ContentEntryMap[C]
  >["slug"];

  export type ReferenceDataEntry<
    C extends CollectionKey,
    E extends keyof DataEntryMap[C] = string,
  > = {
    collection: C;
    id: E;
  };
  export type ReferenceContentEntry<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {}) = string,
  > = {
    collection: C;
    slug: E;
  };
  export type ReferenceLiveEntry<
    C extends keyof LiveContentConfig["collections"],
  > = {
    collection: C;
    id: string;
  };

  /** @deprecated Use `getEntry` instead. */
  export function getEntryBySlug<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {}),
  >(
    collection: C,
    // Note that this has to accept a regular string too, for SSR
    entrySlug: E,
  ): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined>;

  /** @deprecated Use `getEntry` instead. */
  export function getDataEntryById<
    C extends keyof DataEntryMap,
    E extends keyof DataEntryMap[C],
  >(collection: C, entryId: E): Promise<CollectionEntry<C>>;

  export function getCollection<
    C extends keyof AnyEntryMap,
    E extends CollectionEntry<C>,
  >(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => entry is E,
  ): Promise<E[]>;
  export function getCollection<C extends keyof AnyEntryMap>(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => unknown,
  ): Promise<CollectionEntry<C>[]>;

  export function getLiveCollection<
    C extends keyof LiveContentConfig["collections"],
  >(
    collection: C,
    filter?: LiveLoaderCollectionFilterType<C>,
  ): Promise<
    import("astro").LiveDataCollectionResult<
      LiveLoaderDataType<C>,
      LiveLoaderErrorType<C>
    >
  >;

  export function getEntry<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {}),
  >(
    entry: ReferenceContentEntry<C, E>,
  ): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined>;
  export function getEntry<
    C extends keyof DataEntryMap,
    E extends keyof DataEntryMap[C] | (string & {}),
  >(
    entry: ReferenceDataEntry<C, E>,
  ): E extends keyof DataEntryMap[C]
    ? Promise<DataEntryMap[C][E]>
    : Promise<CollectionEntry<C> | undefined>;
  export function getEntry<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C> | (string & {}),
  >(
    collection: C,
    slug: E,
  ): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined>;
  export function getEntry<
    C extends keyof DataEntryMap,
    E extends keyof DataEntryMap[C] | (string & {}),
  >(
    collection: C,
    id: E,
  ): E extends keyof DataEntryMap[C]
    ? string extends keyof DataEntryMap[C]
      ? Promise<DataEntryMap[C][E]> | undefined
      : Promise<DataEntryMap[C][E]>
    : Promise<CollectionEntry<C> | undefined>;
  export function getLiveEntry<
    C extends keyof LiveContentConfig["collections"],
  >(
    collection: C,
    filter: string | LiveLoaderEntryFilterType<C>,
  ): Promise<
    import("astro").LiveDataEntryResult<
      LiveLoaderDataType<C>,
      LiveLoaderErrorType<C>
    >
  >;

  /** Resolve an array of entry references from the same collection */
  export function getEntries<C extends keyof ContentEntryMap>(
    entries: ReferenceContentEntry<C, ValidContentEntrySlug<C>>[],
  ): Promise<CollectionEntry<C>[]>;
  export function getEntries<C extends keyof DataEntryMap>(
    entries: ReferenceDataEntry<C, keyof DataEntryMap[C]>[],
  ): Promise<CollectionEntry<C>[]>;

  export function render<C extends keyof AnyEntryMap>(
    entry: AnyEntryMap[C][string],
  ): Promise<RenderResult>;

  export function reference<C extends keyof AnyEntryMap>(
    collection: C,
  ): import("astro/zod").ZodEffects<
    import("astro/zod").ZodString,
    C extends keyof ContentEntryMap
      ? ReferenceContentEntry<C, ValidContentEntrySlug<C>>
      : ReferenceDataEntry<C, keyof DataEntryMap[C]>
  >;
  // Allow generic `string` to avoid excessive type errors in the config
  // if `dev` is not running to update as you edit.
  // Invalid collection names will be caught at build time.
  export function reference<C extends string>(
    collection: C,
  ): import("astro/zod").ZodEffects<import("astro/zod").ZodString, never>;

  type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
  type InferEntrySchema<C extends keyof AnyEntryMap> =
    import("astro/zod").infer<
      ReturnTypeOrOriginal<Required<ContentConfig["collections"][C]>["schema"]>
    >;

  type ContentEntryMap = {};

  type DataEntryMap = {};

  type AnyEntryMap = ContentEntryMap & DataEntryMap;

  type ExtractLoaderTypes<T> = T extends import("astro/loaders").LiveLoader<
    infer TData,
    infer TEntryFilter,
    infer TCollectionFilter,
    infer TError
  >
    ? {
        data: TData;
        entryFilter: TEntryFilter;
        collectionFilter: TCollectionFilter;
        error: TError;
      }
    : {
        data: never;
        entryFilter: never;
        collectionFilter: never;
        error: never;
      };
  type ExtractDataType<T> = ExtractLoaderTypes<T>["data"];
  type ExtractEntryFilterType<T> = ExtractLoaderTypes<T>["entryFilter"];
  type ExtractCollectionFilterType<T> =
    ExtractLoaderTypes<T>["collectionFilter"];
  type ExtractErrorType<T> = ExtractLoaderTypes<T>["error"];

  type LiveLoaderDataType<C extends keyof LiveContentConfig["collections"]> =
    LiveContentConfig["collections"][C]["schema"] extends undefined
      ? ExtractDataType<LiveContentConfig["collections"][C]["loader"]>
      : import("astro/zod").infer<
          Exclude<LiveContentConfig["collections"][C]["schema"], undefined>
        >;
  type LiveLoaderEntryFilterType<
    C extends keyof LiveContentConfig["collections"],
  > = ExtractEntryFilterType<LiveContentConfig["collections"][C]["loader"]>;
  type LiveLoaderCollectionFilterType<
    C extends keyof LiveContentConfig["collections"],
  > = ExtractCollectionFilterType<
    LiveContentConfig["collections"][C]["loader"]
  >;
  type LiveLoaderErrorType<C extends keyof LiveContentConfig["collections"]> =
    ExtractErrorType<LiveContentConfig["collections"][C]["loader"]>;

  export type ContentConfig = typeof import("../src/content.config.mjs");
  export type LiveContentConfig = never;
}
```

---

## .astro/content-assets.mjs

````javascript
export default new Map();```

---

## .astro/content-modules.mjs

```javascript
export default new Map();```

---

## .astro/settings.json

```json
{
	"_variables": {
		"lastUpdateCheck": 1770642385417
	}
}```

---

## .prettierrc

````

```

---

```
