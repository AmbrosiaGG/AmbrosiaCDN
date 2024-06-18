FROM oven/bun
WORKDIR /opt/AmbrosiaCDN
COPY . /opt/AmbrosiaCDN

RUN bun i

ENV atlas=
ENV session=
ENV port=
ENV updates=
ENV title=AmbrosiaCDN

CMD ["bun", "index.js"]