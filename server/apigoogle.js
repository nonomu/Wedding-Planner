const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const db = new Sequelize('mysql://root:@localhost/weddingPlanner')
const requestPromise = require('request-promise')
const apiKey = "AIzaSyAtbzpk-aq32pC5OBoeCmftPWhTNMthKOM"
const axios = require('axios')
//const Places= new GooglePlaces("../node_modules/google-places-web").default; 
let photosList=[]
const callback = result => {
    photosList.push(result)
    console.log(result)
//    photosList.push(result)
  }

const getUri = (photo_reference) => {
    if(photo_reference=="lala")return
    let photo
     axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=${apiKey}`)
     .then(function(response,err) {
         let photoUrl= response.request.socket._httpMessage._redirectable._options.href
         photosList.push(photoUrl)
        // console.log('response::', response.request.socket._httpMessage._redirectable._options.href);
      }).catch(function (err) {
        // console.log(err)
      })
}

// getUri(1)
router.get('/', async function (req, res) {
    const relevantData = []
    let requestedData = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=venue+Jerusalem+Israel&fields=name,rating,formatted_phone_number,photos&key=${apiKey}`)
    let results = requestedData.data.results
    // console.log(results[0].photos)
    for (r of results) {
        if (typeof (r.photos) == 'undefined') {
            // console.log("lala")
        }
        else {
            getUri(r.photos[0].photo_reference)
            
        }
    }
    // console.log(photosList)
   await setTimeout(function(){console.log(photosList) }, 2000);
    res.end()
})
module.exports = router
