import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import RelationList from './RelationList'
import classes from './GuestManagement.module.css'
import Dialog from '../UI/Dialog/Dialog'
import { Fragment } from 'react'
@inject('guestManagement', 'wedding', 'auth')
@observer
class TableManager extends Component {
	async componentDidMount() {
		if (!this.props.wedding.wedding.id) {
			await this.props.wedding.getWeddingDetails(this.props.auth.id)
		}
		if (!this.props.guestManagement.tables.length) {
			this.props.guestManagement.getGuests(this.props.wedding.wedding.id)
			this.props.guestManagement.getTables(this.props.wedding.wedding.id)
		}
	}

	table(table) {
		const relations = this.props.guestManagement.relations
		return (
			<Fragment>
				<h1>Table #{table.number}</h1>
				<h3>{`${table.title} ${table.seated}/${table.capacity}`}</h3>
				{relations.map(n => (
					<RelationList tableId={table.id} relation={n} key={n} />
				))}
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
