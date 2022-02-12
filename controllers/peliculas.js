const res = require("express/lib/response");
const Peliculas = require("../models/Peliculas");

const crearPelicula = async(req, res) => {

    try{

        const { titulo, fecha, calificacion } = req.body;

        await Peliculas.create({
            titulo,
            fecha,
            calificacion
        });

        res.json({'msg':'Pelicula / Serie creada'});
    } catch (err) {
        console.log(err);
        res.status(501).json({'msg':'No se pudo crear la película o serie'});
    }
}

module.exports = {
    crearPelicula
}