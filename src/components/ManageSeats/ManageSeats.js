import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import AddInvitee from "./AddInvitee";
import InviteesSideBar from "./invitees_side_bar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Table from "./Table";

@inject("manage_seats", "user")
@observer
class ManageSeats extends Component {
  async componentDidMount() {
    await this.props.user.getWeddingDetails();
    this.props.manage_seats.getTables(this.props.user.userInfo.weddingData.id);
  }

  render() {
    console.log(this.props.manage_seats.tables);
    return (
      <div id="manage_seats">
        <AddInvitee />
        {/* <div id="check">
        <InviteesSideBar />
        </div> */}
        <div>
          {this.props.manage_seats.tables.map(t => (
            <Table t={t} />
          ))}
        </div>

        <Fab id="addIcon" color="primary" aria-label="add" component={Link} to="/addtable">
        <AddIcon />
      </Fab>
      </div>
    );
  }
}

export default ManageSeats;
