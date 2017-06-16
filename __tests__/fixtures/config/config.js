const simplyconfig = require('simplyconfig');
const _ = require('lodash');

const defaultTestConf = {};

function makeConfig(config = defaultTestConf) {
  return simplyconfig
    .create()
    .add(_.defaults(config, defaultTestConf));
}

module.exports = makeConfig;
