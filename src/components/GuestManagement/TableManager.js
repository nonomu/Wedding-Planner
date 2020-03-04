import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import RelationList from './RelationList'
import Dialog from '../UI/Dialog/Dialog'
import { Fragment } from 'react'
@inject('guestManagement', 'wedding', 'auth')
@observer
class TableManager extends Component {
	async componentDidMount() {
		if (!this.props.wedding.wedding.id) {
			const userId = this.props.auth.id
			await this.props.wedding.getWeddingDetails(userId)
		}
		if (!this.props.guestManagement.tables.length) {
			const weddingId = this.props.wedding.wedding.id
			this.props.guestManagement.getGuests(weddingId)
			this.props.guestManagement.getTables(weddingId)
		}
	}

	table(table) {
		const relations = this.props.guestManagement.relations
		const list = n => (
			<RelationList tableId={table.id} relation={n} key={n} />
		)
		return (
			<Fragment>
				<h1>Table #{table.number}</h1>
				<h3>{`${table.title} ${table.seated}/${table.capacity}`}</h3>
				{relations.map(list)}
			</Fragment>
		)
	}

	render() {
		const tableId = this.props.match.params.tableId
		const tables = this.props.guestManagement.tables
		const table = tables.find(t => t.id === parseInt(tableId))
		return (
			<Dialog>
				{table ? this.table(table) : <h1>Table Not Found!</h1>}		
			</Dialog>
		)
	}
}

export default TableManager
