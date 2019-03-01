import { pathType, convertPathToAbsolute, pathIsFile, pathIsDirectory, walkIntoDirectory } from '../src/paths.js';

const output1 = [ 'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\archivo2.txt',
  'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo3.txt',
  'C:\\Users\\Laboratoria\\Documents\\Gabrieladiazbravo\\Proyectos\\LIM008-fe-md-links\\test\\prueba\\prueba2\\prueba3\\archivo4.txt' ];

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
