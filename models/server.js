
const express = require('express');
const cors = require('cors');

const fileUpload = require('express-fileupload');

const { dbConection } = require('../database/config');
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:    '/api/uploads',

        }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de la aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){

        //cors
        this.app.use( cors() );

        //Parseo y lectura del body
        this.app.use( express.json() );

        //directorio publico
        this.app.use( express.static('public') );

        //Manejar la carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){

        this.app.use( this.path.auth , require('../routes/auth'));
        this.app.use( this.path.buscar , require('../routes/buscar'));
        this.app.use( this.path.categorias , require('../routes/categorias'));
        this.app.use( this.path.productos , require('../routes/productos'));
        this.app.use( this.path.usuarios , require('../routes/usuarios'));
        this.app.use( this.path.uploads , require('../routes/uploads'));

    }

    listen(){

        this.app.listen( this.port,  () =>{
            console.log('Servidor corriendo en puerto ', this.port );
        });
    }


}


module.exports = Server;