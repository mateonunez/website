FROM node:latest

ENV PORT 3000

# Create the directory
RUN mkdir -p /usr/src/mateonunez/website

# Setting up the directory
WORKDIR /usr/src/mateonunez/website

# Copy the app
COPY ./ /usr/src/mateonunez/website

# Install dependencies
RUN npm install

# Run the app
CMD ["npm", "run", "dev"]
