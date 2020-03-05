import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import BudgetCard from './BudgetCard'
import BookedVendor from './BookedVendor'
import classes from './BudgetTracker.module.css'

@inject('wedding', 'auth')
@observer
class BudgetTracker extends Component {
	async componentDidMount() {
		const url = this.props.match.url
		this.props.auth.setURL(url)
		await this.props.wedding.getBookedVendors(this.props.auth.id)
		if (!this.props.wedding.budget) {
			this.props.wedding.getWeddingDetails(this.props.auth.id)
		}
	}

	bookedVendors(vendors) {
		const vendor = v => <BookedVendor key={v.id} vendor={v} />
		return vendors.map(vendor)
	}

	render() {
		const vendors = this.props.wedding.bookedVendors
		return (
			<div className={classes.BudgetTracker}>
				<BudgetCard />
				<div className={classes.Vendors}>
				{vendors.length ? this.bookedVendors(vendors) : <h3>You didn't book any vendor yet.</h3>}
				</div>
			</div>
		)
	}
}

export default BudgetTracker
