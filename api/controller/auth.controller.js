/* El código que proporcionó es un módulo que exporta un objeto que contiene dos propiedades: `Auth` y
`isAuthenticated`. */
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { expressjwt: expressJwt } = require('express-jwt')
const User = require('../model/Users')
const SECRET = 'secret' || process.env.SECRET

/* El código `const validarJwt = expressJwt({secret:SECRET,algorithms:['HS256']})` está creando una
función de middleware `validateJwt` usando el paquete `express-jwt`. Esta función de middleware
validará el token web JSON (JWT) enviado en el encabezado de la solicitud. Utiliza la clave secreta
`SECRET` y el algoritmo `HS256` para la verificación. */
const validateJwt = expressJwt({secret:SECRET,algorithms:['HS256']})

/**
 * La función `singToken` genera un token web JSON (JWT) utilizando el `_id` proporcionado y lo
 * registra en la consola.
 */
const singToken = _id => jwt.sign({_id}, SECRET)
    if(singToken){
        console.log(singToken)
    }

const findAndAssingUser = async (req,res,next) => {
    try{
        const user = await User.findById(req.auth._id)
        if(!user){
            return res.status(401).end()
        }
        req.user = user
        next()
    }catch(e){
        next(e)
    }
}

/* El código `const isAuthenticated = express.Router().use(validateJwt,findAndAssingUser)` crea un
objeto de enrutador usando el método `express.Router()` y luego aplica dos funciones de middleware
`validateJwt` y `findAndAssingUser` al enrutador usando el método `use()`. */
const isAuthenticated = express.Router().use(validateJwt,findAndAssingUser)

/* El objeto "Auth" es un objeto que contiene dos métodos: "iniciar sesión" y "registrarse". */
const Auth = {
   /* La función "iniciar sesión" es un método que maneja la lógica para el inicio de sesión del
   usuario. Toma los objetos `req` (solicitud) y `res` (respuesta) como parámetros. */
    login:async (req,res) => {
        const {body} = req
        try{
            const user = await User.findOne({email: body.email})
            if(!user){
                res.status(401).send('usuario no existe y/o contrasena invalida')
            }else{
                const isMatch = await bcrypt.compare(body.password,user.password)
                if(isMatch){
                    const singed = singToken(user._id)
                    res.status(200).send(singed)
                    console.log('usuario logeado')
                    alert('login exitoso')
                }else {
                    res.status(401).send('usuario y/o contrasena invalida')
                }
            }
        }catch(e){
            res.send(e.message)
        }
    },
    /* La función "registro" es un método que maneja la lógica para el registro del usuario. Toma como
    parámetros los objetos `req` (solicitud) y `res` (respuesta). */
    register:async (req,res) => {
        const {body} = req
        try{
            const isUser = await User.findOne({email:body.email})
            if(isUser) {
                res.status(401).send('El usuario ya existe')
            }else{
                console.log("Body recibido:", body);

                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(body.password,salt)
                const user = await User.create({
                    username:body.username,
                    name:body.name,
                    lastname:body.lastname,
                    email:body.email,
                    password:hashed,
                    salt,
                    phone:body.phone
                })
                const singed = singToken(user._id)
                res.send(singed)
                
            }
        }catch(e){
            res.status(500).send(e.message)
        }
    } 
}

module.exports = {Auth,isAuthenticated}