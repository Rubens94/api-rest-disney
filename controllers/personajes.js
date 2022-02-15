const Personajes = require('../models/Personajes');
const Peliculas = require('../models/Peliculas');

const crearPersonaje = async(req, res) => {

    try {

        const {nombre, edad, peso, historia} = req.body;
        
        await Personajes.create({
            nombre,
            edad,
            peso,
            historia
        });
    
        res.json({msg:'Personaje creado'});
    } catch (err) {
        console.log(err)
        res.status(501).json({msg:'No se pudo crear personaje'});
    }
}

const editarPersonaje = async(req, res) => {

    const { id } = req.params;
    const { nombre, edad, peso, historia } = req.body;

    const personaje = await Personajes.findOne({where: {id} });

    // Validar que existe el personaje
    if (!personaje)  {
        return res.status(400).json({msg: `El personaje con ID: ${id}, no existe`});
    }

    // Guardar datos del personaje
    personaje.update({
        nombre,
        edad,
        peso,
        historia
    });

    res.json({msg:`Personaje con ID: ${id}, actualizado correctamente`});
}

const eliminarPersonaje = async(req, res) => {
    const { id } = req.params;

    const personaje = await Personajes.findOne({where: {id} });

    // Validar si existe personaje
    if (!personaje) {
        return res.status(400).json({msg: `Personaje con ID: ${id}, no existe`});
    }

    // Eliminar personaje
    personaje.destroy();

    res.json({msg: `Personaje con ID: ${id}, eliminado correctamente`});
}

const mostrarPersonajes = async(req, res) => {

    const personajes = await Personajes.findAll({
        attributes: ['id','img', 'nombre']
    });

    res.json({personajes});
}

const mostrarPersonaje = async(req, res) => {

    const { name, age, movies } = req.query;
    let personaje;
    
    if (name) {

        personaje = await Personajes.findOne({
            where: {
                'nombre': name
            },
            attributes: ['id', 'nombre', 'edad', 'peso', 'historia', 'img'],
            include: [{
                model: Peliculas,
                attributes: ['id', 'titulo', 'fecha', 'calificacion', 'img']
            }]
        });

    } else if (age) {

        personaje = await Personajes.findOne({
            where: {
                'edad': age
            },
            attributes: ['id', 'nombre', 'edad', 'peso', 'historia', 'img'],
            include: [{
                model: Peliculas,
                attributes: ['id', 'titulo', 'fecha', 'calificacion', 'img']
            }]
        });

    } else if (movies) {

        personaje = await Peliculas.findOne({
            where: {
                'titulo': movies
            },
            attributes: ['id', 'titulo', 'fecha', 'calificacion', 'img'],
            include: [{
                model: Personajes,
                attributes: ['id', 'nombre', 'edad', 'peso', 'historia', 'img']
            }]
        });

    } else {
        return res.status(400).json({msg: 'No existe el filtro de búsqueda'});
    }

    // Verificar si existe personaje
    if (!personaje) {
        return res.status(400).json({msg: 'No existe el personaje'});
    }

    res.json(personaje)
}

module.exports = {
    crearPersonaje,
    editarPersonaje,
    eliminarPersonaje,
    mostrarPersonajes,
    mostrarPersonaje
}