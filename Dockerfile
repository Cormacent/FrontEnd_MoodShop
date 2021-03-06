# tahap pengembangan
# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY . .
# RUN yarn install
# RUN yarn build


# production stage
FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]