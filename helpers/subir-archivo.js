const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = "" ) => {

    return new Promise ( (resolve, reject) => {

        const { archivo } = files;      
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];
    
        // Validar la extensión
        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
        }    
        
        // Cambiar nombre de archivo con un ID único 
        const nombreTemp = uuidv4() + '.' + extension;
    
        // Directorio para guardar los archivos
        const uploadPath = path.join ( __dirname, '../public/uploads', carpeta, nombreTemp );
    
        archivo.mv(uploadPath, (err) => {
        if (err) {
            reject(err);
        }
        
            resolve( nombreTemp );
        });
        
    
    });

}

module.exports = {
    subirArchivo
}