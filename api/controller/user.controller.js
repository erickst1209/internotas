const validator = require('express-validator')
const Users = require('../model/Users');

const User = {
    get:async (req,res) => {
        const {id} = req.params
        const user = await Users.findOne({_id:id})
        res.status(200).send(user)
        console.log('usuario encontrado',user)
    },

    list:async (req,res) => {
        const users = await Users.find()
        res.status(200).send(users)
        console.log('usuarios encontrados',users)
    },

    create:async (req,res) => {
        const user = new Users(req.body)       
        savedUser = await user.save()
        res.status(201).send(savedUser._id)
        console.log('usuario creado',user)
    },
    
    update:async (req,res) => {
        const {name} = req.params
        const user = await Users.findOne({_name: name})
        Object.assign(user,req.body)
        await user.save()
        res.status(200).send(user)
        console.log('usuario actualizado',user)
    },

    delete:async (req,res) => {
        const {name} = req.params
        const user = await Users.findOne({_name: name})
        if(user){
            user.deleteOne()
            console.log('usuario borrado')
        }
        res.sendStatus(204)
    }
}

module.exports = User;