const fs = require('fs');
const mdLinks = (path, options) =>{
    return new Promise((resolve, reject) => {
        //Ingresó el path o ruta
        //verificar si existe la ruta o ptah
        if (fs.existSync(path)) {
           
          } else {
            reject(new Error("La ruta no existe"));
          } 
      
    });


 
}
module.exports =  {
mdLinks
};
