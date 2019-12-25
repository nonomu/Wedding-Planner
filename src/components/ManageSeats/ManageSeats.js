import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import AddInvitee from "./AddInvitee";
import InviteesSideBar from "./invitees_side_bar";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

@inject('manage_seats')

@observer
class ManageSeats extends Component {

  render() {
    return (
      <div id="manage_seats">
        <AddInvitee />
        <div id="check">
          <br/>
          <h2>INVITEES</h2> <br/> <br/>
          here the invitees will be displayed, need to decide if it will be a menu or just a box.
        <InviteesSideBar />

        </div>

        <Fab id="addIcon" color="primary" aria-label="add" component={Link} to="/addtable">
        <AddIcon />
      </Fab>
      </div>
    );
  }
}

export default ManageSeats;
