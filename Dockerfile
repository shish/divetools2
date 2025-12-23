FROM node:24 AS build
EXPOSE 80

# Install dependencies
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install

# Build app
COPY . /app
RUN npm run build
CMD ["./node_modules/.bin/rsbuild", "preview", "--port", "80"]
