var Box2D = require('box2dweb-commonjs').Box2D;
var constants = require('./../../../base/constants');

// Aliases
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;


/**
 * Provides a whisker sensor that returns a high (1) value
 * on contact and low (0) otherwise
 * @class Whisker
 * @namespace Sensors.Base.Pressure
 * @constructor
 * @param {Object} agentObject The Agent object the sensor will
 * be attached to
 * @param {Object} specs Contains the specifications of the
 * sensor. The mandatory fields are:
 *
 *   - id: Identifier to store the sensor value
 *   - pos_x: x offset from the main body center
 *   - pos_y: y offset from the main body center
 *   - angle: angle with the main body
 *   - width: width of the sensor
 *   - height: height of the sensor
 */
function Whisker(agentObject, specs) {
  var sensorId, posX, posY, angle, width, height, whiskerShape;

  // Sensor specs
  sensorId = specs.id;
  posX     = specs.pos_x;
  posY     = specs.pos_y;
  angle    = specs.angle;
  width    = specs.width;
  height   = specs.height;

  whiskerShape = new b2PolygonShape();
  whiskerShape.SetAsOrientedBox(height, width, new b2Vec2(posX, posY), angle);
  whisker = new b2FixtureDef();

  whisker.shape = whiskerShape;
  whisker.isSensor = true;
  whisker.userData = {
    onBeginContact: function() {
      agentObject.setSensor(sensorId, 1);
    },
    onEndContact: function() {
      agentObject.setSensor(sensorId, 0);
    }
  };

  // Initial value
  agentObject.setSensor(sensorId, 0);

  // Static objects only
  whisker.filter.maskBits = constants.MAP_OBJECT;

  agentObject.body.CreateFixture(whisker);
}

exports.Whisker = Whisker;

