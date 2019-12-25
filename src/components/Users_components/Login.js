import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {toast as popup} from 'react-toastify'
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import './login.css'

@inject('user')
@observer
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

  invalidInput = user => Object.keys(user).some(i => !user[i])

  handleError = input => {
		if (this.invalidInput(input)) {
			throw new Error('All fields are required')
		}
	}

  userLogin = async () => {
    try {
      this.handleError(this.state)
      let login = await this.props.user.userLogin(this.state.email,this.state.password)
      popup.success(login)
    } catch(err) {
      popup.error(err.message)
    }
  }

  render() {
    return (
      <div className="login_box">
        <div className="user_box">
          <h1>Login</h1>
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
          <p className="create-account">Don't have an account yet? <Link to="/register"><span id="register_link">Create one here!</span></Link></p>
            <Button variant="contained" color="primary" onClick={this.userLogin}>
              LOGIN
            </Button>
            {this.props.user.userLogedIn ? window.location="/" : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
