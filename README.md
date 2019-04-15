# SimpleWiki

Currently it's just a testbed for some React stuff

## To run
- Run "npm ci" in root directory
- Run "npm run build:watch"
- Open http://localhost:5000/build/ in your browser to see the client
- Run "node build/server.js"
- Open http://localhost:8080/ in your browser to see the server response

## Known Issues
- The "build:css:watch" mode is temperamental. Sometimes it doesn't build the first time, sometimes it fails for mysterious reasons when changing the SCSS. Saving the main.scss file again usually resolves the issue.