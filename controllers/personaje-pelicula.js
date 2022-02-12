const Personajes = require('../models/Personajes');
const Peliculas = require('../models/Peliculas');
const Personaje_Pelicula = require('../models/Personaje_Pelicula');

const crearPersonajePelicula = async(req, res) => {
    try {
        
        const { personaje, pelicula } = req.body;
        const character = await Personajes.findOne({ where: { 'nombre': personaje} });
        const movie = await Peliculas.findOne({ where: { 'titulo': pelicula} });

        // Verificar que exista el personaje
        if (!character) {
            return res.status(400).json({'msg':`${personaje}, no se encuentra registrado`});
        }

        // Verificar si la película o serie existe
        if (!movie) {
            return res.status(400).json({'msg':`${pelicula}`});
        }

        // Guardar relación
        const personajeId = character.id;
        const peliculaId = movie.id;
        
        await Personaje_Pelicula.create({
            personajeId,
            peliculaId
        });

        res.json({'msg':`Personaje ${personaje} se asoció con la serie o pelicula ${pelicula}`});
    } catch (err) {
        console.log(err);
        res.status(501).json({'msg':'No se pudo realizar la relación de personaje con la película o serie'});
    }
}

module.exports = {
    crearPersonajePelicula
}