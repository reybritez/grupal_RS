const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;

module.exports = {
	obtenerUnUsuario: (req, res) => {
		User.findOne({ _id: req.params.id })
			.select('-password')
			.then((oneSingleUser) =>
				res.json({ user: oneSingleUser, username: req.username })
			)
			.catch((err) => res.status(404).json(err));
	},
	registrarUser: async (req, res) => {
		try {
			const nuevoUser = await User.create(req.body);
			const userToken = jwt.sign(
				{ _id: nuevoUser._id, usernombre: nuevoUser.nombre },
				SECRET
			);
			// res.status(201).cookie('userToken', userToken, { httpOnly: true, expires: new Date(Date.now() + EXPIRATION_TIME) })
			res.status(201)
				.cookie('userToken', userToken, { httpOnly: true })
				.json({
					successMessage: 'Usuario registrado',
					user: nuevoUser,
				});
		} catch (error) {
			res.status(400).json(error);
		}
	},

	loginUser: async (req, res) => {
		const userlogin = await User.findOne({ email: req.body.email });
		//console.log('El usuario que intenta ingresar es', userlogin);
		if (!userlogin) {
			res.status(400).json({ error: 'Email/Password incorrecto' });
		}
		try {
			const passwordValida = await bcrypt.compare(
				req.body.password,
				userlogin.password
			);
			if (!passwordValida) {
				res.status(400).json({ error: 'Email/Password incorrecto' });
			} else {
				const userToken = await jwt.sign(
					{ _id: userlogin._id, usernombre: userlogin.nombre },
					SECRET
				);
				// .cookie('userToken', userToken, {httpOnly:true, expires:new Date(Date.now() + EXPIRATION_TIME)})
				res.status(201)
					.cookie('userToken', userToken, { httpOnly: true })
					.json({ mensaje: 'Usuario Logueado', _id: userlogin._id });
			}
		} catch (error) {
			res.status(400).json({ error: 'Email/Password incorrecto' });
		}
	},

	logOutUser: (req, res) => {
		res.clearCookie('userToken');
		res.json({ success: 'Usuario salio' });
	},
};
