const { response } = require('express');
const {
    body,
    validationResult
} = require('express-validator');

const validarRegistro = async(req, res = response, next) => {

    // Verificar que el password y el campo confirmar coincidan para poder crear el usuario
    const rules = [
        body('confirmar').equals(req.body.password).withMessage('Los Passwords no coinciden'),
    ];

    await Promise.all(rules.map( validation => validation.run(req) ));
    const errores = validationResult(req);

    // Si hay errores
    if(!errores.isEmpty()) return res.status(409).json(errores.array().map(error => error.msg));
    
    // Si la validación es correcta
    next();
}

module.exports = {
   validarRegistro
}