import {validateLinks, getLinksStats} from '../src/options.js';

describe('validateLinks', () => {
    it('Debería de ser una función', () => {
        expect(typeof validateLinks).toBe('function');
    });
    it('Debería retornar un objeto con las propiedades file, href, text, status, message', () => {
        expect().toEqual();
    });
});
describe('getLinksStats', () => {
    it('Debería de ser una función', () => {
        expect(typeof getLinksStats).toBe('function');
    });
    it('Debería retornar un Objeto con dos propiedades', () => {
        expect().toEqual();
    })
});