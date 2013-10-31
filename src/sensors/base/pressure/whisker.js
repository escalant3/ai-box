////////////////////////////////////////////////////////////////
// A sensor that sets a variable to 1 on contact and 0 otherwise
////////////////////////////////////////////////////////////////


var Box2D = require('box2dweb-commonjs').Box2D;


// Constants
var MAP_OBJECT   = 0x0001;

// Aliases
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;

function WhiskerSensor(sensorId, posX, posY, angle, agentObject) {
  var whiskerShape = new b2PolygonShape();
  whiskerShape.SetAsOrientedBox(0.1, 0.01, new b2Vec2(posX, posY), angle);
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

  // Static objects only
  whisker.filter.maskBits = MAP_OBJECT;

  agentObject.body.CreateFixture(whisker);
  return whisker;
}


exports.Whisker = function(agentObject, options) {
  new WhiskerSensor(
    options.id,
    options.pos_x,
    options.pos_y,
    options.angle,
    agentObject
  );
};

