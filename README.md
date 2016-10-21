# Sytac Play

[![Build Status](https://semaphoreci.com/api/v1/industrial/play/branches/master/shields_badge.svg)](https://semaphoreci.com/industrial/play)

Technology quiz app!

## Installation
The play project consists of two elements, the Node.js Application
Server and the MongoDB Database.
Play is shipped as a Docker project, which is the industry standard at
this point, so it can be deployed "anywhere" for example on the google
cloud or Amazon AWS or another host.

Installation can also be done without docker, so this readme provides
two ways.

### Docker
First, install Docker Engine and Docker Compose. Then run these
commands;
```
git clone git@github.com:sytac/play.git
cd play
docker-compose up
```

Docker Compose will start a Docker Container for MongoDB and for the
Node.js server. The Node.js server is configured to use the MongoDB
server. Currently when started the Node.js server makes sure the MongoDB
server contains all the quiz questions etc by hand/import script. This
process should be improved in the future.

Docker compose exposes the ports found in it's configuration file,
`docker-compose.yml`.

### Manual
When running manually the MongoDB service must be taken care of by
running it yourself or using a third party MongoDB service. The URL of
the mongodb service can be configured in `src/server/datasources.json`.

With MongoDB up, run these commands to install;
```
git clone git@github.com:sytac/play.git
cd play/services/app
npm install
gulp production
```

And to run:
```
node build/server/server.js
```

