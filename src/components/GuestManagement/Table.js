import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

@inject('guestManagement')
@observer

class Table extends Component {
	render() {
		let guests = this.props.guestManagement.guests
		let sameTableGuests = guests.filter(i => i.table_id === this.props.t.id)
		return (
			<div>
				<Button
					component={Link}
					to={`/addtotable/${this.props.t.id}`} >
					<table className='table'>
						<thead>
							<tr>
								<td>
									<div className="tableName">	{this.props.t.table_name} - {this.props.t.seated}/{this.props.t.num_seats}</div>
								</td>
							</tr>
						</thead>
						<tbody>
							{sameTableGuests.map(i => (
								<tr key={i.name}>
									<td key={i.name} ><span>{i.name}</span>  <span className="numOfinvitees">({i.num_invitees})</span></td>
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
