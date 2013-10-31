var Box2D = require('box2dweb-commonjs').Box2D;

function setAsyncListeners(world) {
  var listener = new Box2D.Dynamics.b2ContactListener();

  listener.BeginContact = function(contact) {
    var fixtureA = contact.GetFixtureA();
    var fixtureB = contact.GetFixtureB();
    var userDataA = fixtureA.GetUserData();
    var userDataB = fixtureB.GetUserData();

    if (userDataA && userDataA.onBeginContact) {
      userDataA.onBeginContact();
    }

    if (userDataB && userDataB.onBeginContact) {
      userDataB.onBeginContact();
    }
  };

  listener.EndContact = function(contact) {
    var fixtureA = contact.GetFixtureA();
    var fixtureB = contact.GetFixtureB();
    var userDataA = fixtureA.GetUserData();
    var userDataB = fixtureB.GetUserData();

    if (userDataA && userDataA.onEndContact) {
      userDataA.onEndContact();
    }
    if (userDataB && userDataB.onEndContact) {
      userDataB.onEndContact();
    }
  };

  world.SetContactListener(listener);
}


exports.setAsyncListeners = setAsyncListeners;

// Available sensors must be registered in this object
exports.Toolbox = {
  'Base.Location.GPS': require('./base/location/gps').GPS,
  'Base.Location.Compass': require('./base/location/compass').Compass,
  'Base.Pressure.Whisker': require('./base/pressure/whisker').Whisker,
  'Base.World.Goal': require('./base/world/goal').GoalSensor
};

