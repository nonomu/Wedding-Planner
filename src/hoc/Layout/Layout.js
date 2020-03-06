import React, { Fragment } from 'react'
import { observer } from 'mobx-react'
import Background from '../../assets/background.jpg'
import Navbar from '../../components/Navigation/Navbar'
import { ToastContainer } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

const Layout = observer(props => (
	<Fragment>
		<img id='background' src={Background} alt='background' />
		<Navbar />
		<main>{props.children}</main>
		<ToastContainer position='bottom-left' autoClose={2500} />
	</Fragment>
))

export default withRouter(Layout)
