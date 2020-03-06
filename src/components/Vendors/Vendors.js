import React, { useEffect, useContext } from 'react'
import Vendor from './Vendor'
import { observer } from 'mobx-react'
import { isBookedCategory, loadPageContent } from '../../helpers/vendors'
import classes from './Vendors.module.css'
import ClippedDrawer from '../UI/ClippedDrawer/ClippedDrawer'
import { AuthContext } from '../../stores/Auth'
import { VendorsContext } from '../../stores/Vendors'
import { WeddingContext } from '../../stores/Wedding'

const Vendors = ({ match }) => {
	const vendors = useContext(VendorsContext)
	const wedding = useContext(WeddingContext)	
	const auth = useContext(AuthContext)
	
		useEffect(() => {
			auth.setURL('/vendors')
			loadPageContent(auth, vendors, wedding)
		}, [auth, vendors, wedding])

		const { favorites, bookedVendorCategories } = wedding
		const category = match.params.category
		const vendorsList = vendors.vendorsByCategory(category)
		const isBooked = isBookedCategory(bookedVendorCategories, category)

		return (
			<ClippedDrawer categories={vendors.categories}>
				<h1 className={classes.VendorTitle}>{category}</h1>
				<div className={classes.Vendors}>
					{vendorsList.map(v => (
						<Vendor
							favorites={favorites}
							key={v.id}
							vendor={v}
							isBookedCategory={isBooked}
						/>
					))}
				</div>
			</ClippedDrawer>
		)
	}

export default observer(Vendors)
