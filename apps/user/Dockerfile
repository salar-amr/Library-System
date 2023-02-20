FROM node:alpine

WORKDIR /app

COPY package*.json yarn*.lock ./

RUN yarn install

COPY . .

RUN yarn build user

CMD ["node", "dist/apps/user/main"]