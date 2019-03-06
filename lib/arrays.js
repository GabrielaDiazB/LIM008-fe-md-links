"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractFilesContent = exports.filterMdFiles = void 0;

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
// export const extractLinks = (mdArr) => {
//   let linksArr = [];
//   let namesArr = [];
//   mdArr.forEach((ele) => {
//     const openFile = fs.readFileSync(ele, 'utf-8');
//     const regEx = /!*\[(.*)\]\((.*)\)/g;
//     // /!*\[(.*)\]\((.*)\)/g
//     // /\[((.+?))\]\((http|https).+?\)/g
//     const textLink = /\[(.*)\]/gi;
//     let link = openFile.match(regEx);
//     let name = openFile.match(textLink);
//     return linksArr.push(link);
//   });
//   return linksArr;
// };
// console.log(extractLinks(filterMdFiles(walkIntoDirectory('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test'))));


exports.extractFilesContent = extractFilesContent;