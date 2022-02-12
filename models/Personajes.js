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
        type: Sequelize.FLOAT(3,2),
    },
    historia: {
        type: Sequelize.STRING,
    },
    img: {
        type: Sequelize.STRING,
    }
});

module.exports = Personajes;