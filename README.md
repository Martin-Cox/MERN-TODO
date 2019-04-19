# Overview

A simple project investigating React, Mongo, Express, and Mobx.

## To run
- Install mongodb from https://www.mongodb.com/download-center/community (not as a service)
- Add mongo's bin folder to the Path environment variable https://stackoverflow.com/questions/15053893/error-when-trying-to-connect-to-a-mongod
- Run "npm ci" in root directory
- Run "npm run start:database -- --new=true" to start the database and populate it with test data.
- In a separate command line window run "npm run build:watch"
- In a separate command line window run "node build/server.js"
- Open http://localhost:5000/build/ in your browser to see the client and interact with it

## TODO
- Update test data to be in "TODO" format
	- Title
	- Description
	- AssignedTo
	- Deadline
- Add express endpoint that requests that TODO data
- Add express endpoint that inserts that TODO data
- Investigate express middleware
	- Database connection
	- Logging
- Add client store that stores the TODO data
- Add client component that displays the TODO data
- Add client component that updates the TODO data