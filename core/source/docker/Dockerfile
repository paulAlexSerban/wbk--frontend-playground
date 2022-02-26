FROM node:14

RUN apt-get update
RUN apt-get upgrade -y
RUN npm i npm@latest -g
RUN npm install -g nodemon 

WORKDIR /node
COPY node/package*.json ./
RUN npm install && npm cache clean --force --loglevel=error

WORKDIR /node/app
COPY . .

CMD [ "nodemon", "app.js" ]

