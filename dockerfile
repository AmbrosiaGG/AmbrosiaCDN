FROM oven/bun:latest

WORKDIR /usr/src/ambrosiacdn
COPY . .

RUN npm i

EXPOSE 5656
CMD ["bun", "start"]