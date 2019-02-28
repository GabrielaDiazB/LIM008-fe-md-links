import { pathType, convertPathToAbsolute, pathIsFile, pathIsDirectory } from '../src/paths.js';

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
    expect(convertPathToAbsolute('src')).toBe('D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\src');
  });
});

describe('pathIsFile', () => {
  it('Debería ser una función', () => {
    expect(typeof pathIsFile).toEqual('function');
  });
  it('Debería decir verdadero si la ruta es un archivo', () => {
    expect(pathIsFile('D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test\\prueba\\archivo1.md')).toEqual(true);
  });
  it('Debería decir falso si la ruta no es un archivo', () => {
    expect(pathIsFile('D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test\\prueba')).toEqual(false);
  });
});

describe('pathIsDirectory', () => {
  it('Debería ser una función', () => {
    expect(typeof pathIsDirectory).toBe('function');
  });
  it('Debería decir verdadero si la ruta es un directorio', () => {
    expect(pathIsDirectory('D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test\\prueba')).toEqual(true);
  });
  it('Debería decir falso si la ruta no es un directorio', () => {
    expect(pathIsDirectory('D:\\usuario\\Documents\\Laboratoria\\projects\\proyecto-markdown\\LIM008-fe-md-links\\test\\prueba\\archivo1.md')).toEqual(false);
  });
});