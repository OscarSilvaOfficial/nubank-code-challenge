  FROM denoland/deno:alpine-1.44.4

  WORKDIR /app

  COPY . .
  
  RUN deno cache src/libs.ts

  RUN chmod +x start.sh

  CMD ["sh", "./start.sh"]
