const Peliculas = require("../models/Peliculas");

const crearPelicula = async(req, res) => {

    try{

        const { titulo, fecha, calificacion } = req.body;

        await Peliculas.create({
            titulo,
            fecha,
            calificacion
        });

        res.json({msg:'Pelicula / Serie creada'});
    } catch (err) {
        console.log(err);
        res.status(501).json({msg:'No se pudo crear la película o serie'});
    }
}

const editarPelicula = async(req, res) => {

    const { id } = req.params;
    const { titulo, fecha, calificacion } = req.body;

    const pelicula = await Peliculas.findOne({where: { id } });

    // Verificar si existe l apelícula o serie
    if (!pelicula) {
        return res.status(400).json({msg: `La película o serie con el ID: ${id}, no existe`});
    }

    // Guardar datos
    pelicula.update({
        titulo,
        fecha,
        calificacion
    });

    res.json({msg:`Película o serie con ID: ${id}, actualizado correctamente`});
}

const eliminarPelicula = async(req, res) => {
    
    const { id } = req.params;

    pelicula = await Peliculas.findOne({where: {id}} );

    // Verificar si existe la película o serie
    if (!pelicula) {
        return res.status(400).json({msg:`La película o serie con ID: ${id}, no existe`});
    }

    // Eliminar la película o serie
    pelicula.destroy();

    res.json({msg:`Película o serie con ID: ${id}, eliminado correctamente`});
    
}

module.exports = {
    crearPelicula,
    editarPelicula,
    eliminarPelicula
}