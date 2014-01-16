var Box2D = require('box2dweb-commonjs').Box2D;

/**
 * Render a Box2D debug visualization in an HTML5
 * Canvas element
 */
function Box2DDebugDraw(world, options) {
  var scale = 30;
  var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
  var canvasElement = options && options.canvasElement;

  if (!canvasElement) { throw 'An HTML5 Canvas is required'; }

  var ctx = canvasElement.getContext('2d');

  var debugDraw = new b2DebugDraw();

  debugDraw.SetSprite(ctx);
  debugDraw.SetDrawScale(scale);
  debugDraw.SetFillAlpha(0.5);
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

  world._b2World.SetDebugDraw(debugDraw);

  world._redrawFunction = function() {
   // If the Box2D debug view is being used a call
   // to draw it must be done in every iteration
   // See Game Loop at:
   // http://www.box2dflash.org/docs/2.1a/updating
   world._b2World.DrawDebugData();
  };
}

module.exports = Box2DDebugDraw;
