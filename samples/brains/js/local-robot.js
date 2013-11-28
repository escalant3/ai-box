var turningLeft = 0;
var turningRight = 0;
var turningLength = 52;
var backwardsLength = 31;

function agentLogic(sensorsData, worldData) {
  var leftPower = 1;
  var rightPower = 1;

  if (turningLeft) {
    leftPower = -1;
    rightPower = 1;
    if (turningLeft>backwardsLength) rightPower = -1;
    turningLeft--;
  } else if (turningRight) {
    leftPower = 1;
    rightPower = -1;
    if (turningRight>backwardsLength) leftPower = -1;
    turningRight--;
  } else if (sensorsData.left_whisker || sensorsData.right_whisker) {
    if (sensorsData.position_x < 4) turningLeft = turningLength;
    else turningRight = turningLength;
  }

  return {
    leftPower: leftPower,
    rightPower: rightPower
  };
}



exports.driverLogic = agentLogic;
