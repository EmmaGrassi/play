# Use exathe latest nodejs version.
FROM node:6.2

# Expose the port.
EXPOSE 3000

# Webpack dev server
EXPOSE 8080

# Debugging port.
# TODO: Disable in production.
#EXPOSE 5858

# Set environment variables.
ENV PORT=3000
ENV LOGLEVEL=debug

# Create the application directory in the dock.
RUN mkdir -p /service

# Add all the files to the container.
ADD . /service

# Change the working directory.
WORKDIR /service

# Install all the dependencies.
RUN npm install

# Run the app.
CMD node .
