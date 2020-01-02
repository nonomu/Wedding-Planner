import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./manage_seats.css";
import { inject, observer } from 'mobx-react';
import { toast as popup } from 'react-toastify'


@inject('manage_seats','user')

@observer
class AddInvitee extends Component {
    constructor(){
        super()
        this.state={
            name:"",
            num_invitees:0,
            relation:"",
            phone:"",
            email:""
        }
        this.baseState = this.state
    }
    handleInputs = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    invalidInput = user => Object.keys(user).some(i => !user[i])

  handleError = input => {
		if (this.invalidInput(input)) {
			throw new Error('All fields are required')
		}
  }
  
  resetForm = () => {
    this.setState(this.baseState)
  }
    
    AddInvitee = async () => {
      try {
        this.handleError(this.state)
        let addInvitee = await this.props.manage_seats.addInvitee(this.state,this.props.user.userInfo.weddingData.id)
        this.resetForm()
        popup.success(addInvitee)
      } catch(err) {
        popup.error(err.message)
      }

    }
render() {
    return (
          <div id="insert_invitees">
              <h3>Add Guest</h3>
              <span id="TextField">
            <TextField
              name="name"
              label="Guest Name"
              value={this.state.name}
              onChange={this.handleInputs}
            />
              </span>
              <span id="TextField">
            <TextField
             value={this.state.num_invitees}
              name="num_invitees"
              type="number"
              label="Party Size"
              onChange={this.handleInputs}
            />
              </span>
              <span id="TextField">
            <TextField
              value={this.state.relation}
              name="relation"
              label="Relation"
              onChange={this.handleInputs}
            />
            {/* This one will be select */}
              </span>
              <span id="TextField">
            <TextField
            value={this.state.phone}
              name="phone"
              label="Phone number"
              onChange={this.handleInputs}
            />
              </span>
              <span id="TextField">
            <TextField
            value={this.state.email}
              name="email"
              label="Email"
              onChange={this.handleInputs}
            />
              </span>
          <div>
          <Button id='inv-btn' variant="contained" color="primary" onClick={this.AddInvitee}>
              Add Guest
            </Button>
          </div>
          <hr/>
          </div>
      );
}
}


export default AddInvitee