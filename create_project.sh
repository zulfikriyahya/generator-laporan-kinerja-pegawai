#!/usr/bin/env bash
set -euo pipefail

# Daftar file yang ingin dibuat. 
# Untuk direktori yang hanya perlu ada, gunakan file .gitkeep agar direktori dibuat.
files=(
  "prisma/schema.prisma"
  "prisma/migrations/.gitkeep"
  "prisma/seed.ts"

  "src/main.ts"
  "src/app.module.ts"

  "src/common/prisma/prisma.module.ts"
  "src/common/prisma/prisma.service.ts"
  "src/common/filters/.gitkeep"
  "src/common/interceptors/.gitkeep"
  "src/common/guards/.gitkeep"
  "src/common/decorators/.gitkeep"

  "src/config/database.config.ts"
  "src/config/redis.config.ts"
  "src/config/jwt.config.ts"

  "src/modules/auth/auth.module.ts"
  "src/modules/auth/auth.service.ts"
  "src/modules/auth/auth.controller.ts"
  "src/modules/auth/dto/index.ts"
  "src/modules/auth/interfaces/index.ts"
  "src/modules/auth/strategies/jwt.strategy.ts"
  "src/modules/auth/strategies/local.strategy.ts"
  "src/modules/auth/strategies/jwt-refresh.strategy.ts"
  "src/modules/auth/guards/index.ts"
  "src/modules/auth/decorators/index.ts"

  "src/modules/users/users.module.ts"
  "src/modules/users/users.service.ts"
  "src/modules/users/users.controller.ts"
  "src/modules/users/dto/.gitkeep"
  "src/modules/users/entities/.gitkeep"

  "src/modules/pegawai/pegawai.module.ts"
  "src/modules/pegawai/pegawai.service.ts"
  "src/modules/pegawai/pegawai.controller.ts"
  "src/modules/pegawai/dto/create-pegawai.dto.ts"
  "src/modules/pegawai/dto/update-pegawai.dto.ts"
  "src/modules/pegawai/entities/.gitkeep"

  "src/modules/reports/reports.module.ts"
  "src/modules/reports/reports.service.ts"
  "src/modules/reports/reports.controller.ts"
  "src/modules/reports/dto/generate-report.dto.ts"
  "src/modules/reports/queues/report.queue.ts"
  "src/modules/reports/processors/report.processor.ts"
  "src/modules/reports/services/pdf-export.service.ts"
  "src/modules/reports/services/docx-export.service.ts"

  "src/modules/ai/ai.module.ts"
  "src/modules/ai/ai.service.ts"
  "src/modules/ai/ai.controller.ts"
  "src/modules/ai/providers/gemini.provider.ts"
  "src/modules/ai/providers/claude.provider.ts"
  "src/modules/ai/providers/openai.provider.ts"
  "src/modules/ai/providers/groq.provider.ts"
  "src/modules/ai/providers/together.provider.ts"
  "src/modules/ai/providers/deepseek.provider.ts"
  "src/modules/ai/interfaces/ai-provider.interface.ts"
  "src/modules/ai/dto/.gitkeep"

  "src/modules/files/files.module.ts"
  "src/modules/files/files.service.ts"
  "src/modules/files/files.controller.ts"
  "src/modules/files/dto/.gitkeep"

  "src/modules/instansi/instansi.module.ts"
  "src/modules/instansi/instansi.service.ts"
  "src/modules/instansi/instansi.controller.ts"
  "src/modules/instansi/dto/.gitkeep"

  "src/modules/notifications/notifications.module.ts"
  "src/modules/notifications/notifications.service.ts"
  "src/modules/notifications/notifications.controller.ts"
  "src/modules/notifications/notifications.gateway.ts"
  "src/modules/notifications/dto/.gitkeep"

  "src/modules/audit/audit.module.ts"
  "src/modules/audit/audit.service.ts"
  "src/modules/audit/audit.controller.ts"
  "src/modules/audit/interceptors/audit.interceptor.ts"

  "src/modules/health/health.module.ts"
  "src/modules/health/health.controller.ts"

  "src/utils/helpers.ts"
  "src/utils/validators.ts"
  "src/utils/constants.ts"

  "test/unit/.gitkeep"
  "test/e2e/.gitkeep"
  "test/jest-e2e.json"

  "logs/.gitkeep"
  "uploads/.gitkeep"

  ".env"
  ".env.example"
  ".eslintrc.js"
  ".prettierrc"
  ".gitignore"

  "tsconfig.json"
  "nest-cli.json"
  "package.json"

  "Dockerfile"
  "docker-compose.yml"

  "README.md"
  "SETUP_GUIDE.md"
  "API_DOCUMENTATION.md"
  "PROJECT_STRUCTURE.md"
)

# Fungsi untuk membuat file dengan validasi
create_file() {
  local file_path="$1"
  local dir
  dir=$(dirname "$file_path")

  # Buat direktori jika belum ada
  if [ ! -d "$dir" ]; then
    mkdir -p "$dir"
    echo "Membuat direktori: $dir"
  fi

  # Jika file sudah ada, skip; jika belum, buat
  if [ -e "$file_path" ]; then
    echo "Lewati file sudah ada: $file_path"
  else
    # Untuk file .env dan .gitignore mungkin ingin isi default, tapi di sini kita buat kosong
    touch "$file_path"
    echo "Dibuat file: $file_path"
  fi
}

# Loop semua file
for f in "${files[@]}"; do
  create_file "$f"
done

echo "Selesai. Struktur proyek telah dibuat atau diverifikasi."
