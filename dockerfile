FROM node:20

WORKDIR /usr/src/app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]