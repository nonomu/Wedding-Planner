const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const db = new Sequelize('mysql://root:@localhost/weddingPlanner')
const requestPromise = require('request-promise')
const apiKey = "AIzaSyAtbzpk-aq32pC5OBoeCmftPWhTNMthKOM"


router.get('/', async function (req, res) {
    const relevantData = []
  let requestedData = await requestPromise(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=dj+Tel%25Aviv+Israel&fields=name,rating,formatted_phone_number,photos&key=${apiKey}`)
        let results = JSON.parse(requestedData).results
        for (result of results) {
            if (typeof (result.photos || result.geometry.location) == 'undefined') return
            let coordinates = `http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&minx=${result.geometry.location.lat}&miny${result.geometry.location.lng}&maxx=${result.geometry.location.lat}&maxy=${result.geometry.location.lng}&size=medium&mapfilter=true`
            relevantData.push({
                // lat: result.geometry.location.lat,
                // lng: result.geometry.location.lng,
                //  photo: photo,
                coordinates:coordinates,
                 name: result.name,
                 rating: result.rating
                })
            }

        res.send(relevantData)
        
        
    })
    module.exports = router
    //let photo = await requestPromise(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${apiKey}`)