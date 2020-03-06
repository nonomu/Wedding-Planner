import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import AddGuestForm from './AddGuestForm'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { loadGuestContent } from '../../helpers/guestManagement'
import Table from './Table'
import classes from './GuestManagement.module.css'
import { AuthContext } from '../../stores/Auth'
import { WeddingContext } from '../../stores/Wedding'
import { GuestManagementContext } from '../../stores/GuestManagement'

const GuestManagement = ({ match }) => {
	const auth = useContext(AuthContext)	
	const wedding = useContext(WeddingContext)
	const guestManagement = useContext(GuestManagementContext)
	useEffect(() => {
			const url = match.url
			auth.setURL(url)
			loadGuestContent(auth, wedding, guestManagement)
		}, [auth, guestManagement, match.url, wedding])

		return (
			<div className={classes.GuestManagement}>
				<AddGuestForm />
				<div className={classes.Tables}>
					{guestManagement.tables.map(t => (
						<Table key={t.id} table={t} />
					))}
				</div>
				<div className={classes.AddIcon}>
					<Fab color='primary' aria-label='add' component={Link} to='/addtable'>
						<AddIcon />
					</Fab>
				</div>
			</div>
		)
	}

export default observer(GuestManagement)
