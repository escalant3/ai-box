// Manages a box2d world

var Box2D = require('box2dweb-commonjs').Box2D;
var Sensors = require('./../sensors/main');
var AIBoxMap = require('./map').Map;
var Agent = require('./../agents/index');

var TIME_STEP = 1.0/60; // 60 Hertzs

// Create a Box2D world and initialize main components
function World() {
  var gravity = new Box2D.Common.Math.b2Vec2(0, 0);
  this._b2World = new Box2D.Dynamics.b2World(gravity, true);
  this._map = null;

  // The `_redrawFunction` is meant to ve overriden by the
  // selected visualization method. It will be called in
  // every step.
  // Not all the simulation enviroments need it
  this._redrawFunction = function() { };
  Sensors.setAsyncListeners(this._b2World);
}


// Reads a JSON Map structure and draws the bodies
// in a AIBox World object
World.prototype.createMapElements = function(mapStructure) {
  this._map = new AIBoxMap(this._b2World, mapStructure);
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


// Simulates new World step
World.prototype.step = function() {

  this._b2World.Step(TIME_STEP , 8 , 3);

  // Clear forces must be called after everystep
  // See Game Loop at:
  // http://www.box2dflash.org/docs/2.1a/updating
  this._b2World.ClearForces();

  this._redrawFunction();
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
