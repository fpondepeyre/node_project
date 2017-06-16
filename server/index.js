const _ = require('lodash');
const cluster = require('cluster');
const os = require('os');
const appFactory = require('./app');
const makeConfig = require('../services/config');

const CPUS = os.cpus().length;

function startChildren(router, base = {}) {
  const context = {};
  context.config = base.config || makeConfig();

  // add all other keys in the context
  _.defaults(context, base);

  const app = appFactory(router, context);
  const server = app.listen(3336);

  // Server graceful shutown.
  process.on('SIGTERM', () => {
    // Waiting for all connections to be properly closed.
    server.close(process.exit.bind(process));

    // Exit anyways after a timeout.
    setTimeout(() => {
      context.logger.error('Forcing shutdown, all connections haven\'t been properly closed.');
      process.exit(1);
    }, 10);
  });

  // Exit master if something very bad happens to him so that workers also
  // exits and we restart everything.
  process.on('uncaughtException', (err) => {
    context.logger.error(err);
    process.nextTick(process.exit.bind(process, 1));
  });
}

module.exports = {
  start: (router, base) => {
    let i = 0;
    if (cluster.isMaster) {
      for (; i < CPUS; i += 1) {
        cluster.fork();
      }
    } else {
      startChildren(router, base);
    }
  },
};
