const Personajes = require('../models/Personajes');
const Peliculas = require('../models/Peliculas');
const Personaje_Pelicula = require('../models/Personaje_Pelicula');

const crearPersonajePelicula = async(req, res) => {
    try {
        
        const { personajeID, peliculaID } = req.body;
        const character = await Personajes.findOne({ where: { 'id': personajeID} });
        const movie = await Peliculas.findOne({ where: { 'id': peliculaID} });

        // Verificar que exista el personaje
        if (!character) {
            return res.status(400).json({msg:`Personaje con ID: ${personajeID}, no se encuentra registrado`});
        }

        // Verificar si la película o serie existe
        if (!movie) {
            return res.status(400).json({msg:`Película o serie con ID: ${peliculaID}, no se encuentra registrado`});
        }

        // Guardar relación
        const personajeId = character.id;
        const peliculaId = movie.id;

        await Personaje_Pelicula.create({
            personajeId,
            peliculaId
        });

        res.json({msg:`Personaje ${character.nombre} se asoció con la serie o pelicula ${movie.titulo}`});
    } catch (err) {
        res.status(501).json({
            msg:'No se pudo realizar la relación de personaje con la película o serie',
            msg2: 'Puede que ya exista la relación'
        });
    }
}

const eliminarRelacion = async(req, res) => {
    
    const { id } = req.params;

    const relacion = await Personaje_Pelicula.findOne({where: {id}});

    // Verificar si existe la relación
    if (!relacion) {
        return res.status(400).json({msg:`La relación con ID: ${id}, no existe`});
    }

    relacion.destroy();

    res.json('Relación eliminada con exito');
}

module.exports = {
    crearPersonajePelicula,
    eliminarRelacion
}