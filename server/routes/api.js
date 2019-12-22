const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const db = new Sequelize('mysql://root:@localhost/weddingPlanner')

router.get('/attractions/', async function (req, res) {
	try {
		let attractions = await db.query(
			`SELECT * FROM attractions`
		)
		res.send(attractions[0])
	} catch (err) {
		console.log(err)
		res.send(err)
	}
})

router.get('/wedding-details/:userId', async (req, res) => {
	try {
		let userId = req.params.userId
		let weddingDetails = await db.query(
			`SELECT wd.* FROM user as u, weddingDetails AS wd WHERE u.id = "${userId}" AND u.wedding_details = wd.id`
		)
		res.send(weddingDetails[0][0])
	} catch (err) {
		res.send(err)
	}
})

router.get('/favorites/:userId', async function (req, res) {
	try {
		let userId = req.params.userId
		let favorites = await db.query(`SELECT at.* FROM attractions as at, user as u, favorites as f WHERE u.id = "${userId}" AND f.user_id = "${userId}" AND f.attraction_id = at.id`)
		res.send(favorites[0])
	} catch (err) {
		console.log(err)
		res.send(err)
	}
})

router.get('/bookedAttractions/:userId', async function (req, res) {
	let userId = req.params.userId
	try {
		let bookedAttractions = await db.query(
			`SELECT at.*, ba.price
        FROM attractions as at,user as u,booked_attractions as ba 
        WHERE ba.user_id = "${userId}" AND ba.attraction_id=at.id AND u.id = "${userId}"`
		)
		res.send(bookedAttractions[0])
	} catch (err) {
		console.log(err)
		res.send(err)
	}
})

router.post('/attractions/favorite', async function (req, res) {
	try {
		let favorite = req.body
		let result = await db.query(
			`SELECT f.* FROM  favorites as f 
             WHERE f.user_id = "${favorite.userId}"
             AND f.attraction_id = "${favorite.attractionId}"`
        )
        if(result[0].length === 0)
		await db.query(
			`INSERT INTO favorites VALUES("${favorite.userId}", "${favorite.attractionId}")`
			)
			res.end()
	} catch (err) {
		console.log(err)
		res.send(err)
	}
})

router.post('/attractions/book', async function (req, res) {
	let action = req.body
	try {
        let result = await db.query(
            `SELECT ba.* FROM  booked_attractions as ba 
             WHERE ba.user_id = "${action.userId}"
             AND ba.attraction_id = "${action.attractionId}"`
        )
        if(result[0].length === 0)
		await db.query(
			`INSERT INTO booked_attractions VALUES("${action.userId}", "${action.attractionId}", "${action.price}")`
		)
		res.end()
	} catch (err) {
		console.log(err)
		res.send(err)
	}
})
router.put('/update/UserInfo', async function (req, res) {
	let userInfo = req.body
	try {
		await db.query(
			`UPDATE weddingdetails
SET  groom_name = "${userInfo.groomName}",
 groom_name = "${userInfo.groomName}", 
 bride_name = "${userInfo.brideName}", 
 wedding_date = "${userInfo.weddingDate}", 
 est_invitees = "${userInfo.estInvitees}",
 est_budget = "${userInfo.estBudget}", 
 est_cash_gifts = "${userInfo.estGifts}", 
 wedding_area = "${userInfo.weddingArea}", 
 music_style = "${userInfo.venueRadius}"
WHERE id="${userInfo.id}"`
		)
	} catch (err) {
		console.log(err)
		res.send(err)
	}
	res.send(userInfo)
})

router.post('/register', async function (req, res) {
	try {
		let user = req.body
		await db.query(
			`INSERT INTO user VALUES(null, "${user.email}", "${user.password})`
		)
	} catch (err) {
		console.log(err)
		res.send(err)
	}
})

router.post('/login', async function (req, res) {
	try {
		let user = req.body
		let result = await db.query(
			`SELECT * FROM user WHERE email = "${user.email}" AND password = "${user.password}"`
		)
		let userId = result[0][0].id
		res.send({ id: userId })
	} catch (err) {
		res.send(err)
	}
})

router.delete('/favorite', async function (req, res) {
	try {
		let favorite = req.body
		await db.query(
			`DELETE FROM favorites WHERE user_id = "${favorite.userId}" AND attraction_id = "${favorite.attractionId}"`
		)
		res.send(`user ${favorite.userId} attraction ${favorite.attractionId} succesfully removed`)
	} catch (err) {
		res.send(err)
	}
})

module.exports = router
