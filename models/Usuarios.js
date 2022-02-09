const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(70),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un correo válido'
            },
            notEmpty: {
                msg: 'No puede ir vació el email'
            }
        },
        unique: {
            args: true,
            msg: 'Email ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(70),
        allowNull: false,
        validate: {
            notEmpty: 'No puede ir vació el password'
        }
    },
    activo: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10) );
        }
    }
});

// Verificar password
Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = Usuarios;