const { response } = require('express');
const usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        //Verificar email
        const usuarioDB = await usuario.findOne({ email });
        console.log(usuarioDB);
        if (!usuarioDB) {
            return res.json({
                ok: false,
                msg: 'Correo no existe en usuarios'
            });
        }
        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.json({
                ok: false,
                msg: 'Clave incorrecta'
            });
        }
        //Generar Web Token

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'Acceso Permitido',
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Problemas con tu acceso'
        });
    }

}

module.exports = {
    login
}