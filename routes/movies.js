const { Router } = require('express');
const { check } = require('express-validator');
const { crearPelicula } = require('../controllers/peliculas');

const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

router.post('/', [
    validarJWT,
    check('titulo', 'El título no puede estar vacío').not().isEmpty().trim().escape(),
    check('fecha', 'La fecha no puede estar vacía').not().isEmpty().trim().escape(),
    check('calificación').trim().escape(),
    validarCampos
], crearPelicula);

module.exports = router;