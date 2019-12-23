import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./usercomp.css";
import { inject } from "mobx-react";


@inject('user')
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleInputs=(e)=>{
this.setState({[e.target.name]:e.target.value})
  }

  userLogin=()=>{
    this.props.user.userLogin(this.state.email,this.state.password)
  }

  render() {
    return (
      <div className="box_bg">
        <div className="user_box">
          <h1>LOGO</h1>
          <h3>Login</h3>
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
              name="password"
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={this.handleInputs}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={this.userLogin}>
              LOGIN
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
