"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

var _arrays = require("./functions-controller/arrays.js");

var _options = require("./functions-controller/options.js");

var mdLinks = function mdLinks(path, options) {
  if (options.validate === true) {
    return (0, _options.validateLinks)(path).then(function (response) {
      return console.log(response);
    }).catch(function (error) {
      return console.log(error);
    });
  } else {
    return new Promise(function (resolve) {
      return resolve((0, _arrays.extractLinks)(path));
    });
  }
}; // console.log(mdLinks('C:\\Users\\Laboratoria\\Documents\\', {validate:true}));


exports.mdLinks = mdLinks;