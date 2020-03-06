import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { toast as popup } from 'react-toastify'
import Dialog from '../UI/Dialog/Dialog'
import { handleError } from '../../helpers/validator'
import { WeddingContext } from '../../stores/Wedding'
import { GuestManagementContext } from '../../stores/GuestManagement'

const AddTable = () => {
	const wedding = useContext(WeddingContext)
	const guestManagement = useContext(GuestManagementContext)
	
	const [title, setTitle] = useState('')
	const [capacity, setCapacity] = useState(0)

	const addTable = () => {
		try {
			const table = {title, capacity}
			handleError(table)
			const weddingId = wedding.wedding.id
			guestManagement.addTable(table, weddingId)
		} catch (err) {
			popup.error(err.message)
		}
	}

	return (
		<Dialog>
			<h1>Add Table</h1>
			<div>
				<TextField
					name='title'
					label='Title'
					placeholder='eg. Family, Friends..'
					onChange={e => setTitle(e.target.value)}
				/>
			</div>
			<div>
				<TextField
					name='capacity'
					label='Capacity'
					type='number'
					onChange={e => setCapacity(e.target.value)}
				/>
			</div>
			<br></br>
			<div>
				<Button
					variant='contained'
					color='primary'
					onClick={addTable}
					component={Link}
					to='/guest-management'>
					Add Table
				</Button>
			</div>
		</Dialog>
	)
}

export default observer(AddTable)
