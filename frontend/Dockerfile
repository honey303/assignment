FROM node:10-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8088

CMD ["node", "server.js"]
