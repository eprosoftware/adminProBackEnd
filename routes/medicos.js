/*
    Ruta: '/api/medicos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { validarJWT } = require('../middleware/validar-jwt');

const {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
} = require('../controllers/medicos');



const router = Router();

router.get('/', getMedicos);

router.post('/', [
        validarJWT,
        check('nombre', 'El Nombre del medico obligatorio').not().isEmpty(),

        validarCampos,
    ],
    crearMedicos);

router.put('/:id', actualizarMedicos);

router.delete('/:id', borrarMedicos);



module.exports = router;