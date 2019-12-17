import { observable, action, computed } from 'mobx'
import Axios from 'axios'
let API_URL = `http://localhost:4200/api`

class User {
    @observable userInfo = []
    @observable closedAttractions = []

    @computed userInfo() {
        return this.UserInfo
    }

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

    @action register = () => {

    }
}

export const user = new User()