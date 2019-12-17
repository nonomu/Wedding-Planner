import { observable, action, computed } from 'mobx'
import axios from 'axios'
let API_URL = `http://localhost:4200/api`

class Attractions {
    @observable _attractions = {
        venue: [],
        dj: [],
        photographer: [],
        misc: []
    }

  

    @computed get attractions() {
        return this._attractions
    }

    @computed get venues() {
        return this._attractions.venues
    }

    @action getAttractionsByCategory = async categoryName => {
        try {
            let attractions = await axios.get(`${API_URL}/attractions/${categoryName}`)
            this._attractions[categoryName] = attractions.data
        } catch (err) {
            console.log(err)
        }
    }





}

export const attractions = new Attractions()