//
// TODO Explain how registerMixin works here...
//

var toolbox = {};

function registerMixin(name, mixin) {
  toolbox[name] = mixin;
}


exports.Toolbox = toolbox;
exports.registerMixin = registerMixin;


// Load base drivers
require('./localfile');
require('./socket_io');
require('./webworker');

