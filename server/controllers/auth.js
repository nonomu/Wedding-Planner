const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DB)
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('../verifyToken')

exports.postRegister = async (req, res, next) => {
  try {
		const user = req.body.userData
		const encryptedPassword = await bcrypt.hash(user.fPassword, 10)

		let query = `
		SELECT * 
		FROM user 
		WHERE email = "${user.email}"`
		const userCheck = await db.query(query)

		if (userCheck[0].length)
			throw new Error('Oops, This email belongs to another user')

		query = `
		INSERT INTO user 
		VALUES(
			null,
			'${user.email}',
			'${encryptedPassword}')`
		const newUser = await db.query(query)

		query = `
		INSERT INTO weddingdetails 
		VALUES(
			null, 
			'${user.gName}',
			'${user.bName}',
			'${user.weddingDate}',
			'${user.estInvitees}',
			'${user.weddingBudget}',
			null,
			'${user.weddingArea}',
			null,
			'${newUser[0]}')`
		await db.query(query)
		jwt.sign({ id: newUser }, process.env.SECRET_KEY, (err, token) => {
			const message = 'Congrats! you have successfully registered.'
			res.json({id: newUser[0], token, message})
		})
	} catch (err) {
		res.status(422).json({ message: err.message })
	}
}

exports.postLogin = async (req, res) => {
	try {
		const user = req.body
		const query = `
		SELECT * 
		FROM user 
		WHERE email = "${user.email}"`
		const result = await db.query(query)
		if (!result[0].length) throw new Error('User details are incorrect')
		const samePass = await bcrypt.compare(user.password, result[0][0].password)
		if (!samePass) {
			throw new Error('Incorrect password')
		}
		const id = result[0][0].id
		jwt.sign({ user: result[0][0] }, process.env.SECRET_KEY, (err, token) => {
			res.json({id, token})
		})
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}