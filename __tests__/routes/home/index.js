const express = require('express');
const request = require('supertest');

const homeRouter = require('../../../app/routes/home');
const configFixture = require('../../fixtures/config/config');

const router = express.Router();
const config = configFixture();
const context = {
  config,
};

describe('routes.section', () => {
  let app;

  beforeEach(() => {
    app = express();
    homeRouter(router, context);
    app.use(router);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#GET', () => {
    describe('when requesting /', () => {
      it('should return the home', () => request(app)
        .get('/')
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({});
        }));
    });
  });
});
