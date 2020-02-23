import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toast as popup } from 'react-toastify'
import {TableRow, TableCell} from '@material-ui/core'
import Icon from '@material-ui/core/Icon'

@inject('guestManagement')
@observer
class Guest extends Component {
	addGuestToTable = async () => {
		try {
			let manageTableId = this.props.manageTableId
			let currentTable = this.props.guestManagement.tables.find(
				t => t.id === manageTableId
			)
			if (
				this.props.details.num_invitees + currentTable.seated >
				currentTable.num_seats
			)
				throw new Error(
					`You have reached the maximum amount of seats for this table`
				)
			let addToTable = await this.props.guestManagement.addGuestToTable(
				this.props.details,
				currentTable
			)
			popup.success(addToTable)
		} catch (err) {
			popup.error(err.message)
		}
	}
	removeGuestFromTable = async () => {
		try {
			let manageTableId = this.props.manageTableId
			let currentTable = this.props.guestManagement.tables.find(
				t => t.id === manageTableId
			)
			let guest = this.props.guestManagement.guests.find(
				i => i.id === this.props.details.id
			)
			let removeFromTable = await this.props.guestManagement.removeGuestFromTable(
				guest,
				currentTable
			)
			popup.success(removeFromTable)
		} catch (err) {
			popup.error(err.message)
		}
	}
	render() {
		let tables = this.props.guestManagement.tables
		let guests = this.props.guestManagement.guests
		let guest = guests.find(i => i.id === this.props.details.id)
		let tableNum = tables.findIndex(t => t.id === guest.table_id) + 1
		let tablePopId = this.props.manageTableId
		let guestDetails = this.props.details
		return (
			<TableRow>
				<TableCell>{guestDetails.name} </TableCell>
				<TableCell>{guestDetails.num_invitees}</TableCell>
				<TableCell>{tableNum}</TableCell>
				<TableCell>
					{guest.table_id !== tablePopId ? (
						<Icon onClick={this.addGuestToTable} style={{ color: 'green' }}>
							add_circle
						</Icon>
					) : (
						<Icon
							onClick={this.removeGuestFromTable}
							style={{ color: 'red' }}>
							remove_circle
						</Icon>
					)}
				</TableCell>
			</TableRow>
		)
	}
}
export default Guest
