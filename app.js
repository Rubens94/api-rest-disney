require('dotenv').config();
const express = require('express');
const db = require('./config/db');

const port = process.env.PORT;

// Importar modelos
require('./models/Usuarios');

// Conexión a la BD
db.sync()
    .then(() => console.log('Conectado a la BD'))
    .catch(error => console.log(error));

// Crear app de express 
const app = express();

// Habilitar bodyParser para leer datos del formulario
app.use( express.json() );

// Rutas
app.use('/auth/login', require('./routes/login') );
app.use('/auth/register', require('./routes/register') );

app.listen(port, () => {
    console.log(`Server corriendo en el puerto ${port}`);
});