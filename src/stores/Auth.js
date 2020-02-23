import { observable, action } from 'mobx'
import axios from 'axios'
const API_URL = `http://localhost:4200`

class Auth {
	@observable id = null
  @observable token = null
  @observable loggedIn = false

	@action userRegister = async userData => {
		try {
			const user = await axios.post(`${API_URL}/api/register`, { userData })
      const id = user.data.id
      const token = user.data.token
      this.id = id
      this.token = token
			this.loggedIn = true
      sessionStorage.setItem('id', id)
      sessionStorage.setItem('token', token)
			return user.data.message
		} catch (err) {
			throw new Error(err.response.data.message)
		}
	}

	@action autoLogin = () => {
		try {
			const token = sessionStorage.getItem('token')
			if (!token) {
				throw new Error('User not logged in')
			}
			const id = sessionStorage.getItem('id')
			this.id = id
			this.token = token
			this.loggedIn = true
		} catch (err) {
			this.id = null
			this.token = null
			this.loggedIn = false
			sessionStorage.clear()
		}
	}

	@action userLogin = async (email, password) => {
		try {
			let user = await axios.post(`${API_URL}/api/login`, { email, password })
			this.id = user.data.id
			this.token = user.data.token
			sessionStorage.setItem('id', user.data.id)
			sessionStorage.setItem('token', user.data.token)
			sessionStorage.setItem('loggedIn', true)
			this.loggedIn = true
		} catch (err) {
			throw new Error(err.response.data.message)
		}
	}
}

export const auth = new Auth()
