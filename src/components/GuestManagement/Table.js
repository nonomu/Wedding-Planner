import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

@inject('manage_seats')
@observer

class Table extends Component {
	constructor() {
		super()
		this.state = {
			render: false
		}
	}
	render() {
		let invitees = this.props.manage_seats.invitees
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
							{invitees
								.filter(i => i.table_id === this.props.t.id)
								.map(i => (
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
