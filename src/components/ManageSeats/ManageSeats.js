import React, { Component } from "react";
import AddInvitee from "./AddInvitee";
import { observer } from "mobx-react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


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

        <Fab id="addIcon" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      </div>
    );
  }
}

export default ManageSeats;
