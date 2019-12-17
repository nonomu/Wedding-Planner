const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const db = new Sequelize('mysql://root:@localhost/weddingPlanner')

router.get('/attractions/:category', async function (req, res) {
    try {
        let category = req.params.category
        let attractions = await db.query(`SELECT * FROM attractions WHERE category = "${category}"`)
        res.send(attractions[0])
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})

router.get('/wedding-details/:userId', async (req, res) => {
    try {
        let userId = req.params.userId
        let weddingDetails = await db.query(`SELECT wd.* FROM user as u, weddingDetails AS wd WHERE u.id = "${userId}" AND u.wedding_details = wd.id`)
        res.send(weddingDetails[0][0])
    } catch(err) {
        res.send(err)
    }
})

router.get('/favorites/:userId', async function (req, res) {
    try {
        let favorites = await db.query(`SELECT`)
        res.send(favorites[0])
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})

router.get('/attractions/:userId', async function (req, res) {
    try {
        let bookedAttractions = db.query(`SELECT`)
        res.send(bookedAttractions[0])
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})

router.get('/bookedAtractions/:userId',async function (req, res) {
    let userId = req.params.userId
    try {
        let bookedAttractions = await db.query(
        `SELECT at.* 
        FROM attractions as at,user as u,booked_attractions as ba 
        WHERE ba.user_id = "${userId}" AND ba.attraction_id=at.id AND u.id = "${userId}"`)
        res.send(bookedAttractions[0])
    } catch(err) {
        console.log(err)
        res.send(err)
    }
}
)

router.post('/attractions/favorite',async function (req, res) {
    let newFavorite = req.body
    
    try {
        await db.query(`INSERT INTO `)    
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})

router.post('/register',async function (req, res) {
    try {
        let user = req.body
        await db.query(`INSERT INTO user VALUES(null, "${user.email}", "${user.password})`)
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})

router.post('/login',async function (req, res) {
    try {
        let user = req.body
        let result = await db.query(`SELECT * FROM user WHERE email = "${user.email}" AND password = "${user.password}"`)
        let userId = result[0][0].id
        res.send({id: userId})
    } catch(err) {
        res.send(err)
    }
}
)


module.exports = router
