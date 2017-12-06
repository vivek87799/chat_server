FROM node:8

WORKDIR usr/src/app
COPY package.json /app
RUN npm install
COPY . /usr/src/app
CMD node index.js
EXPOSE 9001