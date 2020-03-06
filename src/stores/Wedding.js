import { observable, action, computed } from 'mobx'
import Axios from 'axios'
import { handleError } from '../helpers/validator'
import { createContext } from 'react'
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
			const URL = API_URL + '/api/wedding-details/profile'
			const payload = { wedding: this.wedding }
			const update = await Axios.put(URL, payload)
			return update.data
		} catch (err) {
			throw new Error(err.message)
		}
	}

	@action getWeddingDetails = async id => {
		try {
			const URL = API_URL + '/api/wedding-details/' + id
			const wedding = await Axios.get(URL)
			this.wedding = wedding.data
		} catch (err) {
			console.log(err)
		}
	}

	@action isFavorite(vendorId) {
		return this._userFavorites.some(v => v.id === vendorId)
	}

	@action getUserFavorites = async id => {
		try {
			const URL = API_URL + '/api/vendors/favorites/' + id
			const userFavorites = await Axios.get(URL)
			this._userFavorites = userFavorites.data
		} catch (err) {
			console.log(err)
		}
	}
	@action removeFavorite = async (userId, vendorId) => {
		try {
			const URL = API_URL + '/api/vendors/favorite/'
			const payload = { data: { userId, vendorId } }
			const remove = await Axios.delete(URL, payload)
			await this.getUserFavorites(userId)
			return remove.data
		} catch (err) {
			console.log(err)
		}
	}

	@action addToFavorites = async (userId, vendorId) => {
		try {
			const URL = API_URL + '/api/vendors/favorite'
			const payload = { userId, vendorId }
			const add = await Axios.post(URL, payload)
			await this.getUserFavorites(userId)
			return add.data
		} catch (err) {
			return err
		}
	}
	@action bookVendor = async (vendorId, price) => {
		try {
			const weddingId = this.wedding.id
			const URL = API_URL + '/api/vendors/book'
			const payload = { weddingId, vendorId, price }
			await Axios.post(URL, payload)
			await this.getBookedVendors()
		} catch (err) {
			console.log(err)
		}
	}
	@action getBookedVendors = async weddingId => {
		try {
			const URL = API_URL + '/api/vendors/booked/' + weddingId
			const bookedVendors = await Axios.get(URL)
			this.bookedVendors = bookedVendors.data
		} catch (err) {
			console.log(err)
		}
	}

	@computed get bookedVendorCategories() {
		const bookedVendors = this.bookedVendors
		return bookedVendors.map(v => v.category)
	}

	@computed get favorites() {
		return this._userFavorites
	}

	@computed get categories() {
		return [...new Set(this._userFavorites.map(a => a.category))]
	}
}

export const WeddingContext = createContext(new Wedding())