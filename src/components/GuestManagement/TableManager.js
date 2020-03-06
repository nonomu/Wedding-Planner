import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react'
import RelationList from './RelationList'
import Dialog from '../UI/Dialog/Dialog'
import { loadTableContent, getRelatedGuests } from '../../helpers/guestManagement'
import { Fragment } from 'react'
import { AuthContext } from '../../stores/Auth'
import { GuestManagementContext } from '../../stores/GuestManagement'
import { WeddingContext } from '../../stores/Wedding'


const table = (relations, table, guestManagement) => {
	const list = n => {
		const guests = getRelatedGuests(guestManagement, n)
		return (
		<RelationList guests={guests} relation={n} key={n} />
		)}
	return (
		<Fragment>
			<h1>Table #{table.number}</h1>
			<h3>{`${table.title} ${table.seated}/${table.capacity}`}</h3>
			{relations.map(list)}
		</Fragment>
	)
}

const TableManager = ({match}) => {
	const auth = useContext(AuthContext)
		const guestManagement = useContext(GuestManagementContext)
		const wedding = useContext(WeddingContext)
		const relations = guestManagement.relations
		const tableId = parseInt(match.params.tableId)
		const tables = guestManagement.tables
		const tableData = tables.find(t => t.id === tableId)

		useEffect(() => {
			loadTableContent(auth, wedding, guestManagement)
		})

		return (
			<Dialog>
				{tableData ? table(relations, tableData, guestManagement) : <h1>Table Not Found!</h1>}		
			</Dialog>
		)
	}

export default observer(TableManager)
