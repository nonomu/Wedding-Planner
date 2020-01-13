import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('attractions', 'user')
@observer
class Home extends Component {
	render() {
		return (
			<div id='welcomeIMG'>
				<img id='welcomeTemp2' src='/welcomeTemp2.png' alt='welcome' />
			</div>
		)
	}
}

export default Home
