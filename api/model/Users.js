const mongoose = require('mongoose');
const Users = mongoose.model('User',{
    name:{type:String,require:true,minLength:3},
    lastname:{type:String,require:true,minLength:3}
})

    const crear = async () => {
        const user = new Users({name:'erickdd',lastname:'sillas'})
        const savedUser = await user.save()
        console.log(savedUser)
    }
   
    const buscarTodo = async () => {
        const users = await Users.find()
        console.log(users);
    }
    
    const buscar = async () => {
        const user = await Users.find({name:'erick'})
        console.log(user);
    }
    
    const buscarUno = async () => {
        const user = await Users.findOne({name:'erick'})
        console.log(user)
    }
    
    const actualizar = async () => {
        const user = await Users.findOne({name:'erick'})
        console.log(user)
        user.edad = 30
        await user.save()
    }
    
    const eliminar = async () => {
        const user = await Users.findOne({name:'erick'})
        console.log(user)
        if(user){
            await user.deleteOne()
        }
    }
    
    module.exports = Users
