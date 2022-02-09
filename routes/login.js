const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/login');

const router = Router();

router.get('/', login);

module.exports = router;