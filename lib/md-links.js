"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _paths = require("./functions-controller/paths");

var _arrays = require("./functions-controller/arrays.js");

var _options = require("./functions-controller/options.js");

var options = {
  validate: true,
  stats: true
};

var mdLinks = function mdLinks(path, options) {
  if (options.validate && !options.stats) {
    return (0, _options.validateLinks)(path).then(function (response) {
      return console.log(response);
    });
  } else if (!options.validate && options.stats) {
    return (0, _options.getLinksStats)(path).then(function (response) {
      return console.log(response);
    });
  } else if (!options.validate && !options.stats) {
    return console.log((0, _arrays.extractLinks)(path));
  } else if (options.validate && options.stats) {
    return Promise.all([(0, _options.getLinksStats)(path), (0, _options.getBrokenLinksStats)(path)]).then(function (response) {
      return console.log(response);
    });
  }
};

exports.mdLinks = mdLinks;
mdLinks("".concat(process.cwd(), "\\test"), options);