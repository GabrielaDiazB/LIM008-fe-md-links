import {walkIntoDirectory} from './paths.js';
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
// console.log(filterMdFiles(walkIntoDirectory('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test')));

// extrae los Links de cada archivo y los colocar en un objeto
export const extractLinks = (path) => {
  const arrFiles = walkIntoDirectory(path);
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
        const href = link.match(regExHref);
        const name = link.match(regExNameLink);
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
// console.log(extractLinks('D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test'));