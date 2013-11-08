var constants = require('./../base/constants');
var utils = require('./../base/utils');
var BaseVehicle = require('./base_vehicle').BaseVehicle;
var Agents = require('./index');


/**
 * A robot with a circular shape and two wheels. Each wheel
 * can be controlled with a given force from -1 to 1 that
 * will multiply by the maxSpeed.
 *
 * @class CircularRobot
 * @namespace Agent
 * @extends BaseVehicle
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
    fixtureFilter: constants.AGENT_FILTER
  };

  if (!!setup) {
    specs.x = setup.startPosition && setup.startPosition.x || 0;
    specs.y = setup.startPosition && setup.startPosition.y || 0;
    specs.angle = setup.startPosition && setup.startPosition.angle || 0;
  }


  // Chassis
  this.body = new utils.CircularBody(world, specs, options);

  // Wheels
  prismaticWheel = this.createPrismaticWheel(specs.leftWheel);

  this.leftWheel = prismaticWheel.body;
  this.leftJoint = prismaticWheel.joint;

  prismaticWheel = this.createPrismaticWheel(specs.rightWheel);

  this.rightWheel = prismaticWheel.body;
  this.rightJoint = prismaticWheel.joint;

  BaseVehicle.call(this, world, specs);
}

CircularRobot.prototype = Object.create(BaseVehicle.prototype);
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
