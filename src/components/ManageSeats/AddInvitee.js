import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./manage_seats.css";
import { inject, observer } from 'mobx-react';


@inject('manage_seats','user')

@observer
class AddInvitee extends Component {
    constructor(){
        super()
        this.state={
            name:"",
            num_invitees:0,
            est_gift:0,
            relation:"",
            phone:"",
            email:""
        }
    }
    async componentDidMount(){
      await this.props.user.getWeddingDetails()
      this.props.manage_seats.getInvitees(this.props.user.userInfo.weddingData.id)
    }


    handleInputs = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    
    AddInvitee = () => {
        //send invitees to DB
        this.props.manage_seats.addInvitee(this.state,this.props.user.userInfo.weddingData.id)
    }
render() {
    return (
          <div id="insert_invitees">
              <h3>Add Your Invitees</h3>
              <span id="TextField">
            <TextField
              name="name"
              label="Invitee\Family Name"
              onChange={this.handleInputs}
            />
              </span>
              <span id="TextField">
            <TextField
              name="num_invitees"
              type="number"
              label="How many guests?"
              onChange={this.handleInputs}
            />
              </span>
              <span id="TextField">
            <TextField
              name="est_gift"
              type="number"
              label="Estimated gift"
              onChange={this.handleInputs}
            />
              </span>
              <span id="TextField">
            <TextField
              name="relation"
              label="Relation"
              onChange={this.handleInputs}
            />
            {/* This one will be select */}
              </span>
              <span id="TextField">
            <TextField
              name="phone"
              label="Phone Number"
              onChange={this.handleInputs}
            />
              </span>
              <span id="TextField">
            <TextField
              name="email"
              label="E-Mail"
              onChange={this.handleInputs}
            />
              </span>
          <div>
          <Button id='inv-btn' variant="contained" color="primary" onClick={this.AddInvitee}>
              Add Invitee
            </Button>
          </div>
          <hr/>
          </div>
      );
}
}


export default AddInvitee