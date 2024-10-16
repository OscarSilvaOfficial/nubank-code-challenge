#!/bin/bash

DOCKER_CMD="docker run --rm nubank-code-challenge"

docker build -t nubank-code-challenge .

if [[ $1 == "--file="* ]]; then
  FILE_PATH="${1#--file=}"
  DOCKER_CMD='docker run --rm -e FILE_PATH="$FILE_PATH" nubank-code-challenge'
fi

echo "Executando: $DOCKER_CMD"
eval $DOCKER_CMD