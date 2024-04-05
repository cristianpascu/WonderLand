FROM node:latest

# Run as a non-privileged user
RUN useradd -ms /bin/bash -u 1001 app

WORKDIR /app

RUN chown app:app /app


# Copy source files into application directory
COPY --chown=app:app . ./

USER app

RUN npm install

ARG APP_PATH

WORKDIR /app/packages/${APP_PATH}

CMD [ "npm", "start"]