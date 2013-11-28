var Box2D = require('box2dweb-commonjs').Box2D;

var toolbox = {
  'Base.Location.GPS': require('./base/location/gps'),
  'Base.Location.Compass': require('./base/location/compass'),
  'Base.Pressure.Whisker': require('./base/pressure/whisker'),
  'Base.World.Goal': require('./base/world/goal')
};


/**
 * The toolbox provides a mechanism to attach user defined
 * agents easily to ai-box
 *
 * This object relates a name in the form of a string with
 * the Agent constructor
 */
module.exports.toolbox = toolbox;
module.exports.setAsyncListeners = setAsyncListeners;


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


