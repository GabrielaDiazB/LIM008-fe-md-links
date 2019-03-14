"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walkIntoDirectory = exports.pathIsDirectory = exports.pathIsFile = exports.convertPathToAbsolute = exports.pathType = void 0;

var path = require('path');

var fs = require('fs'); // Pregunta si la ruta es absoluta


var pathType = function pathType(route) {
  var isPathAbsolute = path.isAbsolute(route);
  return isPathAbsolute;
}; // Transforma la ruta relativa a absoluta


exports.pathType = pathType;

var convertPathToAbsolute = function convertPathToAbsolute(route) {
  var absolutePath = path.resolve(route);
  return absolutePath;
}; // Pregunta si la ruta es un archivo


exports.convertPathToAbsolute = convertPathToAbsolute;

var pathIsFile = function pathIsFile(route) {
  var filePathStat = fs.lstatSync(route);
  var checkFilePath = filePathStat.isFile();
  return checkFilePath;
}; // Pregunta si la ruta es un directorio


exports.pathIsFile = pathIsFile;

var pathIsDirectory = function pathIsDirectory(route) {
  var directoryPathStat = fs.lstatSync(route);
  var checkDirectoryPath = directoryPathStat.isDirectory();
  return checkDirectoryPath;
}; // En caso es un directorio, ingresar al directorio


exports.pathIsDirectory = pathIsDirectory;

var walkIntoDirectory = function walkIntoDirectory(dirRoute) {
  var arrFilesRoutes = [];

  if (pathIsFile(dirRoute)) {
    arrFilesRoutes.push(dirRoute);
  } else {
    var files = fs.readdirSync(dirRoute);

    for (var i = 0; i < files.length; i++) {
      var next = path.join(dirRoute, files[i]);

      if (pathIsDirectory(next)) {
        arrFilesRoutes = arrFilesRoutes.concat(walkIntoDirectory(next));
      } else {
        arrFilesRoutes.push(next);
      }

      ;
    }

    ;
  }

  ;
  return arrFilesRoutes;
}; // console.log(walkIntoDirectory(`${process.cwd()}\\test`));


exports.walkIntoDirectory = walkIntoDirectory;