const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const db = new Sequelize('mysql://root:@localhost/wedding-planner')

router.get('/attractions/:category', async function (req, res) {
    try {
        let attractions = await db.query(`SELECT`)
        res.send(attractions[0])
    } catch(err) {
        console.log(err)
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

router.post('/attractions/book',async function (req, res) {
    let attraction = req.body

    try {
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})

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
        await db.query(`INSERT INTO user`)
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})

router.post('/login',async function (req, res) {
    try {
        await db.query(`INSERT INTO user`)
    } catch(err) {
        console.log(err)
        res.send(err)
    }
})


module.exports = router
