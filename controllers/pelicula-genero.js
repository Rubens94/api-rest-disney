const Peliculas = require('../models/Peliculas');
const Generos = require('../models/Generos');
const Pelicula_Genero = require('../models/Pelicula_Genero');

const crearPeliculaGenero = async(req, res) => {

    try {

        const { peliculaID, generoID } = req.body;
        const movie = await Peliculas.findOne({ where: { 'id': peliculaID} });
        const genre = await Generos.findOne({ where: { 'id': generoID} });

        // Verificar si existe la película o serie
        if (!movie) {
            return res.status(400).json({msg:'No se encuentra la película o serie'});
        }

        // Verificar si existe el genero
        if (!genre) {
            return res.status(400).json({msg:'El género no se encuentra'})
        }

        // Crear relación
        const generoId = genre.id;
        const peliculaId = movie.id;

        await Pelicula_Genero.create({
            generoId,
            peliculaId
        });

        res.json({msg:`${movie.titulo} se asoció con ${genre.nombre}`});
    } catch (err) {
        res.status(501).json({
            msg:'No se pudo crear la relación entre el género y la película o serie',
            msg2:'Puede que ya exista la relación'
        });
    }

}

const eliminarRelacion = async(req, res) => {

    const { id } = req.params;

    const relacion = await Pelicula_Genero.findOne({where: {id}});

    // Verificar si existe relación
    if (!relacion) {
        return res.status(400).json({msg:'La relación no existe'});
    }

    relacion.destroy();

    res.json({msg:'Relación eliminada exitosamente'});
}

module.exports = {
    crearPeliculaGenero,
    eliminarRelacion
}