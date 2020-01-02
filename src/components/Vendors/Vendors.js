import React, { Component } from 'react'
import Vendor from './Vendor'
import { observer, inject } from 'mobx-react'
import './vendors.css'
@inject('attractions', 'user')
@observer
class Vendors extends Component {
	render() {
		let favorites=this.props.user._userFavorites
		let attrArr = this.props.attractions.attractionsByCategory(this.props.category)
		return (
			<div>
				<h1 className="attraction-title">{this.props.category}</h1>
				<div className='attractions'>
					{attrArr.map(a => (
						<Vendor name="attractions"favorites={favorites}key={a.id} attr={a} />
					))}
				</div>
				
			</div>
		)
	}
}

export default Vendors
