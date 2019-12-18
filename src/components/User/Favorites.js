import React, { Component } from 'react';
import {obsarever,inject} from 'mobx-react'
@inject("user","attractions")

class Favorites extends Component {
    componentDidMount(){
        this.props.user.getUserFavorites(this.props.user.userInfo.id)
    }

render() {
   // let category = this.props.category;
    let userFavorites = this.props.user._userFavorites
    console.log(userFavorites)
return <h1>Favorites</h1>


}
}


export default Favorites