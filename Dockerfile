FROM node:13 AS build
RUN apt-get update && apt-get install -y util-linux git && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install

# Build app
COPY . /app
RUN npm run build

# Copy built app to minimal-httpd container
FROM alpine:3.7
EXPOSE 80
VOLUME /logs
HEALTHCHECK --interval=1m --timeout=3s CMD curl --fail http://127.0.0.1/ || exit 1
RUN apk add --no-cache curl thttpd
COPY --from=build /app/dist /www
CMD thttpd -D -d /www
