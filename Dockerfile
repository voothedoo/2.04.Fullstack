# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application files into the working directory
COPY . .

# TCP port
EXPOSE 3050/tcp

# Define the entry point for the container
CMD ["node", "app.js"]