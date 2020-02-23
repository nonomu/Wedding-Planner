const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DB)

exports.getGuests = async (req, res) => {
	try {
		let weddingDetailsId = req.params.weddingDetailsId
		let invitees = await db.query(
			`SELECT * 
			FROM invitee 
			WHERE wedding_id = ${weddingDetailsId}`
		)
		res.send(invitees)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

exports.postGuest = async (req, res) => {
	try {
		let guest = req.body.guestData
		await db.query(
			`INSERT INTO invitee 
			VALUES(
				null,
				'${guest.name}',
				'${guest.num_invitees}',
				0,
				'${guest.relation}',
				'${guest.phone}',
				'${guest.email}',
				'${req.body.weddingDataId}',
				null
			)`
		)
		res.send(`${guest.name} has been added to your guest list!`)
	} catch (err) {
		console.log(err)
		res.status(400).json({ message: err.message })
	}
}

exports.putGuestToTable = async (req, res) => {
	try {
		let guestId = req.body.guest.id
		let newTable = req.body.currentTable
		let addSeatsNum = req.body.guest.num_invitees
		let guestOldTable = req.body.oldTable || 0
		if (guestOldTable)
			await db.query(
				`UPDATE tables 
				SET seated = "${guestOldTable.seated - addSeatsNum}" 
				WHERE id="${guestOldTable.id}"`
			)
		await db.query(
			`UPDATE 
				invitee 
			SET table_id = "${newTable.id}" 
			WHERE id = "${guestId}"`
		)
		await db.query(
			`UPDATE tables 
			SET seated = "${newTable.seated + addSeatsNum}" 
			WHERE id="${newTable.id}"`
		)
		res.send(`Your guest has successfully added to this table`)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

exports.putRemoveGuestFromTable = async (req, res) => {
	try {
		let guestId = req.body.guest.id
		let removeTable = req.body.currentTable
		let addSeatsNum = req.body.guest.num_invitees
		await db.query(
			`UPDATE tables 
			SET seated = "${removeTable.seated - addSeatsNum}" 
			WHERE id="${removeTable.id}"`
		)
		await db.query(
			`UPDATE invitee 
			SET table_id = null 
			WHERE id = "${guestId}"`
		)
		res.send(`Your guest has successfully removed from table`)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

exports.getTablesByWedding = async (req, res) => {
	try {
		let weddingDetailsId = req.params.weddingDetailsId
		let tables = await db.query(
			`SELECT * 
			FROM tables 
			WHERE wedding_id = ${weddingDetailsId}`
		)
		res.send(tables)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

exports.getTableCapacity = async (req, res) => {
	try {
		let tableId = req.params.tableId
		let seats = await db.query(
			`SELECT seated 
			FROM tables 
			WHERE id = "${tableId}"`
		)
		res.send(seats[0][0])
	} catch (err) {
		console.log(err)
		res.send(err.message)
	}
}

exports.postTable = async (req, res) => {
	try {
		let tableData = req.body.tableData
		let tableNumber = req.body.numTables + 1
		let weddingDetailsId = req.body.weddingDetailsId
		await db.query(
			`INSERT INTO tables 
			VALUES(
				null,
				'${tableData.tableName}',
				'${tableNumber}',
				'${tableData.numSeats}',
				0,
				'${weddingDetailsId}')`
		)
		res.send(`${tableNumber} table created successfully`)
	} catch (err) {
		console.log(err)
		res.status(400).json({ message: err.message })
	}
}