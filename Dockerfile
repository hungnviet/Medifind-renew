FROM node:18-alpine 
RUN corepack enable

WORKDIR /app
COPY . .
RUN yarn install

EXPOSE 19000
CMD [ "yarn", "start"]
