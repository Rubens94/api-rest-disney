const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');

const generarJWT = ( id ) => {

    return new Promise( (resolve, reject) => {

        const payload = { id };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}

const comprobarJWT = async( token = '') => {

    try{
        if (token.length < 10 ) {
            return null;
        }

        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const usuario = await Usuarios.findOne({ where: { id }});

        if ( usuario ) {
            if ( usuario.estado === 1 ) {
                return usuario;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch ( err ) {
        return null;
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}