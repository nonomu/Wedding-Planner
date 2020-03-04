import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toast as popup } from 'react-toastify'
import { TableRow, TableCell } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { withRouter } from 'react-router-dom'

@inject('guestManagement')
@observer
class Guest extends Component {
	onClick = belongsToTable => {
		const guest = this.props.guest
		const tableId = parseInt(this.props.match.params.tableId)
		const tables = this.props.guestManagement.tables
		const table = tables.find(t => t.id === tableId)
		if (belongsToTable) {
			return this.removeGuestFromTable(guest, table)
		}
		return this.addGuestToTable(guest, table)
	}

	belongsToTable = () => {
		const guest = this.props.guest
		const tableId = parseInt(this.props.match.params.tableId)
		return guest.tableId === tableId
	}

	getAction = belongsToTable => {
		return belongsToTable ? 'remove_circle' : 'add_circle'
	}

	getIconColor = belongsToTable => {
		return { color: belongsToTable ? 'red' : 'green' }
	}

	getActionIcon(belongsToTable) {
		const onClick = () => this.onClick(belongsToTable) 
		const style = this.getIconColor(belongsToTable)
		const action = this.getAction(belongsToTable)
		return (
			<Icon onClick={onClick} style={style}>
				{action}
			</Icon>
		)
	}

	addGuestToTable = async (guest, table) => {
		try {
			const manager = this.props.guestManagement
			const addToTable = await manager.addGuestToTable(guest, table)
			popup.success(addToTable)
		} catch (err) {
			popup.error(err.message)
		}
	}

	removeGuestFromTable = async (guest, table) => {
		try {
			const manager = this.props.guestManagement
			const removeFromTable = await manager.removeGuestFromTable(guest, table)
			popup.success(removeFromTable)
		} catch (err) {
			popup.error(err.message)
		}
	}
	
	render() {
		const guest = this.props.guest
		const tables = this.props.guestManagement.tables
		const tableNum = tables.findIndex(t => t.id === guest.tableId) + 1
		const belongsToTable = this.belongsToTable()
		return (
			<TableRow>
				<TableCell>{guest.name} </TableCell>
				<TableCell>{guest.partySize}</TableCell>
				<TableCell>{tableNum || 'N/A'}</TableCell>
				<TableCell>{this.getActionIcon(belongsToTable)}</TableCell>
			</TableRow>
		)
	}
}
export default withRouter(Guest)
