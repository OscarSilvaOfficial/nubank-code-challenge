#!/bin/sh

# Diretório padrão para os arquivos de entrada
INPUT_DIR="./inputs"

# Função para processar um arquivo
process_file() {
  local file=$1
  echo "Processando arquivo: $file"
  deno run --allow-read --allow-env ./src/main.ts --file="$file"
  echo "-----------------------------"
}

# Verifica se o parâmetro --file foi passado
if [ "$#" -eq 1 ] && [ "${1#--file=}" != "$1" ]; then
  # Extrai o caminho do arquivo passado como argumento
  FILE_PATH="${1#--file=}"

  # Expande o '~' se o caminho começar com ele
  if [ "${FILE_PATH:0:1}" = "~" ]; then
    FILE_PATH="$HOME${FILE_PATH:1}"
  fi

  # Verifica se o arquivo existe
  if [ -f "$FILE_PATH" ]; then
    process_file "$FILE_PATH"
  else
    echo "Arquivo $FILE_PATH não encontrado."
    exit 1
  fi
else
  # Caso nenhum argumento seja passado, processa todos os arquivos do diretório ./inputs
  if [ ! -d "$INPUT_DIR" ]; then
    echo "O diretório $INPUT_DIR não existe."
    exit 1
  fi

  # Percorre todos os arquivos .txt no diretório ./inputs
  for file in "$INPUT_DIR"/*.txt; do
    if [ -f "$file" ]; then
      process_file "$file"
    fi
  done
fi
