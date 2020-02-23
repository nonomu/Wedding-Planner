import React, { Component } from 'react'
import welcome from '../../assets/welcome.png'
import classes from './Home.module.css'
import { observer, inject } from 'mobx-react'

@inject('vendors', 'wedding')
@observer
class Home extends Component {
	render() {
		return (
			<div className={classes.Welcome}>
				<img src={welcome} alt='welcome'/>
			</div>
		)
	}
}

export default Home
