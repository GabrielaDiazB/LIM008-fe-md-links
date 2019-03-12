#!/usr/bin/env node
import {mdLinks} from './index.js'

const arg = process.argv.slice(2);
if(arg.length === 1) {
    mdLinks(arg[0], options).then
}
if(arg.length === 2) {
    if(arg[1] === '--stats') {
      console.log('Debería devolver Total y Uniques').then
    }
    if(arg[1] === '--validate') {
      console.log('5 propiedades Href, File, Text, Status, Message').then
    }
}
if(arg.length === 3) {
    if(arg[2] === '--stats --validate' || arg[2] === '--validate --stats') {
      console.log('Debe devoler total, uniques broken')
    } else {
      console.log('No son valores válidos')
    }
}
console.log('Hello World')

