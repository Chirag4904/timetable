# FROM node:18 as frontend

# WORKDIR /app

# COPY ./client/svelte-timetable/package.json .
# RUN npm install --verbose

# ENV API_URL="http://localhost:8000"

# COPY ./client/svelte-timetable/ .
# RUN npm run build

# -------

FROM node:18

EXPOSE 8000
WORKDIR /home/node/timetable/server
COPY server/package.json .
COPY server/package-lock.json .


ENV NODE_ENV=development
# ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# ENV PATH=$PATH:/home/node/.npm-global/bin

RUN  npm install --verbose &&  mv node_modules ../ && ls ../

COPY server .
# COPY --from=frontend /app/dist/ ../client/svelte-timetable/dist/
# RUN npm ls && ls -a node_modules
RUN echo "pwd && printenv && npx nodemon ./src/server.js" >> /entrypoint.sh

ENV NODE_PATH=/usr/local/lib/node_modules
ENTRYPOINT ["/bin/bash",  "/entrypoint.sh"]
# ENTRYPOINT ["/bin/bash",  "-l"]
# ENTRYPOINT [ "/usr/bin/printenv" ]

#ff
