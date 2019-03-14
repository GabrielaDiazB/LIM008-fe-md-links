import {extractLinks} from './functions-controller/arrays.js';
import {validateLinks} from './functions-controller/options.js';

export const mdLinks = (path, options) => {
  if (options.validate) {
    return validateLinks(path)
  } else {
    return new Promise(resolve => resolve(extractLinks(path)));
  }
};