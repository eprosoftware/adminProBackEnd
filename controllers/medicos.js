const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res = respose) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img ')
        .populate('hospital', 'nombre ');

    res.json({
        ok: true,
        medicos
    });
}

const crearMedicos = async(req, res = respose) => {
    const uid = req.uid;
    //const hospitalID = req.hospital;

    const medico = new Medico({
        usuario: uid,
        //       hospital: hospitalID,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
}

const actualizarMedicos = (req, res = respose) => {
    res.json({
        ok: true,
        msg: 'Actualizar Medicos'
    })
}

const borrarMedicos = (req, res = respose) => {
    res.json({
        ok: true,
        msg: 'Borrar Medicos'
    })
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}