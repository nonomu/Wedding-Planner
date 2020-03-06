import React, { useContext, useReducer } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classes from './GuestManagement.module.css'
import { observer } from 'mobx-react'
import { toast as popup } from 'react-toastify'
import { handleError } from '../../helpers/validator'
import { WeddingContext } from '../../stores/Wedding'

import { GuestManagementContext } from '../../stores/GuestManagement'

const initialState = {
	name: '',
	partySize: '',
	relation: '',
	phone: '',
	email: ''
}

const reducer = (state, action) => {
	if (action.type === 'reset') {
		return initialState
	}

	const result = { ...state }
	result[action.type] = action.value
	return result
}

const AddGuestForm = () => {
	const wedding = useContext(WeddingContext)
	const guestManagement = useContext(GuestManagementContext)

	const [state, dispatch] = useReducer(reducer, initialState)
	const {name, partySize, relation, phone, email} = state
	const onChange = e => {
		const { name, value } = e.target;
		dispatch({ type: name, value });
	}


	const AddGuest = async () => {
		try {
			const guest = state
			handleError(guest)
			let addGuest = await guestManagement.addGuest(guest, wedding.wedding.id)
			dispatch({ type: "reset" });
			popup.success(addGuest)
		} catch (err) {
			popup.error(err.message)
		}
	}

	return (
		<div className={classes.AddGuest}>
			<h3>Add Guest</h3>
			<span className={classes.TextField}>
				<TextField
					name='name'
					label='Guest Name'
					value={name}
					onChange={onChange}
				/>
			</span>
			<span className={classes.TextField}>
				<TextField
					value={partySize}
					name='partySize'
					type='number'
					label='Party Size'
					onChange={onChange}
				/>
			</span>
			<span className={classes.TextField}>
				<TextField
					value={relation}
					name='relation'
					label='Relation'
					onChange={onChange}
				/>
			</span>
			<span className={classes.TextField}>
				<TextField
					value={phone}
					name='phone'
					label='Phone number'
					onChange={onChange}
				/>
			</span>
			<span className={classes.TextField}>
				<TextField
					value={email}
					name='email'
					label='Email'
					onChange={onChange}
				/>
			</span>
			<div className={classes.btn}>
				<Button variant='contained' color='primary' onClick={AddGuest}>
					Add Guest
				</Button>
			</div>
			<hr />
		</div>
	)

}

export default observer(AddGuestForm)
