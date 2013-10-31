var brainDrivers = require('./index');


function LocalFileDriver(agent, options) {
/**
 * A brain driver that executes the code from a file from
 * disk in the same Thread the simulation is running
 *
 * @class LocalFileDriver
 * @namespace Brain
 * @constructor
 * @param {Object} agent The agent which will be controlled
 * by this brain
 * @param {Object} options The options to configure this
 * brain
 *
 * ```
 *  options must contain a `data` attribute with the
 *  absolute path to the file, which must be a nodejs
 *  script that exports a function`driverLogic`.
 *  The function takes the sensor information as a
 *  parameter and returns the new values for the actuators
 *
 *  This brain is not available in the browser
 * ```
 */


  var localFile = require(options.data);

  // this function is excuted in every `step` allowing to
  // send the information in the sensors to the worker
  agent.sendMessageToBrain = function(sensorInformation) {
    var result = localFile.driverLogic(sensorInformation);
    agent.setValues(result);
  };
}


brainDrivers.registerMixin("localfile", LocalFileDriver);
