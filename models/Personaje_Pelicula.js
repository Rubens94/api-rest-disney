const Sequelize = require('sequelize');
const db = require('../config/db');
const Personajes = require('./Personajes');
const Peliculas = require('./Peliculas');


const Personaje_Pelicula = db.define('personaje_pelicula', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

// Relación muchos a muchos
Personajes.belongsToMany(Peliculas, { through: Personaje_Pelicula });
Peliculas.belongsToMany(Personajes, { through: Personaje_Pelicula});

module.exports = Personaje_Pelicula;