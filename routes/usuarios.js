
const { Router } = require('express');
const { check } = require('express-validator');


const {
        validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole
} = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioPorid } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete 
} = require('../controllers/usuarios');





const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorid ),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPut);

router.post('/', [
        check('nombre', 'El nombre es obligatrio').not().isEmpty(),
        check('password', 'El password es obligatorio y mas de 6 letras').isLength({min: 6}),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( emailExiste ),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        //Validar un campo contra la base de datos
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPost);

router.delete('/:id',  [
        validarJWT,
        // esAdminRole,
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id','No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorid ),
        validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );




module.exports = router;