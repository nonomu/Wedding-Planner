import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
@inject("user", "attractions")

@observer
class Favorites extends Component {
    componentDidMount() {
        this.props.user.getUserFavorites(this.props.user.userInfo.id)
    }

    render() {
        // let category = this.props.category;
        let userFavorites = this.props.user._userFavorites
        let categories = ["venue","dj","photographer","misc"]
        console.log(userFavorites)
        return (<div>
            <h1>Favorites</h1>
            {categories.map((c, i) => userFavorites.
                map(uf=> {
                    return (
                    uf.category===c?
                    (<div key={i}>
                        <h3>{uf.attr_name}</h3>
                        <img  src={uf.image}/>
                        <div>contact: {uf.contact_name}  {uf.contact_phone}  {uf.contact_email}</div>
                        <div>rating: {uf.rating}</div>
                        <div>{uf.small_prints}</div>

                    </div>): "")
                }))

            }        </div>)
    }
}


export default Favorites