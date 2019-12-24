import React, { Component } from "react";
import AddInvitee from "./AddInvitee";
import { observer } from "mobx-react";



@observer

class ManageSeats extends Component {
  constructor()
  {
    super()
  }
  componentDidMount()
  {
      
  }
  render() {
    return (
      <div id="manage_seats">
        <AddInvitee />
        <div id="check">
          <br/>
          <h2>INVITEES</h2> <br/> <br/>
          here the invitees will be displayed, need to decide if it will be a menu or just a box.

        </div>
      </div>
    );
  }
}

export default ManageSeats;
