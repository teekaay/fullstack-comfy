FROM mhart/alpine-node:8

ENV PROJECT_HOME /opt/app

WORKDIR $PROJECT_HOME

COPY package.json $PROJECT_HOME

RUN npm install && npm run build

ENTRYPOINT npm start




