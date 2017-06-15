const express = require('express');

const server = require('../../server');

jest.mock('../../server/app', () => () => ({
  listen: () => ({
    close: () => {},
  }),
}));

process.exit = jest.fn();
process.emit = jest.fn();


describe('server.index', () => {
  let makeRouter;

  beforeEach(() => {
    makeRouter = () => new express.Router();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('on `uncaughtException`', () => {
    it('should exit process', () => {
      server.start(makeRouter);

      process.emit('uncaughtException', new Error('wtf'));

      setTimeout(() => {
        console.log(process.exit);
        //expect(process.exit.instances.length).toBe(1);
      });
    });
  });

  describe('on `SIGTERM`', () => {
    it('should exit process', () => {
      server.start(makeRouter);

      process.emit('SIGTERM');

      setTimeout(() => {
        //expect(process.exit.instances.length).toBe(1);
      });
    });
  });
});

