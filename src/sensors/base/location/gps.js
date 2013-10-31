/////////////////////////////////////////////////
//// Returns the position of the agent in (x, y)
/////////////////////////////////////////////////


var constructor = function(agentObject, options) {
    var setPosition = function() {
      var position = agentObject.body.GetPosition();
      agentObject.setSensor('POSITION_X', position.x);
      agentObject.setSensor('POSITION_Y', position.y);
    };

    agentObject.syncSensorFunctions.push(setPosition);
};

exports.GPS = constructor;

