import { observable, action, computed } from 'mobx'
import axios from 'axios'
let API_URL = `http://localhost:4200/api`

class Attractions {
    @observable _attractions = {
        venue: [{
            category: "venue",
            attr_name: "Nof-jerusalem",
            attr_vendor: "Yaniv",
            image: "http://nofyerushalaim.com/wp-content/uploads/pb070021-Custom-resized1.jpg",
            location: "shahrai 2 jerusalem",
            rating: 3, contact_name: "Shaul",
            contact_phone: "02-6415999",
            contact_email: "yaniv@gmail.com",
            small_prints: "Lots of bugs :)"
        },
        {
            category: "venue",
            attr_name: "Nof-jerusalem",
            attr_vendor: "Yaniv",
            image: "http://nofyerushalaim.com/wp-content/uploads/pb070021-Custom-resized1.jpg",
            location: "shahrai 2 jerusalem",
            rating: 3, contact_name: "Shaul",
            contact_phone: "02-6415999",
            contact_email: "yaniv@gmail.com",
            small_prints: "Lots of bugs :)"
        }
        ],
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

    @action getUserFavorites = async userId => {
        try {
            let userFavorites = await axios.get(`${API_URL}/favorites/${userId}`)
            this._userFavorites = userFavorites.data
        } catch (err) {
            console.log(err)
        }
    }

    @action bookAttraction = async (userId, attractionId) => {
        try {
            await axios.post(`${API_URL}/attractions/book`, { userId, attractionId })
        } catch (err) {
            console.log(err)
        }
    }

    @action addToFavorites = async (userId, attractionId) => {
        try {
            await axios.post(`${API_URL}/attractions/favorite`, { userId, attractionId })
        } catch (err) {
            console.log(err)
        }
    }


}

export const attractions = new Attractions()