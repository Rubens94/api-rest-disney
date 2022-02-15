const Usuarios = require('../models/Usuarios');
const transporter = require('../config/email');

const register = async(req, res) => {

    const { email, password } = req.body;

    const usuario = await Usuarios.findOne({where: { email } });

    try{


        // Verificar si ya existe email registrado
        if ( usuario ) {
            return res.status(400).json({msg:'Email ya registrado, intente con otro'});
        }

        await Usuarios.create({
            email,
            password
        });

        // Enviar e-mail
        await transporter.sendMail({
            from: `"Bienvenido" <${process.env.MAIL_USERNAME}>`,
            to: email,
            subject: "Bienvenido a la API REST del mundo de Disney",
            html: "<p>Bienvenido a la API REST del mundo de Disney donde podrás crear, editar, eliminar de series, películas, usuarios y géneros</p>",
          });

        res.json({msg:'Usuario creado con éxito'});

    } catch(err) {
        console.log(err)
        res.json({msg:'Hubo un problema al registrar el usuario'});
    }
}

module.exports = {
    register
}