FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install && npm install --save-dev @types/node
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]
