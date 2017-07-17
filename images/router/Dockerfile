FROM nginx:1.12.1-alpine
MAINTAINER Den Elston "4665284@gmail.com"

# ..
RUN rm /etc/nginx/conf.d/default.conf \
    && ln -s /router/deploy/nginx.conf /etc/nginx/conf.d/router.conf
