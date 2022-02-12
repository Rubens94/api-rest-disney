const { Router } = require('express');
const { check } = require('express-validator');
const { crearGenero } = require('../controllers/genero');

const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

router.post('/', [
    validarJWT,
    check('nombre', 'No puede ir vacío el genero').not().isEmpty().trim().escape(),
    validarCampos
], crearGenero);

module.exports = router;