   //CONFIGURACION
//EXPRESS
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000


// Para que la constante secreta usada en el controlador surja efecto
require('dotenv').config()
const cookieParser = require('cookie-parser')

// // SOCKET (interacion con el modelo generico/idea)
// const socket = require('socket.io')  
// const generico = require('./models/generico.model')

//Llamar conexión a Base de Datos
//Requerir archivos de configuracion (para cookies también)
require('./config/mongoose.config')

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Middleware que agrega cookies a la solicitud
app.use(cookieParser()) 

//CORS
app.use(cors({
    origin:'http://localhost:3000', credentials:true

}))

//Apuntar Enrutamiento
//Importar las rutas de nuestro servidor Back-End
const RutasGenerico = require('./routes/generico.route')
RutasGenerico(app)

const RutasUser = require('./routes/user.route')
RutasUser(app)

// Esto debe estar debajo de los otros bloques de código
const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

// configuracion cabecera socket
// const io = socket(server, {
//     cors:{
//         origin:'*',
//         methods:['GET', 'POST']
//     }
// })

// io.on('connection', (socket)=>{
//     console.log(" usuario conectado",socket.id)
//     socket.on("borrarGenerico", (payload)=>{
//         console.log("payload", payload)
//         serie.deleteOne({_id:payload})
//         .then((res)=>{
//             io.emit('genericoBorrado', payload)
//         }).catch((err)=>{
//             console.log(err, "error al borrar generico")
//         })
//     })

//     socket.on('desconectar', (socket)=>{
//         console.log(`el usuario con id ${socket.id} acaba de desconectarse`)
//     })
 

// })