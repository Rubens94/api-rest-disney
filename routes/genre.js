const { Router } = require('express');
const { check } = require('express-validator');
const { crearGenero, editarGenero, eliminarGenero, mostrarGeneros } = require('../controllers/genero');

const { validarJWT, validarCampos, cacheInit } = require('../middlewares');

const router = Router();

// Crear género
router.post('/', [
    validarJWT,
    check('nombre', 'No puede ir vacío el genero').not().isEmpty().trim().escape(),
    validarCampos
], crearGenero);

// Editar género
router.put('/:id', [
    validarJWT,
    check('nombre', 'No puede ir vacío el genero').not().isEmpty().trim().escape(),
    validarCampos
], editarGenero);

// Eliminar género
router.delete('/:id', [
    validarJWT
], eliminarGenero);

// Mostrar géneros
router.get('/', [
    validarJWT,
    cacheInit
], mostrarGeneros)

module.exports = router;