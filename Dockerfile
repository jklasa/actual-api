FROM node:20-bullseye as base
RUN apt-get update && apt-get install -y openssl
WORKDIR /app
ADD yarn.lock package.json ./
RUN yarn install

FROM node:20-bullseye-slim as prod
RUN apt-get update && apt-get install tini && apt-get clean -y && rm -rf /var/lib/apt/lists/* && mkdir -p /data/actual
WORKDIR /app
COPY --from=base /app/node_modules /app/node_modules
ADD package.json app.js ./
ADD src ./src
ENTRYPOINT ["/usr/bin/tini","-g",  "--"]
EXPOSE 3000
CMD ["node", "app.js"]
