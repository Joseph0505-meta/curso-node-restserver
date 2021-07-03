const { Router, response, request } = require('express');
const { check } = require('express-validator');
const { 
        crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria,
        borrarCategoria} = require('../controllers/categorias');

const { existeCategoriaId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/categorias
*/
//obtener todas las categorias
router.get('/',  obtenerCategorias );

//obtener obtener una categoria por id
router.get('/:id',[
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], obtenerCategoria);

//Crear categoria privado - cualquier persona con un token valido
router.post('/',[ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar -privado- cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], actualizarCategoria);

//Borrar una categoria- administrador
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo válido').isMongoId(),
    validarCampos,
    check('id').custom( existeCategoriaId ),
    validarCampos
], borrarCategoria);


module.exports = router;
