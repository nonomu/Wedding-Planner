import { action, observable, computed } from 'mobx'
import Axios from 'axios'
let API_URL = `http://localhost:4200/api`

class ManageSeats {
	@observable invitees = []
	@observable tables = []
	@observable selectedTable
	@observable selectedTableName
	@observable selectedTableNumber
  @observable currentSeats
  @observable selectedTableMaxSeats
	@observable openSideBar = false

	@computed get numTables() {
		return this.tables.length
	}

	@computed get relations() {
		return [...new Set(this.invitees.map(i => i.relation))]
	}

	@action getRelatedInvitees = relation => {
		return this.invitees.filter(i => i.relation === relation)
	}

	@action async addInvitee(inviteeData, weddingDataId) {
		let invitee = await Axios.post(`${API_URL}/invitee`, { inviteeData, weddingDataId })
    this.getInvitees(weddingDataId)
    return invitee.data
		//needs to send weddingDATA ID of the user instead of USERID, Where is it ???
	}

	@action async getInvitees(weddingDetailsId) {
		try {
			let invitees = await Axios.get(`${API_URL}/invitees/${weddingDetailsId}`)
			this.invitees = invitees.data[0]
		} catch (err) {
			console.log(err.message)
		}
	}

	@action async addTable(tableData, weddingDetailsId) {
		await Axios.post(`${API_URL}/table`, {
			tableData,
			weddingDetailsId,
			numTables: this.numTables
		})
		this.getTables(weddingDetailsId)
		//should decide what will be the table number according to the computed length of the tables array.
		// should send the data to the route with POST and there it will insert to DB.
	}

	@action async getTables(weddingDetailsId) {
		try {
			let tables = await Axios.get(`${API_URL}/tables/${weddingDetailsId}`)
			this.tables = tables.data[0]
			// Will get the tables from DB(by weddingdetailsID) and insert to the tables observable.
		} catch (err) {
			console.log(err.message)
		}
	}

	@action async getTableInvitees(tableId) {
		//get invitees for this table id from DB
	}

	@action getAvailableSeats = async () => {
		let seats = await Axios.get(`${API_URL}/tables/availableseats/${this.selectedTable}`)
    this.currentSeats = seats.data.seated
	}

	@action addInviteeToTable = async (inviteeId) => {
		try {
      let selectedTable = this.selectedTable
      let seats = this.currentSeats
			let addInviteeToTable = await Axios.put(`${API_URL}/invitee/addtotable`, {
				inviteeId,
        selectedTable,
        seats
			})
			return addInviteeToTable.data
		} catch (err) {
			throw new Error(err.response.data.message)
		}
	}
}

export const manage_seats = new ManageSeats()
