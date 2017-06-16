const express = require('express');
const _ = require('lodash');

const ROUTE_FACTORY = [
  'home',
];

const makeRouter = (context) => {
  const router = express.Router();

  _.each(ROUTE_FACTORY, (routeFactory) => {
    require(`./${routeFactory}`)(router, context); // eslint-disable-line global-require, import/no-dynamic-require
  });

  return router;
};

module.exports = makeRouter;

