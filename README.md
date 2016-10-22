# Sytac Play

[![Build Status](https://semaphoreci.com/api/v1/industrial/play/branches/master/shields_badge.svg)](https://semaphoreci.com/industrial/play)

Technology quiz app!

## Installation
The play project consists of two elements, the Node.js Application
Server and the MongoDB Database. The URL of the mongodb service can be
configured in `src/server/datasources.json`.

```
git clone git@github.com:sytac/play.git
cd play/services/app
npm install
```

### Development
```
npm run develop
```

### Production
```
npm run production
```
