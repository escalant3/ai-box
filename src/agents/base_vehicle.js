var Box2D = require('box2dweb-commonjs').Box2D;
var BaseAgent = require('./base_agent');
var baseUtils = require('./../base/utils');
var constants = require('./../base/constants');

/**
 * Provides common methods between all the agents implementing
 * vehicles with wheels
 *
 * @class BaseVehicle
 * @namespace Agent
 * @extends BaseAgent
 * @constructor
 * @param {Object} world A Box2D world
 * @param {Object} specs An object containing the structural
 * details of an agent
 */
function BaseVehicle(world, specs) {
  BaseAgent.call(this, world, specs);
}

BaseVehicle.prototype = Object.create(BaseAgent.prototype);
BaseVehicle.prototype.constructor = BaseVehicle;


/**
 * Creates a wheel with a prismatic joint to the agent body
 *
 * @method createPrismaticWheel
 * @param {Object} specs The specification of the prismatic
 * wheel. The expected fields are:
 *
 *  - offset_x: Horizontal offset from the body center
 *  - offset_y: Vertical offset from the body center
 *  - width: Wheel body width
 *  - height: Wheel body height
 */
BaseVehicle.prototype.createPrismaticWheel = function(specs) {
  var wheelBody,
    wheelJoint,
    world,
    x,
    y,
    width,
    height,
    position,
    jointDef;

  world = this.body.GetWorld();
  position = this.body.GetPosition();
  x = position.x + specs.offset_x;
  y = position.y + specs.offset_y;
  width = specs.width;
  height = specs.height;

  wheelBody = baseUtils.createRectangularBody(world, x, y, width, height,
      {'fixtureFilter': constants.AGENT_FILTER});

  jointDef = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
  jointDef.Initialize(this.body, wheelBody, wheelBody.GetWorldCenter(),
                      new Box2D.Common.Math.b2Vec2(1,0));
  jointDef.enableLimit = true;
  jointDef.lowerTranslation = jointDef.upperTranslation = 0.0;
  wheelJoint = world.CreateJoint(jointDef);

  return {
    body: wheelBody,
    joint: wheelJoint
  };
};


module.exports = BaseVehicle;
