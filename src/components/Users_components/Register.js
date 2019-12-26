import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {toast as popup} from 'react-toastify'
import { inject, observer } from "mobx-react";
import Autocomplete from 'react-google-autocomplete';
import "./register.css";

// import DateFnsUtils from "@date-io/date-fns";
// import Grid from "@material-ui/core/Grid";
// import "date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker
// } from "@material-ui/pickers";

@inject('user')
@observer
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
    };
  }

  handleInputs = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  invalidInput = user => Object.keys(user).some(i => !user[i])

  handleError = input => {
		if (this.invalidInput(input)) {
			throw new Error('All fields are required')
		}
	}

  userRegister = async () => {
    try{
      this.handleError(this.state)
      let register = await this.props.user.userRegister(this.state)
     popup.success(register.data.message)
    }
    catch(err){
      popup.error(err.message)
    }
  }
  render() {
    return (
      <div className="register">
        <div className="register_box">
          <h1>Register</h1>
          <div>
            <TextField
              name="email"
              label="E-Mail"
              onChange={this.handleInputs}
            />
          </div>
          <div>
            <TextField
              name="fPassword"
              label="Password"
              type="password"
              onChange={this.handleInputs}
            />
          </div>
          <div>
            {" "}
            <TextField
              name="vPassword"
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
                name="gName"
                label="Partner 1"
                onChange={this.handleInputs}
              />
            </span>
            <span id="TextField">
              <TextField
                name="bName"
                label="Partner 2"
                onChange={this.handleInputs}
              />
            </span>
          </div>
          <div className="inputs_section">
            <span id="TextField">
              <TextField
                type="date"
                name="weddingDate"
                label="Wedding Date"
                defaultValue={this.state.weddingDate}
                onChange={this.handleInputs}
              />
            </span>
            {/* There will be DATE PICKER here, leave it to yaniv */}
          </div>
          <div>
            <span id="TextField">
              <TextField
                type="number"
                name="weddingBudget"
                label="Wedding Budget"
                onChange={this.handleInputs}
              />
            </span>
            <span id="TextField">
              <TextField
                type="number"
                name="estInvitees"
                label="Estimated Invitees"
                onChange={this.handleInputs}
              />
            </span>
          </div>
          <div>
            
            <span id="TextField">
            <Autocomplete value={this.state.weddingArea} placeholder="Location" name="weddingArea" id="autoCompleteField"
              className="location"
              onChange={this.handleInputs}
              onPlaceSelected={(city) => {
                let cityName = city.formatted_address
                this.setState({ weddingArea: cityName })
              }}
              types={['(cities)']}
              componentRestrictions={{ country: "IL" }}
            />
            </span>
          </div>
          <div>
            <Button  style={{marginTop:'5px'}} variant="contained" color="primary" onClick={this.userRegister}>
              Register
            </Button>
            {this.props.user.userLogedIn ? window.location="/" : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
