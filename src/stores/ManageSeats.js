import { action, observable, computed } from "mobx";
import Axios from 'axios'
let API_URL = `http://localhost:4200/api`


class ManageSeats {
@observable invitees = []


  @computed get relations (){
    return [...new Set(this.invitees.map(i=>i.relation))]
  }

  @action getRelatedInvitees = relation => {
    return this.invitees.filter(i => i.relation === relation)
  }
  
  @action async addInvitee(inviteeData, weddingDataId) {
    let invitee = await Axios.post(`${API_URL}/invitee`, { inviteeData, weddingDataId })
    console.log(invitee)
    this.getInvitees()
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
}

export const manage_seats = new ManageSeats();
