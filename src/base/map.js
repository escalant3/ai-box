// Destroy and recreate a box2d easily. This module manages
// the static and kinematic objects that agents may find
// in a simulation
//

var Box2D = require('box2dweb-commonjs').Box2D;
var _ = require('underscore');
var Box = require('./box').Box;
var Sensors = require('./../sensors/main');

// Map Object attributes
var _bodies = [];

function Map(world, structure) {
  var b;

  // If we create a new map make sure we delete the elements from
  // the previous one. This class acts like a singleton. Only one
  // map is permitted in the World at the same time
  _.each(_bodies, function(body) {
    world.DestroyBody(body);
  });

  _.each(structure.boxes, function(box) {
    b = new Box( world,
                 box.x,
                 box.y,
                 box.width,
                 box.height,
                 box.options);
    _bodies.push(b);
  });

  // Draw the goal if any
  if (structure.type === 'POINT_A_TO_POINT_B') {
    new Sensors.Toolbox['Base.World.Goal'](
      world,
      structure.world_setup.goal_area.x,
      structure.world_setup.goal_area.y,
      structure.world_setup.goal_area.radius
    );
  }

}

exports.Map = Map;
