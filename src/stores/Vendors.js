import { observable, action, computed } from 'mobx'
import axios from 'axios'
import { createContext } from 'react'
let API_URL = `http://localhost:4200/api`

class Vendors {
	@observable _vendors = []

	@computed get vendors() {
		return this._vendors
	}

	@action vendorsByCategory(category) {
		const callback = a => a.category === category
		const vendors = this._vendors.length ? this._vendors.filter(callback) : []
		return vendors
	}

	@computed get categories() {
		return [...new Set(this._vendors.map(a => a.category))]
	}

	@action getVendors = async () => {
		try {
			let vendors = await axios.get(`${API_URL}/vendors`)
			this._vendors = vendors.data
		} catch (err) {
			console.log(err)
		}
	}

	@action getVendorData = (category, id) => {
        const callback = v => v.category === category && v.id === parseInt(id)
        const vendors = this.vendors
		return vendors.length ? vendors.find(callback) : {}
	}
}

export const VendorsContext = createContext(new Vendors())
