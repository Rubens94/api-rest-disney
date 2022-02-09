const { Router } = require('express');
const { check } = require('express-validator');

const { register } = require('../controllers/register');

const router = Router();

router.get('/', register);

module.exports = router;