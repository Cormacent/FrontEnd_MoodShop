# tahap pengembangan
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./   
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# tahap produksi
FROM nginx:stable-alpine as production-stage
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# RUN (cd /etc/nginx/conf.d/ && ls)
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# FROM nginx:stable-alpine as production-stage
# COPY ./nginx/moodshop.conf /etc/nginx/conf.d/default.conf
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]