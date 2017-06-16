const simplyconfig = require('simplyconfig');
const hostname = require('os').hostname();
const path = require('path');

function makeConfig(prefix = '') {
  const main = require.main || { filemane: '' };
  const mainDir = path.dirname(main.filename);
  const defaultConfigRelativePath = '../config/config.js';

  // We'll read the config relative to the entry file
  // Supposedly config/config.js from the root
  const configPath = path.resolve(mainDir, defaultConfigRelativePath);

  // load the .env in process.env
  simplyconfig.dotenv.load({ silent: true });

  return simplyconfig
    .create()
    .add({
      NODE_ENV: `${prefix}${process.env.NODE_ENV || 'dev'}`,
      hostname,
    })
    .add(configPath, { pattern: 'env+local' })
    .add('ENV');
}

module.exports = makeConfig;
