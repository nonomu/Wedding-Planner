import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { observer, inject } from "mobx-react";
import { Link } from 'react-router-dom'
import {Fab} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import './manage_seats.css'
@inject('user','manage_seats')

@observer
class AddTable extends Component {
  constructor() {
    super();
    this.state = {
      tableName: "",
      numSeats: 0
    };
  }

  componentDidMount= async () =>{
    await this.props.user.getWeddingDetails()
    this.props.manage_seats.getTables(this.props.user.userInfo.weddingData.id)
  }

  handleInputs = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addTable = () => {
    this.props.manage_seats.addTable(this.state,this.props.user.userInfo.weddingData.id)
    //wil invoke the addtable function from store with the state values. and send the weddingDetailsID from user
  };

  render() {
    return (
      <div className="box_bg">
        <div className="user_box">
        <Fab className="close" component={Link} to={'/manage_seats'}><CloseIcon /></Fab>
          <h1>Add Table</h1>
          <h4>Short Explanation</h4>
          <div>
            <TextField
              name="tableName"
              id="standard_basic"
              label="Table Name"
              onChange={this.handleInputs}
            />
          </div>
          <div>
            <TextField
              name="numSeats"
              id="standard-number"
              label="Table Seats"
              type="number"
              onChange={this.handleInputs}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={this.addTable}>
              Add Table
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTable;
