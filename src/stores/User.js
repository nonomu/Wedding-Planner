import { observable, action, computed } from 'mobx'
import Axios from 'axios'
let API_URL = `http://localhost:4200`

class User {
	@observable userInfo = {
		id: sessionStorage.getItem('id') || 0,
		weddingData: {
			groom_name: '',
			bride_name: '',
			wedding_date: '',
			est_invitees: 0,
			est_budget: 0,
			wedding_area: ''
		}
	}
	@observable _userFavorites = []
	@observable bookedAttractions = []
	@observable userLogedIn = false

	@action handleInput = (name, value) => {
		this.userInfo.weddingData[name] = value
	}

	@action userRegister = async userData => {
		try {
			let user = await Axios.post(`${API_URL}/api/register`, { userData })
			let userId = user.data.newUser[0]
			this.userInfo.id = userId
			this.userLogedIn = true
			sessionStorage.setItem('id', userId)
			return user.data.message
		} catch (err) {
			throw new Error(err.response.data.message)
		}
	}

	@action userLogin = async (email, password) => {
		try {
			let user = await Axios.post(`${API_URL}/api/login`, { email, password })
			this.userInfo.id = user.data.id
			sessionStorage.setItem('id', user.data.id)
			sessionStorage.setItem('loggedIn', true)
			this.userLogedIn = !this.userLogedIn
		} catch (err) {
			throw new Error(err.response.data.message)
		}
	}
	@action updateUserInfo = async () => {
		try {
			let update = await Axios.put(
				`${API_URL}/api/update/UserInfo`,
				this.userInfo.weddingData
			)
			return update.data
		} catch (err) {
			console.log(err)
			throw new Error(err.response.data.message)
		}
	}

	@action getWeddingDetails = async () => {
		try {
			let userInfo = await Axios.get(
				`${API_URL}/api/wedding-details/${this.userInfo.id}`
			)
			this.userInfo.weddingData = userInfo.data
		} catch (err) {
			console.log(err)
		}
	}

	@action isFavorite(attr_id) {
		return this._userFavorites.some(a => a.id === attr_id)
	}

	@action getUserFavorites = async () => {
		try {
			let userFavorites = await Axios.get(
				`${API_URL}/api/favorites/${this.userInfo.id}`
			)
			this._userFavorites = userFavorites.data
		} catch (err) {
			console.log(err)
		}
	}
	@action removeFavorite = async (userId, attractionId) => {
		try {
			let remove = await Axios.delete(`${API_URL}/api/favorite/`, {
				data: { userId, attractionId }
			})
			await this.getUserFavorites()
			return remove.data
		} catch (err) {
			console.log(err)
		}
	}

	@action addToFavorites = async (userId, attractionId) => {
		try {
			let add = await Axios.post(`${API_URL}/api/attractions/favorite`, {
				userId,
				attractionId
			})
			await this.getUserFavorites()
			return add.data
		} catch (err) {
			return err
		}
	}
	@action bookAttraction = async (userId, attractionId, price) => {
		try {
			await Axios.post(`${API_URL}/api/attractions/book`, {
				userId,
				attractionId,
				price
			})
			await this.getBookedAttractions()
		} catch (err) {
			console.log(err)
		}
	}
	@action getBookedAttractions = async () => {
		try {
			let bookedAttractions = await Axios.get(
				`${API_URL}/api/bookedAttractions/${this.userInfo.id}`
			)
			this.bookedAttractions = bookedAttractions.data
		} catch (err) {
			console.log(err)
		}
	}

	@computed get favoritesCategories() {
		return [...new Set(this._userFavorites.map(a => a.category))]
	}
}

export const user = new User()
