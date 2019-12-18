import { observable, action, computed } from 'mobx'
import axios from 'axios'
let API_URL = `http://localhost:4200/api`

class Attractions {
    @observable _attractions = []
    @observable category = ''

    @computed get attractions() {
        return this.category ? this.attractionsByCategory
        : this._attractions
    }

    @computed get attractionsByCategory() {
        return this._attractions.length ? 
        this._attractions.filter(a => a.category === this.category) : []
    }

    @computed get categories(){
        return [...new Set(this._attractions.map(a => a.category))]
    }

    @action getAttractions = async () => {
        try {
            let attractions = await axios.get(`${API_URL}/attractions`)
            // attractions.data.forEach(attr => {
                
            // });
            this._attractions = attractions.data
        } catch (err) {
            console.log(err)
        }
    }
    @action changeFavoriteState= () =>{
        console.log("hello again")
    }
    @action getAttractionData(category, id) {
        return this._attractions.find(a => a.category === category && a.id === parseInt(id))
    }
g
}

export const attractions = new Attractions()