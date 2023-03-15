const ControladorGenerico = require('../controllers/generico.controller')
const { authenticate } = require('../config/jwt.config')

module.exports = (app) =>{
    app.get('/api/obtenerGenericos'     , authenticate, ControladorGenerico.obtenerGenericos)
    app.post('/api/crearGenerico'       , authenticate, ControladorGenerico.crearGenerico)
    app.get('/api/obtenerUnGenerico/:id', authenticate, ControladorGenerico.obtenerUnGenerico)
    app.put('/api/editarGenerico/:id'   , authenticate, ControladorGenerico.editarGenerico)
    app.delete('/api/borrarGenerico/:id', authenticate, ControladorGenerico.borrarGenerico)
    app.put('/api/genericoLike/:id'     , authenticate, ControladorGenerico.likeGenerico)

}