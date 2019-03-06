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
// console.log(walkIntoDirectory('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test'));

// Filtrar archivos ".md"
export const filterMdFiles = (filesArr) => {
  const newArr = [];
  filesArr.forEach((element) => {
    if (path.extname(element) === '.md') {
      return newArr.push(element);
    }
  });
  return newArr;
};
// console.log(filterMdFiles(walkIntoDirectory('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test')));

// Extraer el contenido de los archivos
export const extractFilesContent = (newArr) => {
  const filesContent = [];
  newArr.forEach((element) => {
    const openFileAndExtract = fs.readFileSync(element, 'utf-8');
    return filesContent.push(openFileAndExtract);
  });
  return filesContent;
};
  // console.log(extractFilesContent(filterMdFiles(walkIntoDirectory('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test'))));
  
// extraer los Links de cada archivo
export const extractLinks = (mdArr) => {
  let linksArr = [];
  mdArr.forEach((element) => {
    const openFile = fs.readFileSync(element, 'utf-8');
    const regEx = /!*\[(.*)\]\((.*)\)/g;
    // /!*\[(.*)\]\((.*)\)/g
    // /\[((.+?))\]\((http|https).+?\)/g
    // const nameLink = /\[(.*)\]/g;
    // const textLink = /\((http|https).+?\)/g;
    let link = openFile.match(regEx);
    // let name = openFile.match(nameLink);
    // let text = openFile.match(textLink);
    if (link !== null) { 
      return linksArr.push(link);
    }
  });
  return linksArr;
};
console.log(extractLinks(filterMdFiles(walkIntoDirectory('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test'))));
