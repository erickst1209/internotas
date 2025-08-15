//base de datos con mongo db
const mongoose = require('mongoose');
const {mongodb} = require('../keys');


const conexion = mongoose.connect
const baseDatos = 'articulos'
conexion(mongodb.URI,{
    
    
})
.then(db => console.log(`mongoose esta conectado a la base de datos ${baseDatos} `))
.catch((err)=>console.error(`Error al conectar a la base de datos ${err}`));



  








