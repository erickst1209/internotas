const mongoose = require('mongoose');
const Articulo = mongoose.model('Articulo',{
    titulo:{type:String},
    contenido:{type:String},
    fecha:{type:String},
    imagenes: [{ type: String }] 
})

    const crear = async () => {
        const articulo = new articulos()
        const savedarticulo = await articulo.save()
        console.log(savedarticulo)
    }
   
    const buscarTodo = async () => {
        const articulos = await articulos.find()
        console.log(articulos);
    }
    
    const buscar = async () => {
        const articulo = await articulos.find({titulo:'erick'})
        console.log(articulo);
    }
    
    const buscarUno = async () => {
        const articulo = await articulos.findOne({titulo:'erick'})
        console.log(articulo)
    }
    
    const actualizar = async () => {
        const articulo = await articulos.findOne({titulo:'erick'})
        console.log(articulo)
        articulo.edad = 30
        await articulo.save()
    }
    
    const eliminar = async () => {
        const articulo = await articulos.findOne({titulo:'erick'})
        console.log(articulo)
        if(articulo){
            await articulo.deleteOne()
        }
    }
    
    module.exports = Articulo
