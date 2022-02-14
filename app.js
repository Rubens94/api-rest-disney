require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
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

// Directorio Público
app.use( express.static('public') );

// FileUpload - Carga de archivos
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
}));

// Rutas
app.use('/auth/login', require('./routes/login') );
app.use('/auth/register', require('./routes/register') );
app.use('/characters', require('./routes/characters') );
app.use('/movies', require('./routes/movies') );
app.use('/genre', require('./routes/genre') );
app.use('/character-movie', require('./routes/characterMovie') );
app.use('/movie-genre', require('./routes/movieGenre') );
app.use('/uploads', require('./routes/uploads') );

app.listen(port, () => {
    console.log(`Server corriendo en el puerto ${port}`);
});