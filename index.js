'use strict'

const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

//Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/favorites', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true }, (err, res) => {
    
    if(err){
        throw err;
    }else{
        console.log('Base de datos conectado');
        app.listen(port, () => {
            console.log('Escuchando en el puerto http://localhost:'+port);
        });

    }

});

