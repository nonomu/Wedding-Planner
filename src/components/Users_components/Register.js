import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./usercomp.css";
import { inject } from "mobx-react";
// import Home from "../Home";


// import DateFnsUtils from "@date-io/date-fns";
// import Grid from "@material-ui/core/Grid";
// import "date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker
// } from "@material-ui/pickers";

@inject('user')
class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      fPassword: "",
      vPassword: "",
      gName: "",
      bName: "",
      weddingDate: "2020-01-01",
      weddingBudget: 0,
      estInvitees: 0,
      weddingArea: "",
      completed: false
    };
  }

  handleInputs = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  userRegister=async()=>{
    try{
     await this.props.user.userRegister(this.state)
    }
    catch(err){
      console.log(err)
    }
  }
  render() {
    console.log(this.props.user.userLogedIn)
    return (
      <div className="box_bg">
        <div className="user_box">
          <h1>LOGO</h1>
          <h3>Register</h3>
          <div>
            <TextField
              name="email"
              id="standard_basic"
              label="E-Mail"
              onChange={this.handleInputs}
            />
          </div>
          <div>
            <TextField
              name="fPassword"
              id="standard-password-input"
              label="Password"
              type="password"
              onChange={this.handleInputs}
            />
          </div>
          <div>
            {" "}
            <TextField
              name="vPassword"
              id="standard-password-input"
              label="Validate Password"
              type="password"
              onChange={this.handleInputs}
            />
          </div>
          <hr />
          <h3>Wedding Details</h3>
          <div>
            <span id="TextField">
              <TextField
                id="standard_basic"
                name="gName"
                label="Groom Full Name"
                onChange={this.handleInputs}
              />
            </span>
            <span id="TextField">
              <TextField
                id="standard_basic"
                name="bName"
                label="Bride Full Name"
                onChange={this.handleInputs}
              />
            </span>
          </div>
          <div className="inputs_section">
            <span id="TextField">
              <TextField
                type="date"
                name="weddingDate"
                id="standard_basic"
                label="WeddingDate"
                defaultValue={this.state.weddingDate}
                onChange={this.handleInputs}
              />
            </span>
            {/* There will be DATE PICKER here, leave it to yaniv */}
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
          <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={this.state.date}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
       </Grid>
    </MuiPickersUtilsProvider> */}
          </div>
          <div>
            <span id="TextField">
              <TextField
                id="standard_number"
                type="number"
                name="weddingBudget"
                label="Wedding Budget"
                onChange={this.handleInputs}
              />
            </span>
            <span id="TextField">
              <TextField
                id="standard_number"
                type="number"
                name="estInvitees"
                label="Estimated Invitees"
                onChange={this.handleInputs}
              />
            </span>
          </div>
          <div>
            {/* Noam will make it autocomplete ?  */}
            <span id="TextField">
              <TextField
                id="standard_basic"
                name="weddingArea"
                label="Wedding Area"
                onChange={this.handleInputs}
              />
            </span>
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={this.userRegister}>
              Register
            </Button>
            {this.props.user.userLogedIn ? <Redirect to="/" />:null}
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
