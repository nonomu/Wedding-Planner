import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import AddGuestForm from "./AddGuestForm";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Table from "./Table";
import classes from './GuestManagement.module.css'


@inject('guestManagement', 'wedding', 'auth')
@observer
class GuestManagement extends Component {
	async componentDidMount() {
		if (!this.props.wedding.wedding.id) {
			await this.props.wedding.getWeddingDetails(this.props.auth.id)
		}
		this.props.guestManagement.getGuests(this.props.auth.id)
		this.props.guestManagement.getTables(this.props.auth.id)
	}

	render() {
		return (
			<div className={classes.GuestManagement}>
				<AddGuestForm />
				<div className={classes.Tables}>
					{this.props.guestManagement.tables.map(t => (
						<Table key={t.id} t={t} />
					))}
				</div>
				<div className={classes.AddIcon}>
				<Fab
					color='primary'
					aria-label='add'
					component={Link}
					to='/addtable'>
					<AddIcon />
				</Fab>
				</div>
			</div>
		)
	}

}

export default GuestManagement
