import { observable, action, computed } from 'mobx'
import Axios from 'axios'
import {handleError} from '../helpers/validator'
const API_URL = `http://localhost:4200`

class Wedding {
	@observable wedding = {
		partner1: '',
		partner2: '',
		date: '',
		num_of_guests: 0,
		budget: 0,
		preferred_location: ''
	}

	@observable _userFavorites = []
	@observable bookedVendors = []

	@action handleInput = (name, value) => {
		this.wedding[name] = value
	}

	@action updateWeddingInfo = async () => {
		try {
			handleError(this.wedding)
			let update = await Axios.put(
				`${API_URL}/api/wedding-details/profile`,
				{wedding: this.wedding}
			)
			return update.data
		} catch (err) {
			throw new Error(err.message)
		}
	}

	@action getWeddingDetails = async id => {
		try {
			const wedding = await Axios.get(
				`${API_URL}/api/wedding-details/${id}`
			)
			this.wedding = wedding.data
		} catch (err) {
			console.log(err)
		}
	}

	@action isFavorite(attr_id) {
		return this._userFavorites.some(a => a.id === attr_id)
	}

	@action getUserFavorites = async id => {
		try {
			const userFavorites = await Axios.get(
				`${API_URL}/api/vendors/favorites/${id}`
			)
			this._userFavorites = userFavorites.data
		} catch (err) {
			console.log(err)
		}
	}
	@action removeFavorite = async (userId, attractionId) => {
		try {
			let remove = await Axios.delete(`${API_URL}/api/vendors/favorite/`, {
				data: { userId, attractionId }
			})
			await this.getUserFavorites(userId)
			return remove.data
		} catch (err) {
			console.log(err)
		}
	}

	@action addToFavorites = async (userId, vendorId) => {
		try {
			let add = await Axios.post(`${API_URL}/api/vendors/favorite`, {
				userId,
				vendorId
			})
			await this.getUserFavorites(userId)
			return add.data
		} catch (err) {
			return err
		}
	}
	@action bookVendor = async (userId, vendorId, price) => {
		try {
			await Axios.post(`${API_URL}/api/vendors/book`, {
				userId,
				vendorId,
				price
			})
			await this.getBookedVendors()
		} catch (err) {
			console.log(err)
		}
	}
	@action getBookedVendors = async id => {
		try {
			let bookedVendors = await Axios.get(
				`${API_URL}/api/vendors/booked/${id}`
			)
			this.bookedVendors = bookedVendors.data
		} catch (err) {
			console.log(err)
		}
	}

	@computed get bookedVendorCategories() {
		return this.bookedVendors.map(v => v.category)
	}

	@computed get favorites() {
		return this._userFavorites
	}

	@computed get favoritesCategories() {
		return [...new Set(this._userFavorites.map(a => a.category))]
	}
}

export const wedding = new Wedding()
