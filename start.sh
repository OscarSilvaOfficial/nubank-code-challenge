#!/bin/sh

INPUT_DIR="./inputs"

process_file() {
  local file=$1
  echo "Starting file processing: $file"
  deno run --allow-read --allow-env ./src/main.ts --file="$file"
  echo "-----------------------------"
}

if [ -f "inputed_file.txt" ]; then
  process_file "inputed_file.txt"
else
  if [ ! -d "$INPUT_DIR" ]; then
    echo "O diretório $INPUT_DIR não existe."
    exit 1
  fi

  for file in "$INPUT_DIR"/*.txt; do
    if [ -f "$file" ]; then
      process_file "$file"
    fi
  done
fi
