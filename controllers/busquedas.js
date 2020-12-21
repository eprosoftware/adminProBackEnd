/*
    Ruta: 'api/todo/:tabla/:busqueda'
*/

// getTodo

const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');



const getTodo = async(req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    // const usuarios = await Usuario.find({ nombre: regex });
    // const medicos = await Medico.find({ nombre: regex });
    // const hospitales = await Hospital.find({ nombre: regex });

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);


    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const getDoc = async(req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda, 'i');
    let latabla = [];

    switch (tabla) {
        case 'medicos':
            latabla = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            latabla = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            latabla = await Usuario.find({ nombre: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Las tablas son medicos,hospitales o usuarios'
            });
    }

    res.status(200).json({
        ok: true,
        coleccion: tabla,
        resultados: latabla,
    });

}

module.exports = {
    getTodo,
    getDoc
}