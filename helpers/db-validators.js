const Role = require('../models/role');
const {Usuario, Categoria, Producto} = require('../models');


const esRolValido = async (rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
       throw new Error(`El rol ${ rol } no está registrado en la base de datos`);
    }
}

//Verificar si el correo existente
const emailExiste = async ( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
       throw new Error(`El correo: ${ correo } ya está registrado`);
    }
}

const existeUsuarioPorid = async ( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if (!existeUsuario) {
       throw new Error(`El id: ${ id } no existe`);
    }
}

/**
 * Categorias
 */

const existeCategoriaId = async ( id ) => {
    const existeCategoria =  await Categoria.findById( id );
    if (!existeCategoria) {
        throw new Error(`El id: ${ id } no existe`);
     }
}

/**
 * Categorias
 */

 const existeProdutctoId = async ( id ) => {
    const existeProducto =  await Producto.findById( id );
    if (!existeProducto) {
        throw new Error(`El id: ${ id } no existe`);
     }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorid,
    existeCategoriaId,
    existeProdutctoId
}