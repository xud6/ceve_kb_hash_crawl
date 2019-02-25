FROM node:10 as builder
WORKDIR /builder/
COPY package-lock.json package.json ./
RUN npm install
COPY gulpfile.js tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:10-alpine
ENV NODE_ENV production
RUN mkdir -p /app
RUN addgroup -S appDeploy && adduser -S appDeploy -G appDeploy
RUN chown -R appDeploy:appDeploy /app
USER appDeploy
WORKDIR /app/
COPY package-lock.json package.json ./
RUN npm install --production
COPY --from=builder /builder/dist ./dist

ENV DB_HOST localhost
ENV DB_PORT 5432
ENV DB_DATABASE ws
ENV DB_USERNAME ws
ENV DB_PASSWORD 123456
ENV ANTOLOAD_INTERVAL_M 1440
ENV ANTOLOAD_AMOUNT 10
ENV LOADKMS_LOADONSTART FALSE
ENV LOADKMS_AMOUNT 0
ENV LOADKMS_AFTERID undefined

CMD npm start