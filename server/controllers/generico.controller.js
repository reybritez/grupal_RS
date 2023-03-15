const Generico = require('../models/generico.model');

module.exports.obtenerGenericos = (req, res) => {
	Generico.find()
		.collation({ locale: 'en' })
		.sort({ createdAt: -1 })
		.populate('creador', '-password')
		.then((allDaIdeas) => {
			res.json({
				ideas: allDaIdeas,
				username: req.username,
				user: req.user,
			});
		})
		.catch((err) =>
			res.json({ message: 'Something went wrong', error: err })
		);
};

module.exports.crearGenerico = (req, res) => {
	Generico.create({ ...req.body, creador: req.user })
		.then((newlyCreatedIdea) => res.json({ idea: newlyCreatedIdea }))
		.catch((err) => res.status(400).json(err));
};

module.exports.obtenerUnGenerico = (req, res) => {
	Generico.findOne({ _id: req.params.id })
		.populate('creador', '-password')
		.populate('likes', '-password')
		.then((oneSingleIdea) =>
			res.json({
				idea: oneSingleIdea,
				username: req.username,
				user: req.user,
			})
		)
		.catch((err) => res.status(404).json(err));
};

module.exports.editarGenerico = (req, res) => {
	Generico.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
		// Generico.updateOne({_id:req.params.id}, req.body, {runValidators:true})
		.then((updatedIdea) => res.json({ idea: updatedIdea }))
		.catch((err) => res.status(400).json(err));
};

module.exports.borrarGenerico = (req, res) => {
	Generico.deleteOne({ _id: req.params.id })
		.then((result) => res.json({ result: result }))
		.catch((err) =>
			res.json({ message: 'Something went wrong', error: err })
		);
};

module.exports.likeGenerico = (req, res) => {
	if (req.body.liked) {
		Generico.findByIdAndUpdate(
			req.params.id,
			{ $pull: { likes: req.user } },
			{ new: true, useFindAndModify: false }
		)
			.then((resultado) => res.json(resultado))
			.catch((err) => res.status(400).json(err));
	} else {
		Generico.findByIdAndUpdate(
			req.params.id,
			{ $addToSet: { likes: req.user } },
			{ new: true, useFindAndModify: false }
		)
			.then((resultado) => res.json(resultado))
			.catch((err) => res.status(400).json(err));
	}
};
