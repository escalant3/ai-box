var brainDrivers = require('./index');


/**
 * A brain driver able to connect to a port serving a websocket
 * and communicate with it to control an agent
 * @class SocketIO
 * @constructor
 * @param {Object} agent The agent which will be controlled
 * by this brain
 * @param {Object} options The options to configure this
 * brain.
 *
 *  It requires a `url` field which the target WebSocket
 *  that will control this brain
 *
 */
function SocketIODriver(agent, options) {
  // A possible previous connection must be closed before
  // starting a new one to avoid problems
  if (!!this.socket) {
    this.socket.disconnect();
    this.socket = null;
  }

  this.socket = io.connect(options.url);

  this.socket.on('robojson.response', function(response) {
    agent.setValues(response);
  });

  // Function that will be called every tic
  agent.sendMessageToBrain = function(sensorInformation) {
    agent.socket.emit('robojson.status', agent.sensors);
  };

  // Attach disconnection function
  agent.disconnectDriver = function() {
    if (!!this.socket) {
      this.socket.emit('robojson.reset');
    }
  };
}


brainDrivers.registerMixin('SocketIO', SocketIODriver);
