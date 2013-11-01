var constants = require('./../base/constants');
var utils = require('./../base/utils');
var BaseAgent = require('./base_agent').BaseAgent;
var Agents = require('./index');


/**
 * A robot with a circular shape and two wheels. Each wheel
 * can be controlled with a given force from -1 to 1 that
 * will multiply by the maxSpeed.
 *
 * @class CircularRobot
 * @namespace Agent
 * @constructor
 * @param {Object} World A Box2D World
 * @param {Object} specs An object with the specifications
 * to create the vehicle
 * @param {Object} setup An object to apply additional
 * data to the agent related with the map, like the initial
 * position and angle
 */
function CircularRobot(world, specs, setup) {
  var prismaticWheel;

  this.maxSpeed = specs.maxSpeed;

  var options = {
    linearDamping: 10.0,
    angularDamping: 10.0,
    fixtureFilter: constants.CAR_FILTER
  };

  if (!!setup) {
    specs.x = setup.startPosition && setup.startPosition.x || 0;
    specs.y = setup.startPosition && setup.startPosition.y || 0;
    specs.angle = setup.startPosition && setup.startPosition.angle || 0;
  }


  // Chassis
  this.body = new utils.CircularBody(world, specs, options);

  // Wheels
  prismaticWheel = utils.createPrismaticWheel(this.body, specs.leftWheel);

  this.leftWheel = prismaticWheel.body;
  this.leftJoint = prismaticWheel.joint;

  prismaticWheel = utils.createPrismaticWheel(this.body, specs.rightWheel);

  this.rightWheel = prismaticWheel.body;
  this.rightJoint = prismaticWheel.joint;

  BaseAgent.call(this, world, specs);
}

CircularRobot.prototype = Object.create(BaseAgent.prototype);
CircularRobot.prototype.constructor = CircularRobot;

CircularRobot.prototype.setActuators = function() {
  var direction;

  direction = this.leftWheel.GetTransform().R.col2.Copy();
  direction.Multiply(this.leftPower);
  this.leftWheel.ApplyForce(direction, this.leftWheel.GetPosition());

  direction = this.rightWheel.GetTransform().R.col2.Copy();
  direction.Multiply(this.rightPower);
  this.rightWheel.ApplyForce(direction, this.rightWheel.GetPosition());
};


CircularRobot.prototype.setValues = function(values) {
  this.leftPower = values.leftPower * this.maxSpeed;
  this.rightPower = values.rightPower * this.maxSpeed;
};


Agents.registerAgent('CircularRobot', CircularRobot);
