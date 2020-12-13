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

// app.get('/', (req, res) => {
//     res.json({
//         ok: true,
//         msg: 'Hola Mundo'
//     });
// });

// app.get('/api/usuarios', (req, res) => {
//     res.json({
//         ok: true,
//         usuarios: [{
//             id: 123,
//             nombre: 'Eduardo'
//         }]
//     });
// });

app.listen(puerto, () => {
    console.log('Servidor funcionando en el puerto ', puerto);
});