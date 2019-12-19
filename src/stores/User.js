
import { observable, action } from 'mobx'
import Axios from 'axios'
let API_URL = `http://localhost:4200/api`


class User {
  @observable userInfo = { id: 1 };
  @observable _userFavorites = [];
 @observable bookedAttractions = [];


    @action login = async (email, password) => {
        try {
            let user = await Axios.post(`${API_URL}/login`, { email, password })
            this.getUserInfo(user.data.id)
        } catch (err) {
            console.log(err)
        }
    }
    @action updateUserInfo = async(profile)=>
    {
        profile.id=this.userInfo.id
        try {
            await Axios.put(`${API_URL}/update/UserInfo`, profile)
            
        } catch (err) {
            console.log(err)
        }
    }

    @action getWeddingDetails = async () => {
      try {
            let userInfo = await Axios.get(`${API_URL}/wedding-details/${this.userInfo.id}`)
            this.userInfo.weddingData = userInfo.data
        } catch (err) {
            console.log(err)
        }
    }

  
  @action isFavorite(attr_id) {
    let bool=  this._userFavorites.some(a => a.id === attr_id);
    return bool
  };

  @action getUserFavorites = async () => {
    try {
      let userFavorites = await Axios.get(`${API_URL}/favorites/${this.userInfo.id}`);
      this._userFavorites = userFavorites.data;
    } catch (err) {
      console.log(err);
    }
  };
  @action removeFavorite = async (userId, attractionId) => {
    try {
      await Axios.delete(`${API_URL}/favorite/`, {
        data: { userId, attractionId }
      });
      await this.getUserFavorites()
    } catch (err) {
      console.log(err);
    }

  };

  @action addToFavorites = async (userId, attractionId) => {
    try {
      await Axios.post(`${API_URL}/attractions/favorite`, {
        userId,
        attractionId
      });
     await this.getUserFavorites()
    } catch (err) {
      console.log(err);

    }
  };
  @action bookAttraction = async (userId, attractionId, price) => {
    try {
      await Axios.post(`${API_URL}/attractions/book`, {
        userId,
        attractionId,
        price
      });
      await this.getBookedAttractions()
    } catch (err) {
      console.log(err);
      
    }
  };
  @action getBookedAttractions = async () => {
    try {
      let bookedAttractions = await Axios.get(
        `${API_URL}/bookedAttractions/${this.userInfo.id}`
      );
      this.bookedAttractions = bookedAttractions.data;
    } catch (err) {
      console.log(err);
    }
  };
  @action register = () => {};
}

export const user = new User();
