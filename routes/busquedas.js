/*
    Rutas : '/api/todo/:busqueda'
*/

const { Router } = require('express');
const { getTodo, getDoc } = require('../controllers/busquedas');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/:busqueda', [validarJWT], getTodo);
router.get('/tabla/:tabla/:busqueda', [validarJWT], getDoc);


module.exports = router;