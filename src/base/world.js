// Manages a box2d world

var Box2D = require('box2dweb-commonjs').Box2D;
var Sensors = require('./../sensors/main');
var Agent = require('./../agents/index');
var Box = require('./utils').Box;


var TIME_STEP = 1.0/60; // 60 Hertzs

// Create a Box2D world and initialize main components
function World() {
  var gravity = new Box2D.Common.Math.b2Vec2(0, 0);
  this._b2World = new Box2D.Dynamics.b2World(gravity, true);

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


// Reads a JSON Map structure and draws the bodies
// in a AIBox World object
World.prototype.createMapElements = function(worldSpec) {
  var worldSensor;
  var self = this;

  // Destroy the previous map if any
  this.destroyBodies();

  worldSpec.boxes.forEach(function(box) {
    new Box(self._b2World,
            box.x,
            box.y,
            box.width,
            box.height,
            box.options);
  });

  // Draw the goal if any
  if (worldSpec.type === 'POINT_A_TO_POINT_B') {
    worldSensor = new Sensors.Toolbox['Base.World.Goal'](
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
  var agentContructor = Agent.Toolbox[agentSpecs.agent_id];

  if (!!agentContructor) {
    agent = new agentContructor(this._b2World, agentSpecs, agentSetup);
    return agent;
  } else {
    throw 'Unknown agent';
  }
};


// Returns true if the simulation is finished
World.prototype.isCompleted = function() {
  return this._b2World.COMPLETE;
};

// Render a Box2D debug visualization in an HTML5
// Canvas element
World.prototype.setDebugVisualization = function(canvasElement) {
  var scale = 30;
  var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
  var ctx = canvasElement.getContext('2d');

  var debugDraw = new b2DebugDraw();

  debugDraw.SetSprite(ctx);
  debugDraw.SetDrawScale(scale);
  debugDraw.SetFillAlpha(0.5);
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

  this._b2World.SetDebugDraw(debugDraw);

  this._redrawFunction = function() {
   // If the Box2D debug view is being used a call
   // to draw it must be done in every iteration
   // See Game Loop at:
   // http://www.box2dflash.org/docs/2.1a/updating
   this._b2World.DrawDebugData();
  };

};


/**
 * Simulates new World step. If the the world specification
 * sets any source of information for the agents it will be
 * sent by this method in every `step`
 * @method step
 * @return {Object} World data for the agents
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

exports.World = World;
