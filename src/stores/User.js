import { observable, action, computed } from 'mobx'
import Axios from 'axios'
let API_URL = `http://localhost:4200/api`

class User {
    @observable userInfo = {id: 1}
    @observable _userFavorites = {
        venue: [],
        dj: [],
        photographer: [],
        misc: []
    }
    @observable closedAttractions = []

    @action login = async (email, password) => {
        try {
            let user = await Axios.post(`${API_URL}/login`, { email, password })
            this.getUserInfo(user.data.id)
        } catch (err) {
            console.log(err)
        }
    }

    @action getWeddingDetails = async userId => {
        try {
            let userInfo = await Axios.get(`${API_URL}/wedding-details/${userId}`)
            this.userInfo = userInfo.data
        } catch (err) {
            console.log(err)
        }
    }
    @action getUserFavorites = async userId => {
        try {
            let userFavorites = await Axios.get(`${API_URL}/favorites/${userId}`)
            this.userInfo._userFavorites = userFavorites.data
        } catch (err) {
            console.log(err)
        }
    }

    @action bookAttraction = async (userId, attractionId) => {
        try {
            await Axios.post(`${API_URL}/attractions/book`, { userId, attractionId })
        } catch (err) {
            console.log(err)
        }
    }
    @action getBookedAttractions = async (userId) => {
        try {
           let bookedAttractions= await Axios.get(`${API_URL}/bookedAttractions/${userId}`)
           this.userInfo.bookedAttractions=bookedAttractions.data
        } catch (err) {
            console.log(err)
        }
    }
    @action addToFavorites = async (userId, attractionId) => {
        try {
            await Axios.post(`${API_URL}/attractions/favorite`, { userId, attractionId })
        } catch (err) {
            console.log(err)
        }
    }
    @action register = () => {

    }
}

export const user = new User()