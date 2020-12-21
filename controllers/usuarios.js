const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario
        .find({}, 'nombre email role google')
        .skip(desde)
        .limit(5),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async(req, res = response) => {

    const { email, password, nombre } = req.body;


    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }
        const usuario = new Usuario(req.body);

        console.log(usuario);

        // Encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        // Guardar Usuario

        await usuario.save();

        res.json({
            ok: true,
            usuario,
            msg: 'Creando Usuarios '
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado, revisar logs'
        });
    }


}

const actualizarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    // TODO: Validar token y comprobar si es el usuario correcto
    console.log(uid);

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el Usuario ID'
            });
        }
        //Actualizaciones
        const { email, password, google, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email: req.body.email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
}

const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el Usuario ID'
            });
        }

        const eliminaUsuario = await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            uid,
            msg: 'Registro Eliminado Exitosamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
}
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}