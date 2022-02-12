const Sequelize = require('sequelize');
const db = require('../config/db');
const Generos = require('./Generos');
const Peliculas = require('./Peliculas');


const Pelicula_Genero = db.define('pelicula_genero', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

// Relación muchos a muchos
Generos.belongsToMany(Peliculas, { through: Pelicula_Genero });
Peliculas.belongsToMany(Generos, { through: Pelicula_Genero});

module.exports = Pelicula_Genero;