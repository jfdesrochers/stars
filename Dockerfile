FROM node:latest
RUN mkdir -p /usr/src/stars
WORKDIR /usr/src/stars
COPY package*.json /usr/src/stars/
RUN npm install --only=production
COPY . /usr/src/stars/
EXPOSE 8081
CMD ["npm", "start"]