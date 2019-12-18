import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Attraction from "../Attractions/Attraction";
import './favorites.css'
@inject("user", "attractions")


@observer
class Favorites extends Component {
  componentDidMount() {
    this.props.user.getUserFavorites();
  }

    render() {
        
        let userFavorites = this.props.user._userFavorites
        let categories = this.props.attractions.categories
    
        return (
        <div>
            <h1 className="attraction-title">Favorites</h1>
            <div className="attractions">
            {categories.map((c, i) => userFavorites
                .map(uf => uf.category === c ? <Attraction attr={uf} key={uf.name} /> : null))
            }
        </div>
        </div>
        )
    }
}


export default Favorites;
