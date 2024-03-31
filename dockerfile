FROM oven/bun:latest

WORKDIR /usr/src/ambrosiacdn
COPY . .

RUN bun i

ENV KEY=
ENV DOMAIN=https://usercontent.ambrosia.gg
ENV PORT=5656
ENV COLOR=#3f5361
ENV TITLE=Ambrosia CDN
ENV DESCRIPTION= 
ENV LOGO_FILE_NAME= 
ENV ADVANCED_LOGGING=true

EXPOSE 5656
CMD ["bun", "start"]