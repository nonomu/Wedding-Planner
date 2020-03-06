import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { toast as popup } from 'react-toastify'
import VendorCard from './Card'
import { AuthContext } from '../../stores/Auth'
import { WeddingContext } from '../../stores/Wedding'

const Vendor = ({ vendor, isBookedCategory }) => {
		const auth = useContext(AuthContext)
		const wedding = useContext(WeddingContext)

		const removeFavorite = async () => {
			const userId = auth.id
			const vendorId = vendor.id
			const remove = await wedding.removeFavorite(userId, vendorId)
			popup.success(remove)
		}
		const addToFavorites = async () => {
			const userId = auth.id
			const vendorId = vendor.id
			const add = await wedding.addToFavorites(userId, vendorId)
			popup.success(add)
		}

		const isFavorite = vendor && wedding.isFavorite(vendor.id)

		return (
			<VendorCard
				isBookedCategory={isBookedCategory}
				isFavorite={isFavorite}
				vendor={vendor}
				removeFavorite={removeFavorite}
				addToFavorites={addToFavorites}
			/>
		)
	}

export default observer(Vendor)
