import React, { Component } from 'react'
import Vendor from './Vendor'
import { observer, inject } from 'mobx-react'
import classes from './Vendors.module.css'
import ClippedDrawer from '../UI/ClippedDrawer/ClippedDrawer'
@inject('vendors', 'wedding', 'auth')
@observer
class Vendors extends Component {
	async componentDidMount() {
		this.props.auth.setURL('/vendors')
		if (!this.props.vendors.vendors.length) {
			this.props.vendors.getVendors()
		}
		if (!this.props.wedding.wedding.id) {
			await this.props.wedding.getWeddingDetails(this.props.auth.id)
			const weddingId = this.props.wedding.wedding.id
			this.props.wedding.getBookedVendors(weddingId)
		}
	}

	isBookedCategory() {
		const selectedCategory = this.props.match.params.category
		const categories = this.props.wedding.bookedVendorCategories
		return categories.some(c => c === selectedCategory)
	}

	render() {
		const favorites = this.props.wedding.favorites
		const category = this.props.match.params.category
		const vendors = this.props.vendors.vendorsByCategory(category)
		const isBookedCategory = this.isBookedCategory()
		return (
			<ClippedDrawer categories={this.props.vendors.categories}>
				<div>
					<h1 className={classes.VendorTitle}>{this.props.match.params.category}</h1>
					<div className={classes.Vendors}>
						{vendors.map(v => (
							<Vendor
								favorites={favorites}
								key={v.id}
								vendor={v}
								isBookedCategory={isBookedCategory}
							/>
						))}
					</div>
				</div>
			</ClippedDrawer>
		)
	}
}

export default Vendors
