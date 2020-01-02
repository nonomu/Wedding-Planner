import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { observer, inject } from "mobx-react";
import { Link } from 'react-router-dom'
import {Fab} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import './manage_seats.css'
import {toast as popup} from 'react-toastify'
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
  invalidInput = user => Object.keys(user).some(i => !user[i])

  handleError = input => {
		if (this.invalidInput(input)) {
			throw new Error('All fields are required')
		}
	}

  handleInputs = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addTable = () => {
    try {
      this.handleError(this.state)
      this.props.manage_seats.addTable(this.state,this.props.user.userInfo.weddingData.id)
    } catch(err) {
      popup.error(err.message)
    }
  };

  render() {
    return (
      <div className="box_bg">
        <div className="user-table">
        <Fab className="close" component={Link} to={'/manage_seats'}><CloseIcon /></Fab>
          <h1>Add Table</h1>
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
          </div><br></br>
          <div className>
            <Button variant="contained" color="primary" onClick={this.addTable} component={Link} to='/manage_seats'>
              Add Table
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTable;
