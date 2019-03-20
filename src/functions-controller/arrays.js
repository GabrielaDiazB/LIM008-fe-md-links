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

// une funciones y extrae los Links de cada archivo y los colocar en un objeto
export const extractLinks = (route) => {
  const arrFiles = walkIntoDirectory(route);
  const arrMdFiles = filterMdFiles(arrFiles);
  let linksArr = [];
  const regEx = /(^|[^!])\[(.*)\]\((.*)\)/g;
  const regExHref = /\((.*)\)/g;
  const regExNameLink = /\[((.*))\]/g;
  arrMdFiles.forEach((elementPath) => {
    const openFile = fs.readFileSync(elementPath, 'utf-8');
    const listLinksMd = openFile.match(regEx);
    if (listLinksMd !== null) {
      listLinksMd.forEach(link => {
        const href = link.match(regExHref).toString();
        const name = link.match(regExNameLink).toString();
        linksArr.push({
          file: path.resolve(elementPath),
          href: href.split((/[\(\)]/))[1],
          text: name.split(/[\[\]]/)[1].slice(0, 50),
        });
      });
    }  
  });
  return linksArr;
};