const mongoose = require('mongoose');
//Encriptar
const bcrypt = require('bcrypt');

const schema_user = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: [true, 'Completar el campo Nombre'],
			minlength: [3, 'Nombre: 3 caracteres como mínimo'],
		},
		alias: {
			type: String,
			required: [true, 'Completar el campo Apellido'],
			minlength: [3, 'Alias: 3 caracteres como mínimo'],
		},
		email: {
			type: String,
			required: [true, 'Completar el campo Email'],
			unique: true,
			validate: {
				validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
				message: 'Ingrese un email valido',
			},
		},
		password: {
			type: String,
			required: [true, 'Completar el campo Password'],
			minlength: [4, 'Password: 5 caracteres como mínimo'],
		},
	},
	{ timestamps: true }
);

// add this after UserSchema is defined
schema_user
	.virtual('confirmPassword')
	.get(() => this._confirmPassword)
	.set((value) => (this._confirmPassword = value));

schema_user.pre('validate', function (next) {
	if (this.password !== this.confirmPassword) {
		this.invalidate(
			'confirmPassword',
			'La contraseña debe coincidir con confirmar contraseña'
		);
	}
	next();
});

// //Encriptar el valor de un atributo
schema_user.pre('save', async function (next) {
	try {
		const hashedPassword = await bcrypt.hash(this.password, 10);
		console.log('HASHED CONTRASENIA: ', hashedPassword);
		this.password = hashedPassword;
		next();
	} catch {
		console.log('Error en guardar usuario: ', error);
	}
});

//Modelo (Colección)
const User = mongoose.model('User', schema_user);
//Exportarlo para que pueda ser utilizado por otro archivo o módulo
module.exports = User;
