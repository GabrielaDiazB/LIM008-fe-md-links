import {validateLinks, getLinksStats, getBrokenLinksStats} from '../src/functions-controller/options.js';
const fetchMock = require('../__mocks__/node-fetch');
const path = require('path');
fetchMock.config.fallbackToNetwork = true;
fetchMock.config.sendAsJson = false;

const results = [
  { file: `${path.resolve(process.cwd())}/test/prueba/archivo1.md`,
    href: [ 'https://es.wikipedia.org/wiki/Markdown' ],
    text: [ 'Markdown' ],
    status: 200,
    message: 'OK'},
  { file: `${path.resolve(process.cwd())}/test/prueba/prueba2/prueba3/archivo4.md`,
    href: [ 'https://github.com/Laboratoria/LIM008-fe-md-lin' ],
    text: [ 'Node.js' ],
    status: 404,
    message: 'Fail'},
  { file: `${path.resolve(process.cwd())}/test/prueba/prueba2/prueba3/archivo4.md`,
    href: [ 'https://developers.gfailoogle.com/v8/' ],
    text: [ 'motor de JavaScript V8 de Chrome' ],
    status: 'No existe',
    message: 'Fail' }
];

describe('validateLinks', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it('Debería de ser una función', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('debería retornar un objeto con los estados de los links', (done) => {
    fetchMock
      .mock('https://es.wikipedia.org/wiki/Markdown', 200)
      .mock('https://github.com/Laboratoria/LIM008-fe-md-lin', 404)
      .mock('https://developers.gfailoogle.com/v8/', 'No existe');
    const resultsValidateLinks = validateLinks(`${path.resolve(process.cwd())}/test`);
    resultsValidateLinks.then(response => {
      expect(response).toEqual(results);
      done();
    }).catch(error => done());
  });
  it('Debería retornar un objeto con las propiedades file, href, text, status, message', (done) => {
    return new Promise((resolve) => {
      validateLinks(`${path.resolve(process.cwd())}/test`)
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
      getLinksStats(`${path.resolve(process.cwd())}/test`)
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
      getBrokenLinksStats(`${path.resolve(process.cwd())}/test`)
        .then((response) => {
          expect(response).toEqual('Broken: 2');
          resolve(response);
          done();
        })
        .catch(error => done());
    });
  });
});
