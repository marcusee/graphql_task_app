FROM node:19-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
