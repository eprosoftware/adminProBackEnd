/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');


const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El mail tiene formato incorrecto').isEmail(),
        validarCampos,
    ],
    crearUsuario
);

router.put('/:id', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El mail tiene formato incorrecto').isEmail(),
        check('role', 'El rol es obligatorio'),
        validarCampos
    ],
    actualizarUsuario
);

router.delete('/:id', borrarUsuario);



module.exports = router;