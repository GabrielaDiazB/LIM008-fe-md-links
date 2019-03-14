import {validateLinks, getLinksStats, getBrokenLinksStats} from '../src/functions-controller/options.js';

const results = [
  { file: `${process.cwd()}\\test\\prueba\\archivo1.md`,
    href: [ 'https://es.wikipedia.org/wiki/Markdown' ],
    text: [ 'Markdown' ],
    status: 200,
    message: 'OK'},
  { file: `${process.cwd()}\\test\\prueba\\prueba2\\prueba3\\archivo4.md`,
    href: [ 'https://github.com/Laboratoria/LIM008-fe-md-lin' ],
    text: [ 'Node.js' ],
    status: 404,
    message: 'Fail'},
  { file: `${process.cwd()}\\test\\prueba\\prueba2\\prueba3\\archivo4.md`,
    href: [ 'https://developers.gfailoogle.com/v8/' ],
    text: [ 'motor de JavaScript V8 de Chrome' ],
    status: 'No existe',
    message: 'Fail' }
];

describe('validateLinks', () => {
  it('Debería de ser una función', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('Debería retornar un objeto con las propiedades file, href, text, status, message', (done) => {
    return new Promise((resolve) => {
      validateLinks(`${process.cwd()}\\test`)
        .then((response) => {
          expect(response).toEqual(results);
          resolve(response);
          done();
        })
        .catch(error => done());
    });
  });
});

describe('getLinksStats', () => {
  it('Debería de ser una función', () => {
    expect(typeof getLinksStats).toBe('function');
  });
  it('Debería retornar un Objeto con dos propiedades, el total de links encontrados y la cantidad de links únicos', (done) => {
    return new Promise((resolve) => {
      getLinksStats(`${process.cwd()}\\test`)
        .then((response) => {
          expect(response).toEqual('Total: 3 Unique: 3');
          resolve(response);
          done();
        })
        .catch(error => done());
    });
  });
});

describe('getBrokenLinksStats', () => {
  it('Debería ser una función', () => {
    expect(typeof getBrokenLinksStats).toBe('function');
  });
  it('Debería retornar el total de links rotos', (done) => {
    return new Promise((resolve) => {
      getBrokenLinksStats(`${process.cwd()}\\test`)
        .then((response) => {
          expect(response).toEqual('Broken: 2');
          resolve(response);
          done();
        })
        .catch(error => done());
    });
  });
});
