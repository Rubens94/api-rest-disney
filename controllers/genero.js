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
        res.status(501).json({msg:'No se pudo crear el género'});
    }
}

const editarGenero = async(req, res) => {

    const { id } = req.params;
    const { nombre } = req.body;

    const genero = await Generos.findOne({where: {id} });

    // Verificar si existe el género
    if (!genero) {
        return res.status(400).json({msg:`El género con ID: ${id}, no existe`});
    }

    // Actualizar datos
    genero.update({
        nombre
    });

    res.json({msg:`Género actualizado correctamente con el ID: ${id}`});

}

const eliminarGenero = async(req, res) => {

    const { id } = req.params;
    
    const genero = await Generos.findOne({where: {id} });

    // Verificar si existe el género
    if (!genero) {
        return res.status(400).json({msg:`El género con ID: ${id}, no existe`});
    }

    // Eliminando género
    genero.destroy();

    res.json({msg:`Género eliminado correctamente con el ID: ${id}`});
}

const mostrarGeneros = async(req, res) => {

    const generos = await Generos.findAll({
        attributes: ['id', 'nombre', 'img']
    });

    res.json({generos});
}

module.exports = {
    crearGenero,
    editarGenero,
    eliminarGenero,
    mostrarGeneros
}