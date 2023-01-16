FROM node:19.4.0

ARG USER=appuser
ARG UID=999

# RUN apt-get update && apt-get install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils libicu-dev libjpeg-dev libpng-dev libatk-bridge2.0-0 wget

RUN mkdir -p /usr/src/app
# RUN mkdir -p /home/$USER

RUN groupadd -g $UID $USER && \
    useradd -r -u $UID -g $USER $USER && \
    chown -R $USER:$USER /usr/src/app

WORKDIR /usr/src/app
COPY ./src/package*.json ./

RUN npm install -g nodemon
RUN npm install && npm cache clean --force

# COPY ./src/ ./
USER $USER
EXPOSE 8080
CMD [ "nodemon", "index.js" ]
