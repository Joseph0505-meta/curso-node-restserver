

const dbValidators  = require('./db-validators');
const genJWT        = require('./generarJWT');
const googleVerify  = require('./google-verify');
const subirArchivo  = require('./subir-archivo');


module.exports = {
    ...dbValidators,
    ...genJWT,
    ...googleVerify,
    ...subirArchivo,
}