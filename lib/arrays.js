"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractLinks = exports.extractFilesContent = exports.filterMdFiles = void 0;

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
// Extraer el contenido de los archivos


exports.filterMdFiles = filterMdFiles;

var extractFilesContent = function extractFilesContent(newArr) {
  var filesContent = [];
  newArr.forEach(function (element) {
    var openFileAndExtract = fs.readFileSync(element, 'utf-8');
    return filesContent.push(openFileAndExtract);
  });
  return filesContent;
}; // console.log(extractFilesContent(filterMdFiles(walkIntoDirectory('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test'))));
// extraer los Links de cada archivo


exports.extractFilesContent = extractFilesContent;

var extractLinks = function extractLinks(mdArr) {
  var linksArr = [];
  mdArr.forEach(function (ele) {
    var openFile = fs.readFileSync(ele, 'utf-8');
    var regEx = /!*\[(.*)\]\((.*)\)/g; // /!*\[(.*)\]\((.*)\)/g
    // /\[((.+?))\]\((http|https).+?\)/g

    var link = openFile.match(regEx);
    return linksArr.push(link);
  });
  return linksArr;
};

exports.extractLinks = extractLinks;
console.log(extractLinks(filterMdFiles(walkIntoDirectory("D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test"))));