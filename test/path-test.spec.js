import { pathType, convertPathToAbsolute, pathIsFile, pathIsDirectory, walkIntoDirectory } from '../src/functions-controller/paths.js';
import { filterMdFiles, extractLinks } from '../src/functions-controller/arrays.js';

const input1 = [`${process.cwd()}\\test\\prueba\\archivo1.md`,
  `${process.cwd()}\\test\\prueba\\archivo2.txt`,
  `${process.cwd()}\\test\\prueba\\archivo3.txt`,
  `${process.cwd()}\\test\\prueba\\archivo4.md`,
  `${process.cwd()}\\test\\prueba\\archivo5.md`];

const output1 = [`${process.cwd()}\\test\\prueba\\archivo1.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\archivo2.txt`,
  `${process.cwd()}\\test\\prueba\\prueba2\\prueba3\\archivo3.txt`,
  `${process.cwd()}\\test\\prueba\\prueba2\\prueba3\\archivo4.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\prueba3\\archivo5.md`];

const output2 = [`${process.cwd()}\\test\\prueba\\archivo1.md`,
  `${process.cwd()}\\test\\prueba\\archivo4.md`,
  `${process.cwd()}\\test\\prueba\\archivo5.md`];

const output3 = [
  { file: `${process.cwd()}\\test\\prueba\\archivo1.md`,
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown'},
  { file: `${process.cwd()}\\test\\prueba\\prueba2\\prueba3\\archivo4.md`,
    href: 'https://github.com/Laboratoria/LIM008-fe-md-lin',
    text: 'Node.js'},
  { file: `${process.cwd()}\\test\\prueba\\prueba2\\prueba3\\archivo4.md`,
    href: 'https://developers.gfailoogle.com/v8/',
    text: 'motor de JavaScript V8 de Chrome' }]; 

describe('pathType', () => {
  it('Debería ser una función', () => {
    expect(typeof pathType).toBe('function');
  });
  it('Debería decir verdadero si la ruta es absoluta', () => {
    expect(pathType(`${process.cwd()}\\test\\prueba\\archivo1.md`)).toEqual(true);
  });
  it('Debería decir falso si la ruta es relativa', () => {
    expect(pathType('archivo1.md')).toEqual(false);
  });
});

describe('convertPathToAbsolute', () => {
  it('Debería ser una función', () => {
    expect(typeof convertPathToAbsolute).toEqual('function');
  });
  it('Debería convertir la ruta relativa en absoluta', () => {
    expect(convertPathToAbsolute('test\\prueba\\archivo1.md')).toBe(`${process.cwd()}\\test\\prueba\\archivo1.md`);
  });
});

describe('pathIsFile', () => {
  it('Debería ser una función', () => {
    expect(typeof pathIsFile).toEqual('function');
  });
  it('Debería decir verdadero si la ruta es un archivo', () => {
    expect(pathIsFile(`${process.cwd()}\\test\\prueba\\archivo1.md`)).toEqual(true);
  });
  it('Debería decir falso si la ruta no es un archivo', () => {
    expect(pathIsFile(`${process.cwd()}\\test\\prueba`)).toEqual(false);
  });
});

describe('pathIsDirectory', () => {
  it('Debería ser una función', () => {
    expect(typeof pathIsDirectory).toBe('function');
  });
  it('Debería decir verdadero si la ruta es un directorio', () => {
    expect(pathIsDirectory(`${process.cwd()}\\test\\prueba`)).toEqual(true);
  });
  it('Debería decir falso si la ruta no es un directorio', () => {
    expect(pathIsDirectory(`${process.cwd()}\\test\\prueba\\archivo1.md`)).toEqual(false);
  });
});

describe('walkIntoDirectory', () => {
  it('Debería ser una función', () => {
    expect(typeof walkIntoDirectory).toBe('function');
  });
  it('Si se ingresa la ruta de un archivo, debería devoler un array con el archivo', () => {
    expect(walkIntoDirectory(`${process.cwd()}\\test\\prueba\\archivo1.md`)).toEqual([`${process.cwd()}\\test\\prueba\\archivo1.md`]);
  });
  it('Si se ingresa la ruta de un directorio, debería devolver un array de todos los archivos dentro de la carpeta', () => {
    expect(walkIntoDirectory(`${process.cwd()}\\test\\prueba`)).toEqual(output1);
  });
});

describe('filterMdFiles', () => {
  it('Debería ser una función', () => {
    expect(typeof filterMdFiles).toBe('function');
  });
  it('Debería devolver un array nuevo con solo los archivos md', () => {
    expect(filterMdFiles(input1)).toEqual(output2);
  });
});

/* describe('extractFilesContent', () => {
  it('debería ser una función', () => {
    expect(typeof extractFilesContent).toBe('function');
  });
}); */

describe('extractLinks', () => {
  it('Debería de ser una función', () => {
    expect(typeof extractLinks).toBe('function');
  });
  it('Debería devolver un array de objetos con 3 propiedades', () => {
    expect(extractLinks(`${process.cwd()}\\test`)).toEqual(output3);
  });
});
