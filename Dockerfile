FROM node:8.3

MAINTAINER Luciano Colosio "unlucio@gmail.com"

COPY . /app
WORKDIR /app

RUN npm install


