module.exports.Box2D = require('box2dweb-commonjs').Box2D;
module.exports.Base = {
  World: require('./base/world').World,
  Constants: require('./base/constants'),
  Box: require('./base/utils').Box,
  CircularBody: require('./base/utils').CircularBody
};

module.exports.Sensor = require('./sensors/main');
module.exports.Brain = require('./brains/index');
module.exports.Agent = require('./agents/index');

