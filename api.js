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
             const files = getLinklMD(path.join(route, file))
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
