# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Install project dependencies
RUN npm install

# Command to run the script
CMD [ "npm", "start" ]


