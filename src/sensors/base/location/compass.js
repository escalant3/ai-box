/**
 * Returns the orientation of the agent in radians
 */
var constructor = function(agentObject, options) {
    var setAngle = function() {
      agentObject.setSensor('orientation',
                            agentObject.body.GetAngle());
    };

    agentObject.syncSensorFunctions.push(setAngle);
};

module.exports = constructor;
