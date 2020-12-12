const express = require('express');
require('dotenv').config();
var cors = require('cors');

const { dbConnection } = require('./database/config');


//Crear el servidor express

const app = express();

// Configurar Cors

app.use(cors());


// Base de Datos

dbConnection();

// Datos MongoDB Atlas Cloud

const puerto = process.env.PORT;

//Rutas

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});

app.listen(puerto, () => {
    console.log('Servidor funcionando en el puerto ', puerto);
});