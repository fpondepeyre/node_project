const express = require('express');

const makeRouter = () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('<h1>It Works!</h1>');
  });

  router.get('/toto', (req, res) => {
    res.send('<h1>It Works!</h1>');
  });

  return router;
};

module.exports = makeRouter;

