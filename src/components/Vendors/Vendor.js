import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { toast as popup } from 'react-toastify'
import VendorCard from './Card'

@inject('vendors', 'wedding', 'auth')
@observer
class Vendor extends Component {
	removeFavorite = async () => {
		let remove = await this.props.wedding.removeFavorite(
			this.props.auth.id,
			this.props.vendor.id
		)
		popup.success(remove)
	}
	addToFavorites = async () => {
		let add = await this.props.wedding.addToFavorites(
			this.props.auth.id,
			this.props.vendor.id
		)
		popup.success(add)
	}

	isFavorite = () => {
		return this.props.wedding.isFavorite(this.props.vendor.id)
	}

	render() {
		const isFavorite = this.props.vendor ? this.isFavorite() : false
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
