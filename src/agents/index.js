var FrontTractionVehicle = require('./front_traction_vehicle');
var CircularRobot = require('./circular_robot');


// Load the built-in agents
var toolbox = {
  'CircularRobot': CircularRobot,
  'FrontTractionVehicle': FrontTractionVehicle
};


/**
 * The toolbox provides a mechanism to attach user defined
 * agents easily to ai-box
 *
 * This object relates a name in the form of a string with
 * the Agent constructor
 */
exports.toolbox = toolbox;

