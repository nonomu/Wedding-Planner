const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const db = new Sequelize('mysql://root:@localhost/weddingPlanner')
const requestPromise = require('request-promise')
const apiKey = "AIzaSyAtbzpk-aq32pC5OBoeCmftPWhTNMthKOM"
const axios =require('axios')
//const Places= new GooglePlaces("../node_modules/google-places-web").default; 


router.get('/', async function (req, res) {
    const relevantData = []
    let requestedData = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=dj+Tel%25Aviv+Israel&fields=name,rating,formatted_phone_number,photos&key=${apiKey}`)
    let results = requestedData.data.results
    await results.forEach(async (r) => {
        if (typeof (r.photos) == 'undefined') return
        let photo = await requestPromise(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${r.photos[0].photo_reference}&key=${apiKey}`,
        function (error,response) {
           console.log(response.request.uri.href)
           // res.send(response)
        })

    })
           
 })
 module.exports = router