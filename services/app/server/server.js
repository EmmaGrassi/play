const loopback = require('loopback');
const boot = require('loopback-boot');
const log = require('loglevel');

//const root = require('./middleware/root');
//const authentication = require('./middleware/authentication');
//const dummyData = require('./middleware/dummyData');

const app = loopback();

log.setLevel(process.env.LOGLEVEL || 'debug');

boot(app, __dirname, (error) => {
  if (error) {
    throw error;
  }

  //root(app, (error) => {
  //  if (error) {
  //    throw error;
  //  }

  //  authentication(app, (error) => {
  //    if (error) {
  //      throw error;
  //    }

  //    dummyData(app, (error) => {
  //      if (error) {
  //        throw error;
  //      }

        return app.listen(() => {
          app.emit('started');

          const baseUrl = app.get('url').replace(/\/$/, '');

          console.log('Web server listening at: %s', baseUrl);

          if (app.get('loopback-component-explorer')) {
            const explorerPath = app.get('loopback-component-explorer').mountPath;

            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
          }
        });
  //    });
  //  });
  //});
});

module.exports = app;
