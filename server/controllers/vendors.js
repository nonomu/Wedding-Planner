const Vendor = require('../models/vendor')
const Favorite = require('../models/favorite')
const BookedVendor = require('../models/bookedVendor')
const Wedding = require('../models/wedding')
const User = require('../models/user')

exports.getVendors = (req, res) => {
	Vendor.findAll()
		.then(Vendors => res.send(Vendors))
		.catch(err => res.status(422).json({ message: err.message }))
}

exports.getFavoritesById = async (req, res) => {
	try {
		const userId = req.params.userId
		const user = await User.findByPk(userId)
		const favorites = await user.getVendors()
		res.send(favorites)
	} catch (err) {
		console.log(err)
		res.status(400).json({ message: err.message })
	}
}

exports.postFavorite = async (req, res) => {
	try {
		const userId = req.body.userId
		const vendorId = req.body.vendorId
		await Favorite.create({vendorId, userId})
		res.send('Successfully added to favorites')
	} catch (err) {
		console.log(err)
		res.send(err)
	}
}

exports.getBookedVendors = async (req, res) => {
	try {
		const weddingId = req.params.weddingId
		const wedding = await Wedding.findByPk(weddingId)
		const bookedVendors = await wedding.getVendors()
		res.send(bookedVendors)
	} catch (err) {
		console.log(err)
		res.send(err)
	}
}

exports.postBookVendor = async (req, res) => {
	try {
		const weddingId = req.body.weddingId
		const vendorId = req.body.vendorId
		const price = req.body.price
		const values = {weddingId, price, vendorId}
		await BookedVendor.create(values)
		res.send('Vendor successfully booked')
	} catch (err) {
		console.log(err)
		res.send(err)
	}
}

exports.deleteFavorite = async (req, res) => {
	try {
		const userId = req.body.userId
		const vendorId = req.body.vendorId
		await Favorite.destroy({where: {userId, vendorId}})
		res.send(`Vendor removed from favorites`)
	} catch (err) {
		res.send(err)
	}
}
