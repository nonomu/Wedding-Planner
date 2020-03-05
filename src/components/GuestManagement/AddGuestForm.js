import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classes from './GuestManagement.module.css'
import { inject, observer } from 'mobx-react'
import { toast as popup } from 'react-toastify'
import {handleError} from '../../helpers/validator'

@inject('guestManagement', 'wedding')
@observer
class AddGuestForm extends Component {
		state = {
			name: '',
			partySize: '',
			relation: '',
			phone: '',
			email: ''
		}
		baseState = this.state

	handleInputs = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	resetForm = () => {
		this.setState(this.baseState)
	}

	AddGuest = async () => {
		try {
			const guest = this.state
			handleError(guest)
			let addGuest = await this.props.guestManagement.addGuest(
				guest,
				this.props.wedding.wedding.id
			)
			this.resetForm()
			popup.success(addGuest)
		} catch (err) {
			popup.error(err.message)
		}
	}
	render() {
		return (
			<div className={classes.AddGuest}>
				<h3>Add Guest</h3>
				<span className={classes.TextField}>
					<TextField
						name='name'
						label='Guest Name'
						value={this.state.name}
						onChange={this.handleInputs}
					/>
				</span>
				<span className={classes.TextField}>
					<TextField
						value={this.state.num_invitees}
						name='partySize'
						type='number'
						label='Party Size'
						onChange={this.handleInputs}
					/>
				</span>
				<span className={classes.TextField}>
					<TextField
						value={this.state.relation}
						name='relation'
						label='Relation'
						onChange={this.handleInputs}
					/>
				</span>
				<span className={classes.TextField}>
					<TextField
						value={this.state.phone}
						name='phone'
						label='Phone number'
						onChange={this.handleInputs}
					/>
				</span>
				<span className={classes.TextField}>
					<TextField
						value={this.state.email}
						name='email'
						label='Email'
						onChange={this.handleInputs}
					/>
				</span>
				<div className={classes.btn}>
					<Button variant='contained' color='primary' onClick={this.AddGuest}>
						Add Guest
					</Button>
				</div>
				<hr />
			</div>
		)
	}
}

export default AddGuestForm
