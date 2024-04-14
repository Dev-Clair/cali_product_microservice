FROM phpdockerio/php:8.1-fpm

WORKDIR "/product"

COPY . .

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl libssl-dev libcurl4-openssl-dev \
    && pecl install mongodb \
    && cp /usr/local/etc/php/php.ini /usr/local/etc/php/php.ini \
    && echo "extension=mongodb.so" >> /usr/local/etc/php/php.ini \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*