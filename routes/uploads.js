const { Router } = require('express');
const { check } = require('express-validator');
const { coleccionesPermitidas } = require('../helpers/colecciones-permitidas');
const { actualizarImagen, subirImagen } = require('../controllers/uploads');

const { validarJWT, validarArchivoSubir, validarCampos } = require('../middlewares');

const router = Router();

// Subir imágen
router.post('/:coleccion/:id', [
    validarJWT,
    validarArchivoSubir,
    check('coleccion').custom(c => (coleccionesPermitidas(c, ['character', 'movie', 'genre']) )),
    validarCampos
], subirImagen);


// Actualizar imágen
router.put('/:coleccion/:id', [
    validarJWT,
    validarArchivoSubir,
    check('coleccion').custom(c => (coleccionesPermitidas(c, ['character', 'movie', 'genre']) )),
    validarCampos
], actualizarImagen);

module.exports = router;