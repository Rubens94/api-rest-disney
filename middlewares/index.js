const validaCampos        = require('../middlewares/validar-campos');
const validarJWT          = require('../middlewares/validar-jwt');
const validarRegistro     = require('./validarRegistro');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validarRegistro
}