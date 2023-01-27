const chalk = require('chalk');
const figlet = require('figlet');

//Muestro un banner : md_links al ejecutar con node api.js
console.log(
    chalk.magenta(
        figlet.textSync('md-links', { horizontalLayout: 'full' })
    )
);
let fs = require('fs');
//--------------------------Mis rutas -----------------------------------
//Mi ruta absoluta
const pathSlash1 = 'C:\laboratoria Danica\DEV001-md-links'
const newPath1 = pathSlash1.replace(/\\\//g, ".") 
console.log(newPath1)

//Mi ruta relativa
const pathSlash2 = '.\\README.md'
const newPath2 = pathSlash2.replace(/\\\//g, ".") 
console.log(newPath2)

//---------------------------PASO I: Ruta absoluta , ¿existe path?---------------------------------

/*I.¿LA RUTA ES ABSOLUTA?.- en la función isAbsolute uso el operador ternario cuya condición es path.isAbsolute(p)
 que se evalúa como true o false.Si la condición es true, el operador retorna p; de lo contrario, devuelve el valor
 convierte la ruta absoluta a relativa */
 const path = require('path');

 function isAbsolute(p) { return path.isAbsolute(p) ? p : path.resolve(p) }

  
  //II Verificar que el path si existe
  const Pathexist = (path) => {
      if (fs.existsSync(path)) {
        return true;
      }else {
      return false;
    }
  };
 
 /*III. Recorrer el directorio.-En la siguiente función , getLinkMD muestro todos los 
 links que son MD
 -
 -El método fs.statSync () se utiliza para devolver de forma asincrónica información
  sobre la ruta de archivo dada.
 Devuelve un objeto Stats que contiene los detalles de la ruta del archivo
 -readdirSync:lee una cadena y se comporta de forma síncrona
 */
 
 const getLinklmd = (p) => {
     let AllFilesmd = []; // creo un variable que será de tipo array donde almacenaré todos los archivos MD
     const route = isAbsolute(p);
     if (fs.statSync(route).isDirectory()) {
         fs.readdirSync(route).forEach(file => {
             const files = getLinklmd(path.join(route, file))
             //une los segmentos de ruta especificados en una sola ruta.
             AllFilesmd = AllFilesmd.concat(files) //El método concat() se usa para unir dos o más arrays. Este método no cambia los arrays existentes, sino que devuelve un nuevo array.
         })
     } else {
         if (path.parse(route).ext === '.md') { //El método path.parse () devuelve un objeto cuyas propiedades representan elementos significativos de la ruta.
             AllFilesmd.push(route);
         }
     }
     return AllFilesmd
 }
 
 console.log(getLinklmd('prueba'));
// PASO 2 :  EXTRAER LINKS
const extractlinks = (route) => {
    const mdFiles = getLinklmd(route);
    console.log(mdFiles)
    //Creo una variable donde almacenaré el array de objetos con las 3 propiedades
    const arrayObjectmd = []
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
            arrayObjectmd.push({
                href: href,
                text: text,
                file: file,
            })
        }
    })
    return arrayObjectmd
}
  console.log(extractlinks('prueba'))
// FUNCIÓN VALIDATE---
  const fetch = require('node-fetch');

const validateLink = (route) => {
        //1.crear un nuevo array y añadir los nuevos status y messager
        const promiseFetch = [];
        const link = extractlinks(route);
        //2.recorrer el array
        link.forEach(element => {
            //3.hacer petición fecth con la propiedad element.href por cada elemento del array
            promiseFetch.push(fetch(element.href)
                .then(function(rest) {
                    return {
                        href: element.href,
                        text: element.text,
                        file: element.file,
                        status: rest.status,
                        statusText: rest.statusText,
                    }
                })
                .catch(function() {
                    return {
                        href: element.href,
                        text: element.text,
                        file: element.file,
                        status: 404,
                        statusText: 'FAIL',
                    }
                })
            )
        })
        return Promise.all(promiseFetch);
    }
    console.log(validateLink('prueba'))
  
//-------------------------------------PASO 4:CASO --stats----------------------------------------------
/*//Crear una función 
//1.-Crear un función donde para stats cuyos parámetros son el arreglo de links 
const statsLinks = (arrayLinks) => {
    // const link = extractlinks(arr);
    //2.-Uso map() para obtener el heref  y lo guardo en hreflink  
    const hreflink = arrayLinks.map(link => {
            return link.href
        })
        //3.-en la variable TOTAL guardo guardo el calculo de links totales usando length 
    const total = hreflink.length;
    // console.log(total);
    //Uso Set para sacar los elementos sin repetirlos
    const unique = new Set(hreflink) //permite almacenar valores únicos de cualquier tipo
        //Uso size para calcular los links unicos y lo guardo en la variable uniques 
    const uniques = unique.size
        aconsole.log(uniques)
    return `Total: ${chalk.yellow(total)} \nUnique: ${chalk.blue(uniques)}`;
}
console.log(statsLinks('prueba'))*/

module.exports = {
    isAbsolute,
    getLinklmd,
    extractlinks,
    validateLink,
    newPath1,
    newPath2,
    //statsLinks,
};