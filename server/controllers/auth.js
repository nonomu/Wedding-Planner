const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Wedding = require('../models/wedding')

exports.postRegister = async (req, res, next) => {
	try {
		const user = req.body.user
		const weddingData = req.body.wedding
		const exists = await User.findOne({ where: { email: user.email } })
		if (exists) {
			throw new Error('Oops, This email belongs to another user')
		}
		const wedding = await Wedding.create(weddingData)
		const password = await bcrypt.hash(user.password, 10)
		const newUser = await wedding.createUser({ email: user.email, password })

		jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, (err, token) => {
			if (err) {
				throw new Error(err)
			}
			const message = 'Congrats! you have successfully registered.'
			const id = newUser.id
			res.json({ id, token, message })
		})
	} catch (err) {
		res.status(422).json({ message: err.message })
	}
}

exports.postLogin = async (req, res) => {
	try {
		const email = req.body.email
		const password = req.body.password
		const user = await User.findOne({ where: { email } })
		if (!user) throw new Error("We can't find that email, please try again")
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) {
			throw new Error('Incorrect password')
		}
		const id = user.id
		jwt.sign({ id }, process.env.SECRET_KEY, (err, token) => {
			if (err) {
				throw new Error(err)
			}
			const message = 'Welcome Back!'
			res.json({ id, token, message })
		})
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

exports.postAuthenticate = (req, res) => {
	try {
		const authenticated = jwt.verify(req.body.token, process.env.SECRET_KEY)
		if (!authenticated) {
			throw new Error('User not authenticated')
		}
		res.send(authenticated)
	} catch(err) {
		res.sendStatus(401)
	}
}