import {extractLinks} from './functions-controller/arrays.js';
import {validateLinks, getLinksStats, getBrokenLinksStats} from './functions-controller/options.js';

/* const options = {
  validate: true,
  stats: true
}; */

export const mdLinks = (path, options) => {

  if (options.validate && !options.stats) {

    return validateLinks(path).then(response => console.log(response));
  } else if (!options.validate && options.stats) {

    return getLinksStats(path).then(response => console.log(response));
  } else if (!options.validate && !options.stats) {

    return console.log(extractLinks(path));
  } else if (options.validate && options.stats) {

    return Promise.all([getLinksStats(path), getBrokenLinksStats(path)])
      .then(response => console.log(response));
  } 
};
/* mdLinks(`${process.cwd()}\\test`, options); */