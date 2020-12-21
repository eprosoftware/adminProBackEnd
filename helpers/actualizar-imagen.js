const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

// borrar la imagen anterior
const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}
const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = "";
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No se encontro medico por ID');
                return false;
            }
            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            medico.save();
            return true;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No se encontro hospital por ID');
                return false;
            }
            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            hospital.save();
            return true;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No se encontro hospital por ID');
                return false;
            }
            pathViejo = `./uploads/hospitales/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            usuario.save();
            return true;
    }

}

module.exports = { actualizarImagen }