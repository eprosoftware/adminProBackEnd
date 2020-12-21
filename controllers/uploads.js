/*
    Ruta: '/api/upload'

 */
const fs = require('fs');
const path = require('path');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Tipo Invalido.'
        });
    }
    // Validar que existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo'
        });
    }
    // Procesar el archivo 

    const file = req.files.imagen;

    console.log(file);
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extension

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    // Generar le nombre del archivo

    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path donde gardar la imagen

    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        // Actualizar DB
        actualizarImagen(tipo, id, nombreArchivo);
        res.json({
            ok: true,
            msg: 'Archivo cargado',
            nombreArchivo,
            path
        });
    });




}

const retornaImagen = (req, res) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;


    let pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);
    // imagen por defecto

    if (!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, `../uploads/no-img.png`);

    }

    res.sendFile(pathImg);
}
module.exports = {
    fileUpload,
    retornaImagen
}