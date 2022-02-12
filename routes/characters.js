const { Router } = require('express');
const { check } = require('express-validator');
const { crearPersonaje } = require('../controllers/personajes')

const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty().trim().escape(),
    check('edad').trim().escape(),
    check('peso').trim().escape(),
    check('historia').trim().escape(),
    check('img').trim().escape(),
    validarCampos
], crearPersonaje);


module.exports = router;