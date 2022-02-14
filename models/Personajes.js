const Sequelize = require('sequelize');
const db = require('../config/db');

const Personajes = db.define('personajes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    edad: {
        type: Sequelize.INTEGER,
    },
    peso: {
        type: Sequelize.FLOAT,
    },
    historia: {
        type: Sequelize.STRING,
    },
    img: {
        type: Sequelize.STRING,
        defaultValue: 'empty'
    }
});

module.exports = Personajes;