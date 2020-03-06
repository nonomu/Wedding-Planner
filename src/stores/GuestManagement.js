import { action, observable, computed } from 'mobx'
import Axios from 'axios'
import { createContext } from 'react'
let API_URL = `http://localhost:4200`

class GuestManagement {
	@observable _guests = []
	@observable tables = []

	@computed get numTables() {
		return this.tables.length
	}

	@computed get relations() {
		return [...new Set(this._guests.map(i => i.relation))]
	}

	@computed get guests() {
		return this._guests 
	}
	
	@action getRelatedGuests = relation => {
		return this._guests.filter(i => i.relation === relation)
	}

	@action async addGuest(guest, weddingId) {
		const URL = API_URL + '/api/guest'
		const payload = { guest, weddingId }
		const addGuest = await Axios.post(URL, payload)
		this.getGuests(weddingId)
		return addGuest.data
	}

	@action async getGuests(weddingId) {
		try {
			const URL = API_URL + '/api/guests/' + weddingId
			const guests = await Axios.get(URL)
			this._guests = [...guests.data]
		} catch (err) {
			console.log(err.message)
		}
	}

	@action async addTable(table, weddingId) {
		const URL = API_URL + '/api/table'
		const numTables = this.numTables
		const payload = {table, weddingId, numTables }
		await Axios.post(URL, payload)
		this.getTables(weddingId)
	}
	
	@action async getTables(weddingId) {
		try {
			const URL = API_URL + '/api/tables/' + weddingId
			let tables = await Axios.get(URL)
			this.tables = [...tables.data]
		} catch (err) {
			console.log(err.message)
		}
	}
	
	@action getAvailableSeats = async () => {
		const table = this.selectedTable
		const URL = API_URL + '/api/tables/capacity/' + table
		let seats = await Axios.get(URL)
		this.currentSeats = seats.data.seated
	}

	@action aboveCapacity = (guest, table) => {
		const requiredCapacity = guest.partySize + table.seated
		return requiredCapacity > table.capacity
	}

	@action validateCapacity = (guest, table) => {
		if (this.aboveCapacity(guest, table)) {
			const error = `You have reached the maximum amount of seats for this table`
			throw new Error(error)
		}
	}

	@action getPrevTable = guest => {
		return this.tables.find(t => t.id === guest.tableId)
	}
	
	@action addGuestToTable = async (guest, table) => {
		try {
			this.validateCapacity(guest, table) 
			const prevTable = this.getPrevTable(guest)
			const URL = API_URL + '/api/guest/addtotable'
			const payload = {guest, table, prevTable}
			const addGuestToTable = await Axios.put(URL, payload)
			
			const weddingId = table.weddingId
			await this.getTables(weddingId)
			await this.getGuests(weddingId)
			return addGuestToTable.data
		} 
		catch (err) {
			throw new Error(err.message)
		}
	}
	@action async removeGuestFromTable(guest, table) {
		try {
			const URL = API_URL + '/api/guest/removeFromTable'
			const payload = {guest, table}
			let removeGuestFromTable = await Axios.put(URL, payload)
			
			const weddingId = table.weddingId
			await this.getTables(weddingId)
			await this.getGuests(weddingId)
			return removeGuestFromTable.data
		} 
		catch (err) {
			throw new Error(err.response.data.message)
		}
	}
}

export const GuestManagementContext = createContext(new GuestManagement())
