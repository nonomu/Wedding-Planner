import React, { Component } from 'react'
import Attraction from './Attraction'
import { observer, inject } from 'mobx-react'
import './attractions.css'
@inject('attractions', 'user')
@observer
class Attractions extends Component {
	componentDidMount() {
		this.props.attractions.getAttractions()
		this.props.user.getUserFavorites()
		this.props.attractions.category = this.props.category
	}
	componentDidUpdate() {
		this.props.attractions.category = this.props.category
	}

	render() {
		let favorites=this.props.user._userFavorites
		let attrArr = this.props.attractions.attractionsByCategory
		return (
			<div>
				<h1 className="attraction-title">{this.props.category}</h1>
				<div className='attractions'>
					{attrArr.map(a => (
						<Attraction name="attractions"favorites={favorites}key={a.id} attr={a} />
					))}
				</div>
			</div>
		)
	}
}

export default Attractions
