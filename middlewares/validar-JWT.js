const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuarios');

const validarJWT = async( req = request, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    // Validar que el token no sea manipulado por el usuario
    try {

        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Leer al usuario que le corresponde el id
        const usuario = await Usuario.findOne({ where: { id } });

        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en la DB'
            });
        }

        req.usuario = usuario;
        next();
    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}