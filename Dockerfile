FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
# nie wiem czy to ma zostac  czy nie VVV
RUN npm run build

EXPOSE 3000

CMD ["npm", "start", "--", "-p", "3000"]