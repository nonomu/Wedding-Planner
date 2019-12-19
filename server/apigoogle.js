const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const db = new Sequelize('mysql://root:@localhost/weddingPlanner')
const requestPromise = require('request-promise')
const apiKey ="AIzaSyAtbzpk-aq32pC5OBoeCmftPWhTNMthKOM"


router.get('/', function (req, res) {
    requestPromise(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=dj+Tel%25Aviv+Israel&fields=name,rating,formatted_phone_number,photos&key=${apiKey}`, function (err, response) {

        let data = JSON.parse(response.body)
        const relevantData = 
        data.results.map(a => { 
            return (
                {// photo: (a.photos[0].photo_reference) ? (relevantData.push(a.photos[0].photo_reference)):"",
                name:a.name,
                rating:a.rating}
            )
        })
       console.log(relevantData)
        res.send(relevantData)
    })
})



module.exports = router