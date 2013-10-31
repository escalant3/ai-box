var aibox = require('./../src/index');

var localFileBrain = process.argv[2];
if (!localFileBrain) {
  throw 'The absolute path to a brain file is required'
}

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

var world = new aibox.World();

// Create the map
world.createMapElements(worldSpecs.structure);

// Add the agent according to the world specs
var agent = world.addAgent(agentSpecs.specs,worldSpecs.agents_setup[0]);

agent.connectBrain({
  type: "localfile",
  data: localFileBrain
});

var sensorsStatus;
var i = 1;

setInterval(function() {
  world.step();
  sensorsStatus = agent.update();

  var logMessage = [
    'Iteration: ' + i,
    'X: ' + sensorsStatus.POSITION_X,
    'Y: ' + sensorsStatus.POSITION_Y,
    '\r'].join(' ');
  process.stdout.write(logMessage);
  i++;

}, 1000/60);

