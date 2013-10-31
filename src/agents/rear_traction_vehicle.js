var _       = require('underscore');
var Box2D   = require('box2dweb-commonjs').Box2D;
var Box     = require('./../base/box').Box;
var BaseVehicle = require('./base_vehicle').BaseVehicle;
var constants = require('./../base/constants');
var Agents = require('./index');


// Box2D aliases
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;


/**
 * Provides a 4 wheels vehicle with rear traction that uses the
 * front wheels for turning. The possible actuators to control
 * this agent are:
 *
 *   - gear
 *   - steerSpeed
 *   - steeringAngle
 *
 * @class RearTractionVehicle
 * @namespace Agent
 * @constructor
 * @param {Object} World A Box2D World
 * @param {Object} carSpecs An object with the specifications
 * to create the vehicle
 * @param {Object} carSetup An object to apply additional
 * data to the agent related with the map, like the initial
 * position and angle
 */
function RearTractionVehicle(world, carSpecs, carSetup) {
  var carBody,
      carOptions,
      carDimension,
      wheels,
      joints,
      vehicleObject;

  if (!!carSetup) {
    carSpecs.x = carSetup.startPosition && carSetup.startPosition.x || 0;
    carSpecs.y = carSetup.startPosition && carSetup.startPosition.y || 0;
    carSpecs.angle = carSetup.startPosition && carSetup.startPosition.angle || 0;
  }


  /* Car Object attributes */
  this.gear           = 0.5;
  this.engineSpeed    = 1;
  this.steerSpeed     = 8.0;
  this.steeringAngle  = 0;
  this.topEngineSpeed = carSpecs.topEngineSpeed;

  carOptions = {
    'linearDamping': 10.0,
    'angularDamping' : 10.0,
    'fixtureFilter': constants.CAR_FILTER
  };

  this.body = new Box(world, carSpecs.x, carSpecs.y,
                      carSpecs.width, carSpecs.height,
                      carOptions);


  // RearTractionVehicle initialization
  carDimensions = new b2Vec2(carSpecs.width, carSpecs.height);
  this.wheels = drawWheels(world, this.body, carDimensions);
  this.joints = createJoints(world, carSpecs, this.body, this.wheels);

  // Head the agent at the beginning to the selected angle
  this.body.SetAngle(carSpecs.angle);
  this.wheels.front.left.SetAngle(carSpecs.angle);
  this.wheels.front.right.SetAngle(carSpecs.angle);
  this.wheels.rear.left.SetAngle(carSpecs.angle);
  this.wheels.rear.right.SetAngle(carSpecs.angle);

  // The base agent initializes the sensors that require the
  // agent body to be present. The specific details must be
  // created before calling the parent constructor
  BaseVehicle.call(this, world, carSpecs);
}

RearTractionVehicle.prototype = Object.create(BaseVehicle.prototype);
RearTractionVehicle.prototype.constructor = RearTractionVehicle;


/**
 * @method setValues
 *
 * @param {Object} values An object containing the values
 * to be applied to the actuators
 */
RearTractionVehicle.prototype.setValues = function(values) {
  this.gear = values.gear;
  this.engineSpeed = this.gear * this.topEngineSpeed;
  this.steerSpeed = values.steerSpeed;
  this.steeringAngle = values.steeringAngle;
};


/**
 * Get the current values being applied to the actuators.
 * Useful for debugging purposes
 *
 * @method getValues
 * @return {Object} Current values of the actuators
 */
RearTractionVehicle.prototype.getValues = function() {
  return{
    gear: this.gear,
    engineSpeed: this.engineSpeed,
    steerSpeed: this.steerSpeed,
    steeringAngle: this.steeringAngle
  };
};


/**
 * Applies the actuator values to the physical Box2D element
 * that compose the agent
 *
 * @method setActuators
 */
RearTractionVehicle.prototype.setActuators = function() {
  var self = this;

  // Moving
  _.each(this.wheels.front, function(wheel) {
    var direction = wheel.GetTransform().R.col2.Copy();
    direction.Multiply(self.engineSpeed);
    wheel.ApplyForce(direction, wheel.GetPosition());
  });

  // Steering
  _.each(this.joints.front, function(wheelJoint) {
    var angleDiff = self.steeringAngle - wheelJoint.GetJointAngle();
    wheelJoint.SetMotorSpeed(angleDiff * self.steerSpeed);
  });
};


/**
 * Destroys all the Box2D bodies that compose the agent
 * from memory
 *
 * @method destroy
 */
RearTractionVehicle.prototype.destroy = function() {
  var world = this.body.GetWorld();
  world.DestroyBody(this.wheels.front.left);
  world.DestroyBody(this.wheels.front.right);
  world.DestroyBody(this.wheels.rear.left);
  world.DestroyBody(this.wheels.rear.right);
  world.DestroyBody(this.body);

  this._topEngineSpeed = null;
  this.wheels = null;
  this.joints = null;
};


// Exports
Agents.registerAgent('RearTractionVehicle', RearTractionVehicle);



// TODO Delete this
// Agents should take more information from the JSON so they
// can be easily configurable from the future agent builder
// Internal code
function drawWheels(world, body, carDimension) {
  var wheelDim,
      wheels,
      carPosition;

  // Wheels size (20% of car size)
  wheelDim = carDimension.Copy();
  wheelDim.Multiply(0.2);

  carPosition = body.GetPosition();

  wheels = {
    front: {
      left: new Box(
        world,
        carPosition.x - carDimension.x,
        carPosition.y + carDimension.y / 2,
        wheelDim.x,
        wheelDim.y, {
          'fixtureFilter': constants.CAR_FILTER
        }),
      right: new Box(
         world,
         carPosition.x + carDimension.x,
         carPosition.y + carDimension.y / 2,
         wheelDim.x,
         wheelDim.y, {
           'fixtureFilter': constants.CAR_FILTER
         })
    },
    rear: {
      left: new Box(
        world,
        carPosition.x - carDimension.x,
        carPosition.y - carDimension.y / 2,
        wheelDim.x,
        wheelDim.y, {
          'fixtureFilter': constants.CAR_FILTER
        }),
      right: new Box(
        world,
        carPosition.x + carDimension.x,
        carPosition.y - carDimension.y / 2,
        wheelDim.x,
        wheelDim.y, {
          'fixtureFilter': constants.CAR_FILTER
        })
    }
  };

  return wheels;
}

function createJoints(world, carSpecs, carBody, wheels) {
  var joints = {front: {}, rear: {}};

  _.each(wheels.front, function(wheel, key) {

    jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
    jointDef.Initialize(carBody , wheel, wheel.GetWorldCenter());

    //http://blog.allanbishop.com/box2d-2-1a-tutorial-part-2-joints/
    jointDef.enableMotor = true;
    jointDef.maxMotorTorque = 100000;
    jointDef.enableLimit = true;
    jointDef.lowerAngle =  -1 * carSpecs.maxSteerAngle;
    jointDef.upperAngle =  carSpecs.maxSteerAngle;
    joints.front[key] = world.CreateJoint(jointDef);
  });

  _.each(wheels.rear, function(wheel, key) {
    jointDef = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
    jointDef.Initialize( carBody , wheel, wheel.GetWorldCenter(), new b2Vec2(1,0) );
    jointDef.enableLimit = true;
    jointDef.lowerTranslation = jointDef.upperTranslation = 0.0;
    joints.rear[key] = world.CreateJoint(jointDef);
  });

  return joints;
}


