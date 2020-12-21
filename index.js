const express = require('express');
require('dotenv').config();
var cors = require('cors');

const { dbConnection } = require('./database/config');


//Crear el servidor express

const app = express();

// Configurar Cors

app.use(cors());

// Lectura y parseo del body

app.use(express.json());

// Base de Datos

dbConnection();

// Datos MongoDB Atlas Cloud

const puerto = process.env.PORT;

//Rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(puerto, () => {
    console.log('Servidor funcionando en el puerto ', puerto);
});