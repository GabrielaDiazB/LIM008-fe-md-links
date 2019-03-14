"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrokenLinksStats = exports.getLinksStats = exports.validateLinks = void 0;

var _arrays = require("./arrays.js");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Función para Validar los links
var validateLinks = function validateLinks(data) {
  var objLinks = (0, _arrays.extractLinks)(data);
  var runLinks = objLinks.map(function (links) {
    return new Promise(function (resolve) {
      var linksHref = (0, _nodeFetch.default)(links.href);
      return linksHref.then(function (response) {
        if (response.status >= 200 && response.status < 400) {
          links.status = response.status;
          links.message = response.statusText;
          resolve(links);
        } else {
          links.status = response.status;
          links.message = 'Fail';
          resolve(links);
        }
      }).catch(function (error) {
        links.status = 'No existe';
        links.message = 'Fail';
        resolve(links);
      });
    });
  });
  return Promise.all(runLinks);
}; // Función ver los Stats(total de links, links únicos) de los Links


exports.validateLinks = validateLinks;

var getLinksStats = function getLinksStats(path) {
  return new Promise(function (resolve, reject) {
    validateLinks(path).then(function (response) {
      var totalLinks = response.length;

      var uniqueLinks = _toConsumableArray(new Set(response.map(function (response) {
        return response.href;
      }))).length;

      resolve("Total : ".concat(totalLinks, " Unique: ").concat(uniqueLinks));
    }).catch(function (error) {
      return reject(error);
    });
  });
}; // Función para ver los links rotos


exports.getLinksStats = getLinksStats;

var getBrokenLinksStats = function getBrokenLinksStats(path) {
  return new Promise(function (resolve, reject) {
    validateLinks(path).then(function (response) {
      var brokenLinks = response.filter(function (element) {
        return element.message === 'Fail';
      }).length;
      resolve("Broken: ".concat(brokenLinks));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

exports.getBrokenLinksStats = getBrokenLinksStats;