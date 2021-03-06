#!/usr/bin/env node
var fs = require('fs'),
    World = require('../src/base/world'),
    argv = require('optimist')
      .usage("Usage: $0 -w [world.json] -a [agent.json] -b [brain.json]")
      .demand(['w', 'a', 'b'])
      .alias('w', 'world')
      .describe('w', 'World json file')
      .alias('a', 'agent')
      .describe('a', 'Agent json file')
      .alias('b', 'brain')
      .describe('b', 'Brain json file')
      .argv;


var data = {};

function readFiles() {
  ['w', 'a', 'b'].forEach(function(i) {
    var json;
    try {
      text = fs.readFileSync(argv[i],  { encoding: 'utf-8' });
      data[i] = (i !== 'b') ? JSON.parse(text) : text;
    } catch(e) {
      fileError(argv[i]);
    }
  });
  startSimulation();
}

function fileError(fileName) {
  throw 'FileError: Could not read ' + fileName;
}

function startSimulation() {
  var world = new World(),
      agent;

  world.createMapElements(data.w.structure);
  agent = world.addAgent(data.a.specs, data.w.agents_setup[0]);

  agent.connectBrain({
    type: "localfile",
    data: argv.b
  });

  var interval = setInterval(function() {
    var result = world.step();
    if (world.isCompleted()) {
      clearInterval(interval);
      process.exit(0);
    }

    // On screen debugging
    console.log(result);

  }, 1000/60);
}

readFiles();
