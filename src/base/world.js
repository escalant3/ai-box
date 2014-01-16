// Manages a box2d world

var Box2D     = require('box2dweb-commonjs').Box2D;
var Sensors   = require('./../sensors/index');
var Agents    = require('./../agents/index');
var Visual    = require('./../visualization/index');
var baseUtils = require('./utils');


var TIME_STEP = 1.0/60; // 60 Hertzs

// Create a Box2D world and initialize main components
function World() {
  var gravity = new Box2D.Common.Math.b2Vec2(0, 0);
  this._b2World = new Box2D.Dynamics.b2World(gravity, true);

  // Agents in the world are registered and it's the world
  // responsability to manage them
  this._agents = [];

  // The `_redrawFunction` is meant to be overriden by the
  // selected visualization method. It will be called in
  // every step.
  // Not all the simulation enviroments need it
  this._redrawFunction = function() { };

  // The `_syncWorldFunctions` array allows world designers
  // to provide world sensors that send data to the agents
  // in every world step. For instance, a simulation in
  // which the agents have to chase a moving objective,
  // the location of the objective would be returned here
  this._syncWorldFunctions = [];

  Sensors.setAsyncListeners(this._b2World);
}


// TODO The World constructor should take care of this
// Reads a JSON Map structure and draws the bodies
// in a AIBox World object
World.prototype.createMapElements = function(worldSpec) {
  var worldSensor;
  var self = this;

  // Destroy the previous map if any
  this.destroyBodies();

  worldSpec.walls.forEach(function(box) {
    baseUtils.createRectangularBody(self._b2World,
            box.x,
            box.y,
            box.width,
            box.height,
            box.options);
  });

  // Draw the goal if any
  if (worldSpec.type === 'POINT_A_TO_POINT_B') {
    worldSensor = new Sensors.toolbox['Base.World.Goal'](
      this._b2World,
      worldSpec.world_setup.goal_area.x,
      worldSpec.world_setup.goal_area.y,
      worldSpec.world_setup.goal_area.radius
    );

    this._syncWorldFunctions.push(function() {
      return worldSensor.stepFn();
    });
  }
};


// Reads a JSON Vehicle structure and adds the vehicle
// into the AIBox World object
World.prototype.addAgent = function(agentSpecs, agentSetup) {
  var agent;
  var agentContructor = Agents.toolbox[agentSpecs.agent_id];

  if (!!agentContructor) {
    agent = new agentContructor(this._b2World, agentSpecs, agentSetup);
    this._agents.push(agent);
    return agent;
  } else {
    throw 'Unknown agent';
  }
};


// Returns true if the simulation is finished
World.prototype.isCompleted = function() {
  return this._b2World.COMPLETE;
};


/**
 * Attaches an optional visualization system to the simulation
 */
World.prototype.setVisualization = function(type, options) {
  switch (type) {
    case 'DebugDraw':
      Visual.DebugDraw(this, options);
      break;
    default:
      throw 'Invalid visualization';
  }
};


/**
 * Simulates new World step. If the the world specification
 * sets any source of information for the agents it will be
 * sent by this method in every `step`
 * @method step
 * @return {Object} Agent and World Data
 */
World.prototype.step = function() {
  var worldData = {};

  this._b2World.Step(TIME_STEP , 8 , 3);

  // Clear forces must be called after everystep
  // See Game Loop at:
  // http://www.box2dflash.org/docs/2.1a/updating
  this._b2World.ClearForces();

  this._redrawFunction();

  // Fetch data from the world to be sent to the agents
  this._syncWorldFunctions.forEach(function(fn) {
    worldData = fn();
  });

  // Step the agents present in the world
  this._agents.forEach(function(agent, id) {
    worldData[id] = agent.update(worldData);
  });

  return worldData;
};


/**
 * Destroy all the bodies contained in a Box2D world
 * $method destroyBodies
 */
World.prototype.destroyBodies = function() {
  var aux;
  var body = this._b2World.GetBodyList();

  while (body) {
    aux = body.GetNext();
    this._b2World.DestroyBody(body);
    body = aux;
  }
};

module.exports = World;
