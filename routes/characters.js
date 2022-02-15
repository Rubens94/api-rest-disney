const { Router } = require('express');
const { check } = require('express-validator');
const { crearPersonaje, editarPersonaje, eliminarPersonaje, mostrarPersonajes, mostrarPersonaje } = require('../controllers/personajes')

const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

// Crear personaje
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty().trim().escape(),
    check('edad').trim().escape(),
    check('peso').trim().escape(),
    check('historia').trim().escape(),
    check('img').trim().escape(),
    validarCampos
], crearPersonaje);


// Editar personaje
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty().trim().escape(),
    check('edad').trim().escape(),
    check('peso').trim().escape(),
    check('historia').trim().escape(),
    check('img').trim().escape(),
    validarCampos
], editarPersonaje);

// Eliminar personaje
router.delete('/:id', [
    validarJWT
], eliminarPersonaje);

// Mostrar todos los personajes
router.patch('/', [
    validarJWT
], mostrarPersonajes);

// Mostrar personaje por filtro
router.get('/', [
    validarJWT
], mostrarPersonaje);

module.exports = router;