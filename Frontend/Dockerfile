FROM node:alpine as builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

FROM node:alpine
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]