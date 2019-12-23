
import { observable, action ,computed} from 'mobx'
import Axios from 'axios'
import { inject } from "mobx-react";
let API_URL = `http://localhost:4200/api`


class User {
  @observable userInfo = { id: 1 };
  @observable _userFavorites = [];
 @observable bookedAttractions = [];
 

  @action userRegister = async (userData) =>{
    console.log(userData)
    //you get all the object from the register component.
  }

    @action userLogin = async (email, password) => {
      console.log(email)
      console.log(password)
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
            let update = await Axios.put(`${API_URL}/update/UserInfo`, profile)
            return update.data
        } catch (err) {
          console.log(err)
          return err.message
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
      let remove = await Axios.delete(`${API_URL}/favorite/`, {
        data: { userId, attractionId }
      });
      await this.getUserFavorites()
      return remove.data
    } catch (err) {
      console.log(err);
    }

  };

  @action addToFavorites = async (userId, attractionId) => {
    try {
      let add = await Axios.post(`${API_URL}/attractions/favorite`, {
        userId,
        attractionId
      });
     await this.getUserFavorites() 
     return add.data
    } catch (err) {
      return err
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

  @computed get favoritesCategories(){
    return [...new Set(this._userFavorites.map(a => a.category))]
}

}

export const user = new User();
