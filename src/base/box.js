 //
 // Utilities to draw boxes in a box2d world

var Box2D = require('box2dweb-commonjs').Box2D;
var extend = require('extend');

/* Constants */
var BODY_TYPES   = {
  "static": Box2D.Dynamics.b2Body.b2_staticBody
};


/* Box2d aliases */
var b2Body = Box2D.Dynamics.b2Body;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;


function Box(world, x, y, width, height, options) {

  // Casting
  x = parseFloat(x);
  y = parseFloat(y);
  width = parseFloat(width);
  height = parseFloat(height);

  // Extract string encoded body type
  if (!!options && typeof options.type === "string") {
    options.type = BODY_TYPES[options.type];
  }

  //default setting
  options = extend(true, {
    'density' : 1.0 ,
          'friction' : 0.0 ,
          'restitution' : 0.2 ,

          'linearDamping' : 0.0 ,
          'angularDamping' : 0.0 ,

          'gravityScale' : 1.0 ,
          'type' : b2Body.b2_dynamicBody
  }, options);

  var body_def = new b2BodyDef();
  var fix_def = new b2FixtureDef();

  fix_def.density = options.density;
  fix_def.friction = options.friction;
  fix_def.restitution = options.restitution;

  fix_def.shape = new b2PolygonShape();

  fix_def.shape.SetAsBox( width , height );

  if (!!options.fixtureFilter) {
    extend(true, fix_def.filter, options.fixtureFilter);
  }

  body_def.position.Set(x , y);

  body_def.linearDamping = options.linearDamping;
  body_def.angularDamping = options.angularDamping;

  body_def.type = options.type;

  var b = world.CreateBody( body_def );
  var f = b.CreateFixture(fix_def);

  return b;
}

exports.Box = Box;
