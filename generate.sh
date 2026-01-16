#!/bin/bash
OUTPUT="draft.md"
EXCLUDE_PATHS=(
  "node_modules"
  "dist"
  ".vscode"
  ".astro"
  ".git"
  # "public"
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
  # ".env"
  "TODO.md"
)

> "$OUTPUT"

TREE_EXCLUDES=$(
  IFS="|"
  echo "${EXCLUDE_PATHS[*]}|\
${EXCLUDE_NAMES[*]}"
)
echo "# Project Files" >> "$OUTPUT"
echo "" >> "$OUTPUT"
tree -I "$TREE_EXCLUDES" >> "$OUTPUT"
echo "" >> "$OUTPUT"
echo "# File Contents" >> "$OUTPUT"
echo "" >> "$OUTPUT"
get_lang() {
  case "$1" in
    html | astro) echo "astro" ;;
    js | mjs | gs) echo "javascript" ;;
    env | env-example) echo "env" ;;
    yaml | yml) echo "yaml" ;;
    ts | tsx) echo "typescript" ;;
    json) echo "json" ;;
    css) echo "css" ;;
    md | mdx) echo "markdown" ;;
    sh) echo "bash" ;;
    *) echo "" ;;
  esac
}
while IFS= read -r -d '' file; do
  ext="${file##*.}"
  lang=$(get_lang "$ext")
  case "$ext" in
    png | jpg | jpeg | gif | svg | mp3 | wav | ogg | mp4 | mkv | avi | pdf | db)
      ;;
    *)
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
      ;;
  esac
done < <(find . -type f \
  ! -path "./${EXCLUDE_PATHS[0]}/*" \
  ! -path "./${EXCLUDE_PATHS[1]}/*" \
  ! -path "./${EXCLUDE_PATHS[2]}/*" \
  ! -path "./${EXCLUDE_PATHS[3]}/*" \
  ! -path "./${EXCLUDE_PATHS[4]}/*" \
  ! -name "${EXCLUDE_NAMES[0]}" \
  ! -name "${EXCLUDE_NAMES[1]}" \
  ! -name "${EXCLUDE_NAMES[2]}" \
  ! -name "${EXCLUDE_NAMES[3]}" \
  ! -name "${EXCLUDE_NAMES[4]}" \
  ! -name "${EXCLUDE_NAMES[5]}" \
  ! -name "${EXCLUDE_NAMES[6]}" \
  ! -name "${EXCLUDE_NAMES[7]}" \
  ! -name "${EXCLUDE_NAMES[8]}" \
  ! -name "${EXCLUDE_NAMES[9]}" \
  ! -name "${EXCLUDE_NAMES[10]}" \
  -print0)
echo "Output berhasil dibuat di $OUTPUT"