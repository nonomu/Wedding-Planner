const express = require('express')
const router = express.Router()
const apiKey = process.env.apiKey
const axios = require('axios')
let photoBasicUrl =
	'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='

let photosList = []
const callback = result => {
	photosList.push(result)
	console.log(result)
}

const getUri = photo_reference => {
	if (photo_reference == 'lala') return
	let photo
	axios
		.get(
			`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=${apiKey}`
		)
		.then(function(response, err) {
			let photoUrl =
				response.request.socket._httpMessage._redirectable._options.href
			photosList.push(photoUrl)
			// console.log('response::', response.request.socket._httpMessage._redirectable._options.href);
		})
		.catch(function(err) {
			// console.log(err)
		})
}

// getUri(1)
router.get('/', async function(req, res) {
	const relevantData = []
	let requestedData = await axios.get(
		`https://maps.googleapis.com/maps/api/place/textsearch/json?query=venue+Jerusalem+Israel&fields=name,rating,formatted_phone_number,photos&key=${apiKey}`
	)
	let results = requestedData.data.results
	for (r of results) {
		if (typeof r.photos == 'undefined') {
		} else {
			let photoReference = r.photos[0].photo_reference
			relevantData.push(photoBasicUrl + photoReference + '&key=' + apiKey)
			getUri(r.photos[0].photo_reference)
		}
	}
	// console.log(photosList)
	await setTimeout(function() {
		console.log(photosList)
	}, 2000)
	res.send(relevantData)
})
module.exports = router
