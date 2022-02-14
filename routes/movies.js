const { Router } = require('express');
const { check } = require('express-validator');
const { crearPelicula, editarPelicula, eliminarPelicula } = require('../controllers/peliculas');

const { validarJWT, validarCampos } = require('../middlewares');

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
// Pendiente

module.exports = router;