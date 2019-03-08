import {extractLinks} from './arrays.js';
const fetch = require('node-fetch');

// Función para Validar los links
const validateLinks = (data) => {
  const objLinks = extractLinks(data);
  const runLinks = objLinks.map((links) => new Promise((resolve, reject) => {
    const linksHref = fetch(links.href);
    return linksHref
      .then(response => {
        links.status = response.status;
        links.message = response.statusText;
        resolve(links);
      })
      .catch(error => {
        links.status = 400;
        links.message = 'Not Found';
        resolve(links);
      });
  }));
  return Promise.all(runLinks);
};

/*validateLinks('D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test')
.then(response => console.log(response))
.catch(error => console.log(error));*/

// Función ver los Stats de los Links, todavía devuelve solo las cantidades
const getLinksStats = (path, options) => {
  return new Promise((resolve, reject) => {
    validateLinks(path)
      .then((response) => {
        const total = response.length;
        const broken = response.filter(element => element.status === 400).length;
        resolve([total, broken]);
      });
  });
};
getLinksStats('D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test')
.then(response => console.log(response));

// Función para validar y dar los Stats