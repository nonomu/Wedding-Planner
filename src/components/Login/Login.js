import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { toast as popup } from 'react-toastify'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import './login.css'
import Dialog from '../UI/Dialog/Dialog'

@inject('auth')
@observer
class Login extends Component {
	state = {
		email: '',
		password: ''
	}

	handleInputs = e => {
		this.setState({ [e.target.name]: e.target.value })
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
			let login = await this.props.auth.userLogin(
				this.state.email,
				this.state.password
			)
			popup.success(login)
			this.props.history.push('/')
		} catch (err) {
			popup.error(err.message)
		}
	}

	componentDidMount() {
		const url = this.props.match.url
		this.props.auth.setURL(url)
	}

	render() {
		return (
			<Dialog>
				<h1>Login</h1>
				<div>
					<TextField
						name='email'
						id='standard_basic'
						label='Email'
						onChange={this.handleInputs}
					/>
				</div>
				<div>
					<TextField
						name='password'
						id='standard-password-input'
						label='Password'
						type='password'
						autoComplete='current-password'
						onChange={this.handleInputs}
					/>
				</div>
				<div className='login-bottom'>
					<p className='create-account'>
						Don't have an account yet?
						<Link to='/register'>
							<span id='register_link'> Create one here!</span>
						</Link>
					</p>
				</div>
				<Button variant='contained' color='primary' onClick={this.userLogin}>
					LOGIN
				</Button>
			</Dialog>
		)
	}
}

export default Login
