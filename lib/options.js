"use strict";

var _arrays = require("./arrays.js");

var fetch = require('node-fetch'); // Función para Validar los links


var validateLinks = function validateLinks(data) {
  var objLinks = (0, _arrays.extractLinks)(data);
  var runLinks = objLinks.map(function (links) {
    return new Promise(function (resolve, reject) {
      var linksHref = fetch(links.href);
      return linksHref.then(function (response) {
        links.status = response.status;
        links.message = response.statusText;
        resolve(links);
      }).catch(function (error) {
        links.status = 400;
        links.message = 'Not Found';
        resolve(links);
      });
    });
  });
  return Promise.all(runLinks);
};
/*validateLinks('D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test')
.then(response => console.log(response))
.catch(error => console.log(error));*/
// Función ver los Stats de los Links


var getLinksStats = function getLinksStats(path, options) {
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

getLinksStats(validateLinks("D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test")).then(function (response) {
  return console.log(response);
}); // Función para validar y dar los Stats