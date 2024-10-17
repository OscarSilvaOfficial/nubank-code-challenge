docker build -t nubank-code-challenge .
docker run --rm --name nubank-code-challenge nubank-code-challenge sh -c "deno test"
