/* Este código exporta una función que configura las rutas para una aplicación Node.js Express. */
const Articulo = require('../controller/articulo.controller')
const express = require('express')
const path = require('path')


module.exports = (app,upload) => {
    //rutas para usuarios
    app.get('/list',Articulo.list)
    app.get('/get_one',Articulo.get)
    app.put('/update_articulo',Articulo.update)
    app.post(
        '/create_articulo',
        upload.array('imagenes'), // <-- nombre debe coincidir con frontend
        Articulo.create
    );
    app.delete('/delete_articulo',Articulo.delete)

    app.get('*',(req,res) => {
        res.status(404).send('Esta pagina no existe')
    })
    return app
}