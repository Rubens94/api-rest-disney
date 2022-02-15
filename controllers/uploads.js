const path = require('path');
const fs = require ('fs');

const Personajes = require('../models/Personajes');
const Peliculas = require('../models/Peliculas');
const Generos = require('../models/Generos');

const { subirArchivo } = require('../helpers');

const subirImagen = async(req, res) => {

    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'character':

            modelo = await Personajes.findOne({where: {id}});
            if (!modelo) {
                return res.status(400).json({msg: `No existe un personaje con el ID ${id}`});
            }

        break;
        case 'movie':

            modelo = await Peliculas.findOne({where: {id}});
            if (!modelo) {
                return res.status(400).json({msg: `No existe una película o serie con el ID ${id}`});
            }

        break;
        case 'genre':
            modelo = await Generos.findOne({where: {id}});
            if (!modelo) {
                return res.status(400).json({msg: `No existe un género con el ID ${id}`});
            }
        break;
        default:
            return res.status(500).json({msg: `${coleccion} no es una colección no válida`});

    }

    if (modelo.img.length >= 6) {
        return res.status(500).json({msg:`El ID ${id} ya contiene una imágen, si deseas poner otra imágen entonces debes usar el request para actualizar`});
    }

    // generar url con la ruta de la imágen en los modelos
    const nombre = await subirArchivo( req.files, ['JPG', 'jpg', 'PNG', 'png', 'GIF', 'gif', 'jpeg', 'JPEG'], coleccion );
    url = `${process.env.HOST}://${req.headers.host}/uploads/${coleccion}/${nombre}`;
    
    // Guardando url en la colección
    await modelo.update(
        {img: url},
        {where: id}
    );

    res.json(modelo);
}

const actualizarImagen = async(req, res) => {

    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'character':

            modelo = await Personajes.findOne({where: {id}});
            if (!modelo) {
                return res.status(400).json({msg: `No existe un personaje con el ID ${id}`});
            }

        break;
        case 'movie':

            modelo = await Peliculas.findOne({where: {id}});
            if (!modelo) {
                return res.status(400).json({msg: `No existe una película o serie con el ID ${id}`});
            }

        break;
        case 'genre':
            modelo = await Generos.findOne({where: {id}});
            if (!modelo) {
                return res.status(400).json({msg: `No existe un género con el ID ${id}`});
            }
        break;
        default:
            return res.status(500).json({msg: `${coleccion} no es una colección no válida`});

    }

    // Sacar el nombre de la imágen
    if(modelo.img === 'empty') {
        return res.status(500).json({msg:`El ID: ${id}, actualmente no cuenta con una imágen, favor de subir una para poder actualizar la misma`});
    }
    const urlImagen = modelo.img.split('/');
    const nombreImagen = urlImagen[ urlImagen.length -1];
    
    // Reemplazar imágen actual para evitar generar basura
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../public/uploads', coleccion, nombreImagen);
        if (fs.existsSync( pathImagen )) {
            // Eliminando imágen del servidor
            fs.unlinkSync(pathImagen);
        }
    }

    // generar url con la ruta de la imágen en los modelos
    const nombre = await subirArchivo( req.files, ['JPG', 'jpg', 'PNG', 'png', 'GIF', 'gif', 'jpeg', 'JPEG'], coleccion );
    url = `${process.env.HOST}://${req.headers.host}/uploads/${coleccion}/${nombre}`;
    
    // Guardando url en la colección
    await modelo.update(
        {img: url},
        {where: id}
    );

    res.json(modelo);
}

module.exports = {
    subirImagen,
    actualizarImagen
}