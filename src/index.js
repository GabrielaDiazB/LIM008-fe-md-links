import {extractLinks} from './functions-controller/arrays.js';
import {validateLinks} from './functions-controller/options.js';

export const mdLinks = (path, options) => {
  if (options.validate === true) {
    return validateLinks(path)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  } else {
    return new Promise(resolve => resolve(extractLinks(path)));
  }
};
// console.log(mdLinks('test', options));