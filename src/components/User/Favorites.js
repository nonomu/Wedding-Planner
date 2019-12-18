import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Favorite from './Favorite'
@inject("user", "attractions")

@observer
class Favorites extends Component {
    componentDidMount() {
        this.props.user.getUserFavorites(this.props.user.userInfo.id)
    }

    render() {
        
        let userFavorites = this.props.user._userFavorites
        let categories = this.props.attractions.categories
    
        return (<div>
            <h1>Favorites</h1>
            {categories.map((c, i) => userFavorites
                .map(uf => uf.category === c ? <Favorite attraction={uf} key={uf.name} /> : null))
            }
        </div>)
    }
}


export default Favorites