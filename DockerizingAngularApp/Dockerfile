#stage 1
FROM node:16.13.0-alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

#stage 2
FROM nginx:1.17.10-alpine
COPY --from=node /app/dist/DockerizingAngularApp /usr/share/nginx/html
