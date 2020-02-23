import { observable, action, computed } from 'mobx'
import Axios from 'axios'
const API_URL = `http://localhost:4200`

class Wedding {
	@observable weddingData = {
		groom_name: '',
		bride_name: '',
		wedding_date: '',
		est_invitees: 0,
		est_budget: 0,
		wedding_area: ''
	}

	@observable _userFavorites = []
	@observable bookedVendors = []

	@action handleInput = (name, value) => {
		this.weddingData[name] = value
	}

	@action updateUserInfo = async () => {
		try {
			let update = await Axios.put(
				`${API_URL}/api/wedding-details/user-profile`,
				this.weddingData
			)
			return update.data
		} catch (err) {
			console.log(err)
			throw new Error(err.response.data.message)
		}
	}

	@action getWeddingDetails = async id => {
		try {
			let weddingData = await Axios.get(
				`${API_URL}/api/wedding-details/${id}`
			)
			this.weddingData = weddingData.data
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
