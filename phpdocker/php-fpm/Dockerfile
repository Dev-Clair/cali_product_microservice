FROM php:8.2-fpm

WORKDIR "/product"

COPY . .

RUN apt-get -y update \
    && apt-get install -y libssl-dev pkg-config libzip-dev unzip git

RUN pecl install zlib zip mongodb \
    && docker-php-ext-enable zip \
    && docker-php-ext-enable mongodb

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# RUN apt-get update \
#     && apt-get install -y --no-install-recommends openssl libssl-dev libcurl4-openssl-dev \
#     && pecl install mongodb \
#     && cp /usr/local/etc/php/php.ini.production /usr/local/etc/php/php.ini \
#     && echo "extension=mongodb.so" >> /usr/local/etc/php/php.ini \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/*