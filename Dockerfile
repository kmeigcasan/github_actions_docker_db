# FROM node:latest
FROM node:14.4.0-alpine3.12

RUN mkdir -p /var/www/app

WORKDIR /var/www/app

COPY package.json .

# happens in container
RUN npm install -g nodemon

RUN npm install -g mocha

#happens in container
RUN npm install

COPY . .