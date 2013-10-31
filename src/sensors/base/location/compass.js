///////////////////////////////////////////////////
// Returns the orientation of the agent in radians
///////////////////////////////////////////////////


var constructor = function(agentObject, options) {
    var setAngle = function() {
      agentObject.setSensor('COMPASS_RADIANS',
                            agentObject.body.GetAngle());
    };

    agentObject.syncSensorFunctions.push(setAngle);
};

exports.Compass = constructor;
