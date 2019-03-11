import {extractLinks} from './arrays.js';
import fetch from 'node-fetch';

// Función para Validar los links
export const validateLinks = (data) => {
  const objLinks = extractLinks(data);
  const runLinks = objLinks.map((links) => new Promise((resolve, reject) => {
    const linksHref = fetch(links.href);
    return linksHref
      .then(response => {
        if (response.status >= 200 && response.status < 400) {
          links.status = response.status;
          links.message = response.statusText; // o función ternaria
          resolve(links);
        } else {
          links.status = response.status;
          links.message = 'Fail';
          resolve(links);
        }
      })
      .catch(error => {
        links.status = 'No existe';
        links.message = 'Fail';
        resolve(links);
      });
  }));
  return Promise.all(runLinks);
};

/* validateLinks(`${process.cwd()}\\test`)
  .then(response => console.log(response))
  .catch(error => console.log(error)); */

// Función ver los Stats(total de links, links únicos) de los Links
export const getLinksStats = (path) => {
  return new Promise((resolve, reject) => {
    validateLinks(path)
      .then((response) => {
        const totalLinks = response.length;
        const uniqueLinks = [...new Set(response.map(response => response.href))].length;
        resolve(`Total : ${totalLinks} Unique: ${uniqueLinks}`);
        // resolve({total: totalLinks, unique: uniqueLinks});
      })
      .catch(error => reject(error));
  });
};
/* getLinksStats(`${process.cwd()}\\test`)
  .then(response => console.log(response)); */

// Función para ver los links rotos
export const getBrokenLinksStats = (path) => {
  return new Promise((resolve, reject) => {
    validateLinks(path)
      .then((response) => {
        const brokenLinks = response.filter(element => element.message === 'Fail').length;
        resolve(`Broken: ${brokenLinks}`);
      })
      .catch(error => reject(error));
  });
};
/* getBrokenLinksStats(`${process.cwd()}\\test`)
  .then(response => console.log(response)); */
