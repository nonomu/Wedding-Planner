const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const db = new Sequelize('mysql://root:@localhost/weddingPlanner')
const requestPromise = require('request-promise')
const apiKey ="AIzaSyAtbzpk-aq32pC5OBoeCmftPWhTNMthKOM"


router.get('/', function (req, res) {
    requestPromise(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=dj+Tel%25Aviv+Israel&fields=name,rating,formatted_phone_number,photos&key=${apiKey}`, function (err, response) {
        let data = JSON.parse(response.body).results
        // res.send(data.results[0].photos[0].photo_reference)
        // res.send(data)
        const relevantData = []
        data.map(a => { 
            if(typeof(a.photos) == 'undefined') return
                relevantData.push(a.photos[0].photo_reference)
                // name:a.name,
                // rating:a.rating
        })
     
        res.send(relevantData)
    })
})
module.exports = router