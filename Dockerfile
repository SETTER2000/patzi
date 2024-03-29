FROM node:13

# создание директории приложения
WORKDIR /usr/src/app

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

# копируем исходный код
COPY . .
# Главный сервер принимает запросы на порт 1337
EXPOSE 1337

LABEL "org.label-schema.vendor"="lphp@mail.com"
LABEL "org.label.url"="http://poaleell.com"
LABEL "org.label-schema.version"="1.0.0"

CMD [ "node", "app.js" ]
