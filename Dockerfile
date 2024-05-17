FROM node:18-alpine AS development
ENV NODE_ENV development
# RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/back
WORKDIR /var/www/back
ADD . /var/www/back
RUN npm ci
#Solve the problem reinstaling bcrypt
RUN npm uninstall bcrypt
RUN npm install bcrypt
# CMD npm i -g @nestjs/cli npm run build && npm run start:dev
CMD npm run build && npm run start:dev