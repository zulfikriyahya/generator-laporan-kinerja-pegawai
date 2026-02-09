set -euo pipefail
IFS=$'\n\t'

OUTPUT="draft.md"

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

EXCLUDE_NAMES=(
  "draft.md"
  "pnpm-lock.yaml"
  "package-lock.json"
  "yarn.lock"
  "bun.lock"
  "LICENSE"
  "tree.txt"
  ".gitignore"
  ".gitkeep"
  ".env.example"
  "maintenance.html"
  "*.spec.ts"
  "*.mock.ts"
)

BINARY_EXTENSIONS=(
  "png" "jpg" "jpeg" "gif" "svg"
  "mp3" "wav" "ogg"
  "mp4" "mkv" "avi"
  "pdf" "db" "sqlite" "ico" "sh" "md"
)

: > "$OUTPUT"

echo "# Project Files" >> "$OUTPUT"
echo "" >> "$OUTPUT"
if command -v tree >/dev/null 2>&1; then
  TREE_EXCLUDES=$(printf "%s|" "${EXCLUDE_PATHS[@]}" | sed 's|./||g; s/|$//')
  tree -I "$TREE_EXCLUDES" >> "$OUTPUT" || true
else
  find . -maxdepth 2 -mindepth 1 -print | sed 's|^\./||' >> "$OUTPUT"
fi
echo "" >> "$OUTPUT"
echo "# File Contents" >> "$OUTPUT"
echo "" >> "$OUTPUT"

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

find_cmd=(find .)

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

find_cmd+=(-type f)

for name in "${EXCLUDE_NAMES[@]}"; do
  find_cmd+=(! -name "$name")
done

find_cmd+=(-print0)

while IFS= read -r -d '' file; do
  display_file="${file#./}"

  skip=false
  for p in "${EXCLUDE_PATHS[@]}"; do
    p_stripped="${p#./}"
    if [[ "$display_file" == "$p_stripped/"* ]]; then
      skip=true
      break
    fi
  done
  $skip && continue

  for n in "${EXCLUDE_NAMES[@]}"; do
    if [[ "$(basename "$display_file")" == "$n" ]]; then
      skip=true
      break
    fi
  done
  $skip && continue

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
    sed -n '1,20000p' "$file"
    echo '```'
    echo ""
    echo "---"
    echo ""
  } >> "$OUTPUT"

done < <("${find_cmd[@]}")

echo "Output berhasil dibuat di $OUTPUT"
