var worldSpecs = {
  id: 2,
  name: "Wide corridors",
  description: "World with horizontal wide corridors",
  instructions: "Get from point A to point B",
  agents: [1],
  agents_setup: [
    {
      startPosition: {
        x: 1,
        y: 1,
        angle: -1.65956
      }
    }
  ],
  structure: {
    boxes: [
     {x: 21.3, y: 0, width: 0.1, height: 25,options:{'type':'static'}},
     {x: 0, y: 0, width: 0.1, height: 25,options:{'type':'static'}},
     {x: 0, y: 0, width: 25, height: 0.1,options:{'type':'static'}},
     {x: 0, y: 2, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 20, y: 4, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 0, y: 6, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 20, y: 8, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 0, y: 10, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 20, y: 12, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 0, y: 14, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 0, y: 16, width: 25, height: 0.1,options:{'type':'static'}}
    ],
    type: 'POINT_A_TO_POINT_B',
    world_setup: {
      goal_area: {
        x: 1,
        y: 15,
        radius: 0.8
      }
    }
  }
};

var agentSpecs = {
  id: 1,
  name: "4W car with two whiskers",
  specs: {
    agent_id: "RearTractionVehicle",
    width: 0.2,
    height: 0.3,
    topEngineSpeed: 2,
    maxSteerAngle: Math.PI/3,
    sensors: [
      {
        type: 'Base.Location.GPS'
      },
      {
        type: 'Base.Location.Compass'
      },
      {
        type: 'Base.Pressure.Whisker',
        options: {
          id: 'LEFT_WHISKER',
          pos_x: -0.25,
          pos_y: 0.4,
          angle: -1
        }
      },
      {
        type: 'Base.Pressure.Whisker',
        options: {
          id: 'RIGHT_WHISKER',
          pos_x: 0.25,
          pos_y: 0.4,
          angle: 1
        }
      }
    ]
  }
};

var sourceCode = [
'var turningLeft = 0;',
'var turningRight = 0;',
'',
'function carLogic(worldStatus) {',
'  var gear = 0.5;',
'  var steeringAngle = 0.0;',
'  var steerSpeed = 8.0;',
'',
'  if (turningLeft) {',
'    gear = -0.5;',
'    steeringAngle = Math.PI/3;',
'    turningLeft--;',
'  } else if (turningRight) {',
'    gear = -0.5;',
'    steeringAngle = -Math.PI/3;',
'    turningRight--;',
'  } else if (worldStatus.LEFT_WHISKER) {',
'    gear = -0.5;',
'    steeringAngle = Math.PI/3;',
'    steerSpeed = 1.0;',
'    turningLeft = 52;',
'',
'  }',
'else if (worldStatus.RIGHT_WHISKER) {',
'  gear = -0/5;',
'  steeringAngle = -Math.PI/3;',
'  steerSpeed = 1.0;',
'  turningRight = 52;',
'}',
'',
'  return {',
'    gear: gear,',
'    steeringAngle: steeringAngle,',
'    steerSpeed: steerSpeed',
'  };',
'}',
'',
'self.addEventListener(\'message\', function(msg) {',
'  var result = carLogic(msg.data);',
'  self.postMessage(result);',
'}, false);'].join('\n');



var world = new AIBox.World();
var canvasElement = document.getElementById('canvas');

// Create the map
world.createMapElements(worldSpecs.structure);
world.setDebugVisualization(canvasElement);

// Add the agent according to the world specs
var agent = world.addAgent(agentSpecs.specs,worldSpecs.agents_setup[0]);

agent.connectBrain({
  type: "webworker",
  data: sourceCode
});

var sensorsStatus;
var i = 1;
//for(var i=0;i<1000000;i++) {
setInterval(function() {
  world.step();
  sensorsStatus = agent.update();

  var logMessage = [
    'Iteration: ' + i,
    'X: ' + sensorsStatus.POSITION_X,
    'Y: ' + sensorsStatus.POSITION_Y,
    '\r'].join(' ');
  //process.stdout.write(logMessage);
  //console.log(logMessage);
  i++;
//      "X:"+sensorsStatus.POSITION_X+" y:"+sensorsStatus.POSITION_Y+"\r");
  //console.log("Angle", sensorsStatus.COMPASS_RADIANS);
}, 1000/60);

//console.log(world);
