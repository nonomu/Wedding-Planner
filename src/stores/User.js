import {observable, action, computed} from 'mobx'
import Axios from 'axios'
let API_URL = `http://localhost:4200/api`

class User {
    @observable userInfo = []
    @observable closedAttractions = []

    @action login = async (email, password) => {
        try {
            let user = await Axios.post(`${API_URL}/login`, {email, password})
            this.getWeddingDetails(user.data.id)
        } catch(err) {
            console.log(err)
        }
    }

    @action getWeddingDetails = async userId => {
        try {
            let weddingDetails = await Axios.get(`${API_URL}/wedding-details/${userId}`)
            this.userInfo.weddingDetails = weddingDetails.data
        } catch(err) {
            console.log(err)
        }
    }

    @action register = () => {

    }
}

export const user = new User()