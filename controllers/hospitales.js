const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async(req, res = respose) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
}

const crearHospitales = async(req, res = respose) => {

    const uid = req.uid;


    const hospital = new Hospital({
        usuario: uid,

        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
}

const actualizarHospitales = (req, res = respose) => {
    res.json({
        ok: true,
        msg: 'Actualizar Hospitales'
    })
}

const borrarHospitales = (req, res = respose) => {
    res.json({
        ok: true,
        msg: 'Borrar Hospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}