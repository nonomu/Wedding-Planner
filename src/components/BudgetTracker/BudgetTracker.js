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
import BookedVendor from './BookedVendor'
import classes from './BudgetTracker.module.css'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
@inject('wedding', 'auth')
@observer
class BudgetTracker extends Component {
	async componentDidMount() {
		await this.props.wedding.getBookedVendors(this.props.auth.id)
		if (!this.props.wedding.budget) {
			this.props.wedding.getWeddingDetails(this.props.auth.id)
		}
	}
	
	render() {
		const bookedVendors = this.props.wedding.bookedVendors
		const totalPrice = bookedVendors.length ? bookedVendors.reduce((a, b) => a + b.price, 0) : 0
		const budget = this.props.wedding.wedding.budget
		return (
			<div className={classes.BudgetTracker}>
				<div className={classes.Budget}>
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
									secondary={budget + '₪'}
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
									secondary={budget - totalPrice + '₪'}
								/>
							</ListItem>
						</List>
					</Card>
				</div>
				<div className={classes.Vendors}>
					{bookedVendors.length && bookedVendors.map(ba => (
						<BookedVendor key={ba.id} attr={ba} />
					))}
				</div>
			</div>
		)
	}
}

export default BudgetTracker
