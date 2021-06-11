
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generarJWT');


const login = async (req, res = response) => {
    
    const { correo, password } = req.body;

    try {
        
        //Verificar si el correo exited
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({ 
                msg: 'Usuario / passwor incorrectos'
            });
        }

        //Verificar si el usuario esta activo
        if ( !usuario.estado ) {
            return res.status(400).json({ 
                msg: 'Usuario / passwor incorrectos estado: false'
            });
        }

        // Verificar la contraseña
        const validaPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validaPassword) {
            return res.status(400).json({ 
                msg: 'Usuario / passwor incorrectos '
            });
        }

        //Generamos el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({ 
            msg: 'Hbale con el administrador'
        });
    }
}


module.exports = {
    login
}
