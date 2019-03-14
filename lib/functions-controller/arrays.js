"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractLinks = exports.filterMdFiles = void 0;

var _paths = require("./paths.js");

var path = require('path');

var fs = require('fs'); // Filtrar archivos ".md"


var filterMdFiles = function filterMdFiles(filesArr) {
  var newArr = [];
  filesArr.forEach(function (element) {
    if (path.extname(element) === '.md') {
      return newArr.push(element);
    }
  });
  return newArr;
}; // console.log(filterMdFiles(walkIntoDirectory('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test')));
// extrae los Links de cada archivo y los colocar en un objeto


exports.filterMdFiles = filterMdFiles;

var extractLinks = function extractLinks(path) {
  var arrFiles = (0, _paths.walkIntoDirectory)(path);
  var arrMdFiles = filterMdFiles(arrFiles);
  var linksArr = [];
  var regEx = /!*\[(.*)\]\((.*)\)/g;
  var regExHref = /(?:(http|https|ftp|ftps)?:\/\/[^\s]+.+?(?=\)))/g;
  var regExNameLink = /(?<=\[).+?(?=\])/g;
  arrMdFiles.forEach(function (elementPath) {
    var openFile = fs.readFileSync(elementPath, 'utf-8');
    var listLinksMd = openFile.match(regEx);

    if (listLinksMd !== null) {
      listLinksMd.forEach(function (link) {
        var href = link.match(regExHref).toString();
        var name = link.match(regExNameLink).toString();
        linksArr.push({
          file: elementPath,
          href: href,
          text: name
        });
      });
    }
  });
  return linksArr;
}; // console.log(extractLinks(`${process.cwd()}\\test`));


exports.extractLinks = extractLinks;