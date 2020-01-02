import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

import AddInvitee from "./AddInvitee";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Table from "./Table";
import './manage_seats.css'


@inject('manage_seats', 'user')
@observer
class ManageSeats extends Component {
	render() {
		return (
			<div id='manage_seats'>
				<AddInvitee />
				<div className="tables">
					{this.props.manage_seats.tables.map(t => (
						<Table key={t.id} t={t} />
					))}
				</div>

				<Fab
					id='addIcon'
					color='primary'
					aria-label='add'
					component={Link}
					to='/addtable'>
					<AddIcon />
				</Fab>
			</div>
		)
	}

}

export default ManageSeats
