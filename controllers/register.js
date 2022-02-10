const Usuarios = require('../models/Usuarios');

const register = async(req, res) => {

    const { email, password } = req.body;

    try{

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