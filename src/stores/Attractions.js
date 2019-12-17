import {observable, action, computed} from 'mobx'
import axios from 'axios'
let API_URL = `http://localhost:4200/api`

class Attractions {
    @observable _attractions = {
        venue: [],
        dj: [],
        photographer: [],
        misc: []
    }
    @observable _userFavorites = {
        venue: [],
        dj: [],
        photographer: [],
        misc: []
    }

    @computed get attractions() {
        return this._attractions
    }

    @action getAttractionsByCategory = async categoryName => {
        try {
            let attractions = await axios.get(`${API_URL}/attractions/${categoryName}`)
            this._attractions[categoryName] = attractions.data
        } catch(err) {
            console.log(err)
        }
    }

    @action getUserFavorites = async userId => {
        try {
            let userFavorites = await axios.get(`${API_URL}/favorites/${userId}`)
            this._userFavorites = userFavorites.data
        } catch(err) {
            console.log(err)
        }
    }
 
    @action bookAttraction = async (userId, attractionId) => {
        try {
            await axios.post(`${API_URL}/attractions/book`, {userId, attractionId})
        } catch(err) {
            console.log(err)
        }
    }

    // @action addToFavorites = async (user)

    
}

export const attractions = new Attractions()