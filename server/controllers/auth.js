const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DB)
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('../verifyToken')
const User = require('../models/user')
const Wedding = require('../models/wedding')

exports.postRegister = async (req, res, next) => {
  try {
		const user = req.body.user
		const wedding = req.body.wedding
		const exists = await User.findOne({where: {email: user.email}})
		if (exists) {
			throw new Error('Oops, This email belongs to another user')
		}
		const newWedding = await Wedding.create(wedding)
		const password = await bcrypt.hash(user.password, 10)	
		const newUser = await newWedding.createUser({email: user.email, password })

		jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, (err, token) => {
			if (err) {
				throw new Error(err)
			}
			const message = 'Congrats! you have successfully registered.'
			res.json({id: newUser.id, token, message})
		})
	} catch (err) {
		res.status(422).json({ message: err.message })
	}
}

exports.postLogin = async (req, res) => {
	try {
		const email = req.body.email
		const password = req.body.password
		const user = await User.findOne({where: {email}})
		if (!user) throw new Error("We can't find that email, please try again")
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) {
			throw new Error('Incorrect password')
		}
		const id = user.id
		jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
			if (err) {
				throw new Error(err)
			}
			res.json({id, token, message: 'Welcome Back!'})
		})
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}