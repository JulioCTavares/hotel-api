# Desafio Hotel-API
Este repositório é destinado ao desafio PMWeb.

## Tecnologias utilizadas neste projeto

1. Typescript;
2. Node.Js;
3. Express;
4. Prisma;
5. Docker.

## Rodando o projeto

1. Certifique-se de ter [docker/docker-compose](https://docs.docker.com/engine/install/) e [npm](https://nodejs.org/en/download/package-manager/current) instalados. 

2. Clone o repositório executando o comando:
```bash 
git clone git@github.com:JulioCTavares/hotel-api.git
```

3. Instale todas as dependências executando:
```bash 
npm install
```

4. Crie um arquivo .env com base no exemplo em .env.example.
  
5. Para iniciar o servidor de desenvolvimento, execute:
```bash
docker-compose --profile=db-only up -d
npm run dev
```

6. Agora o servidor deverá estar rodando!

8. Para testes como administrador, é necessário criar o usuário no banco de dados e alterá-lo manualmente diretamente no banco de dados, o que pode ser feito através do Prisma Studio. Para isso, execute:
```bash
npm run prisma:studio
```
