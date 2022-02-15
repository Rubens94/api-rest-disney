const { Router } = require('express');
const { check } = require('express-validator');
const { crearPeliculaGenero, eliminarRelacion } = require('../controllers/pelicula-genero');

const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

// Crear relación
router.post('/', [
    validarJWT,
    check('peliculaID','No se puede estar vacío la película o serie').not().isEmpty().trim().escape(),
    check('generoID', 'No se puede estar vacío el género').not().isEmpty().trim().escape(),
    validarCampos
], crearPeliculaGenero);

// Eliminar relación
router.delete('/:id', [
    validarJWT
], eliminarRelacion);

module.exports = router;