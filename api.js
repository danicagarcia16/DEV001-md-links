const chalk = require('chalk');
const figlet = require('figlet');

//Muestro un banner : md_links al ejecutar con node api.js
console.log(
    chalk.magenta(
        figlet.textSync('md-links', { horizontalLayout: 'full' })
    )
);
let fs = require('fs');
//--------------------------Mis rutas para pruebas-----------------------------------
//Mi ruta absoluta
const pathSlash1 = 'C:\laboratoria Danica\DEV001-md-links'
const newPath1 = pathSlash1.replace(/\\\//g, ".") 
console.log(newPath1)

//Mi ruta relativa
const pathSlash2 = '.\\README.md'
const newPath2 = pathSlash2.replace(/\\\//g, ".") 
console.log(newPath2)
//---------------------------PASO I: PARA TRAER LINKS---------------------------------

/*I.¿LA RUTA ES ABSOLUTA?.- en la función isAbsolute uso el operador ternario cuya condición es path.isAbsolute(p)
 que se evalúa como true o false.Si la condición es true, el operador retorna p; de lo contrario, devuelve el valor
 convierte la ruta absoluta a relativa */
 const path = require('path');

 function isAbsolute(p) { return path.isAbsolute(p) ? p : path.resolve(p) }
 
 /*II. Recorrer el directorio.-En la siguiente función , getLinkMD muestro todos los 
 links que son MD
 -
 -El método fs.statSync () se utiliza para devolver de forma asincrónica información
  sobre la ruta de archivo dada.
 Devuelve un objeto Stats que contiene los detalles de la ruta del archivo
 -readdirSync:lee una cadena y se comporta de forma síncrona
 */
 
 const getLinklMD = (p) => {
     let AllFiles = []; // creo un variable que será de tipo array donde almacenaré todos los archivos MD
     const route = isAbsolute(p);
     if (fs.statSync(route).isDirectory()) {
         fs.readdirSync(route).forEach(file => {
             const files = getLinklMD(path.join(route, file))//une los segmentos de ruta especificados en una sola ruta.
             AllFiles = AllFiles.concat(files) //El método concat() se usa para unir dos o más arrays. Este método no cambia los arrays existentes, sino que devuelve un nuevo array.
         })
     } else {
         if (path.parse(route).ext === '.md') { //El método path.parse () devuelve un objeto cuyas propiedades representan elementos significativos de la ruta.
             AllFiles.push(route);
         }
     }
     return AllFiles
 }
 
 console.log(getLinklMD('prueba'));
//-------------------------------PASO 2 : PARA EXTRAER LINKS------------------------------
const extractlinks = (route) => {
    const mdFiles = getLinklMD(route);
    console.log(mdFiles)
    //Creo una variable donde almacenaré el array de objetos con las 3 propiedades
    const arrayObjectMD = []
    mdFiles.forEach(file => {
        console.log(file)
        readmdFiles = fs.readFileSync(file, 'utf8') //readFileSync se utiliza para leer el archivo y devolver su contenido,La codificación predeterminada es utf8
            console.log(readmdFiles)

        const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
        const matches = readmdFiles.match(regexMdLinks)
             console.log('links', matches)
        const singleMatch = /\[([^\[]+)\]\((.*)\)/
        for (let i = 0; i < matches.length; i++) {
            let md = singleMatch.exec(matches[i]) //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null
            const href = `${md[2]}`
            const text = `${md[1]}`
            arrayObjectMD.push({
                href: href,
                text: text,
                file: file,
            })
        }
    })
    return arrayObjectMD
}
  console.log(extractlinks('prueba'))
  const fetch = require('node-fetch');

const validateLink = (route) => {
        //1.crear un nuevo array y añadir los nuevos status y messager
        const promiseFetch = [];
        const link = extractlinks(route);
        //2.recorrer el array
        link.forEach(element => {
            //3.hacer petición fecth con la propiedad element.href por cada elemento del array
            promiseFetch.push(fetch(element.href)
                .then(function(response) {
                    return {
                        href: element.href,
                        text: element.text,
                        file: element.file,
                        status: response.status,
                        statusText: response.statusText,
                    }
                })
                .catch(function() {
                    return {
                        href: element.href,
                        text: element.text,
                        file: element.file,
                        status: 'error',
                        statusText: 'FAIL',
                    }
                })
            )
        })
        return Promise.all(promiseFetch);
    }
    console.log(validateLink('prueba'))
    //-------------------------------------PASO 4:CASO --stats----------------------------------------------

   


module.exports = {
    isAbsolute,
    getLinklMD,
    extractlinks,
    validateLink,
    newPath1,
    newPath2,
};