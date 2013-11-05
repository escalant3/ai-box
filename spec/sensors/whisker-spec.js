var World = require('./../../src/base/world').World;
var whisker = require('./../../src/sensors/base/pressure/whisker');
var TestAgent = require('./../mocks').TestAgent;


describe('Whisker Sensor', function() {
  var world, agent;

  world = new World();

  it('should give an identifier to the whisker', function() {

    agent = new TestAgent(world, {
      sensors: [{
        type: 'Base.Pressure.Whisker',
        options: {
          id: 'TEST_WHISKER'
        }
      }]
    });

    expect(agent.sensors.TEST_WHISKER).toBeDefined();
    expect(agent.sensors.TEST_WHISKER).toBe(0);
  });
});
