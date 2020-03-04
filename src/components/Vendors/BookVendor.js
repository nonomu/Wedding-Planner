import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Fab, TextField } from '@material-ui/core'
import Dialog from '../UI/Dialog/Dialog'
import DoneIcon from '@material-ui/icons/Done'
import { toast as popup } from 'react-toastify'
import classes from './BookVendor.module.css'
@inject('vendors', 'wedding', 'auth')
@observer
class BookVendor extends Component {
	state = {
		price: ''
	}

	handleInput = event => {
		this.setState({ price: event.target.value })
	}

	bookVendor = async vendorId => {
		try {
			const price = this.state.price
		if (!price) {
			throw new Error('Please enter a valid price')
		}
		await this.props.wedding.bookVendor(vendorId, price)
		this.props.history.push('/budget-tracker')
		} catch (err) {
			popup.error(err.message)
		}
	}

	componentDidMount() {
		if (!this.props.vendors._vendors.length) {
			this.props.vendors.getVendors()
		}
	}

	render() {
		const vendor = this.props.vendors._vendors
			? this.props.vendors.getVendorData(
					this.props.match.params.category,
					this.props.match.params.id
			)
			: {}
		return (
			<Dialog>
				{vendor && (
					<div className={classes.BookVendor}>
						<h2>You've got a {vendor.category}!</h2>
						<img
							src='https://www.vippng.com/png/detail/5-50383_emojis-transparent-png-party-emoji-png.png'
							style={{ width: '150px' }}
							alt='happyEmoji'
						/>
						<h4>Another item crossed off the to-do list.</h4>
						<p>
							Let’s log this in your budget. How much did your {vendor.category}{' '}
							cost?
						</p>

						<TextField
							name='price'
							type='number'
							label='Price'
							value={this.state.price}
							onChange={this.handleInput}
							placeholder='Enter Price'
						/>

						<h5>
							If you have any changes or additions, make those changes in your
							Budget Tracker.
							<br />
							Once the wedding is over, we’ll remind you to leave a review
							<br />
							but if you want, you can do that now.
						</h5>

						<Fab
							color='secondary'
							className='submit-price'
							onClick={() => this.bookVendor(vendor.id)}
							>
							<DoneIcon />
						</Fab>
					</div>
				)}
			</Dialog>
		)
	}
}

export default BookVendor
