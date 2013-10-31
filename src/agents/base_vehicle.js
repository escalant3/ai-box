var BaseAgent = require('./base_agent').BaseAgent;

/**
 * Provides common methods between all the agents implementing
 * vehicles with wheels
 *
 * @class BaseVehicle
 * @namespace Agent
 * @extends BaseAgent
 * @constructor
 * @param {Object} world A Box2D world
 * @param {Object} specs An object containing the structural
 * details of an agent
 */
function BaseVehicle(world, specs) {
  BaseAgent.call(this, world, specs);
}

BaseVehicle.prototype = Object.create(BaseAgent.prototype);
BaseVehicle.prototype.constructor = BaseVehicle;

module.exports.BaseVehicle = BaseVehicle;
