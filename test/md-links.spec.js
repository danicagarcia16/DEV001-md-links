const mdLinks = require('../index.js');


valorUnderfined = [{
        href: 'https://www.todoenperu.net/recetas/wp-content/uploads/2019/04/juane-comida-de-la-selva.jpg',
        text: 'juane',
        file: 'C:\\laboratoria Danica\\DEV001-md-links\\prueba\\comida.md'
    },
    {
        href: 'https://comidasperuanas.net/wp-content/uploads/2019/01/Pachamanca-a-la-olla-500x375.jpg',
        text: 'pachamanca',
        file: 'C:\\laboratoria Danica\\DEV001-md-links\\prueba\\comida.md'
    },
    {
        href: 'https://www.comedera.com/wp-content/uploads/2021/08/carapulcra-peruana.jpg',
        text: 'carapulcra',
        file: 'C:\\laboratoria Danica\\DEV001-md-links\\prueba\\comida.md'

    }
]

valorTrue = [{
        href: 'https://www.todoenperu.net/recetas/wp-content/uploads/2019/04/juane-comida-de-la-selva.jpg',
        text: 'juane',
        file: 'C:\\laboratoria Danica\\DEV001-md-links\\prueba\\comida.md',
        status: 200,
        statusText: 'OK'
    },
    {
        href:'https://comidasperuanas.net/wp-content/uploads/2019/01/Pachamanca-a-la-olla-500x375.jpg' ,
        text: 'pachamanca',
        file: 'C:\\laboratoria Danica\\DEV001-md-links\\prueba\\comida.md' ,
        status: 200,
        statusText: 'OK'
    },
    {
        href:'https://www.comedera.com/wp-content/uploads/2021/08/carapulcra-peruana.jpg' ,
        text:'carapulcra' ,
        file: 'C:\\laboratoria Danica\\DEV001-md-links\\prueba\\comida.md',
        status: 200,
        statusText: 'OK'
    }
]

describe('mdLinks', () => {

    it('should ser una function', () => {
        expect(typeof(mdLinks)).toBe('function');
    });
    // que retorna la promesa que retorna mdlinks
    test('should extraer los links cuando la opcion es underfined o false', () => {
        return expect(mdLinks('C:\\laboratoria Danica\\DEV001-md-links\\prueba\\comida.md', { validate: undefined })).resolves.toEqual(valorUnderfined);
    });

    test('should extraer los links cuando la opcion es underfined o false', () => {
        return expect(mdLinks('C:\\laboratoria Danica\\DEV001-md-links\\prueba\\comida.md', { validate: true })).resolves.toEqual(valorTrue);
    });

});
