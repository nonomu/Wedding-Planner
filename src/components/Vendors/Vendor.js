import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { toast as popup } from 'react-toastify'
import VendorCard from './Card'

@inject('vendors', 'wedding', 'auth')
@observer
class Vendor extends Component {
	removeFavorite = async () => {
		const userId = this.props.auth.id
		const vendorId = this.props.vendor.id  
		const wedding = this.props.wedding
		const remove = await wedding.removeFavorite(userId, vendorId)
		popup.success(remove)
	}
	addToFavorites = async () => {
		const userId = this.props.auth.id
		const vendorId = this.props.vendor.id
		const wedding = this.props.wedding
		const add = await wedding.addToFavorites(userId, vendorId)
		popup.success(add)
	}

	isFavorite = () => {
		return this.props.wedding.isFavorite(this.props.vendor.id)
	}

	render() {
		const isFavorite = this.props.vendor && this.isFavorite()
		return (
				<VendorCard
					isBookedCategory={this.props.isBookedCategory}
					isFavorite={isFavorite}
					vendor={this.props.vendor}
					removeFavorite={this.removeFavorite}
					addToFavorites={this.addToFavorites}
					changeFavoriteState={this.changeFavoriteState}
				/>
		)
	}
}

export default Vendor
