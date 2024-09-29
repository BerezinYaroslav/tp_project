FROM node:18 AS build

EXPOSE 5173

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm","run","dev"]


