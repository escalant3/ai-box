//////////////////////////////////////////////////////////////
// A brain driver that executes the code in an HTML5 WebWorker
//
// Expected parameters:
// - driverOptions must contain a `data` attribute with the
// source code of the driver
//////////////////////////////////////////////////////////////


var brainDrivers = require('./index');


function WebWorkerDriver(agent, driverOptions) {
  var agentSourceCode = driverOptions.data;
  var blob = new Blob([agentSourceCode], {type: "text/javascript"});
  var worker = new Worker(URL.createObjectURL(blob));

  // Listen for worker response to set agent actuators
  worker.addEventListener('message', function(msg) {
    agent.setValues(msg.data);
  }, false);

  // this function is excuted in every `step` allowing to
  // send the information in the sensors to the worker
  agent.sendMessageToBrain = function(sensorInformation) {
    worker.postMessage(sensorInformation);
  };

  agent.disconnectDriver = function() {
    worker.terminate();
  };
}


brainDrivers.registerMixin("webworker", WebWorkerDriver);
