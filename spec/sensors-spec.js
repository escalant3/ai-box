var Sensors = require('./../src/sensors/index');


describe('Sensors', function() {
  it('should provide a toolbox object', function() {
    expect(typeof Sensors.toolbox).toBe('object');
  });

  it('should load the built-in sensors', function() {
    expect(Sensors.toolbox['Base.Pressure.Whisker']).toBeDefined();
  });

  it('should be able to add custom sensors', function() {
    expect(Sensors.toolbox.FooSensor).toBeUndefined();
    Sensors.toolbox.FooSensor = function FooSensor() {};
    expect(Sensors.toolbox.FooSensor).toBeDefined();
  });
});
