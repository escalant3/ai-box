var turningLeft = 0;
var turningRight = 0;

function carLogic(worldStatus) {
  var gear = 0.5;
  var steeringAngle = 0.0;
  var steerSpeed = 8.0;

  if (turningLeft) {
    gear = -0.5;
    steeringAngle = Math.PI/3;
    turningLeft--;
  } else if (turningRight) {
    gear = -0.5;
    steeringAngle = -Math.PI/3;
    turningRight--;
  } else if (worldStatus.LEFT_WHISKER) {
    gear = -0.5;
    steeringAngle = Math.PI/3;
    steerSpeed = 1.0;
    turningLeft = 52;

  }
else if (worldStatus.RIGHT_WHISKER) {
  gear = -0/5;
  steeringAngle = -Math.PI/3;
  steerSpeed = 1.0;
  turningRight = 52;
}

  return {
    gear: gear,
    steeringAngle: steeringAngle,
    steerSpeed: steerSpeed
  };
}


exports.driverLogic = carLogic;
