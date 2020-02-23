import React, { Component } from 'react'
import './App.css'
import { observer, inject } from 'mobx-react'
import Routes from './components/Routes/Routes'
import Layout from './hoc/Layout/Layout'

@inject('vendors', 'guestManagement', 'wedding', 'auth')
@observer
class App extends Component {
	componentDidMount() {
		this.props.auth.autoLogin()
	}

	authenticated() {
		return this.props.auth.token !== null
	}

	render() {
		return (
			<React.Fragment>
				<Layout>
					<Routes authenticated={this.authenticated} />
				</Layout>
			</React.Fragment>
		)
	}
}

export default App
