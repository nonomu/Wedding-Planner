import { observable, action } from 'mobx'
import axios from 'axios'
const API_URL = `http://localhost:4200`

class Auth {
	@observable id = null
  @observable token = null
  @observable loggedIn = false

	@action register = async (user, wedding) => {
		try {
			const register = await axios.post(`${API_URL}/api/register`, { user, wedding })
      const id = register.data.id
      const token = register.data.token
      this.id = id
      this.token = token
			this.loggedIn = true
      sessionStorage.setItem('id', id)
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('loggedIn', true)
			return user.data.message
		} catch (err) {
			throw new Error(err.response.data.message)
		}
	}

	@action autoLogin = async () => {
		try {
			const token = sessionStorage.getItem('token')
			if (!token) {
				throw new Error('User not logged in')
			}
			const autoLogin = await axios.post(API_URL + '/api/authenticate', { token })
			this.id = autoLogin.data.id
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
			let login = await axios.post(`${API_URL}/api/login`, { email, password })
			this.id = login.data.id
			this.token = login.data.token
			this.loggedIn = true
			sessionStorage.setItem('id', login.data.id)
			sessionStorage.setItem('token', login.data.token)
			sessionStorage.setItem('loggedIn', true)
			return login.data.message
		} catch (err) {
			throw new Error(err.response.data.message)
		}
	}
}

export const auth = new Auth()
