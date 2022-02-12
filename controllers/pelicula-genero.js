const Peliculas = require('../models/Peliculas');
const Generos = require('../models/Generos');
const Pelicula_Genero = require('../models/Pelicula_Genero');

const crearPeliculaGenero = async(req, res) => {

    try {

        const { pelicula, genero } = req.body;
        const movie = await Peliculas.findOne({ where: { 'titulo': pelicula} });
        const genre = await Generos.findOne({ where: { 'nombre': genero} });

        // Verificar si existe la película o serie
        if (!movie) {
            return res.status(400).json({'msg':'No se encuentra la película o serie'});
        }

        // Verificar si existe el genero
        if (!genre) {
            return res.status(400).json({'msg':'El género no se encuentra'})
        }

        // Crear relación
        const generoId = genre.id;
        const peliculaId = movie.id;

        await Pelicula_Genero.create({
            generoId,
            peliculaId
        });

        res.json({'msg':`${pelicula} se asoció con ${genero}`});
    } catch (err) {
        console.log(err);
        res.status(501).json({'msg':'No se pudo crear la relación entre el género y la película o serie'});
    }

}

module.exports = {
    crearPeliculaGenero
}