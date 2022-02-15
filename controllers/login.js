const { generarJWT } = require('../helpers/generar-JWT')
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('../models/Usuarios');

const login = async(req, res) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuarios.findOne({ where: { email } });

        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Email no existe'
            });
        }

        // Verificar si el usuario se encuentra inactivo
        if ( usuario.activo === 0) {
            return res.status(400).json({
                msg: 'Usuario inactivo, active su cuenta'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({token});

    } catch(err) {
        console.log(err);
        res.status(500).json({'msg':'No se pudo iniciar la sesión, revisar con el administrador'});
    }
}

module.exports = {
    login
}