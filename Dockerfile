# Use a imagem base do Deno
FROM denoland/deno:alpine-1.44.4

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários para o contêiner
COPY . .

# Dê permissão de execução ao seu script
RUN chmod +x start.sh

# Executa o seu script usando sh
CMD ["sh", "./start.sh"]
