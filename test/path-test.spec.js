import { pathType, convertPathToAbsolute, pathIsFile, pathIsDirectory, walkIntoDirectory } from '../src/paths.js';
import { filterMdFiles, /* extractFilesContent,*/ extractLinks } from '../src/arrays.js';

const input1 = ['C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\archivo1.md',
  'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\archivo2.txt',
  'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo3.txt',
  'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo4.md',
  'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo5.md'];

const input2 = ['C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\archivo1.md',
  'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo4.md'];

const output1 = [ 'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\archivo2.txt',
  'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo3.txt',
  'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo4.md',
  'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo5.md'];

const output2 = ['C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\archivo1.md',
  'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo4.md',
  'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo5.md'];

const output3 = [
  { file: 'D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test\\prueba\\archivo1.md',
    href: [ 'https://es.wikipedia.org/wiki/Markdown' ],
    text: [ 'Markdown' ] },
  { file: 'D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo4.md',
    href: [ 'https://nodejs.org/es/' ],
    text: [ 'Node.js' ] },
  { file: 'D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo4.md',
    href: [ 'https://developers.google.com/v8/' ],
    text: [ 'motor de JavaScript V8 de Chrome' ] }]  

describe('pathType', () => {
  it('Debería ser una función', () => {
    expect(typeof pathType).toBe('function');
  });
  it('Debería decir verdadero si la ruta es absoluta', () => {
    expect(pathType('D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto markdown\\LIM008-fe-md-links\\test\\prueba\\archivo1.md')).toEqual(true);
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
    expect(convertPathToAbsolute('test\\prueba\\archivo1.md')).toBe('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\archivo1.md');
  });
});

describe('pathIsFile', () => {
  it('Debería ser una función', () => {
    expect(typeof pathIsFile).toEqual('function');
  });
  it('Debería decir verdadero si la ruta es un archivo', () => {
    expect(pathIsFile('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\archivo1.md')).toEqual(true);
  });
  it('Debería decir falso si la ruta no es un archivo', () => {
    expect(pathIsFile('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba')).toEqual(false);
  });
});

describe('pathIsDirectory', () => {
  it('Debería ser una función', () => {
    expect(typeof pathIsDirectory).toBe('function');
  });
  it('Debería decir verdadero si la ruta es un directorio', () => {
    expect(pathIsDirectory('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba')).toEqual(true);
  });
  it('Debería decir falso si la ruta no es un directorio', () => {
    expect(pathIsDirectory('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\archivo1.md')).toEqual(false);
  });
});

describe('walkIntoDirectory', () => {
  it('Debería ser una función', () => {
    expect(typeof walkIntoDirectory).toBe('function');
  });
  it('Debería devolver un array de todos los archivos dentro de la carpeta', () => {
    expect(walkIntoDirectory('C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2')).toEqual(output1);
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
  it('Debería devolver un array de objetos con 3 propiedades', () => {
    expect(extractLinks(filterMdFiles(walkIntoDirectory('D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test')))).toEqual(output3);
  });
});
