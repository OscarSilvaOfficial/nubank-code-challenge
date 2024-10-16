#!/bin/bash

if [[ $1 == "--file="* ]]; then
  FILE_PATH="${1#--file=}"

  FILE_PATH="${FILE_PATH/#\~/$HOME}"

  echo "PATH: $FILE_PATH"

  docker build -t nubank-code-challenge .
  docker run --rm --name nubank-code-challenge nubank-code-challenge sh -c "cp '$FILE_PATH' /app/inputed_file.txt && sh ./start.sh"
else
  docker build -t nubank-code-challenge .
  docker run --rm nubank-code-challenge
fi
