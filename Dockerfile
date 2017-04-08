FROM nginx:1.11

EXPOSE 80

COPY ./web/public/index.html /usr/share/nginx/html
COPY ./web/public/bundle.js /usr/share/nginx/html
