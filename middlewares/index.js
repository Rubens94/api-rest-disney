const validaCampos        = require('../middlewares/validar-campos');
const validarJWT          = require('../middlewares/validar-jwt');
const validarRegistro     = require('./validarRegistro');
const validarArchivoSubir = require('./validar-archivo');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validarRegistro,
    ...validarArchivoSubir
}