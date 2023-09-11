## Instruções para execução

### Requisitos
- linux amd64
- docker
- docker compose

1. criar arquivo .env na raíz do projeto com as váriaveis de ambiente

exemplo:
``` 
# configuração server
NESTJS_PORT=3233
ROOT=/config/minha_cidade

# configuração JWT
JWT_SECRET=abcd
JWT_EXPIRATION_TIME=300000000
BCRYPT_SALT_ROUNDS=10

# configuração DB
DB_HOST=209.100.213.119
DB_USER=postgres
DB_NAME=minha_cidade
PG_PORT=5452
DB_PASS=root
HOME=/home/{username}

```
2. Buildar a imagem
```
$ docker build . -t=minha_cidade:latest
```

3. Executar
```
$ docker-compose up
```