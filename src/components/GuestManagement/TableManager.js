import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import RelationList from './RelationList'
import './guest-management.css'
import Dialog from '../UI/Dialog/Dialog'
@inject('guestManagement', 'wedding', 'auth')
@observer
class TableManager extends Component {
	async componentDidMount() {
		if (!this.props.wedding.weddingData.id) {
			await this.props.wedding.getWeddingDetails(this.props.auth.id)
		}
		if (!this.props.guestManagement.tables.length) {
			this.props.guestManagement.getGuests(this.props.wedding.weddingData.id)
			this.props.guestManagement.getTables(this.props.wedding.weddingData.id)
		}
	}
	
	render() {
		let tables = this.props.guestManagement.tables
		let table = tables.find(
			t => t.id === parseInt(this.props.match.params.manageTableId)
		)
		return (
			<Dialog>
				<h1>
					Table #{table ? `${table.table_number} ` : null} <br></br>(
					<span className='numOfTable'>
						{' '}
						{table
							? `${table.table_name} ${table.seated}/${table.num_seats}`
							: null}
					</span>
					)
				</h1>
				{this.props.guestManagement.relations.map(n => (
					<RelationList manageTableId={this.props.match} relation={n} key={n} />
				))}
			</Dialog>
		)
	}
}

export default TableManager
