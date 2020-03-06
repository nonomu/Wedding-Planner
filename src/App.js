import React, { Fragment, useEffect, useContext } from 'react'
import './App.css'
import { observer } from 'mobx-react'
import Routes from './components/Routes/Routes'
import Layout from './hoc/Layout/Layout'
import { AuthContext } from './stores/Auth'

const App = () => {
	const auth = useContext(AuthContext)	
	useEffect(() => {
			auth.autoLogin()
		}, [auth])

		const authenticated = () => auth.token !== null

		return (
			<Fragment>
				<Layout>
					<Routes authenticated={authenticated} />
				</Layout>
			</Fragment>
		)
	}

export default observer(App)
