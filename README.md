# node-rest-api

This repository contains a RESTful API written with Node, Express, and Mongoose. It is in the process of development for integration with a proof-of-concept ecommerce and content-creation platform, part of my latest project.

To install and run the server from the root directory:
```
npm install && npm start
```

REST endpoints are documented in server.js and /routes of the root directory.
The server is currently configured to run in a development environment at http://localhost:5000 and accepts CORS origins from my website, https://www.seanburman.ca and http://localhost:3000.

##MongoDB and Mongoose environmental configuration
To connect to MongoDB, add an srv URI in your .env file using the 'URI' variable.
