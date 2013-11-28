module.exports.Box2D = require('box2dweb-commonjs').Box2D;
module.exports.Base = {
  World: require('./base/world').World,
  Constants: require('./base/constants')
};

module.exports.baseUtils = require('./base/utils');


module.exports.Sensor = require('./sensors/index');
module.exports.Brain = require('./brains/index');
module.exports.Agent = require('./agents/index');

