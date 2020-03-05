const Wedding = require('../models/wedding')
const User = require('../models/user')

exports.getWeddingDetails = async (req, res) => {
	try {
		const userId = req.params.userId
		const user = await User.findByPk(userId)
		if (!user) {
			throw new Error('User not found')
		}
		const wedding = await Wedding.findByPk(user.weddingId)
		if (!wedding) {
			throw new Error("Couldn't find wedding details")
		}
		res.send(wedding)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

exports.putProfile = async (req, res) => {
	try {
		const wedding = req.body.wedding
		await Wedding.update(
			{
				partner1: wedding.partner1,
				partner2: wedding.partner2,
				date: wedding.date,
				num_of_guests: wedding.num_of_guests,
				budget: wedding.budget,
				preferred_location: wedding.preferred_location
			},
			{ where: { id: wedding.id } }
		)

		res.send('Your info has been successfully updated!')
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}
