import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { TableRow, TableCell } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import * as h from '../../helpers/guestManagement'
import { withRouter } from 'react-router-dom'
import { GuestManagementContext } from '../../stores/GuestManagement'

const Guest = observer(({guest, match}) => {
	const guestManagement = useContext(GuestManagementContext)
	const {tables} = guestManagement	
	const tableId = parseInt(match.params.tableId)
	const belongsToTable = h.belongsToTable(guest, tableId)
	const tableNum = tables.findIndex(t => t.id === guest.tableId) + 1

	const clickHandler = belongsToTable => {
		const table = tables.find(t => t.id === tableId)
		if (belongsToTable) {
			return h.removeGuestFromTable(guest, table, guestManagement)
		}
		return h.addGuestToTable(guest, table, guestManagement)
	}

	const getActionIcon = (belongsToTable) => {
		const onClick = () => clickHandler(belongsToTable) 
		const style = h.getIconColor(belongsToTable)
		const action = h.getAction(belongsToTable)
		return (
			<Icon onClick={onClick} style={style}>
				{action}
			</Icon>
		)
	}

	return (
		<TableRow>
			<TableCell>{guest.name} </TableCell>
			<TableCell>{guest.partySize}</TableCell>
			<TableCell>{tableNum || 'N/A'}</TableCell>
			<TableCell>{getActionIcon(belongsToTable)}</TableCell>
		</TableRow>
	)
})

export default withRouter(Guest)
