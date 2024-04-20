# Define the base image
FROM node:16-alpine

# Set working directory in the Docker image
WORKDIR /app

# Copy package.json and package-lock.json to Docker image
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files to Docker image
COPY . .

# Expose the port Vite is running on
EXPOSE 5173

# Start the development server
CMD [ "npm", "run", "dev" ]