import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import classes from './GuestManagement.module.css'
import { GuestManagementContext } from '../../stores/GuestManagement'

const Table = ({table}) => {
	const {guests} = useContext(GuestManagementContext)
	const tableGuests = guests.filter(g => g.table_id === table.id)

	return (
		<div>
			<Button
				component={Link}
				to={`/table-manager/${table.id}`} >
				<table className={classes.Table}>
					<thead>
						<tr>
							<td>
								<div className={classes.Title}>	{table.title} - {table.seated}/{table.capacity}</div>
							</td>
						</tr>
					</thead>
					<tbody>
						{tableGuests.map(g => (
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

export default observer(Table)
