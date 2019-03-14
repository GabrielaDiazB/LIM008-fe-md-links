"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _arrays = require("./functions-controller/arrays.js");

var _options = require("./functions-controller/options.js");

var mdLinks = function mdLinks(path, options) {
  if (options.validate) {
    return (0, _options.validateLinks)(path);
  } else {
    return new Promise(function (resolve) {
      return resolve((0, _arrays.extractLinks)(path));
    });
  }
};

exports.mdLinks = mdLinks;
mdLinks('test', {
  validate: false
}).then(function (response) {
  return console.log(response);
});