# Sytac Play

[![Build Status](https://semaphoreci.com/api/v1/industrial/play/branches/master/shields_badge.svg)](https://semaphoreci.com/industrial/play)

Technology quiz app!

## System Requirements

Before you will be able to run `docker-compose` **on a Mac**(Good luck on Windows) You'll need to install the following tools:

- [VirtualBox](https://www.virtualbox.org/)
- [Homebrew](http://brew.sh/)
- `docker-compose`
- `docker-machine`

### VirtualBox

To install VirtualBox head over to [their website](https://www.virtualbox.org/) and download the installable and execute it.

### Homebrew 

Homebrew is a package manager for Mac. You are going to need this to install `docker-machine` and `docker-compose`.

To install Homebrew run the following line in a terminal:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### `docker-compose` && `docker-machine`

Now that you have Homebrew you are ready to install `docker-compose` and while we are at it we will add `docker-machine` as well.
```
brew install docker-compose && brew install  docker-machine
```
Now it is time to build a default machine for `docker-machine` to use.
```
docker-machine create --driver virtualbox default
```
And you are done, you should be ready to proceed with running the application.


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

