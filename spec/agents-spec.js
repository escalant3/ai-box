var Agents = require('./../src/agents/index');


describe('Agents', function() {
  it('should provide a toolbox object', function() {
    expect(typeof Agents.toolbox).toBe('object');
  });

  it('should load the built-in agents', function() {
    expect(Agents.toolbox.CircularRobot).toBeDefined();
  });

  it('should be able to add custom agents', function() {
    expect(Agents.toolbox.FooAgent).toBeUndefined();
    Agents.toolbox.FooAgent = function FooAgent() {};
    expect(Agents.toolbox.FooAgent).toBeDefined();
  });
});
