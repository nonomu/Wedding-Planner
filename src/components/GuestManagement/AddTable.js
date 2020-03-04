import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { toast as popup } from 'react-toastify'
import Dialog from '../UI/Dialog/Dialog'
import { handleError } from '../../helpers/validator'

@inject('auth', 'guestManagement')
@observer
class AddTable extends Component {
	state = {
		title: '',
		capacity: 0
	}

	handleInputs = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	addTable = () => {
		try {
			handleError(this.state)
			this.props.guestManagement.addTable(this.state, this.props.auth.id)
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
						name='title'
						label='Title'
						placeholder='eg. Family, Friends..'
						onChange={this.handleInputs}
					/>
				</div>
				<div>
					<TextField
						name='capacity'
						label='Capacity'
						
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
