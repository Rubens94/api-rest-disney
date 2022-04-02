const { Router } = require('express');
const { check } = require('express-validator');
const { crearPelicula, editarPelicula, eliminarPelicula, mostrarPeliculas, mostrarPelicula } = require('../controllers/peliculas');

const { validarJWT, validarCampos, cacheInit } = require('../middlewares');

const router = Router();

// Crear película o serie
router.post('/', [
    validarJWT,
    check('titulo', 'El título no puede estar vacío').not().isEmpty().trim().escape(),
    check('fecha', 'La fecha no puede estar vacía').not().isEmpty().trim().escape(),
    check('calificación').trim().escape(),
    validarCampos
], crearPelicula);

// Editar película o serie
router.put('/:id', [
    validarJWT,
    check('titulo', 'El título no puede estar vacío').not().isEmpty().trim().escape(),
    check('fecha', 'La fecha no puede estar vacía').not().isEmpty().trim().escape(),
    check('calificación').trim().escape(),
    validarCampos
], editarPelicula);

// Eliminar película o serie
router.delete('/:id', [
    validarJWT
], eliminarPelicula);

// Mostrar todas las películas o series
router.patch('/', [
    validarJWT
], mostrarPeliculas);

// Mostrar película o serie por filtro
router.get('/', [
    validarJWT,
    cacheInit
], mostrarPelicula);

module.exports = router;