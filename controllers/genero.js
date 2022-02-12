const Generos = require('../models/Generos');

const crearGenero = async(req, res) => {

    try {

        const { nombre } = req.body;

        await Generos.create({
            nombre
        });
        
        res.json({'msg':'Género creado'});
    } catch (err) {
        console.log(err);
        res.status(501).json({'msg':'No se pudo crear el género'});
    }
}

module.exports = {
    crearGenero
}