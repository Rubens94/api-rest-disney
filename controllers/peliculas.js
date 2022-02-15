const Peliculas = require('../models/Peliculas');
const Generos = require('../models/Generos');

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

const mostrarPeliculas = async(req, res) => {

    const peliculas = await Peliculas.findAll({
        attributes: ['id','img', 'titulo', 'fecha']
    });

    res.json({peliculas});
}

const mostrarPelicula = async(req, res) => {

    const { name, genre, order } = req.query;
    let pelicula;

    if (name) {

        pelicula = await Peliculas.findOne({
            where: {
                'titulo': name
            },
            attributes: ['id', 'titulo', 'fecha', 'calificacion', 'img'],
            include: [{
                model: Generos,
                attributes: ['id', 'nombre', 'img']
            }]
        });
    } else if (genre) {

        pelicula = await Generos.findOne({
            where: {
                'nombre': genre
            },
            attributes: ['id', 'nombre', 'img'],
            include: [{
                model: Peliculas,
                attributes: ['id', 'titulo', 'fecha', 'calificacion', 'img'],
            }]
        });
    } else if (order) {
        
        const orderUpperCase = order.toUpperCase();

        switch (orderUpperCase) {
            case 'ASC':
                
                pelicula = await Peliculas.findAll({
                    order: [['titulo', order]],
                    attributes: ['id', 'titulo', 'fecha', 'calificacion', 'img'],
                    include: [{
                        model: Generos,
                        attributes: ['id', 'nombre', 'img']
                    }]
                });
                break;
                case 'DESC':
                
                    pelicula = await Peliculas.findAll({
                        order: [['titulo', order]],
                        attributes: ['id', 'titulo', 'fecha', 'calificacion', 'img'],
                        include: [{
                            model: Generos,
                            attributes: ['id', 'nombre', 'img']
                        }]
                    });
                    break;

            default:
                return res.json({msg:'Orden no válido'});
        }
    } else {
        return res.status(400).json({msg:'El filtro no existe'});
    }

    // Verificar si existe película o serie
    if (!pelicula) {
        return res.status(400).json({msg:'No existe personaje'});
    }

    res.json(pelicula);
}

module.exports = {
    crearPelicula,
    editarPelicula,
    eliminarPelicula,
    mostrarPeliculas,
    mostrarPelicula
}