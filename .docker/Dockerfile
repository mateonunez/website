FROM node:16.15.0

ENV PORT 3000

# Create the directory
RUN mkdir -p /usr/src/mateonunez/website
WORKDIR /usr/src/mateonunez/website

# Installing deps

COPY package*.json /usr/src/mateonunez/website/
RUN npm install

# Copy the files
COPY ./ /usr/src/mateonunez/website

# Build
# RUN npm run build
# EXPOSE 3000

CMD ["npm", "run", "dev"]
