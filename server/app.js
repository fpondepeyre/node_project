const express = require('express');
const bodyParser = require('body-parser');

module.exports = function appFactory(makeRouter, context) {
  const app = express();

  // Config.
  app.enable('trust proxy');

  // Middlewares.
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(makeRouter(context));

  return app;
};
