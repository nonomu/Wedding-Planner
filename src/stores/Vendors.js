import { observable, action, computed } from 'mobx'
import axios from 'axios'
let API_URL = `http://localhost:4200/api`

class Vendors {
    @observable _vendors = []

    @computed get vendors() {
        return this.category ? this.vendorsByCategory
        : this._vendors
    }

    @action vendorsByCategory(category) {
        return this._vendors.length ? 
        this._vendors.filter(a => a.category === category) : []
    }

    @computed get categories(){
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

    @action getVendorData(category, id) {
        return this._vendors.find(a => a.category === category && a.id === parseInt(id))
    }

}

export const vendors = new Vendors()