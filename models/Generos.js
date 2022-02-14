const Sequelize = require('sequelize');
const db = require('../config/db');

const Generos = db.define('generos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        defaultValue: 'empty'
    }
});

module.exports = Generos;