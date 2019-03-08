"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLinks = void 0;

var _arrays = require("./arrays.js");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Función para Validar los links
var validateLinks = function validateLinks(data) {
  var objLinks = (0, _arrays.extractLinks)(data);
  var runLinks = objLinks.map(function (links) {
    return new Promise(function (resolve, reject) {
      var linksHref = (0, _nodeFetch.default)(links.href);
      return linksHref.then(function (response) {
        links.status = response.status;
        links.message = response.statusText; // ternario

        resolve(links);
      }).catch(function (error) {
        links.status = error.status;
        links.message = 'Fail';
        resolve(links);
      });
    });
  });
  return Promise.all(runLinks);
};

exports.validateLinks = validateLinks;
validateLinks("".concat(process.cwd(), "\\test")).then(function (response) {
  return console.log(response);
}).catch(function (error) {
  return console.log(error);
}); // Función ver los Stats de los Links, todavía devuelve solo las cantidades

var getLinksStats = function getLinksStats(path) {
  return new Promise(function (resolve, reject) {
    validateLinks(path).then(function (response) {
      var total = response.length;
      var broken = response.filter(function (element) {
        return element.status === 400;
      }).length;
      resolve([total, broken]);
    });
  });
};
/*getLinksStats('D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test')
.then(response => console.log(response));*/
// Función para validar y dar los Stats