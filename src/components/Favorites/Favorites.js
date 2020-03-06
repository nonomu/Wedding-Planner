import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react'
import { isBookedCategory, loadPageContent } from '../../helpers/vendors'
import Vendor from '../Vendors/Vendor'
import classes from './Favorites.module.css'
import { AuthContext } from '../../stores/Auth'
import { WeddingContext } from '../../stores/Wedding'
import { VendorsContext } from '../../stores/Vendors'

const favoritesList = wedding => {
	const { favorites, categories } = wedding

	return (
		favorites.length && categories.map(c => {
			return (
				<div key={c} className={classes.Favorite}>
					<h4 className={classes.Category}>{c}</h4>
					<div className={classes.FavoriteList}>
						{favorites.map(f => {
							const booked = isBookedCategory(categories, f.category)
							return (
								f.category === c && (
									<Vendor vendor={f} key={f.id} isBookedCategory={booked} />
								)
							)
						})}
					</div>
				</div>
			)
		})
	)
}

const errorPhrase = () => (
	<p className={classes.NoFavorites}>You have no favorites yet</p>
)

const Favorites = ({ match }) => {
	const auth = useContext(AuthContext)	
	const wedding = useContext(WeddingContext)
	const vendors = useContext(VendorsContext)
	useEffect(() => {
			const url = match.url
			auth.setURL(url)
			loadPageContent(auth, vendors, wedding)
		}, [auth, match.url, vendors, wedding])

		return (
			<div className={classes.Favorites}>
				<h1 className={classes.Title}>Favorites</h1>
				{favoritesList(wedding) || errorPhrase()}
			</div>
		)
	}

export default observer(Favorites)
