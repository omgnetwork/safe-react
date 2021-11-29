FROM node:14

RUN apt-get update && apt-get install -y libusb-1.0-0 libusb-1.0-0-dev libudev-dev

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

ADD src/ ./src
ADD config/ ./config
ADD patches/ ./patches
ADD scripts/ ./scripts
ADD public/ ./public
ADD docs/ ./docs

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
