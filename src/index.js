import {extractLinks} from './functions-controller/arrays.js';
import {validateLinks} from './functions-controller/options.js';
const options = {
  validate: false
}; 
export const mdLinks = (path, options) => {
  if (options.validate) {
    return validateLinks(path)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };
  if (options.validate === false) {
    return new Promise(resolve => resolve(extractLinks(path)));
  }; 
};
// console.log(mdLinks('test', options));