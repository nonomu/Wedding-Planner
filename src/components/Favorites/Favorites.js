import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Vendor from '../Vendors/Vendor'
import classes from './Favorites.module.css'
@inject('wedding', 'vendors', 'auth')
@observer
class Favorites extends Component {
	async componentDidMount() {
		const url = this.props.match.url
		this.props.auth.setURL(url)
		if (!this.props.wedding.weddingData) {
			await this.props.wedding.getWeddingDetails(this.props.auth.id)
		}
		if (!this.props.vendors._vendors.length) {
			await this.props.vendors.getVendors()
		}
		this.props.wedding.getUserFavorites(this.props.auth.id)
	}

	isBookedCategory(category) {
		const categories = this.props.wedding.bookedVendorCategories
		return categories.some(c => c === category)
	}

	favorites() {
		const favorites = this.props.wedding.favorites
		const categories = this.props.wedding.favoritesCategories
		return favorites.length && categories.map(c => {
			return (
				<div key={c} className={classes.Favorite}>
					<h4 className={classes.Category}>{c}</h4>
					<div className={classes.FavoriteList}>
						{favorites.map(f => {
							const isBookedCategory = this.isBookedCategory(f.category)
							return (
								f.category === c && (
									<Vendor vendor={f} key={f.id} isBookedCategory={isBookedCategory} />
								)
							)
						})}
					</div>
				</div>
			)
		})
	}

	errorPhrase = () => (
		<p className={classes.NoFavorites}>You have no favorites yet</p>
	)

	render() {
		return (
			<div className={classes.Favorites}>
				<h1 className={classes.Title}>Favorites</h1>

				{this.favorites() || this.errorPhrase() }
			</div>
		)
	}
}

export default Favorites
