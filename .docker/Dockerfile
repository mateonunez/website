FROM node:16.15.0

ENV PORT 3000

# Create the directory
RUN mkdir -p /usr/src/mateonunez/frontend-nextjs
WORKDIR /usr/src/mateonunez/frontend-nextjs

# Installing deps

COPY package*.json /usr/src/mateonunez/frontend-nextjs/
RUN npm install

# Copy the files
COPY ./ /usr/src/mateonunez/frontend-nextjs

# Build
# RUN npm run build
# EXPOSE 3000

CMD ["npm", "run", "dev"]
