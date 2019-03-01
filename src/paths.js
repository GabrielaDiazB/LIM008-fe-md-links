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


// En caso es un directorio, ingresar al directorio

export const walkIntoDirectory = (dirRoute) => {
  let arrFilesRoutes = [];  
  const files = fs.readdirSync(dirRoute);
  for (let i = 0; i < files.length; i++) {
    const next = path.join(dirRoute, files[i]);
    if (fs.statSync(next).isDirectory()) {
      arrFilesRoutes = arrFilesRoutes.concat(walkIntoDirectory(next));
    } else {
      arrFilesRoutes.push(next);
    }
  }
  return arrFilesRoutes; 
};
// console.log(walkIntoDirectory('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2'));