import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import classes from './BudgetCard.module.css'
import { WeddingContext } from '../../stores/Wedding'

const BudgetCard = () => {
	const wedding = useContext(WeddingContext)
	const bookedVendors = wedding.bookedVendors
	const totalPrice = bookedVendors.length
		? bookedVendors.reduce((a, b) => a + b.bookedVendor.price, 0)
		: 0
	const budget = wedding.wedding.budget
	return (
		<div className={classes.Budget}>
			<Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
				<List id='budg-list'>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<LocalAtmIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Total Budget' secondary={budget + '₪'} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<CreditCardIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Total spent' secondary={totalPrice + '₪'} />
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
	)
}

export default observer(BudgetCard)
