# Overview

A simple project investigating React, Mongo, Express, and Mobx.

## To run
- Make sure you're using a recent version of node
- Install mongodb from https://www.mongodb.com/download-center/community (not as a service)
- Add mongo's bin folder to the Path environment variable https://stackoverflow.com/questions/15053893/error-when-trying-to-connect-to-a-mongod
- Run "npm ci" in root directory
- Run "npm run start:database -- --new=true" to start the database and populate it with test data.
- In a separate command line window run "npm run build:watch"
- In a separate command line window run "node build/server.js" OR in VS Code start the "Run Server" debug configuration
- Open http://localhost:5000/build/ in your browser to see the client and interact with it
- Open http://localhost:8080/task in your browser to see the server response

## TODO
- Implement Add functionality
- Implement Edit functionality
- Implement Delete functionality
- Styling
