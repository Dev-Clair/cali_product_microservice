FROM phpdockerio/php:8.2-fpm

WORKDIR "/product"

COPY . .

RUN pecl install mongodb \
    && docker-php-ext-enable mongodb
