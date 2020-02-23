import { action, observable, computed } from 'mobx'
import Axios from 'axios'
let API_URL = `http://localhost:4200`

class GuestManagement {
	@observable guests = []
	@observable tables = []

	@computed get numTables() {
		return this.tables.length
	}

	@computed get relations() {
		return [...new Set(this.guests.map(i => i.relation))]
	}
	
	@action getRelatedGuests = relation => {
		return this.guests.filter(i => i.relation === relation)
	}

	@action async addGuest(guestData, weddingDataId) {
		let invitee = await Axios.post(`${API_URL}/api/guest`, { guestData, weddingDataId })
		this.getGuests(weddingDataId)
		return invitee.data
		//needs to send weddingDATA ID of the user instead of USERID, Where is it ???
	}

	@action async getGuests(weddingDetailsId) {
		try {
			let guests = await Axios.get(`${API_URL}/api/guests/${weddingDetailsId}`)
			this.guests = guests.data[0]
		} catch (err) {
			console.log(err.message)
		}
	}

	@action async addTable(tableData, weddingDetailsId) {
		await Axios.post(`${API_URL}/api/table`, {
			tableData,
			weddingDetailsId,
			numTables: this.numTables
		})
		this.getTables(weddingDetailsId)
	}
	
	@action async getTables(weddingDetailsId) {
		try {
			let tables = await Axios.get(`${API_URL}/api/tables/${weddingDetailsId}`)
			this.tables = tables.data[0]
		} catch (err) {
			console.log(err.message)
		}
	}
	
	@action getAvailableSeats = async () => {
		let seats = await Axios.get(`${API_URL}/api/tables/capacity/${this.selectedTable}`)
		this.currentSeats = seats.data.seated
	}
	
	@action addGuestToTable = async (guest,currentTable) => {
		try {
	
			let oldTable = this.tables.find(t => t.id === guest.table_id)
			
			let addGuestToTable = await Axios.put(`${API_URL}/api/guest/addtotable`, {
				guest,
				currentTable,
				oldTable
			})
			await this.getTables(currentTable.wedding_id)
			await this.getGuests(currentTable.wedding_id)
			return addGuestToTable.data
		} 
		catch (err) {
			throw new Error(err.response.data.message)
		}
	}
	@action async removeGuestFromTable(guest,currentTable)
	{
		try {
			let removeGuestFromTable = await Axios.put(`${API_URL}/api/guest/removeFromTable`, {
				guest,
				currentTable
			})
			await this.getTables(currentTable.wedding_id)
			await this.getGuests(currentTable.wedding_id)
			return removeGuestFromTable.data
		} 
		catch (err) {
			throw new Error(err.response.data.message)
		}
	}
}

export const guestManagement = new GuestManagement()
