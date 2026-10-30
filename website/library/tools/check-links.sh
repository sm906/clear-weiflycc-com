#!/usr/bin/env bash

echo "=== WeiflyCC Library Link Check ==="

find website/library -name "*.html" | while read file
do
  echo ""
  echo "[CHECK] $file"

  grep -oE 'href="[^"]+"' "$file" | \
  sed 's/href="//;s/"$//' | \
  while read link
  do

    [[ "$link" =~ ^https?:// ]] && continue
    [[ "$link" =~ ^# ]] && continue

    dir=$(dirname "$file")
    target="$dir/$link"

    target=$(realpath -m "$target")

    if [[ ! -e "$target" ]]; then
      echo "BROKEN => $link"
    fi

  done

done

echo ""
echo "Complete."
