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
