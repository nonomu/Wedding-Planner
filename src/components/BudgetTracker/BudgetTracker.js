import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Card
} from '@material-ui/core'
import Paper from './Paper'

import './budget-tracker.css'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
@inject('user')
@observer
class BudgetTracker extends Component {
	render() {
		let bookedAttractions = this.props.user.bookedAttractions
		let totalPrice = bookedAttractions.reduce((a, b) => a + b.price, 0)
		let weddingDetailes = this.props.user.userInfo.weddingData
			? this.props.user.userInfo.weddingData
			: ''
		return (
			<div className='overview-container'>
				<div className='budget'>
					<Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
						<List id='budg-list'>
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<LocalAtmIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary='Total Budget'
									secondary={
										weddingDetailes ? weddingDetailes.est_budget + '₪' : ''
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<CreditCardIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary='Total spent'
									secondary={totalPrice + '₪'}
								/>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<AttachMoneyIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary='Remaining Budget'
									secondary={weddingDetailes.est_budget - totalPrice + '₪'}
								/>
							</ListItem>
						</List>
					</Card>
				</div>
				<div className='papers'>
					{bookedAttractions.map(ba => (
						<Paper key={ba.id} attr={ba} />
					))}
				</div>
			</div>
		)
	}
}

export default BudgetTracker
