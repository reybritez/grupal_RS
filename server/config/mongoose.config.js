const mongoose =require('mongoose')

mongoose.set('strictQuery',true)

mongoose
	.connect(
		'mongodb://127.0.0.1:27017/eschema_generico',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log('Estableció una conexión a la base de datos.'))
	.catch((err) =>
		console.log('Error al intentar conectarse a la base de datos.', err)
	);