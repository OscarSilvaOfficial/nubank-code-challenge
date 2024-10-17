# Nubank Code Challenge

## Tecnologias
### Deno
Utilizei o deno como runtime para facilitar o processo de execução e testes, pois o Deno interpreta o Typescript diretamente, sem passar pelo processo de transpilação para Javascript e logo em seguida é interpretado pelo Node.

### Typescript
Decidi pelo uso do Typescript pois a tipagem estática me ajuda a ter mais segurança na implementação de interfaces e manter a segurança entre contratos

### Docker
No nosso caso, optei por usar o Docker para isolar o ambiente de execução

## Design de Código
Me inspirei em arquiteturas como **Hexagonal Architecture** e **Clean Architecture**, mas não adicionei todas as camadas necessárias, pois isso iria complexificar extremamente o projeto.
Então decidi isolar bastante a camada de negócio (`core`) utilizando `dependecy inversion`, e simplificar as camadas superiores.

![High level system design](./docs/377293146-36ec9949-8f38-44bd-9d35-82f2370b371c.png)

### Application

#### External
Nela coloquei a ferramenta de CLI, pois ela serve apenas para capturar o input de dados, isso deve ser fácilmente substituível.

#### Internal
Aqui temos apenas a controller, ela serve para conversão de dados de input, para o uso interno da aplicação, e modelos internos para output.

### Core

#### Services
Possui regras de negócio e conduz fluxos de dados utilizando dos domínios.

#### Domais
Modelo de dados com validações específicas do domínio.

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
