FROM node:16-alpine as BUILD_IMAGE

# install git
RUN apk add --update git

# faz o build
WORKDIR /usr/src/app
COPY ["package*.json", "yarn.lock", "./"]
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build

# faz bundle do app
COPY ./dist .

# expoe a porta
EXPOSE 3356

# executa
WORKDIR /usr/src/app
CMD ["node", "dist/main.js"]
