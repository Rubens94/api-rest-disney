const validaCampos        = require('../middlewares/validar-campos');
const validarJWT          = require('../middlewares/validar-jwt');
const validarRegistro     = require('./validarRegistro');
const validarArchivoSubir = require('./validar-archivo');
const cacheInit           = require('./cache');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validarRegistro,
    ...validarArchivoSubir,
    ...cacheInit
}