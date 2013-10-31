//
// TODO Explain how registerAgent works here...
//

var toolbox = {};

function registerAgent(name, agent) {
  toolbox[name] = agent;
}


exports.Toolbox = toolbox;
exports.registerAgent = registerAgent;


// Load base agents
require('./rear_traction_vehicle');

