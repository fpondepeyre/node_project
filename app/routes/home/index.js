const makeRouter = (router, context) => {
  router.get('/', (req, res) => {
    const applicationName = context.config.get('application:name');
    res.send(`<h1>It Works! </br> Welcome to ${applicationName}</h1>`);
  });
};

module.exports = makeRouter;
