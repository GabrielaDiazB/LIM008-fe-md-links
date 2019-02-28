const path = require('path');
const fs = require('fs');

// Pregunta si la ruta es absoluta
export const pathType = (route) => {
  const isPathAbsolute = path.isAbsolute(route);
  return isPathAbsolute;
};

// Transforma la ruta relativa a absoluta
export const convertPathToAbsolute = (route) => {
  const absolutePath = path.resolve(route);
  return absolutePath;
};

// Pregunta si la ruta es un archivo/directorio
export const pathIsFile = (route) => {
  const filePathStat = fs.lstatSync(route);
  const checkFilePath = filePathStat.isFile();
  return checkFilePath;
};

// Pregunta si la ruta es un directorio
export const pathIsDirectory = (route) => {
  const directoryPathStat = fs.lstatSync(route);
  const checkDirectoryPath = directoryPathStat.isDirectory();
  return checkDirectoryPath;
};

// En caso es una directorio, ingresar al directorio

