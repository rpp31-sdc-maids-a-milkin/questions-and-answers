FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# EXPOSE 3002
# EXPOSE 443

CMD ["npm", "start"]