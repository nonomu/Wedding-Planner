import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react'
import BudgetCard from './BudgetCard'
import BookedVendor from './BookedVendor'
import { loadBudgetContent } from '../../helpers/budgetTracker'
import classes from './BudgetTracker.module.css'
import { AuthContext } from '../../stores/Auth'
import { WeddingContext } from '../../stores/Wedding'

const bookedVendors = vendors => {
	const vendor = v => <BookedVendor key={v.id} vendor={v} />
	return vendors.map(vendor)
}

const catchPhrase = () => <h3>You didn't book any vendor yet.</h3>

const BudgetTracker = ({ match }) => {
	const auth = useContext(AuthContext)
	const wedding = useContext(WeddingContext)
	useEffect(() => {
		const url = match.url
		auth.setURL(url)
		loadBudgetContent(wedding, auth)
	})

	const vendors = wedding.bookedVendors
	return (
		<div className={classes.BudgetTracker}>
			<BudgetCard />
			<div className={classes.Vendors}>
				{vendors.length ? bookedVendors(vendors) : catchPhrase()}
			</div>
		</div>
	)
}

export default observer(BudgetTracker)
