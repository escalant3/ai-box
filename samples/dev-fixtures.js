// Nothing
angular.module('scaena')
.service('mockBackend', function(Fixtures, WorldModel, AgentModel, BrainModel) {
  this.mock = function() {
    WorldModel.query = function() { return Fixtures.World; };
    WorldModel.get = function(id) { return Fixtures.World[id-1]; };
    AgentModel.get = function(id) { return Fixtures.Agent[id-1]; };
    BrainModel.query = function() { return Fixtures.Brain; };
    BrainModel.get = function(id) { return Fixtures.Brain[id-1]; };
  };
}).run(function(mockBackend) { mockBackend.mock(); });


angular.module('scaena')
.service('Fixtures', function() {
  var World = [{
    id: 1,
    name: "The beginning",
    description: "Learn to move forward",
    instructions: "Use leftPower and rightPower with the same positive value to move forward",
    agents: [2],
    agents_setup: [
      {
        startPosition: {
          x: 1.5,
          y: 1
        }
      }
    ],
    structure: {
    type: 'POINT_A_TO_POINT_B',
    world_setup: {
      goal_area: {
        x: 1.5,
        y: 15,
        radius: 0.8
      }
    },

      boxes: [
       { x: 0.1, y: 0.1, width:3, height: 0.1, options: { 'type': 'static'}},
       { x: 0.1, y: 0.1, width: 0.1, height: 25, options: { 'type': 'static' }},
       { x: 0.1, y: 16, width: 3, height: 0.1, options: { 'type': 'static'}},
       { x: 3, y: 0.1, width: 0.1, height: 20, options: { 'type': 'static' }}
    ]
  }
},
{
    id: 2,
    name: "Around the corner",
    description: "Learn to turn when you hit a wall",
    instructions: "Detect a colision with a wall reading the values from the whiskers. To turn around apply the same value but with different sign to each wheel (leftPower, rightPower). You cannot turn in portion of a second, so you'll need to keep turning for some time.",
    agents: [2],
    agents_setup: [
      {
        startPosition: {
          x: 1.5,
          y: 1
        }
      }
    ],
    structure: {
    type: 'POINT_A_TO_POINT_B',
    world_setup: {
      goal_area: {
        x: 19,
        y: 14.25,
        radius: 1
      }
    },

      boxes: [
       { x: 0.1, y: 0.1, width:3, height: 0.1, options: { 'type': 'static'}},
       { x: 0.1, y: 0.1, width: 0.1, height: 16, options: { 'type': 'static' }},
       { x: 3, y: 0.1, width: 0.1, height: 13, options: { 'type': 'static' }},
       { x: 12, y: 13, width: 9, height: 0.1, options: { 'type': 'static' }},
       { x: 10.5, y: 15.5, width: 11, height: 0.1, options: { 'type': 'static' }},
       { x: 21, y: 14.25, width: 0.11, height: 1.4, options: { 'type': 'static' }}
    ]
  }
},
{
  id: 3,
  name: "Zigazig Ha!",
  description: "Test world with a few static boxes",
  instructions: "Just wander around",
  agents: [2],
  agents_setup: [
  {
    startPosition: {
      x: 3,
      y: 3
    }
  }
  ],
    structure: {
      type: 'POINT_A_TO_POINT_B',
      world_setup: {
        goal_area: {
          x: 15,
          y: 10.5,
          radius: 1
        }
      },
      boxes: [
      { x: 2.3, y: 6, width: 0.5, height: 0.4, options: { 'type': 'static' }},
      { x: 6, y: 3.8, width: 0.5, height: 0.4, options: { 'type': 'static' }},
      { x: 3.6, y: 8, width: 0.5, height: 0.4, options: { 'type': 'static' }},
      { x: 10, y: 5.8, width: 0.5, height: 0.4, options: { 'type': 'static' }},
      { x: 7.7, y: 10.5, width: 0.5, height: 0.4, options: { 'type': 'static' }},
      { x: 13, y: 8.2, width: 0.5, height: 0.4, options: { 'type': 'static' }},
      { x: 10.5, y: 12, width: 0.5, height: 0.4, options: { 'type': 'static' }},
      { x: 0, y: 0, width: 25, height: 0.1, options: { 'type': 'static'}},
      { x: 0, y: 0, width: 0.1, height: 25, options: { 'type': 'static' }},
      { x: 0, y: 16, width: 25, height: 0.1, options: { 'type': 'static'}},
      { x: 21.3, y: 0, width: 0.1, height: 20, options: { 'type': 'static' }}
      ]
    }
},

{
  id: 4,
  name: "Wide corridors",
  description: "World with horizontal wide corridors",
  instructions: "Get from point A to point B. Bacon ipsum dolor sit amet meatball pork belly venison capicola, salami shankle corned beef pork loin t-bone leberkas shoulder hamburger ball tip short ribs. Brisket chicken kielbasa leberkas bacon shoulder corned beef. Jerky strip steak bacon, flank short ribs tail spare ribs bresaola andouille rump short loin. Jerky venison beef ribs andouille kevin pork loin tongue strip steak meatloaf turducken t-bone. Bresaola shank biltong kielbasa, bacon capicola sausage meatball shoulder ribeye short ribs doner pork ham. Bresaola pig tongue salami, short loin flank corned beef jerky venison biltong drumstick.  Short loin ball tip brisket spare ribs boudin cow tail venison short ribs swine tri-tip strip steak jerky. Meatloaf beef ribs ham shank pork chop leberkas bresaola t-bone. Tongue ham hock meatloaf tri-tip strip steak, shank ham ground round short loin short ribs biltong beef. Pork belly tongue corned beef swine capicola kielbasa venison shoulder leberkas tenderloin beef ribs salami. Shankle meatloaf meatball, shank turkey frankfurter sirloin pig tenderloin. Venison shankle pork loin, kielbasa corned beef ball tip doner spare ribs tenderloin ham hock shoulder flank brisket.  Strip steak ball tip sirloin jowl brisket. Salami chicken beef, short loin turkey frankfurter sirloin chuck pork chop t-bone tri-tip. Ham hock salami jerky hamburger, boudin ground round andouille chicken rump filet mignon tenderloin pancetta meatloaf t-bone beef ribs. Short loin cow capicola short ribs leberkas salami.",
  agents: [2],
  agents_setup: [{
    startPosition: {
      x: 1,
      y: 1,
      angle: -1.5914
      }
  }],
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
        x: 2,
        y: 15,
        radius: 0.8
      }
    }
  }
},
{
  id: 5,
  name: "Narrow corridors",
  description: "World with several narrow corridors",
  instructions: "Get from point A to point B",
  agents: [2],
  agents_setup: [
    {
      startPosition: {
        x: 1,
        y: 0.75,
        angle: -1.5914
      }
    }
  ],
  structure: {
    boxes: [
     {x: 21.3, y: 0, width: 0.1, height: 25,options:{'type':'static'}},
     {x: 0, y: 0, width: 0.1, height: 25,options:{'type':'static'}},
     {x: 0, y: 0, width: 25, height: 0.1,options:{'type':'static'}},
     {x: 0, y: 1.5, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 20, y: 3, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 0, y: 4.5, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 20, y: 6, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 0, y: 7.5, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 20, y: 9, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 0, y: 10.5, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 20, y: 12, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 0, y: 13.5, width: 15, height: 0.1,options:{'type':'static'}},
     {x: 0, y: 15, width: 25, height: 0.1,options:{'type':'static'}}
    ]
  }
}

];

var Agent = [
{
  id: 1,
  name: "Circular agent with 2 wheels",
  specs: {
    agent_id: "CircularRobot",
    x: 1,
    y: 1,
    radius: 0.5,
    maxSpeed: 5,
    leftWheel: {
      offset_x: 0.3,
      offset_y: 0,
      width: 0.03,
      height: 0.15
    },
    rightWheel: {
      offset_x: -0.3,
      offset_y: 0,
      width: 0.03,
      height: 0.15
    },

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
          id: 'left_whisker',
          pos_x: 0.25,
          pos_y: 0.65,
          angle: 1.2,
          width: 0.01,
          height: 0.2
        }
      },
      {
        type: 'Base.Pressure.Whisker',
        options: {
          id: 'right_whisker',
          pos_x: -0.25,
          pos_y: 0.65,
          angle: -1,
          width: 0.01,
          height: 0.2
        }
      }
    ]
  }
},
{
  id: 2,
  name: "Circular agent with 2 wheels and long whiskers",
  specs: {
    agent_id: "CircularRobot",
    x: 1,
    y: 1,
    radius: 0.5,
    maxSpeed: 5,
    leftWheel: {
      offset_x: 0.3,
      offset_y: 0,
      width: 0.03,
      height: 0.15
    },
    rightWheel: {
      offset_x: -0.3,
      offset_y: 0,
      width: 0.03,
      height: 0.15
    },

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
          id: 'left_whisker',
          pos_x: 0.25,
          pos_y: 0.70,
          angle: 0.77,
          width: 0.01,
          height: 0.3
        }
      },
      {
        type: 'Base.Pressure.Whisker',
        options: {
          id: 'right_whisker',
          pos_x: -0.25,
          pos_y: 0.70,
          angle: -0.77,
          width: 0.01,
          height: 0.3
       }
      }
    ]
  }
}
];


var Brain = [{
  id: 1,
  name: "Empty brain",
  documentation: "Give leftPower and rightPower values between -1 and 1",
  sourceCode: [
'function agentLogic(sensorsData, worldData) {',
'  var leftPower = 0;',
'  var rightPower = 0;',
'',
'  // YOUR CODE HERE',
'',
'  return {',
'    leftPower: leftPower,',
'    rightPower: rightPower',
'  };',
'}',
''].join('\n'),
  agent: 1
},
{  id: 2,
  name: "Simple Reactor for Circular Robot",
  documentation: "TODO Docs",
  sourceCode: [
 'var turningLeft = 0;',
'var turningRight = 0;',
'var turningLength = 52;',
'var backwardsLength = 31;',
'',
'function agentLogic(sensorsData, worldData) {',
'  var leftPower = 1;',
'  var rightPower = 1;',
'',
'  if (turningLeft) {',
'    leftPower = -1;',
'    rightPower = 1;',
'    if (turningLeft>backwardsLength) rightPower = -1;',
'    turningLeft--;',
'  } else if (turningRight) {',
'    leftPower = 1;',
'    rightPower = -1;',
'    if (turningRight>backwardsLength) leftPower = -1;',
'    turningRight--;',
'  } else if (sensorsData.left_whisker || sensorsData.right_whisker) {',
'    if (sensorsData.position_x < 4) turningLeft = turningLength;',
'    else turningRight = turningLength;',
'  }',
'',
'  return {',
'    leftPower: leftPower,',
'    rightPower: rightPower',
'  };',
'}',
''].join('\n'),
  agent: 2
},
{
  id: 3,
  name: "Turn hacks",
  documentation: "TODO Docs",
  sourceCode: [
'var turningLeft = 0;',
'var turningRight = 0;',
'var TURNING_TIME = 52;',
'var leftPower = 0;',
'var rightPower = 0;',
'',
'function turnLeft() {',
'    leftPower = -1;',
'    rightPower = turningLeft > 30 ? -1 : 1;',
'}',
'',
'function turnRight() {',
'    rightPower = -1;',
'    leftPower = turningRight > 30 ? -1 : 1;',
'}',
'',
'function moveForward() {',
'    leftPower = rightPower = 1;',
'}',
'',
'function agentLogic(sensorsData, worldData) {',
'  if (turningLeft) {',
'      turningLeft--;',
'      turnLeft();',
'  } else if (turningRight) {',
'      turningRight--;',
'      turnRight();',
'  } else if (sensorsData.right_whisker) {',
'    turningLeft = TURNING_TIME;',
'    turnLeft();',
'  } else if (sensorsData.left_whisker) {',
'    turningRight = TURNING_TIME;',
'    turnRight();',
'  }else {',
'      moveForward();',
'  }',
'',
'  return {',
'    leftPower: leftPower,',
'    rightPower: rightPower',
' };',
'}',
''].join('\n'),
  agent: 2
}

];
  return {
    World: World,
    Agent: Agent,
    Brain: Brain
  };
});
