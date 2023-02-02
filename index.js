const fs = require('fs');
const{extractlinks, validateLink} =require('api.js');

//Creación de archios

/*fs.writeFile('./colores.txt', 'verde\namarillo\nazul\nrojo', error => {
  if(error) {
    console.log(error);
  }
  else {
   // console.log('se creo el archivo');
  }
});*/
const mdLinks = (route, option) => {
  return new Promise((resolve, reject) => {
      if (option.validate === false || option.validate === undefined) {
          resolve(extractlinks(route));
      } else if (option.validate === true) {
          resolve(validateLink(route));
      } else {
          reject('error')
      }
  })
};

module.exports = {
  mdLinks,
};


