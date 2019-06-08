FROM node:8 
COPY ./ /app
WORKDIR /app
RUN npm install && npm i -g pm2
CMD ["pm2-runtime", "index.js"] 
