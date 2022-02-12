const { Router } = require('express');
const { check } = require('express-validator');
const { crearPeliculaGenero } = require('../controllers/pelicula-genero');

const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

router.post('/', [
    validarJWT,
    check('pelicula','No se puede estar vacío la película o serie').not().isEmpty().trim().escape(),
    check('genero', 'No se puede estar vacío el género').not().isEmpty().trim().escape(),
    validarCampos
], crearPeliculaGenero);

module.exports = router;