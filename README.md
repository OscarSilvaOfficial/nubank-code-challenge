# Nubank Code Challenge

## Tecnologias
Escolhei para esse desafio as técnologias:
- Deno
- Typescript
- Docker

### Deno
Utilizei o deno como runtime para facilitar o processo de execução e testes, pois o Deno interpreta o Typescript diretamente, sem passar pelo processo de transpilação para Javascript e logo em seguida é interpretado pelo Node.

### Typescript
Decidi pelo uso do Typescript pois a tipagem estática me ajuda a ter mais segurança na implementação de interfaces e manter a segurança entre contratos

### Docker
No nosso caso, optei por usar o Docker para isolar o ambiente de execução

## Rodar projeto

Para ler todos os arquivos que foram pré inseridos para facilitar o processo, rode esse comando
```bash
bash ./entrypoint.sh
```

ou 

```bash
./entrypoint.sh
```

Caso queira informar algum arquivo na sua máquina, pode rodar esse comando
```bash
bash ./entrypoint.sh --file="INPUT_FILE.txt"
```

ou 

```bash
./entrypoint.sh --file="INPUT_FILE.txt"
```

> **Detalhe muito importante**, o arquivo precisa estar no diretório do projeto

## Rodar testes unitários

Para rodar os testes unitários, rode esse comando: 
```bash
bash ./tests.sh
```
