const { json } = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {
    //Leer Token
    const token = req.header('x-token');
    console.log(token);

    if (!token) {
        return json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }




}

module.exports = {
    validarJWT
}