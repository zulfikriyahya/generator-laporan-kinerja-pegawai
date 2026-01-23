#!/bin/bash

OUTPUT="draft.md"

EXCLUDE_PATHS=(
  "node_modules"
  "dist"
  ".vscode"
  ".astro"
  ".git"
)

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
  "TODO.md"
  ".env-example"
  "maintenance.html"
)

BINARY_EXTENSIONS=(
  "png" "jpg" "jpeg" "gif" "svg"
  "mp3" "wav" "ogg"
  "mp4" "mkv" "avi"
  "pdf" "db"
)

> "$OUTPUT"

TREE_EXCLUDES=$(IFS="|"; echo "${EXCLUDE_PATHS[*]}|${EXCLUDE_NAMES[*]}")

echo "# Project Files" >> "$OUTPUT"
echo "" >> "$OUTPUT"
tree -I "$TREE_EXCLUDES" >> "$OUTPUT"
echo "" >> "$OUTPUT"
echo "# File Contents" >> "$OUTPUT"
echo "" >> "$OUTPUT"

get_lang() {
  case "$1" in
    html|astro) echo "astro" ;;
    js|mjs|gs) echo "javascript" ;;
    env|env-example) echo "env" ;;
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
  local ext="$1"
  for binary_ext in "${BINARY_EXTENSIONS[@]}"; do
    if [[ "$ext" == "$binary_ext" ]]; then
      return 0
    fi
  done
  return 1
}

build_find_command() {
  local cmd="find . -type f"
  
  for path in "${EXCLUDE_PATHS[@]}"; do
    cmd="$cmd ! -path \"./$path/*\""
  done
  
  for name in "${EXCLUDE_NAMES[@]}"; do
    cmd="$cmd ! -name \"$name\""
  done
  
  cmd="$cmd -print0"
  echo "$cmd"
}

while IFS= read -r -d '' file; do
  ext="${file##*.}"
  
  if ! is_binary "$ext"; then
    lang=$(get_lang "$ext")
    {
      echo "## $file"
      echo ""
      echo "\`\`\`$lang"
      cat "$file"
      echo ""
      echo "\`\`\`"
      echo "---"
      echo ""
    } >> "$OUTPUT"
  fi
done < <(eval "$(build_find_command)")

echo "Output berhasil dibuat di $OUTPUT"