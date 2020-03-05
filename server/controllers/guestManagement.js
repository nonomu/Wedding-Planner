const Guest = require('../models/guest')
const Table = require('../models/table')

exports.getGuests = async (req, res) => {
	try {
		const weddingId = req.params.weddingId
		const Guests = await Guest.findAll({ where: { weddingId } })
		res.send(Guests)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

exports.postGuest = async (req, res) => {
	try {
		const name = req.body.guest.name
		const partySize = req.body.guest.partySize
		const relation = req.body.guest.relation
		const phone = req.body.guest.phone
		const email = req.body.guest.email
		const weddingId = req.body.weddingId
		await Guest.create({ name, partySize, relation, phone, email, weddingId })
		res.send(`${name} has been added to your guest list!`)
	} catch (err) {
		console.log(err)
		res.status(400).json({ message: err.message })
	}
}

exports.putGuestToTable = async (req, res) => {
	try {
		const guest = req.body.guest
		const partySize = guest.partySize
		const table = req.body.table
		const prevTable = req.body.prevTable
		if (prevTable) {
			const seated = prevTable.seated - partySize
			await Table.update({seated}, {where: {id: prevTable.id}})
		}
		await Guest.update({tableId: table.id}, {where: {id: guest.id}})

		const seated = table.seated + partySize
		await Table.update({seated}, {where: {id: table.id}})
		res.send(`Your guest has successfully added to this table`)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

exports.putRemoveGuestFromTable = async (req, res) => {
	try {
		const guest = req.body.guest
		const partySize = guest.partySize
		const table = req.body.table
		const seated = table.seated - partySize
		const tableId = null
		await Table.update({seated}, {where: {id: table.id}})
		await Guest.update({tableId}, {where: {id: guest.id}})
		res.send(`Your guest has successfully removed from table`)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

exports.getTablesByWedding = async (req, res) => {
	try {
		let weddingId = req.params.weddingId
		const tables = await Table.findAll({ where: { weddingId } })
		res.send(tables)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

exports.postTable = async (req, res) => {
	try {
		const title = req.body.table.title
		const number = req.body.numTables + 1
		const capacity = req.body.table.capacity
		const weddingId = req.body.weddingId
		const seated = 0
		await Table.create({ title, number, capacity, seated, weddingId })
		res.send(`${title} table created successfully`)
	} catch (err) {
		console.log(err)
		res.status(400).json({ message: err.message })
	}
}
