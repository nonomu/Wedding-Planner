import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import RelationList from './RelationList'
import CloseIcon from '@material-ui/icons/Close'
import { Fab } from '@material-ui/core'
import './guest-management.css'
@inject('manage_seats')
@observer
class TableManager extends Component {
	render() {
		let tables = this.props.manage_seats.tables
		let table = tables.find(
			t => t.id === parseInt(this.props.currenTableID.params.currenTableID)
		)
		return (
			<div className='box_bg'>
				<div className='user-table'>
					<Fab className='close' onClick={this.props.history.goBack}>
						<CloseIcon />
					</Fab>
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
					{this.props.manage_seats.relations.map(n => (
						<RelationList
							currenTableId={this.props.currenTableID}
							relation={n}
							key={n}
						/>
					))}
				</div>
			</div>
		)
	}
}

export default TableManager
