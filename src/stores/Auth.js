import { observable, action } from 'mobx'
import { createContext } from 'react'
import axios from 'axios'
const API_URL = `http://localhost:4200`

class Auth {
	@observable id = null
  @observable token = null
	@observable loggedIn = false
	@observable url = '/'

	@action setURL = (url) => {
		this.url = url
	}

	@action register = async (user, wedding) => {
		try {
			const register = await axios.post(`${API_URL}/api/register`, { user, wedding })
      const id = register.data.id
      const token = register.data.token
      this.id = id
			this.token = token
			this.loggedIn = true
			console.log(this.loggedIn)
      sessionStorage.setItem('id', id)
      sessionStorage.setItem('token', token)
			sessionStorage.setItem('loggedIn', true)
			this.setURL('/')
			
			return register.data.message
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

	@action login = async (loginData) => {
		try {
			const login = await axios.post(`${API_URL}/api/login`, loginData)
			this.id = login.data.id
			this.token = login.data.token
			this.setURL('/')
			this.loggedIn = true
			sessionStorage.setItem('id', login.data.id)
			sessionStorage.setItem('token', login.data.token)
			sessionStorage.setItem('loggedIn', true)
			return login.data.message
		} catch (err) {
			throw new Error(err.response.data.message)
		}
	}

	@action logOut = () => {
		sessionStorage.clear()
		this.id = null
		this.token = null
		this.loggedIn = false
	}
}

export const AuthContext = createContext(new Auth())
