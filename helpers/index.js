const coleccionesPermitidas = require('./colecciones-permitidas');
const comprobarJWT          = require('./generar-JWT');
const generarJWT            = require('./generar-JWT');
const subirArchivo          = require('./subir-archivo');

module.exports = {
    ...coleccionesPermitidas,
    ...comprobarJWT,
    ...generarJWT,
    ...subirArchivo
}