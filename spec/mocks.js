var Box2D = require('box2dweb-commonjs').Box2D;
var BaseAgent = require('./../src/agents/base_agent').BaseAgent;


function TestAgent(world, specs) {
  var body_def = new Box2D.Dynamics.b2BodyDef();
  this.body = world._b2World.CreateBody(body_def);
  BaseAgent.call(this, world, specs);
}


TestAgent.prototype = Object.create(BaseAgent.prototype);
TestAgent.prototype.constructor = TestAgent;


module.exports.TestAgent = TestAgent;
