import React from 'react'
import { observer } from 'mobx-react'
import Guest from './Guest'
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core'

const RelationList = ({ guests, relation }) => (
	<div>
		<p>
			<strong>{relation}</strong>
		</p>
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


export default observer(RelationList)
