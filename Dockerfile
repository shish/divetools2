FROM node:16 AS build
HEALTHCHECK --interval=1m --timeout=3s CMD curl --fail http://127.0.0.1/ || exit 1
EXPOSE 80
RUN apt-get update && apt-get install -y util-linux git && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install

# Build app
COPY . /app
RUN npm run build
CMD ./node_modules/.bin/parcel serve src/index.html --no-hmr --port 80
