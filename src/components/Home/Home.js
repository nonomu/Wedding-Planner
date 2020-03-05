import React, { Component } from 'react'
import welcome from '../../assets/welcome.png'
import classes from './Home.module.css'
import { observer, inject } from 'mobx-react'

@inject('vendors', 'wedding', 'auth')
@observer
class Home extends Component {
	componentDidMount() {
		const url = this.props.match.url
		this.props.auth.setURL(url)
	}

	render() {
		return (
			<div className={classes.Welcome}>
				<img src={welcome} alt='welcome'/>
			</div>
		)
	}
}

export default Home
