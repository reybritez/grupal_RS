const ControladorUser = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
	app.post('/api/registro', ControladorUser.registrarUser);
	app.post('/api/login', ControladorUser.loginUser);
	app.get('/api/logout', authenticate, ControladorUser.logOutUser);
	app.get('/api/users/:id', authenticate, ControladorUser.obtenerUnUsuario);
};
