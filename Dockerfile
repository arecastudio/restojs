FROM php:apache
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli && apt install -y cups cups-pdf
