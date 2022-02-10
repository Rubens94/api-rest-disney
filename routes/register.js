const { Router } = require('express');
const { check } = require('express-validator');

const { register } = require('../controllers/register');

const { validarRegistro } = require('../middlewares/validarRegistro');

const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty().trim().escape(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty().trim(),
    check('password', 'El password debe de tener más de 6 carácteres').isLength({ min: 6 }),
    check('confirmar', 'La confirmación del password es obligatorio').not().isEmpty().escape().trim(),
    validarRegistro
], register);

module.exports = router;