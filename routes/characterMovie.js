const { Router } = require('express');
const { check } = require('express-validator');
const { crearPersonajePelicula } = require('../controllers/personaje-pelicula');

const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

router.post('/', [
    validarJWT,
    check('personaje', 'No puede estar vacío el personaje').not().isEmpty().trim().escape(),
    check('pelicula', 'No puede estar vacío la película o serie').not().isEmpty().trim().escape(),
    validarCampos
], crearPersonajePelicula);

module.exports = router;