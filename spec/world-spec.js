var World = require('./../src/base/world').World;
var Box2D = require('box2dweb-commonjs');
var Agent = require('./../src/agents/index');


describe('World', function() {
  var world;

  beforeEach(function() {
    world = new World();
  });

  afterEach(function() {
    world.destroyBodies();
    world = null;
  });

  it('should create a world', function() {
    expect(world instanceof World).toBe(true);
    expect(world._b2World instanceof Box2D.b2World).toBe(true);
    // Worlds are created with the `ground body`
    expect(world._b2World.GetBodyCount()).toBe(1);
  });

  it('should be able to add elements to a world', function() {
    var map = {boxes: [{x: 0, y: 0, width: 5, height: 5}]};
    world.createMapElements(map);
    expect(world._b2World.GetBodyCount()).toBe(2);
  });

  it('should be able to delete all the bodies in the world', function() {
    expect(world._b2World.GetBodyCount()).toBe(1);
    world.destroyBodies();
    expect(world._b2World.GetBodyList()).toBe(null);
    expect(world._b2World.GetBodyCount()).toBe(0);
  });

  it('should add a valid agent', function() {
    function AgentFoo() {}
    Agent.registerAgent('AgentFoo', AgentFoo);
    var agentSpecs = {agent_id: 'AgentFoo'};
    var agent = world.addAgent(agentSpecs);
    expect(agent).toNotBe(null);
    expect(agent instanceof AgentFoo).toBe(true);
  });
});
