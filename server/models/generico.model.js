const mongoose = require('mongoose')

//Schema (Base de Datos)
const schema_generico = mongoose.Schema({
    idea:{
        type:String,
        required:[true, "Complete el campo idea"],
        minLength:[3,"Idea: 3 characters minimum"]
    },
    creador:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

},{timestamps:true})

//Modelo (Colección)
const Generico = mongoose.model('Generico', schema_generico)
//Exportarlo para que pueda ser utilizado por otro archivo o módulo
module.exports = Generico