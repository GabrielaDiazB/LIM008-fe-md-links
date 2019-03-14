#!/usr/bin/env node
import {mdLinks} from './index.js';
import { getLinksStats, getBrokenLinksStats } from './functions-controller/options.js';

const args = process.argv.slice(2);

const options = {
  validate: false,
  stats: false
};

if (args.length === 0) {
  console.log('Por favor ingrese una ruta');
}

if (args.length === 1) {
  mdLinks(args[0], options)
    .then(response => response.forEach((links) => console.log(`\n Path :${links.file} \n Link : ${links.href}  \n Texto : ${links.text}`)));
};

if (args.length === 2) {
  if (args[1] === '--stats' || args[1] === '--s') {
    options.stats = true;
    getLinksStats(args[0])
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  if (args[1] === '--validate' || args[1] === '--v') {
    options.validate = true;
    mdLinks(args[0], options)
      .then(response => response.map(links => console.log(`\n Path :${links.file} \n Link : ${links.href}${links.status}${links.message} \n texto : ${links.text} `)))
  };
};

if (args.length === 3) {
  if (args[1] === '--validate' && args[2] === '--stats' || args[1] === '--stats' && args[2] === '--validate') {
    options.validate = true;
    options.stats = true;
    Promise.all([getLinksStats(args[0]), getBrokenLinksStats(args[0])])
      .then(response => response.forEach(properties => console.log(properties)))
      .catch(error => console.log(error));
  }
};
// 