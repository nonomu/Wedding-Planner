import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

@inject('manage_seats')
@observer
class Table extends Component {

	selectTable = () => {
		this.props.manage_seats.selectedTable = this.props.t.id
		this.props.manage_seats.selectedTableName = this.props.t.table_name
		this.props.manage_seats.selectedTableMaxSeats = this.props.t.num_seats
		this.props.manage_seats.getAvailableSeats()
		
	}
	render() {
		return (
			<table className='table'>
				<thead>
					<tr>
						<td>
							<Button
								onClick={this.selectTable}
								component={Link}
								to='/addtotable'>
								{this.props.t.table_name} - {this.props.t.num_seats}
							</Button>
						</td>
					</tr>
				</thead>
				<tbody>
					{this.props.manage_seats.invitees
						.filter(i => i.table_id === this.props.t.id)
						.map(i => (
							<tr key={i.name}>
								<td key={i.name}>{i.name}</td>
							</tr>
						))}
				</tbody>
			</table>
		)
	}
}

export default Table
