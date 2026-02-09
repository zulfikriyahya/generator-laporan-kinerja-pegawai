# Project Files

.
├── astro.config.mjs
├── draft.md
├── generate.sh
├── package.json
├── README.md
├── src
│   ├── components
│   │   ├── forms
│   │   │   ├── FormAkademik.astro
│   │   │   ├── FormInstansi.astro
│   │   │   ├── FormKinerja.astro
│   │   │   ├── FormPegawai.astro
│   │   │   ├── SelectGroup.astro
│   │   │   └── TabNavigation.astro
│   │   ├── InputGroup.astro
│   │   ├── TextAreaGroup.astro
│   │   └── ui
│   │       ├── AutoSaveIndicator.astro
│   │       ├── DocumentStats.astro
│   │       ├── KeyboardShortcuts.astro
│   │       ├── NotificationPanel.astro
│   │       ├── ProgressBar.astro
│   │       ├── SearchModal.astro
│   │       ├── ShortcutsHelp.astro
│   │       ├── ToastContainer.astro
│   │       ├── UserProfileModal.astro
│   │       └── ZoomControl.astro
│   ├── config
│   │   └── constants.ts
│   ├── env.d.ts
│   ├── layouts
│   │   └── Layout.astro
│   ├── pages
│   │   ├── index.astro
│   │   ├── login.astro
│   │   └── register.astro
│   ├── services
│   │   ├── aiService.ts
│   │   ├── authService.ts
│   │   ├── excelService.ts
│   │   ├── exportService.ts
│   │   ├── fileService.ts
│   │   ├── historyService.ts
│   │   ├── instansiService.ts
│   │   ├── notificationService.ts
│   │   ├── pegawaiService.ts
│   │   ├── reportService.ts
│   │   ├── userService.ts
│   │   └── websocketService.ts
│   ├── stores
│   │   ├── authStore.ts
│   │   ├── reportStore.ts
│   │   └── toastStore.ts
│   ├── styles
│   │   └── global.css
│   ├── types
│   │   ├── AuthTypes.ts
│   │   └── ReportTypes.ts
│   └── utils
│       ├── api.ts
│       ├── helpers.ts
│       └── markdown.ts
├── tsconfig.json
└── yarn.lock

13 directories, 52 files

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
        enabled: false,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api"),
            handler: "NetworkOnly",
          },
        ],
      },
      manifest: {
        name: "E-Kinerja AI",
        short_name: "E-Kinerja",
        description: "Generator Laporan Kinerja Pegawai berbasis AI",
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
    "html2pdf.js": "^0.14.0",
    "lucide-astro": "^0.556.0",
    "marked": "17.0.1",
    "nanostores": "^1.1.0",
    "qrcode": "^1.5.4",
    "socket.io-client": "^4.8.1",
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
<div x-data="zoomControl" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 no-print">
  <div class="glass-panel px-4 py-2 flex items-center gap-3 shadow-xl border border-white/10 rounded-full bg-slate-900/80 backdrop-blur">
    <button @click="zoomOut" class="text-slate-400 hover:text-white transition">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    </button>
    <input type="range" x-model="zoom" min="50" max="150" step="10" class="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500" />
    <button @click="zoomIn" class="text-slate-400 hover:text-white transition">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    </button>
    <span class="text-xs font-medium text-white w-10 text-right font-mono" x-text="zoom + '%'"></span>
    <button @click="resetZoom" class="ml-2 px-2 py-1 text-[10px] font-medium bg-white/10 hover:bg-white/20 rounded transition text-slate-300">Reset</button>
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
            preview.style.marginBottom = `${(value / 100) * 50}px`;
          }
        });
      },
      zoomIn() {
        if (this.zoom < 150) this.zoom = parseInt(this.zoom) + 10;
      },
      zoomOut() {
        if (this.zoom > 50) this.zoom = parseInt(this.zoom) - 10;
      },
      resetZoom() {
        this.zoom = 100;
      },
    }));
  });
</script>```

---

## src/components/ui/ToastContainer.astro

```astro
<div x-data="toastContainer" class="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
  <template x-for="toast in toasts" :key="toast.id">
    <div
      class="pointer-events-auto px-4 py-3 rounded-lg shadow-xl border backdrop-blur-md flex items-center gap-3 animate-slide-in min-w-[300px]"
      :class="{
        'bg-emerald-900/80 border-emerald-500/30 text-emerald-100': toast.type === 'success',
        'bg-red-900/80 border-red-500/30 text-red-100': toast.type === 'error',
        'bg-blue-900/80 border-blue-500/30 text-blue-100': toast.type === 'info'
      }"
    >
      <div
        :class="{
          'bg-emerald-500': toast.type === 'success',
          'bg-red-500': toast.type === 'error',
          'bg-blue-500': toast.type === 'info'
        }"
        class="w-2 h-2 rounded-full"
      ></div>
      <span x-text="toast.message" class="text-sm font-medium"></span>
    </div>
  </template>
</div>

<script>
  import { $toasts } from "../../stores/toastStore";
  document.addEventListener("alpine:init", () => {
    Alpine.data("toastContainer", () => ({
      toasts: [],
      init() {
        $toasts.subscribe((value) => {
          this.toasts = value;
        });
      },
    }));
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
</style>```

---

## src/components/ui/UserProfileModal.astro

```astro
<div
  x-data="userProfileModal"
  x-show="isOpen"
  @click.self="close"
  x-transition:enter="transition ease-out duration-300"
  x-transition:enter-start="opacity-0"
  x-transition:enter-end="opacity-100"
  class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center no-print"
  style="display: none;"
>
  <div
    class="bg-slate-900 rounded-xl w-full max-w-md mx-4 border border-white/10 shadow-2xl"
    x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0 scale-95"
    x-transition:enter-end="opacity-100 scale-100"
  >
    <div class="p-6 border-b border-white/10">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-bold text-white">Profil Pengguna</h3>
        <button @click="close" class="text-slate-400 hover:text-white p-1">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div class="p-6">
      <template x-if="activeView === 'profile'">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Nama</label>
            <input
              type="text"
              x-model="profile.name"
              class="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              x-model="profile.email"
              class="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Role</label>
            <input
              type="text"
              :value="profile.role"
              disabled
              class="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-slate-400 cursor-not-allowed"
            />
          </div>

          <div class="flex gap-2 pt-4">
            <button
              @click="saveProfile"
              :disabled="saving"
              class="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
            >
              <span x-show="!saving">Simpan Perubahan</span>
              <span x-show="saving">Menyimpan...</span>
            </button>
            <button
              @click="activeView = 'password'"
              class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
            >
              Ganti Password
            </button>
          </div>
        </div>
      </template>

      <template x-if="activeView === 'password'">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Password Lama</label>
            <input
              type="password"
              x-model="passwordForm.oldPassword"
              class="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Password Baru</label>
            <input
              type="password"
              x-model="passwordForm.newPassword"
              class="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Konfirmasi Password Baru</label>
            <input
              type="password"
              x-model="passwordForm.confirmPassword"
              class="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div x-show="passwordError" class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm" x-text="passwordError"></div>

          <div class="flex gap-2 pt-4">
            <button
              @click="activeView = 'profile'"
              class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
            >
              Kembali
            </button>
            <button
              @click="changePassword"
              :disabled="saving"
              class="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
            >
              <span x-show="!saving">Ganti Password</span>
              <span x-show="saving">Mengubah...</span>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</div>

<script>
  import { fetchUserProfile, updateUserProfile, changePassword } from "../../services/userService";
  import { addToast } from "../../stores/toastStore";

  document.addEventListener("alpine:init", () => {
    Alpine.data("userProfileModal", () => ({
      isOpen: false,
      activeView: "profile",
      saving: false,
      profile: {
        name: "",
        email: "",
        role: "",
      },
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      passwordError: "",

      init() {
        window.addEventListener("open:user-profile", () => {
          this.open();
        });
      },

      async open() {
        this.isOpen = true;
        this.activeView = "profile";
        await this.loadProfile();
      },

      close() {
        this.isOpen = false;
        this.passwordForm = {
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        };
        this.passwordError = "";
      },

      async loadProfile() {
        const result = await fetchUserProfile();
        if (result.success) {
          this.profile = {
            name: result.data.name,
            email: result.data.email,
            role: result.data.role,
          };
        }
      },

      async saveProfile() {
        this.saving = true;
        const result = await updateUserProfile({
          name: this.profile.name,
          email: this.profile.email,
        });

        if (result.success) {
          addToast("Profil berhasil diupdate", "success");
          this.close();
        } else {
          addToast(result.error, "error");
        }
        this.saving = false;
      },

      async changePassword() {
        this.passwordError = "";

        if (this.passwordForm.newPassword.length < 8) {
          this.passwordError = "Password baru minimal 8 karakter";
          return;
        }

        if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
          this.passwordError = "Konfirmasi password tidak cocok";
          return;
        }

        this.saving = true;
        const result = await changePassword(
          this.passwordForm.oldPassword,
          this.passwordForm.newPassword
        );

        if (result.success) {
          addToast("Password berhasil diubah", "success");
          this.close();
        } else {
          this.passwordError = result.error;
        }
        this.saving = false;
      },
    }));
  });
</script>```

---

## src/components/ui/AutoSaveIndicator.astro

```astro
<div
  x-data="autoSaveIndicator"
  x-show="visible"
  x-transition:enter="transition ease-out duration-300"
  x-transition:enter-start="opacity-0 translate-y-4"
  x-transition:enter-end="opacity-100 translate-y-0"
  x-transition:leave="transition ease-in duration-200"
  x-transition:leave-start="opacity-100 translate-y-0"
  x-transition:leave-end="opacity-0 translate-y-4"
  class="fixed bottom-6 right-6 z-50 no-print"
  style="display: none;"
>
  <div
    class="flex items-center gap-2 px-3 py-2 rounded-full shadow-lg border backdrop-blur-md transition-colors duration-300"
    :class="{
      'bg-emerald-500/10 border-emerald-500/20 text-emerald-400': status === 'saved',
      'bg-blue-500/10 border-blue-500/20 text-blue-400': status === 'saving',
      'bg-red-500/10 border-red-500/20 text-red-400': status === 'error'
    }"
  >
    <template x-if="status === 'saving'">
      <svg class="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </template>
    <template x-if="status === 'saved'">
      <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </template>
    <template x-if="status === 'error'">
      <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </template>
    <span class="text-[10px] font-bold uppercase tracking-wide" x-text="message"></span>
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
        window.addEventListener("autosave:start", () =>
          this.show("saving", "Menyimpan...")
        );
        window.addEventListener("autosave:success", () => {
          this.show("saved", "Tersimpan");
          this.hideAfter(2000);
        });
        window.addEventListener("autosave:error", () => {
          this.show("error", "Gagal menyimpan");
          this.hideAfter(3000);
        });
      },
      show(status, message) {
        clearTimeout(this.timeout);
        this.status = status;
        this.message = message;
        this.visible = true;
      },
      hideAfter(delay) {
        this.timeout = setTimeout(() => {
          this.visible = false;
        }, delay);
      },
    }));
  });
</script>```

---

## src/components/ui/ShortcutsHelp.astro

```astro
<div
  x-data="shortcutsHelp"
  x-show="isOpen"
  @keydown.escape.window="close"
  @click.self="close"
  x-transition:enter="transition ease-out duration-300"
  x-transition:enter-start="opacity-0"
  x-transition:enter-end="opacity-100"
  class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center no-print"
  style="display: none;"
>
  <div
    class="bg-slate-900 rounded-xl w-full max-w-lg mx-4 border border-white/10 shadow-2xl"
    x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0 scale-95"
    x-transition:enter-end="opacity-100 scale-100"
  >
    <div class="p-6 border-b border-white/10">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-bold text-white">Keyboard Shortcuts</h3>
        <button @click="close" class="text-slate-400 hover:text-white p-1">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div class="p-6 space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
      <div class="space-y-2">
        <h4 class="text-xs font-bold text-slate-400 uppercase mb-3">Umum</h4>
        <div class="flex justify-between items-center py-2 border-b border-white/5">
          <span class="text-sm text-slate-300">Cari Laporan</span>
          <kbd class="px-2 py-1 text-xs bg-slate-800 border border-white/10 rounded">Ctrl + K</kbd>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-white/5">
          <span class="text-sm text-slate-300">Bantuan Shortcut</span>
          <kbd class="px-2 py-1 text-xs bg-slate-800 border border-white/10 rounded">?</kbd>
        </div>
      </div>

      <div class="space-y-2">
        <h4 class="text-xs font-bold text-slate-400 uppercase mb-3">Aksi</h4>
        <div class="flex justify-between items-center py-2 border-b border-white/5">
          <span class="text-sm text-slate-300">Generate Laporan</span>
          <kbd class="px-2 py-1 text-xs bg-slate-800 border border-white/10 rounded">Ctrl + Enter</kbd>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-white/5">
          <span class="text-sm text-slate-300">Simpan Draft</span>
          <kbd class="px-2 py-1 text-xs bg-slate-800 border border-white/10 rounded">Ctrl + S</kbd>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-white/5">
          <span class="text-sm text-slate-300">Export PDF</span>
          <kbd class="px-2 py-1 text-xs bg-slate-800 border border-white/10 rounded">Ctrl + P</kbd>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-white/5">
          <span class="text-sm text-slate-300">Export DOCX</span>
          <kbd class="px-2 py-1 text-xs bg-slate-800 border border-white/10 rounded">Ctrl + J</kbd>
        </div>
      </div>
    </div>

    <div class="p-4 border-t border-white/10 bg-slate-800/50 text-center text-xs text-slate-400">
      Tekan <kbd class="px-1.5 py-0.5 bg-slate-700 border border-white/10 rounded mx-1">ESC</kbd> untuk menutup
    </div>
  </div>
</div>

<script>
  document.addEventListener("alpine:init", () => {
    Alpine.data("shortcutsHelp", () => ({
      isOpen: false,

      init() {
        window.addEventListener("keydown", (e) => {
          if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
            const target = e.target as HTMLElement;
            if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
              e.preventDefault();
              this.open();
            }
          }
        });

        window.addEventListener("open:shortcuts-help", () => {
          this.open();
        });
      },

      open() {
        this.isOpen = true;
      },

      close() {
        this.isOpen = false;
      },
    }));
  });
</script>```

---

## src/components/ui/SearchModal.astro

```astro
<div
  x-data="searchModal"
  x-show="isOpen"
  @keydown.escape.window="close"
  @click.self="close"
  x-transition:enter="transition ease-out duration-300"
  x-transition:enter-start="opacity-0"
  x-transition:enter-end="opacity-100"
  class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 no-print"
  style="display: none;"
>
  <div
    class="bg-slate-900 rounded-xl w-full max-w-2xl mx-4 border border-white/10 shadow-2xl"
    x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0 scale-95 -translate-y-4"
    x-transition:enter-end="opacity-100 scale-100 translate-y-0"
  >
    <div class="p-4 border-b border-white/10">
      <div class="relative">
        <input
          type="text"
          x-model="query"
          @input="search"
          placeholder="Cari laporan berdasarkan nama, bulan, tahun, NIP..."
          class="w-full bg-slate-800 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-500"
          autofocus
        />
        <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <div class="max-h-96 overflow-y-auto custom-scrollbar">
      <template x-if="loading">
        <div class="p-8 text-center">
          <svg class="animate-spin h-8 w-8 text-blue-500 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </template>

      <template x-if="!loading && results.length === 0 && query">
        <div class="p-8 text-center text-slate-400">
          <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Tidak ada hasil untuk "<span x-text="query"></span>"</p>
        </div>
      </template>

      <template x-if="!loading && results.length === 0 && !query">
        <div class="p-8 text-center text-slate-400">
          <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>Ketik untuk mencari laporan...</p>
        </div>
      </template>

      <template x-if="!loading && results.length > 0">
        <div class="p-2">
          <template x-for="result in results" :key="result.id">
            <button
              @click="selectResult(result.id)"
              class="w-full p-3 hover:bg-slate-800 rounded-lg transition text-left group"
            >
              <div class="flex items-start justify-between mb-2">
                <h4 class="font-medium text-white group-hover:text-blue-400 transition" x-text="result.title"></h4>
                <span
                  class="text-xs px-2 py-0.5 rounded-full shrink-0 ml-2"
                  :class="{
                    'bg-green-500/20 text-green-400': result.status === 'APPROVED',
                    'bg-blue-500/20 text-blue-400': result.status === 'SUBMITTED',
                    'bg-slate-500/20 text-slate-400': result.status === 'DRAFT',
                    'bg-red-500/20 text-red-400': result.status === 'REJECTED'
                  }"
                  x-text="result.status"
                ></span>
              </div>
              <div class="flex items-center gap-4 text-xs text-slate-400">
                <span x-text="result.pegawai?.nama"></span>
                <span x-text="result.pegawai?.nip"></span>
                <span x-text="formatDate(result.createdAt)"></span>
              </div>
            </button>
          </template>
        </div>
      </template>
    </div>

    <div class="p-3 border-t border-white/10 bg-slate-800/50">
      <div class="flex items-center justify-between text-xs text-slate-400">
        <span>ESC untuk tutup</span>
        <span x-show="results.length > 0"><span x-text="results.length"></span> hasil ditemukan</span>
      </div>
    </div>
  </div>
</div>

<script>
  import { fetchMyReports } from "../../services/reportService";
  import { loadReportDetail } from "../../services/historyService";
  import { reportStore } from "../../stores/reportStore";
  import { parseMarkdown } from "../../utils/markdown";
  import { addToast } from "../../stores/toastStore";
  import { debounce } from "../../utils/helpers";

  document.addEventListener("alpine:init", () => {
    Alpine.data("searchModal", () => ({
      isOpen: false,
      query: "",
      loading: false,
      results: [],
      allReports: [],

      init() {
        window.addEventListener("keydown", (e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "k") {
            e.preventDefault();
            this.open();
          }
        });

        window.addEventListener("open:search", () => {
          this.open();
        });

        this.search = debounce(this.performSearch.bind(this), 300);
      },

      async open() {
        this.isOpen = true;
        this.query = "";
        this.results = [];
        await this.loadAllReports();
      },

      close() {
        this.isOpen = false;
      },

      async loadAllReports() {
        this.loading = true;
        const result = await fetchMyReports(1, 100);
        if (result.success) {
          this.allReports = result.data;
        }
        this.loading = false;
      },

      performSearch() {
        if (!this.query.trim()) {
          this.results = [];
          return;
        }

        const q = this.query.toLowerCase();
        this.results = this.allReports.filter((report) => {
          return (
            report.pegawai?.nama?.toLowerCase().includes(q) ||
            report.pegawai?.nip?.toLowerCase().includes(q) ||
            report.bulan?.toString().includes(q) ||
            report.tahun?.toString().includes(q) ||
            report.nomorDokumen?.toLowerCase().includes(q) ||
            report.status?.toLowerCase().includes(q)
          );
        });
      },

      async selectResult(id) {
        this.close();
        const success = await loadReportDetail(id);
        if (success) {
          const store = reportStore.get();
          if (store.output.content) {
            const html = await parseMarkdown(store.output.content);
            window.dispatchEvent(new CustomEvent("report:loaded", { detail: { html } }));
          }
          addToast("Laporan dimuat", "success");
        } else {
          addToast("Gagal memuat laporan", "error");
        }
      },

      formatDate(isoString) {
        if (!isoString) return "-";
        return new Date(isoString).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
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
  class="fixed top-24 right-8 z-20 no-print"
  style="display: none;"
  x-transition:enter="transition ease-out duration-300"
  x-transition:enter-start="opacity-0 translate-x-4"
  x-transition:enter-end="opacity-100 translate-x-0"
>
  <div class="glass-panel px-4 py-3 min-w-[180px] border border-white/5 bg-slate-900/50 backdrop-blur rounded-xl">
    <h4 class="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">Statistik Dokumen</h4>
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-400">Kata</span>
        <span class="text-sm font-bold text-slate-200" x-text="stats.words">0</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-400">Karakter</span>
        <span class="text-sm font-bold text-slate-200" x-text="stats.chars">0</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-400">Token Estimasi</span>
        <span class="text-sm font-bold text-blue-400" x-text="stats.tokens">0</span>
      </div>
    </div>
  </div>
</div>

<script>
  document.addEventListener("alpine:init", () => {
    Alpine.data("documentStats", () => ({
      stats: { words: 0, chars: 0, tokens: 0 },
      hasContent: false,
      init() {
        window.addEventListener("generate:complete", () => this.calculate());
        setInterval(() => this.calculate(), 2000);
      },
      calculate() {
        const preview = document.querySelector(".prose-report");
        if (!preview || !preview.innerText.trim()) {
          this.hasContent = false;
          return;
        }

        const text = preview.innerText;
        this.hasContent = true;
        this.stats.chars = text.length;
        this.stats.words = text.trim().split(/\s+/).length;
        this.stats.tokens = Math.ceil(text.length / 4);
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
  x-transition.opacity
>
  <div class="glass-panel p-6 max-w-md w-full mx-4 border border-white/10 bg-slate-900 rounded-xl shadow-2xl">
    <div class="flex items-center gap-3 mb-4">
      <div class="flex-1">
        <h3 class="text-white font-bold text-lg">Generating Report</h3>
        <p class="text-xs text-slate-400" x-text="currentStep">Menghubungi AI...</p>
      </div>
      <div class="animate-spin text-blue-500">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>
    <div class="mb-4">
      <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300 ease-out" :style="`width: ${progress}%`"></div>
      </div>
    </div>
    <button @click="cancel" class="mt-2 w-full py-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition hover:bg-slate-800">
      Batalkan
    </button>
  </div>
</div>

<script>
  document.addEventListener("alpine:init", () => {
    Alpine.data("progressBar", () => ({
      isGenerating: false,
      progress: 0,
      currentStep: "Memulai...",
      progressInterval: null,
      init() {
        window.addEventListener("generate:start", () => this.start());
        window.addEventListener("generate:complete", () => this.complete());
        window.addEventListener("generate:error", () => this.error());
      },
      start() {
        this.isGenerating = true;
        this.progress = 5;
        this.currentStep = "Mengirim data ke server...";
        this.animateProgress();
      },
      animateProgress() {
        this.progressInterval = setInterval(() => {
          if (this.progress < 30) {
            this.progress += Math.random() * 5;
            this.currentStep = "Memproses konteks data...";
          } else if (this.progress < 60) {
            this.progress += Math.random() * 2;
            this.currentStep = "AI sedang menyusun laporan...";
          } else if (this.progress < 90) {
            this.progress += Math.random();
            this.currentStep = "Finishing format dokumen...";
          }
        }, 500);
      },
      complete() {
        clearInterval(this.progressInterval);
        this.progress = 100;
        this.currentStep = "Selesai!";
        setTimeout(() => {
          this.isGenerating = false;
        }, 800);
      },
      error() {
        clearInterval(this.progressInterval);
        this.isGenerating = false;
      },
      cancel() {
        clearInterval(this.progressInterval);
        this.isGenerating = false;
      },
    }));
  });
</script>```

---

## src/components/ui/NotificationPanel.astro

```astro
<div
  x-data="notificationPanel"
  x-show="isOpen"
  @click.away="isOpen = false"
  x-transition:enter="transition ease-out duration-300"
  x-transition:enter-start="translate-x-full"
  x-transition:enter-end="translate-x-0"
  class="fixed right-0 top-16 bottom-0 w-96 bg-slate-900 border-l border-white/10 z-40 overflow-y-auto no-print shadow-2xl"
  style="display: none;"
>
  <div class="p-4 border-b border-white/10 bg-slate-800/50 sticky top-0 z-10">
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-white font-bold flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        Notifikasi
      </h3>
      <button @click="isOpen = false" class="text-slate-400 hover:text-white p-1">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="flex gap-2">
      <button @click="loadNotifications" class="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
        <svg class="w-3 h-3" :class="loading && 'animate-spin'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh
      </button>
      <button @click="markAllRead" class="text-xs text-green-400 hover:text-green-300">Tandai Semua Dibaca</button>
    </div>
  </div>

  <div class="p-4 space-y-2">
    <template x-if="notifications.length === 0 && !loading">
      <div class="text-center text-slate-500 text-sm py-10 flex flex-col items-center">
        <svg class="w-12 h-12 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <span>Tidak ada notifikasi</span>
      </div>
    </template>

    <template x-for="notif in notifications" :key="notif.id">
      <div
        class="p-3 rounded-lg transition group cursor-pointer relative"
        :class="notif.isRead ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20'"
        @click="markRead(notif.id)"
      >
        <div class="flex items-start gap-3">
          <div
            class="w-2 h-2 rounded-full mt-1.5 shrink-0"
            :class="notif.isRead ? 'bg-slate-600' : 'bg-blue-500'"
          ></div>
          <div class="flex-1">
            <h4 class="text-sm font-medium text-slate-200 mb-1" x-text="notif.title"></h4>
            <p class="text-xs text-slate-400 mb-2" x-text="notif.message"></p>
            <div class="flex justify-between items-center">
              <span
                class="text-[10px] px-2 py-0.5 rounded-full"
                :class="{
                  'bg-blue-500/20 text-blue-400': notif.type === 'INFO',
                  'bg-green-500/20 text-green-400': notif.type === 'SUCCESS',
                  'bg-yellow-500/20 text-yellow-400': notif.type === 'WARNING',
                  'bg-red-500/20 text-red-400': notif.type === 'ERROR'
                }"
                x-text="notif.type"
              ></span>
              <span class="text-[10px] text-slate-500" x-text="formatDate(notif.createdAt)"></span>
            </div>
          </div>
          <button
            @click.stop="deleteNotif(notif.id)"
            class="text-slate-500 hover:text-red-400 p-1 hover:bg-red-500/10 rounded transition opacity-0 group-hover:opacity-100"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </template>

    <template x-if="loading">
      <div class="text-center py-4">
        <svg class="animate-spin h-6 w-6 text-blue-500 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </template>
  </div>
</div>

<script>
  import { fetchNotifications, markAsRead, markAllAsRead, deleteNotification } from "../../services/notificationService";
  import { addToast } from "../../stores/toastStore";

  document.addEventListener("alpine:init", () => {
    Alpine.data("notificationPanel", () => ({
      isOpen: false,
      notifications: [],
      loading: false,

      init() {
        this.loadNotifications();

        window.addEventListener("toggle:notifications", () => {
          this.isOpen = !this.isOpen;
          if (this.isOpen) {
            this.loadNotifications();
          }
        });

        window.addEventListener("ws:notification", (e: any) => {
          this.notifications.unshift(e.detail);
          addToast(e.detail.title, e.detail.type.toLowerCase());
        });
      },

      async loadNotifications() {
        this.loading = true;
        const result = await fetchNotifications(1, 50);
        if (result.success) {
          this.notifications = result.data;
        }
        this.loading = false;
      },

      async markRead(id: string) {
        await markAsRead(id);
        const notif = this.notifications.find((n: any) => n.id === id);
        if (notif) {
          notif.isRead = true;
        }
      },

      async markAllRead() {
        const result = await markAllAsRead();
        if (result.success) {
          this.notifications.forEach((n: any) => (n.isRead = true));
          addToast("Semua notifikasi ditandai dibaca", "success");
        }
      },

      async deleteNotif(id: string) {
        const result = await deleteNotification(id);
        if (result.success) {
          this.notifications = this.notifications.filter((n: any) => n.id !== id);
          addToast("Notifikasi dihapus", "success");
        }
      },

      formatDate(isoString: string) {
        if (!isoString) return "-";
        return new Date(isoString).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    }));
  });
</script>```

---

## src/components/ui/KeyboardShortcuts.astro

```astro
<script>
  import { addToast } from "../../stores/toastStore";

  document.addEventListener("alpine:init", () => {
    Alpine.data("keyboardShortcuts", () => ({
      init() {
        document.addEventListener("keydown", (e) => {
          if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
              case "enter":
                e.preventDefault();
                this.triggerGenerate();
                break;
              case "s":
                e.preventDefault();
                this.triggerSave();
                break;
              case "p":
                e.preventDefault();
                this.triggerExportPDF();
                break;
              case "j":
                e.preventDefault();
                this.triggerExportDOCX();
                break;
            }
          }
        });
      },
      triggerGenerate() {
        addToast("Shortcut: Generate Report", "info");
        window.dispatchEvent(new CustomEvent("shortcut:generate"));
      },
      triggerSave() {
        addToast("Shortcut: Menyimpan...", "info");
        window.dispatchEvent(new CustomEvent("shortcut:save"));
      },
      triggerExportPDF() {
        addToast("Shortcut: Export PDF", "info");
        window.dispatchEvent(new CustomEvent("shortcut:export-pdf"));
      },
      triggerExportDOCX() {
        addToast("Shortcut: Export DOCX", "info");
        window.dispatchEvent(new CustomEvent("shortcut:export-docx"));
      },
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
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
</div>```

---

## src/components/forms/FormKinerja.astro

```astro
---
import TextAreaGroup from "../TextAreaGroup.astro";
---

<div class="space-y-4 animate-fade-in">
  <TextAreaGroup label="Tugas Pokok" name="tp" model="form.kinerja.tugasPokok" rows="4" placeholder="Deskripsikan tugas utama..." />
  <TextAreaGroup label="Tugas Tambahan" name="tt" model="form.kinerja.tugasTambahan" rows="2" placeholder="Wali kelas, pembina ekskul..." />
  <div class="pt-4 border-t border-white/5">
    <h4 class="text-xs font-bold text-slate-500 uppercase mb-2">Target & Evaluasi</h4>
    <TextAreaGroup label="Target Tahunan" name="iku" model="form.kinerja.targetTahunan" rows="2" placeholder="Target IKU atau SKP..." />
    <TextAreaGroup label="Hambatan / Kendala" name="hambat" model="form.kinerja.hambatan" rows="2" placeholder="Kendala yang dihadapi bulan ini..." />
    <TextAreaGroup label="Solusi / Tindak Lanjut" name="solusi" model="form.kinerja.solusi" rows="2" placeholder="Solusi atas kendala..." />
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
      { val: "MERDEKA", label: "Kurikulum Merdeka" },
      { val: "K13", label: "Kurikulum 2013" },
      { val: "KTSP", label: "KTSP" },
    ]}
  />
  <div class="grid grid-cols-2 gap-3">
    <InputGroup label="Tahun Pelajaran" name="tapel" model="form.akademik.tahunPelajaran" />
    <SelectGroup
      label="Semester"
      name="sem"
      model="form.akademik.semester"
      options={[
        { val: "GANJIL", label: "GANJIL" },
        { val: "GENAP", label: "GENAP" },
      ]}
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
import { Info } from "lucide-astro";
---

<div class="space-y-6 animate-fade-in pb-10" x-data="{ editing: false }">
  <div x-show="!form.instansi.id && !editing" class="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex gap-3 items-start">
    <Info class="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
    <div>
      <h4 class="text-sm font-bold text-yellow-500 mb-1">Data Instansi Belum Diatur</h4>
      <p class="text-xs text-yellow-200/80 mb-3">
        Anda belum terhubung dengan data instansi aktif. Silakan hubungi admin atau isi data manual sementara.
      </p>
      <button @click="editing = true" class="text-xs bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 px-3 py-1.5 rounded transition">
        Isi Manual
      </button>
    </div>
  </div>

  <div class="space-y-3" :class="{ 'opacity-50 pointer-events-none': form.instansi.id && !editing }">
    <div class="flex justify-between items-center border-b border-white/10 pb-1">
      <h3 class="text-xs font-bold text-blue-400 uppercase">Identitas Instansi</h3>
      <button x-show="form.instansi.id && !editing" @click="editing = true" class="text-[10px] text-slate-400 hover:text-white">Edit</button>
      <button x-show="editing" @click="editing = false; updateInstansi()" class="text-[10px] text-green-400 hover:text-green-300">Simpan</button>
    </div>

    <InputGroup label="Header 1" name="h1" model="form.instansi.header1" placeholder="KEMENTERIAN..." />
    <InputGroup label="Header 2" name="h2" model="form.instansi.header2" placeholder="KANTOR..." />
    <InputGroup label="Header 3" name="h3" model="form.instansi.header3" placeholder="MADRASAH..." />
    <InputGroup label="Alamat" name="addr" model="form.instansi.alamat" />
    <div class="grid grid-cols-2 gap-3">
      <InputGroup label="Website" name="web" model="form.instansi.website" />
      <InputGroup label="Email" name="mail" model="form.instansi.email" />
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4 border-t border-white/10 pt-4" x-show="editing || !form.instansi.id">
    <div class="bg-slate-800 p-3 rounded text-center">
      <span class="text-xs text-slate-400 block mb-2">Logo Kiri (Utama)</span>
      <div class="h-16 mb-2 flex items-center justify-center bg-slate-900 rounded border border-white/5">
        <template x-if="form.instansi.logoUtama">
          <img :src="form.instansi.logoUtama" class="h-full object-contain" />
        </template>
        <template x-if="!form.instansi.logoUtama">
          <span class="text-[10px] text-slate-600">No Logo</span>
        </template>
      </div>
      <input type="file" accept="image/*" @change="handleUpload($event, 'instansi.logoUtama')" class="w-full text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-[10px] file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20" />
    </div>
    <div class="bg-slate-800 p-3 rounded text-center">
      <span class="text-xs text-slate-400 block mb-2">Logo Kanan (Instansi)</span>
      <div class="h-16 mb-2 flex items-center justify-center bg-slate-900 rounded border border-white/5">
        <template x-if="form.instansi.logoInstansi">
          <img :src="form.instansi.logoInstansi" class="h-full object-contain" />
        </template>
        <template x-if="!form.instansi.logoInstansi">
          <span class="text-[10px] text-slate-600">No Logo</span>
        </template>
      </div>
      <input type="file" accept="image/*" @change="handleUpload($event, 'instansi.logoInstansi')" class="w-full text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-[10px] file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20" />
    </div>
  </div>

  <div class="space-y-3 pt-4 border-t border-white/10" :class="{ 'opacity-50 pointer-events-none': form.instansi.id && !editing }">
    <h3 class="text-xs font-bold text-blue-400 uppercase">Pejabat Penilai</h3>
    <InputGroup label="Titimangsa (Tempat)" name="titimangsa" model="form.instansi.titimangsa" />
    <div class="p-3 bg-white/5 rounded-lg border border-white/5">
      <InputGroup label="Nama Kepala" name="k_nama" model="form.instansi.kepala.nama" />
      <div class="grid grid-cols-2 gap-2 mt-2">
        <InputGroup label="NIP Kepala" name="k_nip" model="form.instansi.kepala.nip" />
        <InputGroup label="Pangkat/Gol" name="k_pgkt" model="form.instansi.kepala.pangkat" />
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
    <InputGroup label="NUPTK" name="nuptk" model="form.pegawai.nuptk" />
  </div>
  <InputGroup label="NIK" name="nik" model="form.pegawai.nik" />
  <div class="grid grid-cols-2 gap-3">
    <InputGroup label="Tempat Lahir" name="tempat_lahir" model="form.pegawai.tempatLahir" />
    <InputGroup label="Tanggal Lahir" name="tanggal_lahir" model="form.pegawai.tanggalLahir" type="date" />
  </div>
  <div class="grid grid-cols-2 gap-3">
    <SelectGroup
      label="Status"
      name="stts"
      model="form.pegawai.jenis"
      options={[
        { val: "PNS", label: "PNS" },
        { val: "PPPK", label: "PPPK" },
        { val: "HONORER", label: "HONORER" },
        { val: "GTT", label: "GTT" },
        { val: "PTT", label: "PTT" },
        { val: "GURU", label: "GURU" },
      ]}
    />
    <SelectGroup
      label="Status Pegawai"
      name="stts_peg"
      model="form.pegawai.status"
      options={[
        { val: "AKTIF", label: "AKTIF" },
        { val: "CUTI", label: "CUTI" },
        { val: "TUGAS_BELAJAR", label: "TUGAS BELAJAR" },
        { val: "NON_AKTIF", label: "NON AKTIF" },
      ]}
    />
  </div>
  <div class="grid grid-cols-2 gap-3">
    <SelectGroup
      label="Gender"
      name="gender"
      model="form.pegawai.gender"
      options={[
        { val: "L", label: "Laki-laki" },
        { val: "P", label: "Perempuan" },
      ]}
    />
    <InputGroup label="Golongan" name="gol" model="form.pegawai.golongan" />
  </div>
  <InputGroup label="Jabatan" name="jab" model="form.pegawai.jabatan" />
  <InputGroup label="Unit Kerja" name="unit" model="form.pegawai.unitKerja" />
  <InputGroup label="Alamat" name="alamat" model="form.pegawai.alamat" />
  <InputGroup label="No HP" name="hp" model="form.pegawai.hp" />
  <InputGroup label="Email" name="email" model="form.pegawai.email" type="email" />
  <InputGroup label="Pendidikan" name="pendidikan" model="form.pegawai.pendidikan" />
  <div class="grid grid-cols-2 gap-3">
    <InputGroup label="Masa Kerja (Tahun)" name="mkt" model="form.pegawai.masaKerjaTahun" type="number" />
    <InputGroup label="Masa Kerja (Bulan)" name="mkb" model="form.pegawai.masaKerjaBulan" type="number" />
  </div>
  <div class="mt-4 p-3 bg-slate-800 rounded-lg">
    <label class="text-xs text-slate-400 block mb-2">Foto Pegawai</label>
    <div class="h-32 mb-3 flex items-center justify-center bg-slate-900 rounded border border-white/5">
      <template x-if="form.pegawai.fotoPegawai">
        <img :src="form.pegawai.fotoPegawai" class="h-full object-contain" />
      </template>
      <template x-if="!form.pegawai.fotoPegawai">
        <span class="text-xs text-slate-600">Belum ada foto</span>
      </template>
    </div>
    <input type="file" accept="image/*" @change="handleUpload($event, 'pegawai.fotoPegawai')" class="w-full text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20" />
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
```

---

## src/env.d.ts

```typescript
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## src/pages/register.astro

```astro
---
import Layout from "../layouts/Layout.astro";
---

<Layout title="Register - E-Kinerja">
  <div class="min-h-screen flex items-center justify-center bg-slate-900 px-4" x-data="registerApp">
    <div class="max-w-md w-full bg-slate-800 rounded-xl p-8 border border-white/10 shadow-2xl animate-fade-in-up">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-white mb-2">Buat Akun</h1>
        <p class="text-slate-400 text-sm">Daftar untuk mulai membuat laporan</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Nama Lengkap</label>
          <input
            type="text"
            x-model="name"
            class="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-600 transition-all focus:bg-slate-950"
            placeholder="Contoh: Ahmad Dahlan"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Email</label>
          <input
            type="email"
            x-model="email"
            class="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-600 transition-all focus:bg-slate-950"
            placeholder="email@instansi.go.id"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Password</label>
          <input
            type="password"
            x-model="password"
            class="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-600 transition-all focus:bg-slate-950"
            placeholder="Minimal 8 karakter"
            required
            minlength="8"
          />
        </div>

        <div x-show="error" x-transition.opacity class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-start gap-2">
          <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span x-text="error"></span>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition disabled:opacity-50 flex justify-center items-center shadow-lg hover:shadow-blue-500/20"
        >
          <span x-show="!loading">Daftar</span>
          <svg x-show="loading" class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-slate-400">
        Sudah punya akun? <a href="/login" class="text-blue-400 hover:text-blue-300 font-medium hover:underline">Login disini</a>
      </div>
    </div>
  </div>
</Layout>

<style>
  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out;
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

<script>
  import Alpine from "alpinejs";
  import { register } from "../services/authService";

  document.addEventListener("alpine:init", () => {
    Alpine.data("registerApp", () => ({
      name: "",
      email: "",
      password: "",
      loading: false,
      error: "",

      async handleRegister() {
        this.loading = true;
        this.error = "";

        const result = await register({
          name: this.name,
          email: this.email,
          password: this.password,
        });

        if (result.success) {
          window.location.href = "/";
        } else {
          this.error = result.error;
        }

        this.loading = false;
      },
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
  <div class="min-h-screen flex items-center justify-center bg-slate-900 px-4 relative overflow-hidden" x-data="loginApp">
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[100px]"></div>
      <div class="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]"></div>
    </div>

    <div class="max-w-md w-full bg-slate-800/80 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-2xl relative z-10 animate-fade-in-up">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 mb-4 ring-1 ring-blue-500/40">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-white mb-2">Selamat Datang</h1>
        <p class="text-slate-400 text-sm">Masuk untuk mengelola laporan kinerja</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input
            type="email"
            x-model="email"
            class="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-600 transition-all focus:bg-slate-900"
            placeholder="nama@instansi.go.id"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Password</label>
          <input
            type="password"
            x-model="password"
            class="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-600 transition-all focus:bg-slate-900"
            placeholder="••••••••"
            required
          />
        </div>

        <div x-show="error" x-transition.opacity class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-start gap-2">
          <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span x-text="error"></span>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition disabled:opacity-50 flex justify-center items-center shadow-lg hover:shadow-blue-500/20"
        >
          <span x-show="!loading">Masuk</span>
          <svg x-show="loading" class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
      </form>

      <div class="mt-8 pt-6 border-t border-white/10 text-center text-sm text-slate-400">
        Belum punya akun? <a href="/register" class="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">Daftar sekarang</a>
      </div>
    </div>
  </div>
</Layout>

<style>
  .animate-fade-in-up {
    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

<script>
  import Alpine from "alpinejs";
  import { login } from "../services/authService";

  document.addEventListener("alpine:init", () => {
    Alpine.data("loginApp", () => ({
      email: "",
      password: "",
      loading: false,
      error: "",

      async handleLogin() {
        this.loading = true;
        this.error = "";

        const result = await login({ email: this.email, password: this.password });

        if (result.success) {
          window.location.href = "/";
        } else {
          this.error = result.error;
        }

        this.loading = false;
      },
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
import NotificationPanel from "../components/ui/NotificationPanel.astro";
import UserProfileModal from "../components/ui/UserProfileModal.astro";
import SearchModal from "../components/ui/SearchModal.astro";
import ShortcutsHelp from "../components/ui/ShortcutsHelp.astro";
import { Bot, Download, FileText, Save, History, Printer, RefreshCw, LogOut, Bell, User, Search, HelpCircle } from "@lucide/astro";
---

<Layout title="Generator Laporan Kinerja Pegawai AI">
  <ToastContainer />
  <AutoSaveIndicator />
  <KeyboardShortcuts />
  <ZoomControl />
  <ProgressBar />
  <DocumentStats />
  <NotificationPanel />
  <UserProfileModal />
  <SearchModal />
  <ShortcutsHelp />

  <main class="w-full min-h-screen flex flex-col bg-[#0f172a]" x-data="appCore">
    <header class="h-16 border-b border-white/10 bg-slate-900/90 backdrop-blur flex items-center justify-between px-6 fixed top-0 w-full z-40 no-print">
      <div class="flex items-center gap-3">
        <div class="bg-blue-600 p-2 rounded-lg"><Bot class="text-white w-5 h-5" /></div>
        <h1 class="text-sm font-bold text-white hidden md:block">E-KINERJA AI</h1>
      </div>
      <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        <button @click="openSearch" class="btn-icon whitespace-nowrap" title="Cari (Ctrl+K)"><Search class="w-3.5 h-3.5" /> Cari</button>
        <button @click="downloadTemplate" class="btn-icon whitespace-nowrap"><Download class="w-3.5 h-3.5" /> Template</button>
        <label class="btn-icon cursor-pointer whitespace-nowrap">
          Import <input type="file" class="hidden" accept=".xlsx" @change="handleImportExcel" />
        </label>
        <button @click="exportPDF" class="btn-icon text-red-400 border-red-500/30 bg-red-600/20 whitespace-nowrap"><FileText class="w-3.5 h-3.5" /> PDF</button>
        <button @click="exportDOCX" class="btn-icon text-blue-400 border-blue-500/30 bg-blue-600/20 whitespace-nowrap"><FileText class="w-3.5 h-3.5" /> DOCX</button>
        <button @click="saveDraft" class="text-slate-400 hover:text-white p-2" title="Simpan Draft (Ctrl+S)"><Save class="w-5 h-5" /></button>
        <button @click="toggleHistory" class="text-slate-400 hover:text-white p-2" title="Riwayat"><History class="w-5 h-5" /></button>
        <button @click="toggleNotifications" class="relative text-slate-400 hover:text-white p-2" title="Notifikasi">
          <Bell class="w-5 h-5" />
          <span x-show="unreadCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center" x-text="unreadCount"></span>
        </button>
        <div class="w-px h-6 bg-white/10 mx-2"></div>
        <button @click="openUserProfile" class="text-slate-400 hover:text-white p-2" title="Profil"><User class="w-5 h-5" /></button>
        <button @click="openShortcutsHelp" class="text-slate-400 hover:text-white p-2" title="Bantuan (?)"><HelpCircle class="w-5 h-5" /></button>
        <button @click="handleLogout" class="text-red-400 hover:text-red-300 p-2" title="Logout"><LogOut class="w-5 h-5" /></button>
      </div>
    </header>

    <div class="flex-1 mt-16 flex overflow-hidden h-[calc(100vh-64px)]">
      <aside
        class="w-[420px] flex flex-col border-r border-white/10 bg-slate-900 overflow-hidden no-print z-30 shrink-0 transition-all duration-300"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full absolute md:relative md:translate-x-0'"
      >
        <div class="p-4 bg-slate-800/50 border-b border-white/5 space-y-3">
          <div class="grid grid-cols-2 gap-2">
            <SelectGroup label="Bulan" name="bln" model="form.config.bulan" options={Array.from({ length: 12 }, (_, i) => ({ val: String(i + 1), label: String(i + 1) }))} />
            <InputGroup label="Tahun" name="thn" model="form.config.tahun" type="number" />
          </div>
          <SelectGroup
            label="Model AI"
            name="ai"
            model="form.config.modelAI"
            options={[
              { val: "gemini", label: "Gemini 2.0 (Fast)" },
              { val: "groq", label: "Groq Llama 3 (Ultra Fast)" },
              { val: "claude", label: "Claude Sonnet (Smart)" },
              { val: "gpt", label: "GPT-4o Mini" },
              { val: "deepseek", label: "DeepSeek (Economical)" },
              { val: "together", label: "Together AI" },
            ]}
          />
          <InputGroup label="Token Limit" name="tkn" model="form.config.tokenLimit" type="number" />
        </div>

        <div class="flex border-b border-white/5 bg-slate-950/30">
          <template x-for="tab in tabs" :key="tab.id">
            <button
              @click="activeTab = tab.id"
              :class="activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400 bg-white/5' : 'text-slate-500 hover:text-white'"
              class="flex-1 py-3 text-xs font-medium transition text-center"
              x-text="tab.label"
            ></button>
          </template>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
          <div x-show="activeTab === 'instansi'" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 translate-x-2" x-transition:enter-end="opacity-100 translate-x-0">
            <FormInstansi />
          </div>
          <div x-show="activeTab === 'pegawai'" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 translate-x-2" x-transition:enter-end="opacity-100 translate-x-0">
            <FormPegawai />
          </div>
          <div x-show="activeTab === 'akademik'" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 translate-x-2" x-transition:enter-end="opacity-100 translate-x-0">
            <FormAkademik />
          </div>
          <div x-show="activeTab === 'kinerja'" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 translate-x-2" x-transition:enter-end="opacity-100 translate-x-0">
            <FormKinerja />
          </div>
        </div>

        <div class="p-4 border-t border-white/10 bg-slate-900 z-50">
          <button
            @click="generateLaporan"
            :disabled="loading"
            class="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold text-sm flex justify-center items-center gap-2 transition disabled:opacity-50 shadow-lg hover:shadow-blue-500/20"
          >
            <RefreshCw :class="loading && 'animate-spin'" class="w-4 h-4" /> GENERATE & SAVE
          </button>
        </div>
      </aside>

      <button @click="sidebarOpen = !sidebarOpen" class="md:hidden fixed bottom-6 left-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-xl no-print">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <section class="flex-1 bg-slate-200 overflow-y-auto relative flex flex-col items-center py-10 print:p-0 print:bg-white custom-scrollbar w-full">
        <div class="fixed top-24 right-8 z-20 flex flex-col gap-3 no-print">
          <button @click="printDoc" class="p-3 bg-slate-800 text-white rounded-full shadow-xl hover:bg-slate-700 transition hover:scale-105 tooltip" title="Print">
            <Printer class="w-6 h-6" />
          </button>
        </div>

        <div id="document-preview" class="w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none p-[2cm] text-black relative origin-top transition-transform duration-300">
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
            <div class="mb-4 flex justify-center text-slate-300">
              <FileText class="w-16 h-16" />
            </div>
            <p>Konten laporan akan muncul di sini setelah di-generate.</p>
            <p class="text-xs mt-2">Pastikan data di formulir sebelah kiri sudah lengkap.</p>
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

    <div
      x-show="showHistory"
      @click.away="showHistory = false"
      x-transition:enter="transition ease-out duration-300"
      x-transition:enter-start="translate-x-full"
      x-transition:enter-end="translate-x-0"
      class="fixed right-0 top-16 bottom-0 w-80 bg-slate-900 border-l border-white/10 z-30 overflow-y-auto no-print shadow-2xl p-4"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-white font-bold flex items-center gap-2"><History class="w-4 h-4" /> Riwayat Cloud</h3>
        <button @click="refreshHistory" class="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"><RefreshCw class="w-3 h-3" /> Refresh</button>
      </div>

      <div class="space-y-2">
        <template x-if="historyItems.length === 0">
          <div class="text-center text-slate-500 text-xs py-10 flex flex-col items-center">
            <History class="w-8 h-8 mb-2 opacity-50" />
            <span>Belum ada riwayat laporan</span>
          </div>
        </template>
        <template x-for="item in historyItems" :key="item.id">
          <div class="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20 transition group cursor-pointer relative" @click="loadItem(item.id)">
            <div class="flex justify-between items-start mb-1">
              <span class="text-[10px] text-blue-400 font-mono" x-text="formatDate(item.date)"></span>
              <button @click.stop="deleteItem(item.id)" class="text-slate-500 hover:text-red-400 p-1 hover:bg-red-500/10 rounded transition absolute top-2 right-2">✕</button>
            </div>
            <div class="text-sm font-medium text-slate-200 mb-2 truncate pr-6" x-text="item.title"></div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700" x-text="item.status || 'DRAFT'"></span>
              <span class="text-[10px] text-slate-500">Klik untuk buka</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</Layout>

<style>
  @reference "tailwindcss";
  .btn-icon {
    @apply px-3 py-1.5 bg-slate-800 rounded-md text-xs flex gap-2 items-center border border-slate-700 hover:bg-slate-700 transition text-slate-300 cursor-pointer hover:border-slate-500 hover:text-white shadow-sm;
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
  import { fetchActiveInstansi, updateInstansi } from "../services/instansiService";
  import { fetchHistory, loadReportDetail, deleteReport } from "../services/historyService";
  import { getUnreadCount } from "../services/notificationService";
  import { connectWebSocket, disconnectWebSocket } from "../services/websocketService";
  import { parseMarkdown } from "../utils/markdown";
  import { addToast } from "../stores/toastStore";

  document.addEventListener("alpine:init", () => {
    Alpine.data("appCore", () => ({
      tabs: [
        { id: "instansi", label: "1. Instansi" },
        { id: "pegawai", label: "2. Pegawai" },
        { id: "akademik", label: "3. Akademik" },
        { id: "kinerja", label: "4. Kinerja" },
      ],
      activeTab: "pegawai",
      form: reportStore.get(),
      loading: false,
      renderedHTML: "",
      showHistory: false,
      sidebarOpen: true,
      historyItems: [],
      unreadCount: 0,

      async init() {
        if (this.form.output.content) {
          this.renderedHTML = await parseMarkdown(this.form.output.content);
        }

        try {
          await fetchPegawaiProfile();
          await fetchActiveInstansi();
        } catch (e) {
          console.warn("Error fetching initial data:", e);
        }

        this.form = reportStore.get();
        this.refreshHistory();
        this.loadUnreadCount();

        connectWebSocket();

        historyStore.subscribe((val) => {
          this.historyItems = val.items;
        });

        let timeout;
        this.$watch("form", (val) => {
          clearTimeout(timeout);
          window.dispatchEvent(new CustomEvent("autosave:start"));
          timeout = setTimeout(() => {
            reportStore.set(JSON.parse(JSON.stringify(val)));
            window.dispatchEvent(new CustomEvent("autosave:success"));
          }, 800);
        });

        window.addEventListener("ws:notification", () => {
          this.loadUnreadCount();
        });

        window.addEventListener("report:loaded", async (e: any) => {
          this.renderedHTML = e.detail.html;
          this.form = reportStore.get();
        });

        this.registerShortcuts();

        window.addEventListener("beforeunload", () => {
          disconnectWebSocket();
        });
      },

      registerShortcuts() {
        window.addEventListener("shortcut:generate", () => this.generateLaporan());
        window.addEventListener("shortcut:save", () => this.saveDraft());
        window.addEventListener("shortcut:export-pdf", () => this.exportPDF());
        window.addEventListener("shortcut:export-docx", () => this.exportDOCX());
      },

      async loadUnreadCount() {
        const result = await getUnreadCount();
        if (result.success) {
          this.unreadCount = result.count;
        }
      },

      toggleNotifications() {
        window.dispatchEvent(new CustomEvent("toggle:notifications"));
        this.loadUnreadCount();
      },

      openUserProfile() {
        window.dispatchEvent(new CustomEvent("open:user-profile"));
      },

      openSearch() {
        window.dispatchEvent(new CustomEvent("open:search"));
      },

      openShortcutsHelp() {
        window.dispatchEvent(new CustomEvent("open:shortcuts-help"));
      },

      async generateLaporan() {
        const validation = validateBeforeGenerate(this.form);
        if (!validation.valid) {
          addToast("Data belum lengkap: " + validation.errors[0], "error");
          return;
        }

        if (!this.form.instansi.id) {
          const { createManualInstansi } = await import("../services/instansiService");
          addToast("Menyimpan data instansi baru...", "info");
          const saved = await createManualInstansi();
          if (!saved) return;
        }

        this.loading = true;
        window.dispatchEvent(new CustomEvent("generate:start"));

        try {
          const result = await generateLaporan();

          if (result.success && result.content) {
            this.renderedHTML = await parseMarkdown(result.content);
            this.form = reportStore.get();
            window.dispatchEvent(new CustomEvent("generate:complete"));
            addToast(`Sukses! ${result.tokensUsed || 0} token digunakan.`, "success");
            await this.refreshHistory();

            if (window.innerWidth < 768) {
              this.sidebarOpen = false;
              document.getElementById("document-preview")?.scrollIntoView({ behavior: "smooth" });
            }
          } else {
            addToast(result.error || "Gagal generate laporan", "error");
            window.dispatchEvent(new CustomEvent("generate:error"));
          }
        } catch (error) {
          window.dispatchEvent(new CustomEvent("generate:error"));
          addToast("Terjadi kesalahan sistem saat generate", "error");
        } finally {
          this.loading = false;
        }
      },

      async handleUpload(event, field) {
        const file = event.target.files?.[0];
        if (file) {
          if (file.size > 5 * 1024 * 1024) {
            addToast("Ukuran file maksimal 5MB", "error");
            return;
          }

          addToast("Mengupload...", "info");
          const category = field.includes("instansi") ? "LOGO_INSTANSI" : "FOTO_PEGAWAI";
          const result = await uploadFile(file, category);

          if (result.success) {
            const path = field.split(".");
            let target = this.form;
            for (let i = 0; i < path.length - 1; i++) target = target[path[i]];
            target[path[path.length - 1]] = result.url;

            reportStore.set({ ...this.form });
            addToast("Upload berhasil", "success");
          } else {
            addToast("Upload gagal: " + result.error, "error");
          }
        }
      },

      async handleImportExcel(event) {
        const file = event.target.files?.[0];
        if (file) {
          try {
            await importFromExcel(file);
            this.form = reportStore.get();
            addToast("Data diimport dari Excel", "success");
          } catch (e) {
            addToast("Gagal import Excel", "error");
          }
        }
      },

      async saveDraft() {
        const result = await savePegawaiProfile();
        if (result.success) {
          addToast("Data tersimpan di server", "success");
          if (!this.form.instansi.id) {
            const { createManualInstansi } = await import("../services/instansiService");
            await createManualInstansi();
          }
        } else {
          addToast("Gagal menyimpan: " + result.error, "error");
        }
      },

      async updateInstansi() {
        const result = await updateInstansi();
        if (result) {
          addToast("Instansi berhasil diupdate", "success");
        }
      },

      async refreshHistory() {
        await fetchHistory();
      },

      async loadItem(id) {
        if (confirm("Buka laporan ini? Data yang belum disimpan di editor akan tertimpa.")) {
          const success = await loadReportDetail(id);
          if (success) {
            this.form = reportStore.get();
            if (this.form.output.content) {
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
        if (confirm("Hapus laporan ini secara permanen?")) {
          const success = await deleteReport(id);
          if (success) addToast("Laporan dihapus", "success");
          else addToast("Gagal menghapus", "error");
        }
      },

      handleLogout() {
        disconnectWebSocket();
        logout();
      },
      downloadTemplate() {
        downloadTemplate();
      },
      exportPDF() {
        exportToPDF();
      },
      exportDOCX() {
        exportToDOCX();
      },
      printDoc() {
        printDocument();
      },
      toggleHistory() {
        this.showHistory = !this.showHistory;
      },

      getCurrentDate() {
        return new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      },

      formatDate(isoString) {
        if (!isoString) return "-";
        return new Date(isoString).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
        });
      },
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
  --font-serif: "Times New Roman", Times, serif;
}

@layer base {
  body {
    @apply bg-slate-900 text-slate-100 min-h-screen font-sans antialiased;
    background-image:
      radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.1) 0px, transparent 50%),
      radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.1) 0px, transparent 50%);
  }
}

@layer components {
  .glass-panel {
    @apply bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

@layer utilities {
  .prose-report {
    font-family: var(--font-serif);
    color: #000000 !important;
    line-height: 1.5;
    font-size: 12pt;
  }
  .prose-report p {
    margin-bottom: 0.8em;
  }
  .prose-report table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 11pt;
  }
  .prose-report th,
  .prose-report td {
    border: 1px solid #000000;
    padding: 6px 8px;
    vertical-align: top;
  }
  .prose-report th {
    background-color: #f3f4f6 !important;
    font-weight: bold;
    text-align: center;
    print-color-adjust: exact;
  }
  .prose-report h1 {
    font-size: 14pt;
    text-align: center;
    font-weight: bold;
    margin-top: 1.5em;
    margin-bottom: 1em;
    text-transform: uppercase;
  }
  .prose-report h2 {
    font-size: 13pt;
    font-weight: bold;
    margin-top: 1.2rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .prose-report h3 {
    font-size: 12pt;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 0.4rem;
  }
  .prose-report ul,
  .prose-report ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
  .prose-report ul {
    list-style-type: disc;
  }
  .prose-report ol {
    list-style-type: decimal;
  }
  .prose-report li {
    margin-bottom: 0.2em;
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
  }
  .no-print {
    display: none !important;
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
    background: white !important;
  }
  img {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

---

## src/types/AuthTypes.ts

```typescript
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

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
```

---

## src/types/ReportTypes.ts

```typescript
export interface ReportDTO {
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

export interface InstansiDTO {
  header1: string;
  header2: string;
  header3: string;
  alamat: string;
  telepon?: string;
  email?: string;
  website?: string;
  logoUtama?: string;
  logoInstansi?: string;
  namaKepala: string;
  nipKepala: string;
  pangkatKepala: string;
  ttdKepala?: string;
  titimangsa: string;
  isActive?: boolean;
}

export interface AkademikDTO {
  kurikulum: "K13" | "MERDEKA" | "KTSP";
  tahunPelajaran: string;
  semester: "GANJIL" | "GENAP";
  mapel: string;
  kelas: string;
  jamMengajar: number;
  jumlahSiswa: number;
  ekskul?: string;
}

export interface Pejabat {
  nama: string;
  nip: string;
  pangkat: string;
  ttd?: string;
}

export interface InstansiData {
  id?: string;
  logoUtama: string;
  logoInstansi: string;
  header1: string;
  header2: string;
  header3: string;
  alamat: string;
  telepon: string;
  email: string;
  website: string;
  kepala: Pejabat;
  titimangsa: string;
}

export interface PegawaiData {
  id?: string;
  nama: string;
  nip: string;
  nuptk: string;
  nik: string;
  jenis: "PNS" | "PPPK" | "HONORER" | "GTT" | "PTT" | "GURU";
  status: "AKTIF" | "CUTI" | "TUGAS_BELAJAR" | "NON_AKTIF";
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
  kurikulum: "K13" | "MERDEKA" | "KTSP";
  tahunPelajaran: string;
  semester: "GANJIL" | "GENAP";
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
}

export interface OutputData {
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
  status: string;
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
```

---

## src/stores/reportStore.ts

```typescript
import { persistentMap } from "@nanostores/persistent";
import type { AppStore, HistoryStore } from "../types/ReportTypes";

const defaultState: AppStore = {
  instansi: {
    logoUtama: "",
    logoInstansi: "",
    header1: "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
    header2: "KANTOR KABUPATEN PANDEGLANG",
    header3: "MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG",
    alamat:
      "Jl. Raya Labuan Km. 5,7 Palurahan, Kaduhejo, Pandeglang - Banten 42253",
    telepon: "62895351856267",
    email: "adm@mtsn1pandeglang.sch.id",
    website: "https://mtsn1pandeglang.sch.id",
    kepala: {
      nama: "",
      nip: "",
      pangkat: "Pembina/IV-c",
      ttd: "",
    },
    titimangsa: "Pandeglang",
  },
  pegawai: {
    nama: "Yahya Zulfikri",
    nip: "200001142025211016",
    nuptk: "",
    nik: "3601211801000001",
    jenis: "PPPK",
    status: "AKTIF",
    golongan: "III/a",
    jabatan: "Pengadministrasi Perkantoran",
    unitKerja: "Tata Usaha MTs Negeri 1 Pandeglang",
    tempatLahir: "Pandeglang",
    tanggalLahir: "2000-01-04",
    gender: "L",
    alamat: "Kp. Kebon Cau RT 001 RW 005 Pandeglang",
    hp: "628211558571",
    email: "zulfikriyahya18@gmail.com",
    fotoPegawai: "",
    pendidikan: "S1 Sistem Informasi",
    masaKerjaTahun: "0",
    masaKerjaBulan: "5",
  },
  akademik: {
    kurikulum: "MERDEKA",
    tahunPelajaran: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
    semester: "GENAP",
    mapel: "",
    kelas: "",
    jamMengajar: "0",
    jumlahSiswa: "0",
    ekskul: "",
  },
  kinerja: {
    tugasPokok: "Merencanakan, melaksanakan, dan mengevaluasi pembelajaran.",
    tugasTambahan: "Wali Kelas, Piket Harian",
    targetTahunan: "Meningkatkan ketuntasan belajar siswa minimal 85%",
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
    tte: {
      qrCode: "",
      nomorDokumen: "",
      hashDokumen: "",
      timestamp: "",
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

export const validateBeforeGenerate = (
  data: AppStore,
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.pegawai.nama) errors.push("Nama pegawai harus diisi");
  if (!data.pegawai.nip) errors.push("NIP harus diisi");
  if (!data.pegawai.jabatan) errors.push("Jabatan harus diisi");
  if (!data.config.bulan) errors.push("Bulan laporan harus dipilih");
  if (!data.config.tahun) errors.push("Tahun laporan harus diisi");
  if (!data.kinerja.tugasPokok) errors.push("Tugas pokok harus diisi");

  if (data.pegawai.email && data.pegawai.email.trim() !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.pegawai.email)) {
      errors.push("Format email tidak valid");
    }
  }

  const validStatus = ["AKTIF", "CUTI", "TUGAS_BELAJAR", "NON_AKTIF"];
  if (!validStatus.includes(data.pegawai.status)) {
    errors.push("Status pegawai tidak valid");
  }

  return { valid: errors.length === 0, errors };
};
```

---

## src/stores/authStore.ts

```typescript
import { persistentMap } from "@nanostores/persistent";
import type { AuthState } from "../types/AuthTypes";

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
  const currentToasts = $toasts.get();

  if (currentToasts.some((t) => t.message === message && t.type === type)) {
    return;
  }

  $toasts.set([...currentToasts, { id, message, type }]);

  setTimeout(() => {
    $toasts.set($toasts.get().filter((t) => t.id !== id));
  }, 4000);
};
```

---

## src/utils/api.ts

```typescript
import axios from "axios";
import { getToken, logout } from "../services/authService";

const BASE_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3000/api";

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
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
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
  if (!name) return "dokumen";
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

export const formatDateIndonesia = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const debounce = (func: Function, wait: number) => {
  let timeout: any;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getBulanIndonesia = (bulan: number): string => {
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
  return namaBulan[bulan - 1] || "";
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

  renderer.list = (body: string, ordered: boolean, start: number) => {
    const type = ordered ? "ol" : "ul";
    const startAttr = ordered && start !== 1 ? ` start="${start}"` : "";
    return `<${type}${startAttr} class="report-list">${body}</${type}>`;
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
      "hr",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "del",
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
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "class",
      "id",
      "start",
      "align",
      "style",
    ],
  });
};
```

---

## src/layouts/Layout.astro

```astro
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
    <link
      href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <meta name="description" content="Aplikasi Generator Laporan Kinerja Pegawai Berbasis AI untuk ASN, PPPK, dan Guru. Cepat, Mudah, dan Akurat." />
    <meta name="theme-color" content="#0f172a" />
  </head>
  <body class="bg-slate-900 text-slate-100 min-h-screen font-sans antialiased overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
    <slot />
    <script>
      import { checkAuth } from "../services/authService";

      const path = window.location.pathname;
      const publicPages = ["/login", "/register"];
      const isPublicPage = publicPages.some((p) => path.startsWith(p));

      if (!isPublicPage && !checkAuth()) {
        window.location.href = "/login";
      } else if (isPublicPage && checkAuth()) {
        window.location.href = "/";
      }
    </script>
  </body>
</html>```

---

## src/services/userService.ts

```typescript
import api from "../utils/api";

export const fetchUserProfile = async () => {
  try {
    const response = await api.get("/users/me");
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal mengambil profil",
    };
  }
};

export const updateUserProfile = async (data: {
  name?: string;
  email?: string;
}) => {
  try {
    const response = await api.patch("/users/me", data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal update profil",
    };
  }
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
) => {
  try {
    await api.post("/auth/change-password", { oldPassword, newPassword });
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal mengubah password",
    };
  }
};
```

---

## src/services/reportService.ts

```typescript
import api from "../utils/api";
import { reportStore } from "../stores/reportStore";
import type { ReportDTO } from "../types/ReportTypes";

export const fetchMyReports = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(
      `/reports/my-reports?page=${page}&limit=${limit}`,
    );
    return {
      success: true,
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal mengambil laporan",
    };
  }
};

export const fetchReportById = async (id: string) => {
  try {
    const response = await api.get(`/reports/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal mengambil detail laporan",
    };
  }
};

export const updateReport = async (id: string, data: Partial<ReportDTO>) => {
  try {
    const response = await api.patch(`/reports/${id}`, data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal update laporan",
    };
  }
};

export const submitReport = async (id: string) => {
  try {
    const response = await api.post(`/reports/${id}/submit`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal submit laporan",
    };
  }
};

export const deleteReportById = async (id: string) => {
  try {
    await api.delete(`/reports/${id}`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal menghapus laporan",
    };
  }
};

export const exportReportToPDF = async (id: string) => {
  try {
    const response = await api.get(`/reports/${id}/export/pdf`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `laporan_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal export PDF",
    };
  }
};

export const exportReportToDOCX = async (id: string) => {
  try {
    const response = await api.get(`/reports/${id}/export/docx`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `laporan_${id}.docx`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal export DOCX",
    };
  }
};
```

---

## src/services/excelService.ts

```typescript
import * as XLSX from "xlsx";
import { reportStore } from "../stores/reportStore";
import type { AppStore } from "../types/ReportTypes";

export const downloadTemplate = () => {
  const ws = XLSX.utils.json_to_sheet([
    {
      "Nama Lengkap": "Ahmad Dahlan",
      NIP: "198501012010011001",
      Jabatan: "Guru Ahli Pertama",
      "Status Pegawai": "AKTIF",
      "Jenis Pegawai": "PNS",
      "Tugas Pokok": "Melaksanakan pembelajaran...",
      "Tugas Tambahan": "Wali Kelas",
      "Target Tahunan": "Lulus 100%",
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

          const normalizeStatus = (val: string): any => {
            const v = val?.toString().toUpperCase().replace(" ", "_");
            if (["AKTIF", "CUTI", "TUGAS_BELAJAR", "NON_AKTIF"].includes(v))
              return v;
            return "AKTIF";
          };

          const normalizeJenis = (val: string): any => {
            const v = val?.toString().toUpperCase();
            if (["PNS", "PPPK", "HONORER", "GTT", "PTT", "GURU"].includes(v))
              return v;
            return "PNS";
          };

          const updated: AppStore = {
            ...current,
            pegawai: {
              ...current.pegawai,
              nama: row["Nama Lengkap"] || current.pegawai.nama,
              nip: String(row["NIP"] || current.pegawai.nip),
              jabatan: row["Jabatan"] || current.pegawai.jabatan,
              status: normalizeStatus(row["Status Pegawai"]),
              jenis: normalizeJenis(row["Jenis Pegawai"]),
            },
            kinerja: {
              ...current.kinerja,
              tugasPokok: row["Tugas Pokok"] || current.kinerja.tugasPokok,
              tugasTambahan:
                row["Tugas Tambahan"] || current.kinerja.tugasTambahan,
              targetTahunan:
                row["Target Tahunan"] || current.kinerja.targetTahunan,
            },
          };

          reportStore.set(updated);
        }
        resolve(true);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};
```

---

## src/services/websocketService.ts

```typescript
import { io, Socket } from "socket.io-client";
import { getToken } from "./authService";

let socket: Socket | null = null;

export const connectWebSocket = () => {
  const token = getToken();
  if (!token) return null;

  const BASE_URL =
    import.meta.env.PUBLIC_API_URL?.replace("/api", "") ||
    "http://localhost:3000";

  socket = io(`${BASE_URL}/notifications`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
  });

  socket.on("connected", (data) => {
    console.log("WebSocket connected:", data);
  });

  socket.on("notification", (notification) => {
    window.dispatchEvent(
      new CustomEvent("ws:notification", { detail: notification }),
    );
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });

  return socket;
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToChannel = (channel: string) => {
  if (socket) {
    socket.emit("subscribe", { channel });
  }
};

export const unsubscribeFromChannel = (channel: string) => {
  if (socket) {
    socket.emit("unsubscribe", { channel });
  }
};

export const getSocket = () => socket;
```

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

    const apiBaseUrl =
      import.meta.env.PUBLIC_API_URL?.replace("/api", "") ||
      "http://localhost:3000";
    const fullUrl = response.data.url.startsWith("http")
      ? response.data.url
      : `${apiBaseUrl}${response.data.url}`;

    return {
      success: true,
      url: fullUrl,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Upload failed",
    };
  }
};

export const uploadBase64 = async (
  base64Data: string,
  category: string = "OTHER",
) => {
  try {
    const response = await api.post("/files/upload-base64", {
      data: base64Data,
      category: category,
    });

    const apiBaseUrl =
      import.meta.env.PUBLIC_API_URL?.replace("/api", "") ||
      "http://localhost:3000";
    const fullUrl = response.data.url.startsWith("http")
      ? response.data.url
      : `${apiBaseUrl}${response.data.url}`;

    return {
      success: true,
      url: fullUrl,
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

## src/services/notificationService.ts

```typescript
import api from "../utils/api";

export const fetchNotifications = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(
      `/notifications?page=${page}&limit=${limit}`,
    );
    return {
      success: true,
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal mengambil notifikasi",
    };
  }
};

export const getUnreadCount = async () => {
  try {
    const response = await api.get("/notifications/unread-count");
    return {
      success: true,
      count: response.data.count,
    };
  } catch (error: any) {
    return {
      success: false,
      count: 0,
    };
  }
};

export const markAsRead = async (id: string) => {
  try {
    await api.patch(`/notifications/${id}/read`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal menandai sebagai dibaca",
    };
  }
};

export const markAllAsRead = async () => {
  try {
    await api.patch("/notifications/read-all");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.message || "Gagal menandai semua sebagai dibaca",
    };
  }
};

export const deleteNotification = async (id: string) => {
  try {
    await api.delete(`/notifications/${id}`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Gagal menghapus notifikasi",
    };
  }
};
```

---

## src/services/exportService.ts

```typescript
import { reportStore } from "../stores/reportStore";
import { sanitizeFilename, getBulanIndonesia } from "../utils/helpers";

export const exportToPDF = async () => {
  try {
    const element = document.getElementById("document-preview");
    if (!element) throw new Error("Preview not found");

    const html2pdf = (await import("html2pdf.js")).default;
    const store = reportStore.get();
    const filename = `Laporan_${store.config.bulan}_${store.config.tahun}_${sanitizeFilename(store.pegawai.nama)}.pdf`;

    const opt = {
      margin: [1.5, 2, 1.5, 2],
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    await html2pdf().set(opt).from(element).save();
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const exportToDOCX = async () => {
  try {
    const store = reportStore.get();
    const {
      Document,
      Packer,
      Paragraph,
      TextRun,
      AlignmentType,
      HeadingLevel,
      Table,
      TableRow,
      TableCell,
      WidthType,
      BorderStyle,
    } = await import("docx");
    const { saveAs } = await import("file-saver");

    const children: any[] = [];

    children.push(
      new Paragraph({
        text: store.instansi.header1,
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: store.instansi.header2,
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: store.instansi.header3,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: store.instansi.alamat,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        border: {
          bottom: {
            color: "000000",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        text: "LAPORAN KINERJA PEGAWAI",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: `Periode: ${getBulanIndonesia(parseInt(store.config.bulan))} ${store.config.tahun}`,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({ text: "" }),
    );

    const lines = store.output.content.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ")) {
        children.push(
          new Paragraph({
            text: trimmed.replace("## ", ""),
            heading: HeadingLevel.HEADING_1,
          }),
        );
      } else if (trimmed.startsWith("### ")) {
        children.push(
          new Paragraph({
            text: trimmed.replace("### ", ""),
            heading: HeadingLevel.HEADING_2,
          }),
        );
      } else if (trimmed !== "") {
        children.push(new Paragraph({ text: trimmed }));
      }
    }

    children.push(
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [],
                width: { size: 50, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: `${store.instansi.titimangsa}, ${new Date().toLocaleDateString("id-ID")}`,
                    alignment: AlignmentType.CENTER,
                  }),
                  new Paragraph({
                    text: "Pejabat Penilai,",
                    alignment: AlignmentType.CENTER,
                  }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ text: "" }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: store.instansi.kepala.nama,
                        bold: true,
                        underline: { type: "single" },
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
                  }),
                  new Paragraph({
                    text: `NIP. ${store.instansi.kepala.nip}`,
                    alignment: AlignmentType.CENTER,
                  }),
                ],
                width: { size: 50, type: WidthType.PERCENTAGE },
              }),
            ],
          }),
        ],
      }),
    );

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: children,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const filename = `Laporan_${store.config.bulan}_${store.config.tahun}_${sanitizeFilename(store.pegawai.nama)}.docx`;
    saveAs(blob, filename);
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
      error: Array.isArray(error.response?.data?.message)
        ? error.response.data.message.join(", ")
        : error.response?.data?.message || "Registration failed",
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
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

export const getToken = () => {
  return authStore.get().token;
};

export const checkAuth = () => {
  return authStore.get().isAuthenticated;
};

export const getCurrentUser = () => {
  return authStore.get().user;
};
```

---

## src/services/pegawaiService.ts

```typescript
import api from "../utils/api";
import { reportStore, updateStore } from "../stores/reportStore";
import type { PegawaiDTO, AkademikDTO } from "../types/ReportTypes";

export const fetchPegawaiProfile = async () => {
  try {
    const response = await api.get("/pegawai/me");
    const data = response.data;

    if (data) {
      updateStore("pegawai", {
        id: data.id,
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

      if (data.akademik) {
        updateStore("akademik", {
          kurikulum: data.akademik.kurikulum,
          tahunPelajaran: data.akademik.tahunPelajaran,
          semester: data.akademik.semester,
          mapel: data.akademik.mapel || "",
          kelas: data.akademik.kelas || "",
          jamMengajar: String(data.akademik.jamMengajar || 0),
          jumlahSiswa: String(data.akademik.jumlahSiswa || 0),
          ekskul: data.akademik.ekskul || "",
        });
      }
      return true;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    console.warn("Gagal fetch pegawai:", error);
    return false;
  }
};

export const savePegawaiProfile = async () => {
  const store = reportStore.get();

  const formatDateToISO = (
    dateString: string | undefined,
  ): string | undefined => {
    if (!dateString || dateString.trim() === "") return undefined;

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return undefined;
      return date.toISOString();
    } catch {
      return undefined;
    }
  };

  const payload: PegawaiDTO = {
    nama: store.pegawai.nama,
    nip: store.pegawai.nip,
    jenisPegawai: store.pegawai.jenis,
    statusPegawai: store.pegawai.status,
    jabatan: store.pegawai.jabatan,
    unitKerja: store.pegawai.unitKerja,
    gender: store.pegawai.gender,
    golongan: store.pegawai.golongan || undefined,
    nuptk: store.pegawai.nuptk || undefined,
    nik: store.pegawai.nik || undefined,
    tempatLahir: store.pegawai.tempatLahir || undefined,
    tanggalLahir: formatDateToISO(store.pegawai.tanggalLahir),
    alamat: store.pegawai.alamat || undefined,
    hp: store.pegawai.hp || undefined,
    email: store.pegawai.email || undefined,
    pendidikan: store.pegawai.pendidikan || undefined,
    masaKerjaTahun: parseInt(store.pegawai.masaKerjaTahun) || 0,
    masaKerjaBulan: parseInt(store.pegawai.masaKerjaBulan) || 0,
    fotoPegawai: store.pegawai.fotoPegawai || undefined,
  };

  try {
    let response;
    const check = await api.get("/pegawai/me").catch(() => null);

    if (check && check.data && check.data.id) {
      response = await api.patch(`/pegawai/${check.data.id}`, payload);
      if (store.pegawai.id !== check.data.id) {
        updateStore("pegawai", { ...store.pegawai, id: check.data.id });
      }
    } else {
      response = await api.post("/pegawai", payload);
      if (response.data && response.data.id) {
        updateStore("pegawai", { ...store.pegawai, id: response.data.id });
      }
    }

    if (
      store.akademik.mapel &&
      store.akademik.kelas &&
      store.akademik.jamMengajar
    ) {
      const akademikPayload: AkademikDTO = {
        kurikulum: store.akademik.kurikulum,
        tahunPelajaran: store.akademik.tahunPelajaran,
        semester: store.akademik.semester,
        mapel: store.akademik.mapel,
        kelas: store.akademik.kelas,
        jamMengajar: parseInt(store.akademik.jamMengajar) || 0,
        jumlahSiswa: parseInt(store.akademik.jumlahSiswa) || 0,
        ekskul: store.akademik.ekskul || undefined,
      };

      const pegawaiId = response.data.id || check?.data?.id;
      if (pegawaiId) {
        try {
          await api.post(`/pegawai/${pegawaiId}/akademik`, akademikPayload);
        } catch (err) {
          console.warn("Gagal menyimpan akademik:", err);
        }
      }
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMsg = Array.isArray(error.response?.data?.message)
      ? error.response.data.message.join(", ")
      : error.response?.data?.message || "Gagal menyimpan data pegawai";

    return {
      success: false,
      error: errorMsg,
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

  const profileSave = await savePegawaiProfile();
  if (!profileSave.success) {
    return {
      success: false,
      error: `Gagal menyimpan profil: ${profileSave.error}`,
    };
  }

  const payload: ReportDTO = {
    modelAI: store.config.modelAI,
    bulan: parseInt(store.config.bulan),
    tahun: parseInt(store.config.tahun),
    tugasPokok: store.kinerja.tugasPokok,
    tugasTambahan: store.kinerja.tugasTambahan,
    targetTahunan: store.kinerja.targetTahunan,
    hambatan: store.kinerja.hambatan,
    solusi: store.kinerja.solusi,
    tokenLimit: parseInt(String(store.config.tokenLimit)) || 2000,
    customInstruction: store.config.customInstruction,
  };

  try {
    const response = await api.post("/reports/generate", payload);
    const data = response.data;

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

    if (data.pegawai) {
      const p = data.pegawai;
      const mappedPegawai = {
        ...current.pegawai,
        id: p.id,
        nama: p.nama,
        nip: p.nip,
        jenis: p.jenisPegawai,
        status: p.statusPegawai,
        jabatan: p.jabatan,
        unitKerja: p.unitKerja,
        golongan: p.golongan || "",
        masaKerjaTahun: String(p.masaKerjaTahun || 0),
        masaKerjaBulan: String(p.masaKerjaBulan || 0),
      };

      reportStore.set({ ...reportStore.get(), pegawai: mappedPegawai });
    }

    if (data.instansi) {
      const inst = data.instansi;
      const apiBaseUrl =
        import.meta.env.PUBLIC_API_URL?.replace("/api", "") ||
        "http://localhost:3000";
      const normalizeUrl = (url: string) => {
        if (!url) return "";
        return url.startsWith("http") ? url : `${apiBaseUrl}${url}`;
      };

      const mappedInstansi = {
        ...current.instansi,
        id: inst.id,
        header1: inst.header1,
        header2: inst.header2,
        header3: inst.header3,
        alamat: inst.alamat,
        telepon: inst.telepon || "",
        email: inst.email || "",
        website: inst.website || "",
        logoUtama: normalizeUrl(inst.logoUtama || ""),
        logoInstansi: normalizeUrl(inst.logoInstansi || ""),
        titimangsa: inst.titimangsa,
        kepala: {
          nama: inst.namaKepala,
          nip: inst.nipKepala,
          pangkat: inst.pangkatKepala,
          ttd: normalizeUrl(inst.ttdKepala || ""),
        },
      };

      reportStore.set({ ...reportStore.get(), instansi: mappedInstansi });
    }

    return true;
  } catch (error) {
    console.error("Gagal memuat laporan:", error);
    return false;
  }
};

export const deleteReport = async (id: string) => {
  try {
    await api.delete(`/reports/${id}`);
    await fetchHistory();
    return true;
  } catch (error) {
    return false;
  }
};
```

---

## src/services/instansiService.ts

```typescript
import api from "../utils/api";
import { reportStore, updateStore } from "../stores/reportStore";
import type { InstansiDTO } from "../types/ReportTypes";
import { addToast } from "../stores/toastStore";

export const fetchActiveInstansi = async () => {
  try {
    const response = await api.get("/instansi/active").catch((err) => {
      if (err.response && err.response.status === 404) return null;
      throw err;
    });

    if (response && response.data) {
      const data = response.data;

      const apiBaseUrl =
        import.meta.env.PUBLIC_API_URL?.replace("/api", "") ||
        "http://localhost:3000";
      const normalizeUrl = (url: string) => {
        if (!url) return "";
        return url.startsWith("http") ? url : `${apiBaseUrl}${url}`;
      };

      updateStore("instansi", {
        id: data.id,
        header1: data.header1,
        header2: data.header2,
        header3: data.header3,
        alamat: data.alamat,
        telepon: data.telepon || "",
        email: data.email || "",
        website: data.website || "",
        logoUtama: normalizeUrl(data.logoUtama || ""),
        logoInstansi: normalizeUrl(data.logoInstansi || ""),
        titimangsa: data.titimangsa,
        kepala: {
          nama: data.namaKepala,
          nip: data.nipKepala,
          pangkat: data.pangkatKepala,
          ttd: normalizeUrl(data.ttdKepala || ""),
        },
      });
      return true;
    }
    return false;
  } catch (error) {
    console.warn("Gagal mengambil data instansi:", error);
    return false;
  }
};

export const createManualInstansi = async () => {
  const store = reportStore.get();

  const payload: InstansiDTO = {
    header1: store.instansi.header1 || "HEADER 1",
    header2: store.instansi.header2 || "HEADER 2",
    header3: store.instansi.header3 || "NAMA INSTANSI",
    alamat: store.instansi.alamat || "Alamat Instansi",
    telepon: store.instansi.telepon,
    email: store.instansi.email,
    website: store.instansi.website,
    logoUtama: store.instansi.logoUtama,
    logoInstansi: store.instansi.logoInstansi,
    namaKepala: store.instansi.kepala.nama || "Nama Kepala",
    nipKepala: store.instansi.kepala.nip || "NIP Kepala",
    pangkatKepala: store.instansi.kepala.pangkat || "Pangkat",
    ttdKepala: store.instansi.kepala.ttd,
    titimangsa: store.instansi.titimangsa || "Kota",
    isActive: true,
  };

  try {
    const res = await api.post("/instansi", payload);
    if (res.data) {
      updateStore("instansi", { ...store.instansi, id: res.data.id });
      addToast("Instansi berhasil disimpan ke server", "success");
      return true;
    }
  } catch (e: any) {
    const errorMsg = Array.isArray(e.response?.data?.message)
      ? e.response.data.message.join(", ")
      : e.response?.data?.message || e.message;
    addToast("Gagal menyimpan instansi: " + errorMsg, "error");
    return false;
  }
  return false;
};

export const updateInstansi = async () => {
  const store = reportStore.get();

  if (!store.instansi.id) {
    return createManualInstansi();
  }

  const payload: InstansiDTO = {
    header1: store.instansi.header1,
    header2: store.instansi.header2,
    header3: store.instansi.header3,
    alamat: store.instansi.alamat,
    telepon: store.instansi.telepon,
    email: store.instansi.email,
    website: store.instansi.website,
    logoUtama: store.instansi.logoUtama,
    logoInstansi: store.instansi.logoInstansi,
    namaKepala: store.instansi.kepala.nama,
    nipKepala: store.instansi.kepala.nip,
    pangkatKepala: store.instansi.kepala.pangkat,
    ttdKepala: store.instansi.kepala.ttd,
    titimangsa: store.instansi.titimangsa,
  };

  try {
    await api.patch(`/instansi/${store.instansi.id}`, payload);
    addToast("Instansi berhasil diupdate", "success");
    return true;
  } catch (e: any) {
    const errorMsg = Array.isArray(e.response?.data?.message)
      ? e.response.data.message.join(", ")
      : e.response?.data?.message || "Gagal update instansi";
    addToast("Gagal update instansi: " + errorMsg, "error");
    return false;
  }
};
```

---

## .env

```
PUBLIC_API_URL=http://localhost:3000/api```

---

## .astro/data-store.json

```json
[["Map",1,2],"meta::meta",["Map",3,4,5,6],"astro-version","5.17.1","astro-config-digest","{\"root\":{},\"srcDir\":{},\"publicDir\":{},\"outDir\":{},\"cacheDir\":{},\"compressHTML\":true,\"base\":\"/\",\"trailingSlash\":\"ignore\",\"output\":\"static\",\"scopedStyleStrategy\":\"attribute\",\"build\":{\"format\":\"directory\",\"client\":{},\"server\":{},\"assets\":\"_astro\",\"serverEntry\":\"entry.mjs\",\"redirects\":true,\"inlineStylesheets\":\"auto\",\"concurrency\":1},\"server\":{\"open\":false,\"host\":false,\"port\":4321,\"streaming\":true,\"allowedHosts\":[]},\"redirects\":{},\"image\":{\"endpoint\":{\"route\":\"/_image\"},\"service\":{\"entrypoint\":\"astro/assets/services/sharp\",\"config\":{}},\"domains\":[],\"remotePatterns\":[],\"responsiveStyles\":false},\"devToolbar\":{\"enabled\":true},\"markdown\":{\"syntaxHighlight\":{\"type\":\"shiki\",\"excludeLangs\":[\"math\"]},\"shikiConfig\":{\"langs\":[],\"langAlias\":{},\"theme\":\"github-dark\",\"themes\":{},\"wrap\":false,\"transformers\":[]},\"remarkPlugins\":[],\"rehypePlugins\":[],\"remarkRehype\":{},\"gfm\":true,\"smartypants\":true},\"security\":{\"checkOrigin\":true,\"allowedDomains\":[]},\"env\":{\"schema\":{},\"validateSecrets\":false},\"experimental\":{\"clientPrerender\":false,\"contentIntellisense\":false,\"headingIdCompat\":false,\"preserveScriptOrder\":false,\"liveContentCollections\":false,\"csp\":false,\"staticImportMetaEnv\":false,\"chromeDevtoolsWorkspace\":false,\"failOnPrerenderConflict\":false,\"svgo\":false},\"legacy\":{\"collections\":false}}"]```

---

## .astro/types.d.ts

```typescript
/// <reference types="astro/client" />
```

---

## .astro/content.d.ts

```typescript
declare module 'astro:content' {
	export interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

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
	export type ReferenceLiveEntry<C extends keyof LiveContentConfig['collections']> = {
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
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getLiveCollection<C extends keyof LiveContentConfig['collections']>(
		collection: C,
		filter?: LiveLoaderCollectionFilterType<C>,
	): Promise<
		import('astro').LiveDataCollectionResult<LiveLoaderDataType<C>, LiveLoaderErrorType<C>>
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
	export function getLiveEntry<C extends keyof LiveContentConfig['collections']>(
		collection: C,
		filter: string | LiveLoaderEntryFilterType<C>,
	): Promise<import('astro').LiveDataEntryResult<LiveLoaderDataType<C>, LiveLoaderErrorType<C>>>;

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
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? ReferenceContentEntry<C, ValidContentEntrySlug<C>>
			: ReferenceDataEntry<C, keyof DataEntryMap[C]>
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		
	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ExtractLoaderTypes<T> = T extends import('astro/loaders').LiveLoader<
		infer TData,
		infer TEntryFilter,
		infer TCollectionFilter,
		infer TError
	>
		? { data: TData; entryFilter: TEntryFilter; collectionFilter: TCollectionFilter; error: TError }
		: { data: never; entryFilter: never; collectionFilter: never; error: never };
	type ExtractDataType<T> = ExtractLoaderTypes<T>['data'];
	type ExtractEntryFilterType<T> = ExtractLoaderTypes<T>['entryFilter'];
	type ExtractCollectionFilterType<T> = ExtractLoaderTypes<T>['collectionFilter'];
	type ExtractErrorType<T> = ExtractLoaderTypes<T>['error'];

	type LiveLoaderDataType<C extends keyof LiveContentConfig['collections']> =
		LiveContentConfig['collections'][C]['schema'] extends undefined
			? ExtractDataType<LiveContentConfig['collections'][C]['loader']>
			: import('astro/zod').infer<
					Exclude<LiveContentConfig['collections'][C]['schema'], undefined>
				>;
	type LiveLoaderEntryFilterType<C extends keyof LiveContentConfig['collections']> =
		ExtractEntryFilterType<LiveContentConfig['collections'][C]['loader']>;
	type LiveLoaderCollectionFilterType<C extends keyof LiveContentConfig['collections']> =
		ExtractCollectionFilterType<LiveContentConfig['collections'][C]['loader']>;
	type LiveLoaderErrorType<C extends keyof LiveContentConfig['collections']> = ExtractErrorType<
		LiveContentConfig['collections'][C]['loader']
	>;

	export type ContentConfig = typeof import("../src/content.config.mjs");
	export type LiveContentConfig = never;
}
```

---

## .astro/content-assets.mjs

```javascript
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

```
```

---

