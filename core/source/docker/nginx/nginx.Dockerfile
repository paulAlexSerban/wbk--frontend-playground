FROM nginx:latest

RUN apt-get update
RUN apt-get upgrade -y

COPY config/nginx.conf /etc/nginx/conf.d/default.conf
