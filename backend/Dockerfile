FROM node:17

RUN mkdir -p /app/data && chown -R 1000:1000 /app/data

USER 1000

WORKDIR /app

CMD yarn start