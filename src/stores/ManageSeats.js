import { action, observable, computed } from "mobx";
import Axios from 'axios'
let API_URL = `http://localhost:4200/api`

class ManageSeats {
  @observable invitees = []
  @observable tables = []

@computed get numTables() {
  return this.tables.length
}

  @action async addInvitee(inviteeData, weddingDataId) {
    await Axios.post(`${API_URL}/invitee`, { inviteeData, weddingDataId })
    this.getInvitees(weddingDataId)
    //needs to send weddingDATA ID of the user instead of USERID, Where is it ???
  }

  @action async getInvitees(weddingDetailsId){ 
    try{
      let invitees = await Axios.get(`${API_URL}/invitees/${weddingDetailsId}`)
      this.invitees = invitees.data[0]
    }catch(err){
      console.log(err.message)
    }
  }

  @action async addTable(tableData, weddingDetailsId) {
    await Axios.post(`${API_URL}/table`, { tableData ,weddingDetailsId,numTables:this.numTables })
    this.getTables(weddingDetailsId)
    //should decide what will be the table number according to the computed length of the tables array.
    // should send the data to the route with POST and there it will insert to DB.
  }

  @action async getTables(weddingDetailsId){ 
    try{
      let tables = await Axios.get(`${API_URL}/tables/${weddingDetailsId}`)
      this.tables = tables.data[0]
      // Will get the tables from DB(by weddingdetailsID) and insert to the tables observable.
    }catch(err){
      console.log(err.message)
    }
  }
  
}

export const manage_seats = new ManageSeats();
