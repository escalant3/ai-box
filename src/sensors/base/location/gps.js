/**
 * A sensor that returns the (x, y) position of the agent
 */
var constructor = function(agentObject, options) {
    var setPosition = function() {
      var position = agentObject.body.GetPosition();
      agentObject.setSensor('position_x', position.x);
      agentObject.setSensor('position_y', position.y);
    };

    agentObject.syncSensorFunctions.push(setPosition);
};

exports.GPS = constructor;

