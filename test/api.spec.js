const { isAbsolute, newPath1, newPath2, extractlinks, validateLink, statsLinks, getLinklmd } = require('../api');


describe('isAbsolute', () => {
    it('debería ser una función', () => {
        expect(typeof isAbsolute).toBe('function');
    });
    it('debería retornar la misma ruta para newPath1', () => {
        expect(isAbsolute(newPath1)).toBe('C:\laboratoria Danica\DEV001-md-links');
    });
    it('debería retornar convertir la ruta absoluta a relativa para newPath2', () => {
        expect(isAbsolute(newPath2)).toBe('.\\README.md');
    });
});


describe('getLinklMD', () => {

    it('should ser una function', () => {
        expect(typeof(getLinklmd)).toBe('function');
    });

    it('should imprimir un array de archivos MD', () => {
        expect(getLinklmd(
            'prueba', )).toStrictEqual([
            'C:\\laboratoria Danica\\DEV001-md-links\\prueba\\comida.md',
            'C:\laboratoria Danica\DEV001-md-links\prueba\prueba2\refrescos.md',
            'C:\laboratoria Danica\DEV001-md-links\prueba\frutas.md',
        ]);
    });

});

describe('extractlinks', () => {

    it('should ser una function', () => {
        expect(typeof(extractlinks)).toBe('function');
    });

    it('should mostrar propiedades de los links', () => {
        expect(extractlinks('prueba')).toStrictEqual([{
                href: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Oranges_-_whole-halved-segment.jpg',
                text: 'Naranja',
                file: 'C:\laboratoria Danica\DEV001-md-links\prueba\frutas.md'
            },
            {
                href: 'https://dam.cocinafacil.com.mx/wp-content/uploads/2020/08/beneficios-de-la-tuna-1-1170x655.jpg',
                text: 'Tuna',
                file: 'C:\laboratoria Danica\DEV001-md-links\prueba\frutas.md'
            },
            {
                href: 'https://portal.andina.pe/EDPfotografia3/Thumbnail/2018/08/23/000527191W.jpg',
                text: 'Aguaymanto',
                file: 'C:\laboratoria Danica\DEV001-md-links\prueba\frutas.md'
            },
            {
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
            },
            {
                href: 'https://comidasperuanas.net/wp-content/uploads/2020/12/Aguajina.webp',
                text: 'aguajina',
                file: 'C:\laboratoria Danica\DEV001-md-links\prueba\prueba2\refrescos.md'
            },
            {
                href: 'https://www.cocina-boliviana.com/base/stock/Recipe/440-image/440-image_web.jpg',
                text: 'uva',
                file: 'C:\laboratoria Danica\DEV001-md-links\prueba\prueba2\refrescos.md'
            },
            {
                href: 'https://www.gastrolabweb.com/u/fotografias/fotosnoticias/2022/5/13/29493.jpg',
                text: 'coco',
                file: 'C:\laboratoria Danica\DEV001-md-links\prueba\prueba2\refrescos.md',
            }
        ]);
    });

});

describe('validateLink', () => {

    it('should ser una function', () => {
        expect(typeof(validateLink)).toBe('function');
    });

    it('should validar los link ', () => {
        return validateLink('prueba').then(values => {
            expect(values).toStrictEqual([{
                    href: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Oranges_-_whole-halved-segment.jpg',
                    text: 'Naranja',
                    file: 'C:\laboratoria Danica\DEV001-md-links\prueba\frutas.md',
                    status: 200,
                    statusText: 'OK'
                },
                {   href: 'https://dam.cocinafacil.com.mx/wp-content/uploads/2020/08/beneficios-de-la-tuna-1-1170x655.jpg',
                    text: 'Tuna',
                    file: 'C:\laboratoria Danica\DEV001-md-links\prueba\frutas.md',
                    status: 200,
                    statusText: 'OK'
                },
                {  href: 'https://portal.andina.pe/EDPfotografia3/Thumbnail/2018/08/23/000527191W.jpg',
                   text: 'Aguaymanto',
                   file: 'C:\laboratoria Danica\DEV001-md-links\prueba\frutas.md',
                   status: 200,
                   statusText: 'OK'
                },
                {
                    href: 'https://www.todoenperu.net/recetas/wp-content/uploads/2019/04/juane-comida-de-la-selva.jpg',
                    text: 'juane',
                    file: 'C:\\laboratoria Danica\\DEV001-md-links\\prueba\\comida.md',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    href: 'https://comidasperuanas.net/wp-content/uploads/2019/01/Pachamanca-a-la-olla-500x375.jpg',
                    text: 'pachamanca',
                    file: 'C:\\laboratoria Danica\\DEV001-md-links\\prueba\\comida.md',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    href: 'https://www.comedera.com/wp-content/uploads/2021/08/carapulcra-peruana.jpg',
                    text: 'carapulcra',
                    file: 'C:\\laboratoria Danica\\DEV001-md-links\\prueba\\comida.md',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    href: 'https://comidasperuanas.net/wp-content/uploads/2020/12/Aguajina.webp',
                    text: 'aguajina',
                    file: 'C:\laboratoria Danica\DEV001-md-links\prueba\prueba2\refrescos.md',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    href: 'https://www.cocina-boliviana.com/base/stock/Recipe/440-image/440-image_web.jpg',
                    text: 'uva',
                    file: 'C:\laboratoria Danica\DEV001-md-links\prueba\prueba2\refrescos.md',
                    status: 200,
                    statusText: 'OK'
                },
                {
                    href: 'https://www.gastrolabweb.com/u/fotografias/fotosnoticias/2022/5/13/29493.jpg',
                    text: 'coco',
                    file: 'C:\laboratoria Danica\DEV001-md-links\prueba\prueba2\refrescos.md',
                    status: 200,
                    statusText: 'OK'
                }
            ])
        });
    });
});