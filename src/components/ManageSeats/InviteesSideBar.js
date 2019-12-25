import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import RelationList from './RelationList'
import CloseIcon from '@material-ui/icons/Close';
import { Fab } from '@material-ui/core';
import {Link} from 'react-router-dom'

@inject('manage_seats')
@observer
class InviteesSideBar extends Component {
    
    render() {
		let tableName = this.props.manage_seats.selectedTableName
		let tableNumber = this.props.manage_seats.selectedTableNumber
		return (
			<div className='box_bg'>
				<div className='user_box'>
					<Fab className='close' component={Link} to={'/manage_seats'}>
						<CloseIcon />
					</Fab>
					<h1>Add To Table #{tableNumber} - {tableName}</h1>
					{this.props.manage_seats.relations.map(n => (
						<RelationList relation={n} key={n} />
					))}
				</div>
			</div>
		)
	}
}

export default InviteesSideBar
