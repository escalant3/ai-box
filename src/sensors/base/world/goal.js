//
// Places an goal area in the world. Accepts a (x, y)
// position and a radius. If the agent gets into this
// area it will set the COMPLETE flag in the world to
// true. Usually this will end the simulation.

var Box2D = require('box2dweb-commonjs').Box2D;
var constants = require('./../../../base/constants');

function GoalSensor(world, x, y, radius) {
  // Box2D constants
  var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
  var b2Vec2 = Box2D.Common.Math.b2Vec2;
  var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
  var b2BodyDef = Box2D.Dynamics.b2BodyDef;

  var circleGoalShape = new b2CircleShape();
  circleGoalShape.SetLocalPosition(new b2Vec2(0, 0));
  circleGoalShape.SetRadius(radius);

  var circleGoalFixture = new b2FixtureDef();
  circleGoalFixture.shape = circleGoalShape;
  circleGoalFixture.isSensor = true;
  circleGoalFixture.filter.maskBits = constants.AGENT_PART;
  circleGoalFixture.userData = {
    onBeginContact: function() {
      world.COMPLETE = true;
    }
  };

  var bodyDef = new b2BodyDef();
  bodyDef.position.Set(x, y);
  bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;

  var body = world.CreateBody(bodyDef);
  body.CreateFixture(circleGoalFixture);
}


exports.GoalSensor = GoalSensor;

