const Personajes = require('../models/Personajes');
const Personaje_Pelicula = require('../models/Personaje_Pelicula');
const Pelicula_Genero = require('../models/Pelicula_Genero');

const crearPersonaje = async(req, res) => {

    try {

        const {nombre, edad, peso, historia} = req.body;
        
        await Personajes.create({
            nombre,
            edad,
            peso,
            historia
        });
    
        res.json({'msg':'Personaje creado'});
    } catch (err) {
        console.log(err)
        res.status(501).json({'msg':'No se pudo crear personaje'});
    }
}

module.exports = {
    crearPersonaje
}