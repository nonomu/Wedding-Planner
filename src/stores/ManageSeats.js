import { observable, action } from "mobx";

class ManageSeats {
  // @observable inviteeData

  @action addInvitee(inviteeData, userId) {
    console.log(inviteeData);
    console.log(userId);
    //make route that adding this data to the invitees table
  }
  @action getInvitees(){
      console.log("Should get invitees from DB")
   // get invitees route from the DB   
  }
}

export const manage_seats = new ManageSeats();
