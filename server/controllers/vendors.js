

exports.getVendors = async (req, res) => {
	try {
		const query = `SELECT * FROM attractions`
		const attractions = await db.query(query)
		res.send(attractions[0])
	} catch (err) {
		console.log(err)
		res.status(422).json({ message: err.message })
	}
}

exports.getFavoritesById = async (req, res) => {
	try {
		const userId = req.params.userId
		const query = `
		SELECT at.* 
		FROM 
			attractions as at, 
			user as u, 
			favorites as f 
		WHERE u.id = "${userId}" 
		AND f.user_id = "${userId}" 
		AND f.attraction_id = at.id`
		const favorites = await db.query(query)
		res.send(favorites[0])
	} catch (err) {
		console.log(err)
		res.status(400).json({ message: err.message })
	}
}

exports.postFavorite = async (req, res) => {
	try {
		const favorite = req.body
		let query = `
		SELECT f.* 
		FROM favorites as f 
		WHERE f.user_id = "${favorite.userId}"
		AND f.attraction_id = "${favorite.vendorId}"`
		const result = await db.query(query)
		if (!result[0].length) {
			query = `
			INSERT INTO favorites 
			VALUES(
				"${favorite.userId}", 
				"${favorite.vendorId}")`
			await db.query(query)
		}
		res.send('Successfully added to favorites')
	} catch (err) {
		console.log(err)
		res.send(err)
	}
}

exports.getBookedVendors = async (req, res) => {
	try {
		const userId = req.params.userId
		const query = `
		SELECT 
			at.*, 
			ba.price
		FROM 
			attractions as at,
			user as u,
			booked_attractions as ba 
		WHERE 
			ba.user_id = "${userId}" 
		AND ba.attraction_id=at.id 
		AND u.id = "${userId}"`
		const bookedVendors = await db.query(query)
		res.send(bookedVendors[0])
	} catch (err) {
		console.log(err)
		res.send(err)
	}
}

exports.postBookVendor = async (req, res) => {
	try {
		const action = req.body
		console.log(action)
		let query = `
		SELECT ba.* 
		FROM booked_attractions as ba 
		WHERE ba.user_id = "${action.userId}"
		AND ba.attraction_id = "${action.vendorId}"`
		const result = await db.query(query)

		if (result[0].length) {
			throw new Error('Vendor already booked!')
		}
		query = `
			INSERT INTO booked_attractions 
			VALUES(
				"${action.userId}", 
				"${action.vendorId}", 
				"${action.price}")`
		await db.query(query)

		res.send('Vendor successfully booked')
	} catch (err) {
		console.log(err)
		res.send(err)
	}
}

exports.deleteFavorite = async (req, res) => {
	try {
		const favorite = req.body
		await db.query(
			`DELETE FROM favorites 
			WHERE user_id = "${favorite.userId}" 
			AND attraction_id = "${favorite.attractionId}"`
		)
		res.send(`Vendor removed from favorites`)
	} catch (err) {
		res.send(err)
	}
}
