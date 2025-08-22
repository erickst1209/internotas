/* Este código exporta una función que configura las rutas para una aplicación Node.js Express. */
const Articulo = require('../controller/articulo.controller')
const Users = require('../controller/user.controller')
const {Auth,isAuthenticated} = require('../controller/auth.controller')
const express = require('express')
const path = require('path')


module.exports = (app,upload) => {
    //rutas para articulos
    app.get('/list_articulos',Articulo.list)
    app.get('/get_one',Articulo.get)
    app.put(
            "/update_articulo/:id",
            upload.array("imagenes"), // 👈 acepta múltiples archivos bajo el campo "imagenes"
            Articulo.update
    );
    app.post(
        '/create_articulo',
        upload.array('imagenes'), // <-- nombre debe coincidir con frontend
        Articulo.create
    );
    app.delete('/delete_articulo/:id',Articulo.delete)

        //rutas para usuarios
    app.get('/list_usuarios',isAuthenticated,Users.list)
    app.get('/get_one',isAuthenticated,Users.get)
    app.put('/update_user',isAuthenticated,Users.update)
    app.post('/create_user',isAuthenticated,Users.create)
    app.delete('/delete_user',isAuthenticated,Users.delete)

     //rutas para auth
    app.post('/login',upload.none(),Auth.login)
    app.post('/register',upload.none(),Auth.register)
    app.use(express.static(path.join(__dirname,'../assets')))
    app.get('/',(req,res) => {
        res.sendFile(path.join(__dirname,'../index.html'))
    })

    app.get('*',(req,res) => {
        res.status(404).send('Esta pagina no existe')
    })
    return app
}