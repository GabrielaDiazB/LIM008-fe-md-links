import {walkIntoDirectory, pathType, convertPathToAbsolute} from './paths.js';
const path = require('path');
const fs = require('fs');

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

// une funciones y extrae los Links de cada archivo y los colocar en un objeto
export const extractLinks = (path) => {
  let absPath;
  if (pathType(path) === false) {
    absPath = convertPathToAbsolute(path);
  }

  const arrFiles = walkIntoDirectory(absPath);
  const arrMdFiles = filterMdFiles(arrFiles);
  let linksArr = [];
  const regEx = /!*\[(.*)\]\((.*)\)/g;
  const regExHref = /(?:(http|https|ftp|ftps)?:\/\/[^\s]+.+?(?=\)))/g;
  const regExNameLink = /(?<=\[).+?(?=\])/g;
  arrMdFiles.forEach((elementPath) => {
    const openFile = fs.readFileSync(elementPath, 'utf-8');
    const listLinksMd = openFile.match(regEx);
    if (listLinksMd !== null) {
      listLinksMd.forEach(link => {
        const href = link.match(regExHref).toString();
        const name = link.match(regExNameLink).toString();
        linksArr.push({
          file: elementPath,
          href: href,
          text: name,
        });
      });
    }  
  });
  return linksArr;
};