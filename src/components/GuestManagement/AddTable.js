import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import './guest-management.css'
import { toast as popup } from 'react-toastify'
import Dialog from '../UI/Dialog/Dialog'
@inject('auth', 'guestManagement')
@observer
class AddTable extends Component {
	constructor() {
		super()
		this.state = {
			tableName: '',
			numSeats: 0
		}
	}
	invalidInput = user => Object.keys(user).some(i => !user[i])

	handleError = input => {
		if (this.invalidInput(input)) {
			throw new Error('All fields are required')
		}
	}

	handleInputs = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	addTable = () => {
		try {
			this.handleError(this.state)
			this.props.guestManagement.addTable(
				this.state,
				this.props.auth.id
			)
		} catch (err) {
			popup.error(err.message)
		}
	}

	render() {
		return (
			<Dialog>
				<h1>Add Table</h1>
				<div>
					<TextField
						name='tableName'
						id='standard_basic'
						label='Table Name'
						onChange={this.handleInputs}
					/>
				</div>
				<div>
					<TextField
						name='numSeats'
						id='standard-number'
						label='Table Seats'
						type='number'
						onChange={this.handleInputs}
					/>
				</div>
				<br></br>
				<div>
					<Button
						variant='contained'
						color='primary'
						onClick={this.addTable}
						component={Link}
						to='/guest-management'>
						Add Table
					</Button>
				</div>
			</Dialog>
		)
	}
}

export default AddTable
