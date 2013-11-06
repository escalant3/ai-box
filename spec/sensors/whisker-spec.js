var World = require('./../../src/base/world').World;
var Whisker = require('./../../src/sensors/base/pressure/whisker').Whisker;
var TestAgent = require('./../mocks').TestAgent;


describe('Whisker Sensor', function() {
  var world, agent;

  world = new World();
  agent = new TestAgent(world, {});

  it('should create and initialize the sensor', function() {

    var whisker = new Whisker(agent, {
      id: 'TEST_WHISKER'
    });

    expect(whisker instanceof Whisker).toBe(true);
    expect(agent.sensors.TEST_WHISKER).toBeDefined();
    expect(agent.sensors.TEST_WHISKER).toBe(0);
  });
});
