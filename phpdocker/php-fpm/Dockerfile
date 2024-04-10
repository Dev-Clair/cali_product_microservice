FROM phpdockerio/php:8.3-fpm
WORKDIR "/product"

RUN apt-get update \
    && apt-get -y --no-install-recommends install \
        php8.3-amqp \ 
        php8.3-mongodb \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*
