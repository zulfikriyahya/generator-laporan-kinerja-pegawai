#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

OUTPUT="draft.md"

# Direktori yang ingin dikecualikan (prune)
EXCLUDE_PATHS=(
  "./node_modules"
  "./dist"
  "./.vscode"
  "./.git"
  "./prisma/migrations"
  "./logs"
  "./uploads"
  "./test"
)

# Nama file yang ingin dikecualikan
EXCLUDE_NAMES=(
  "draft.md"
  "generate.sh"
  "pnpm-lock.yaml"
  "package-lock.json"
  "yarn.lock"
  "bun.lock"
  "README.md"
  "LICENSE"
  "tree.txt"
  ".gitignore"
  ".gitkeep"
  "TODO.md"
  ".env.example"
  "maintenance.html"
  "*.spec.ts"
  "*.mock.ts"
)

# Ekstensi biner yang tidak akan dimasukkan
BINARY_EXTENSIONS=(
  "png" "jpg" "jpeg" "gif" "svg"
  "mp3" "wav" "ogg"
  "mp4" "mkv" "avi"
  "pdf" "db" "sqlite" "ico" "sh" "md"
)

# Mulai file output kosong
: > "$OUTPUT"

# Tampilkan tree (jika tersedia) atau fallback
echo "# Project Files" >> "$OUTPUT"
echo "" >> "$OUTPUT"
if command -v tree >/dev/null 2>&1; then
  # tree exclude pattern: gabungkan nama direktori dan file (tanpa leading ./)
  TREE_EXCLUDES=$(printf "%s|" "${EXCLUDE_PATHS[@]}" | sed 's|./||g; s/|$//')
  tree -I "$TREE_EXCLUDES" >> "$OUTPUT" || true
else
  # fallback: daftar file/direktori (sederhana)
  find . -maxdepth 2 -mindepth 1 -print | sed 's|^\./||' >> "$OUTPUT"
fi
echo "" >> "$OUTPUT"
echo "# File Contents" >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Tentukan bahasa untuk code fence
get_lang() {
  local filename="$1"
  local ext="${filename##*.}"
  local base="$(basename "$filename")"
  ext="${ext,,}"

  case "$base" in
    Dockerfile) echo "dockerfile"; return ;;
    Makefile) echo "makefile"; return ;;
    tsconfig.json|package.json) echo "json"; return ;;
  esac

  case "$ext" in
    html|astro) echo "astro" ;;
    js|mjs|cjs|jsx) echo "javascript" ;;
    env) echo "env" ;;
    yaml|yml) echo "yaml" ;;
    ts|tsx) echo "typescript" ;;
    json) echo "json" ;;
    css) echo "css" ;;
    md|mdx) echo "markdown" ;;
    sh) echo "bash" ;;
    *) echo "" ;;
  esac
}

is_binary() {
  local filename="$1"
  local ext="${filename##*.}"
  ext="${ext,,}"
  for be in "${BINARY_EXTENSIONS[@]}"; do
    if [[ "$ext" == "$be" ]]; then
      return 0
    fi
  done
  return 1
}

# Bangun ekspresi find yang aman menggunakan -path ... -prune -o
# -prune akan mengabaikan seluruh direktori yang cocok
find_cmd=(find .)

# Tambahkan -path ... -prune untuk setiap direktori yang dikecualikan
if [ "${#EXCLUDE_PATHS[@]}" -gt 0 ]; then
  find_cmd+=("(")
  first=true
  for p in "${EXCLUDE_PATHS[@]}"; do
    if $first; then
      find_cmd+=(-path "$p")
      first=false
    else
      find_cmd+=(-o -path "$p")
    fi
  done
  find_cmd+=(")" -prune -o)
fi

# Cari file biasa dan cetak null-separated
find_cmd+=(-type f)

# Tambahkan pengecualian nama file (negasi) jika ada
for name in "${EXCLUDE_NAMES[@]}"; do
  find_cmd+=(! -name "$name")
done

find_cmd+=(-print0)

# Jalankan find dan proses hasilnya
while IFS= read -r -d '' file; do
  # Hilangkan leading ./ untuk tampilan
  display_file="${file#./}"

  # Pastikan file tidak berada di dalam direktori yang dikecualikan (double-check)
  skip=false
  for p in "${EXCLUDE_PATHS[@]}"; do
    # strip leading ./ pada pengecekan
    p_stripped="${p#./}"
    if [[ "$display_file" == "$p_stripped/"* ]]; then
      skip=true
      break
    fi
  done
  $skip && continue

  # Lewati file yang namanya ada di daftar EXCLUDE_NAMES
  for n in "${EXCLUDE_NAMES[@]}"; do
    if [[ "$(basename "$display_file")" == "$n" ]]; then
      skip=true
      break
    fi
  done
  $skip && continue

  # Lewati file biner berdasarkan ekstensi
  if is_binary "$display_file"; then
    printf 'Skipping binary file: %s\n' "$display_file" >&2
    continue
  fi

  lang="$(get_lang "$display_file")"

  {
    echo "## $display_file"
    echo ""
    if [[ -n "$lang" ]]; then
      echo '```'"$lang"
    else
      echo '```'
    fi
    # tampilkan isi file
    sed -n '1,20000p' "$file"
    echo '```'
    echo ""
    echo "---"
    echo ""
  } >> "$OUTPUT"

done < <("${find_cmd[@]}")

echo "Output berhasil dibuat di $OUTPUT"
