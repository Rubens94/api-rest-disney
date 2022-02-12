const Sequelize = require('sequelize');
const db = require('../config/db');

const Peliculas = db.define('peliculas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    calificacion: {
        type: Sequelize.INTEGER,
    },
    img: {
        type: Sequelize.STRING,
        defaultValue: null
    }
});

module.exports = Peliculas;