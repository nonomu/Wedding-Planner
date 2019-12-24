import React, { Component } from "react";
import AddInvitee from "./AddInvitee";
import { observer } from "mobx-react";


@observer
class ManageSeats extends Component {
  render() {
    return (
      <div id="manage_seats">
        <AddInvitee />
        <div id="check">
          <br/>
          INVITEES <br/> <br/>
          here the invitees will be displayed, need to decide if it will be a menu or just a box.

        </div>
      </div>
    );
  }
}

export default ManageSeats;
