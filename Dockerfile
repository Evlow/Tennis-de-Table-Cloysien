# Use the official Nginx image as the base image
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy your static website files into the Nginx directory
COPY . .

# Expose port 8000 to access the website
EXPOSE 8000

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]