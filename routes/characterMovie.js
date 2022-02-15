const { Router } = require('express');
const { check } = require('express-validator');
const { crearPersonajePelicula, eliminarRelacion } = require('../controllers/personaje-pelicula');

const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

// Crear relación
router.post('/', [
    validarJWT,
    check('personajeID', 'No puede estar vacío el personaje').not().isEmpty().trim().escape(),
    check('peliculaID', 'No puede estar vacío la película o serie').not().isEmpty().trim().escape(),
    validarCampos
], crearPersonajePelicula);

// Eliminar relación
router.delete('/:id', [
    validarJWT,
], eliminarRelacion);

module.exports = router;