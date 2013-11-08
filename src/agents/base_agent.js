var BrainMixins = require('./../brains/index');
var Sensors = require('./../sensors/main.js');


/**
 * The BaseAgent class provides all the common functionality
 * shared by the agents available in ai-box.
 * Although this class should never be instanciated by itself,
 * it provides a general view of the structure that custom
 * agents must follow.
 *
 * @class BaseAgent
 * @namespace Agent
 * @constructor
 * @param {Object} world A Box2D world
 * @param {Object} specs An object containing the structural
 * details of an agent
 */
function BaseAgent(world, specs) {
  if (!world) { throw "Cannot create an agent without a world"; }
  if (!specs) { throw "Cannot create an agent without specs"; }

  // Agent identifier
  this.name = specs.name;

  // Sync Sensors can register themselves into this structure.
  // The values will be updated in every world tic
  this.syncSensorFunctions = [];

  // Async sensors registry
  this.sensors = {};

  if (!!specs.sensors) {
    this.initializeSensors(world, specs.sensors);
  }
}


/**
 * Sets the value of a `sensorName` to a `value`. The structure
 * with all the sensor values is sent to the brain every tic
 *
 * @method setSensor
 * @param {String} sensorName The unique identifier of the sensor
 * @param {Object} value The value of the sensor (usually a number)
 */
BaseAgent.prototype.setSensor = function(sensorName, value) {
  this.sensors[sensorName] = value;
};


/**
 * A handler listening for the `brain` message with the data to be
 * applied to the agent actuators. Each agent works in a
 * different way so this method must be overriden by the child
 * classes.
 *
 * @method setValues
 * @param {Object} values An object with the values to
 * be applied to the actuators
 */
BaseAgent.prototype.setValues = function(values) {
  throw 'setValues must be defined by the agent';
};


/**
 * Executed every tic, it reads the last actuator values written
 * in the agent and applies them to the related components.
 * All forces, torques, velocity, etc are applied in this call.
 * Each agent works in a different way so this method must
 * be overriden by the child classes.
 *
 * @method setActuators
 * @param {Object} values An object with the values to
 * be applied to the actuators
 */
BaseAgent.prototype.setActuators = function(values) {
  throw 'setActuators must be defined by the agent';
};


/**
 * Iterates through all the sensors specified in the agent
 * and initializes them with the constructors provided in
 * the `Sensor Toolbox`
 *
 * @method initializeSensors
 * @param {Object} World A Box2D world
 * @param {Array} sensorSpecsArray An array containing the
 * specs of the sensors shipped with the agent
 */
BaseAgent.prototype.initializeSensors = function(world, sensorSpecsArray) {
  var self = this;

  sensorSpecsArray.forEach(function(sensorSpec) {
    var sensorInitFn = Sensors.Toolbox[sensorSpec.type];

    if (!sensorInitFn) {
      throw new Error(sensorSpec.type + " is not a valid sensor");
    }

    sensorInitFn(self, sensorSpec.options);
  });
};


/**
 * The main loop function in the agent. Composed of
 * several stages:
 *
 *  - Apply physics to actuators
 *  - Set synchronous sensors values
 *  - Send a message with the status to the brain
 *
 * @method update
 * @param {Object worldData World information
 * @return {Object} The value of the sensors
 */
BaseAgent.prototype.update = function(worldData) {
  this.setActuators();

  // Set synchronous sensors (every tic)
  this.syncSensorFunctions.forEach(function(syncFn) {
    syncFn();
  });

  // Return if finished
  // TODO Handling
  if (this.sensors.GOAL) throw new Error("Done!");

  // Send status to clients. This function is defined
  // by the Brain associated with the agent
  if (!!this.sendMessageToBrain) {
    this.sendMessageToBrain(this.sensors, worldData);
  }

  return this.sensors;
};


/**
 * Links a `brain` to the agent. It will try to match the
 * given type with the Brains avaiable in the Toolbox
 *
 * @method connectBrain
 * @param {Options} driverOptions An object with the
 * specification of the brain
 *
 *   - A `type` field is mandatory in the `options` object.
 *   It will be a string identifying one of the Brains in
 *   the Toolbox.
 *   - The other fields will depend on the Brain. For instance,
 *   a SocketIO Brain will require the URL of the socket while a
 *   WebWorker Brain will require the code to be executed by the
 *   worker. Check the Brains section for more information
 */
BaseAgent.prototype.connectBrain = function(driverOptions) {

  var brainMixin = BrainMixins.Toolbox[driverOptions.type];

  if (!!brainMixin) {
    brainMixin(this, driverOptions);
  } else {
    throw "Unknown brain mixin.";
  }
};


module.exports.BaseAgent = BaseAgent;
