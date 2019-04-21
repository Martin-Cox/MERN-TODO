# Overview

A simple project investigating React, Mongo, Express, and Mobx.

## To run
- Make sure you're using a recent version of node
- Install mongodb from https://www.mongodb.com/download-center/community (not as a service)
- Add mongo's bin folder to the Path environment variable https://stackoverflow.com/questions/15053893/error-when-trying-to-connect-to-a-mongod
- Run "npm ci" in root directory
- Run "npm run start:database -- --new=true" to start the database and populate it with test data.
- In a separate command line window run "npm run build:watch"
- In a separate command line window run "node build/server.js"
- Open http://localhost:5000/build/ in your browser to see the client and interact with it
- Open http://localhost:8080/task in your browser to see the server response

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

## Flow

- Initialize TasksStore
	- It requests all the current tasks from the server
	- Upon response it creates the tasks on the client
- Click add button
	- If over the limit, an error message is displayed, else...
	- Create a new task without an id
	- User fills out properties
	- User clicks save button
	- Task is sent to server. It responds with an id which is assigned to the task
- Click delete button
	- Task is removed from server, if successful it is also removed from TasksStore
- Click edit button
	- Task becomes editable
	- User has to click save
	- Updated task is sent to server