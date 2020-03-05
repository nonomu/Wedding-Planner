import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Guest from './Guest'
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core'

@inject('guestManagement')
@observer
class RelationList extends Component {
	

	render() {
		const guests = this.props.guests
		return (
			<div>
				<p><strong>{this.props.relation}</strong></p>
				<Table>
					<TableHead>
						<TableRow className='listOfInvitees'>
							<TableCell>Name</TableCell>
							<TableCell>Party Size</TableCell>
							<TableCell>Table #</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{guests.map(i => (
							<Guest key={i.id} guest={i} />
						))}
					</TableBody>
				</Table>
			</div>
		)
	}
}

export default RelationList
