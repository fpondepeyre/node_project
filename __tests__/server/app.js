const express = require('express');
const request = require('supertest');

const appFactory = require('../../server/app');

describe('server.app', () => {
  it('should use provided function which make router', () => {
    const makeRouter = () => {
      const router = new express.Router();

      router.get('/', (req, res) => {
        res.send('ok');
      });

      return router;
    };

    const app = appFactory(makeRouter);

    return request(app)
      .get('/')
      .expect(200, 'ok')
      .then();
  });
});
