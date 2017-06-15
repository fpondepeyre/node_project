const server = require('../server');

const makeRouter = require('./routes');

server.start(makeRouter);
