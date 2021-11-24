FROM node:12

WORKDIR /app
ADD . /app/

RUN npm ci
RUN npm run build

ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80

CMD [ "npm", "start" ]