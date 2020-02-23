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
import './guest-management.css'

@inject('guestManagement')
@observer
class RelationList extends Component {
	getRelatedGuests() {
		return this.props.guestManagement.getRelatedGuests(this.props.relation)
	}

	render() {
		let related = this.getRelatedGuests()
		let manageTableId = parseInt(this.props.manageTableId.params.manageTableId)
		return (
			<div>
				<h2>{this.props.relation}</h2>
				<Table>
					<TableHead>
						<TableRow className='listOfInvitees'>
							<TableCell>Name</TableCell>
							<TableCell>Guests</TableCell>
							<TableCell>Table #</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{related.map(i => (
							<Guest manageTableId={manageTableId} key={i.id} details={i} />
						))}
					</TableBody>
				</Table>
			</div>
		)
	}
}

export default RelationList
