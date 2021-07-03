const { Router, response, request } = require('express');
const { check } = require('express-validator');

const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto,
        borrarProducto
} = require('../controllers/productos');
const { existeProdutctoId, existeCategoriaId } = require('../helpers/db-validators');


const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener Productos
router.get('/',  obtenerProductos );

//Obtener producto por id
router.get('/:id',[
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existeProdutctoId ),
    validarCampos
], obtenerProducto);


//Crear producto
router.post('/',[ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaId ),
    validarCampos
], crearProducto);

//Actualizar -privado- cualquiera con token valido
router.put('/:id',[
    validarJWT,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom( existeProdutctoId ),
    validarCampos
], actualizarProducto);

//Borrar una categoria- administrador
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo válido').isMongoId(),
    validarCampos,
    check('id').custom( existeProdutctoId ),
    validarCampos
], borrarProducto);

module.exports = router;