const Usuarios = require('../models/Usuarios');

const register = async(req, res) => {

    const { email, password } = req.body;

    const usuario = await Usuarios.findOne({where: { email } });

    try{


        // Verificar si ya existe email registrado
        if ( usuario ) {
            return res.status(400).json('Email ya registrado, intente con otro');
        }

        await Usuarios.create({
            email,
            password
        });

        res.json('Usuario creado con éxito')

    } catch(err) {
        console.log(err)
        res.json('Hubo un problema al registrar el usuario');
    }
}

module.exports = {
    register
}