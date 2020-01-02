import { observable, action, computed } from 'mobx'
import axios from 'axios'
let API_URL = `http://localhost:4200/api`

class Attractions {
    @observable _attractions = []
    @observable open = false

    @computed get attractions() {
        return this.category ? this.attractionsByCategory
        : this._attractions
    }

    @action closeDialog = () => {
        this.open = false 
    }
    @action openDialog = () => {
        this.open = true
    }

    @action  attractionsByCategory(category) {
        return this._attractions.length ? 
        this._attractions.filter(a => a.category === category) : []
    }

    @computed get categories(){
        return [...new Set(this._attractions.map(a => a.category))]
    }

    @action getAttractions = async () => {
        try {
            let attractions = await axios.get(`${API_URL}/attractions`)
            this._attractions = attractions.data
        } catch (err) {
            console.log(err)
        }
    }

    @action getAttractionData(category, id) {
        return this._attractions.find(a => a.category === category && a.id === parseInt(id))
    }

}

export const attractions = new Attractions()