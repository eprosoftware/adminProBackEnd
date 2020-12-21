/*
    Ruta: '/api/hospitales'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { validarJWT } = require('../middleware/validar-jwt');

const {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
} = require('../controllers/hospitales');



const router = Router();

router.get('/', [validarJWT], getHospitales);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
        validarCampos
    ],
    crearHospitales);

router.put('/:id', actualizarHospitales);

router.delete('/:id', borrarHospitales);



module.exports = router;