# SimpleWiki

Currently it's just a testbed for some React/Express/mongodb stuff

## To run
- Install mongodb from https://www.mongodb.com/download-center/community (not as a service)
- Add mongo's bin folder to the Path environment variable https://stackoverflow.com/questions/15053893/error-when-trying-to-connect-to-a-mongod
- Run "npm ci" in root directory
- Run "npm run database:start" to start the database
- In a separate command line window run "npm run database:populate" to populate database with test data
- In a separate command line window run "npm run build:watch"
- In a separate command line window run "node build/server.js"
- Open http://localhost:5000/build/ in your browser to see the client and interact with it
