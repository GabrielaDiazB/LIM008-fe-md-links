#!/usr/bin/env node
"use strict";

var _index = require("./index.js");

var _options = require("./functions-controller/options.js");

var args = process.argv.slice(2);
var options = {
  validate: false,
  stats: false
};

if (args.length === 0) {
  console.log('Por favor ingrese una ruta');
}

if (args.length === 1) {
  (0, _index.mdLinks)(args[0], options).then(function (response) {
    return response.forEach(function (links) {
      return console.log("\n Path :".concat(links.file, " \n Link : ").concat(links.href, "  \n Texto : ").concat(links.text));
    });
  });
}

;

if (args.length === 2) {
  if (args[1] === '--stats' || args[1] === '--s') {
    options.stats = true;
    (0, _options.getLinksStats)(args[0]).then(function (response) {
      return console.log(response);
    }).catch(function (error) {
      return console.log(error);
    });
  }

  ;

  if (args[1] === '--validate' || args[1] === '--v') {
    options.validate = true;
    (0, _index.mdLinks)(args[0], options).then(response.forEach(function (links) {
      return console.log("\n Path :".concat(links.file, " \n Link : ").concat(links.href).concat(links.status).concat(links.message, " \n texto : ").concat(links.text, " "));
    }));
  }

  ;
}

;

if (args.length === 3) {
  if (args[1] === '--validate' && args[2] === '--stats' || args[1] === '--stats' && args[2] === '--validate') {
    options.validate = true;
    options.stats = true;
    Promise.all([(0, _options.getLinksStats)(args[0]), (0, _options.getBrokenLinksStats)(args[0])]).then(function (response) {
      return response.forEach(function (properties) {
        return console.log(properties);
      });
    }).catch(function (error) {
      return console.log(error);
    });
  }
}

;