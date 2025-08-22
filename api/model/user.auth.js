const mongoose = require('mongoose')

const User = mongoose.model('User_auth',{
    username:{type: String,require:true},
    name:{type: String,require:true},
    lastname:{type:String,require:true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    phone:{type: String,require:true},
    salt: {type: String, require: true}
})

//endpoints


module.exports = User;
