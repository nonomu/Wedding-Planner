const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DB)

exports.getWeddingDetails = async (req, res) => {
	try {
		const userId = req.params.userId
		const query = `
		SELECT 
			wd.* 
		FROM 
			user as u, 
			weddingDetails AS wd 
		WHERE u.id = "${userId}" 
		AND u.id = wd.user_id`
		const weddingDetails = await db.query(query)
		res.send(weddingDetails[0][0])
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

exports.putUserProfile = async (req, res) => {
	try {
		const userInfo = req.body
		const query = `
		UPDATE weddingdetails
		SET 
			groom_name = "${userInfo.groom_name}", 
			bride_name = "${userInfo.bride_name}", 
			wedding_date = "${userInfo.wedding_date}", 
			est_invitees = "${userInfo.est_invitees}",
			est_budget = "${userInfo.est_budget}",  
			wedding_area = "${userInfo.wedding_area}" 
		WHERE 
			user_id="${userInfo.user_id}"`
		await db.query(query)
		res.send('Your info has been successfully updated!')
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}