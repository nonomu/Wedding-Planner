import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import classes from './GuestManagement.module.css'

@inject('guestManagement', 'wedding', 'auth')
@observer

class Table extends Component {

	componentDidMount() {
		if (!this.props.wedding.wedding.id) {
			this.props.wedding.getWeddingDetails(this.props.auth.id)
		}
	}

	render() {
		let guests = this.props.guestManagement.guests
		let sameTableGuests = guests.filter(g => g.table_id === this.props.t.id)
		return (
			<div>
				<Button
					component={Link}
					to={`/table-manager/${this.props.t.id}`} >
					<table className={classes.Table}>
						<thead>
							<tr>
								<td>
									<div className={classes.Title}>	{this.props.t.title} - {this.props.t.seated}/{this.props.t.capacity}</div>
								</td>
							</tr>
						</thead>
						<tbody>
							{sameTableGuests.map(g => (
								<tr key={g.title}>
									<td key={g.name} ><span>{g.name}</span>  <span className={classes.NumOfGuests}>({g.partySize})</span></td>
								</tr>
							))}
						</tbody>
					</table>
				</Button>
			</div>
		)
	}
}

export default Table
