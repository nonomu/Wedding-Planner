import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { vendors } from './stores/Vendors'
import { wedding } from './stores/Wedding'
import { guestManagement } from './stores/GuestManagement'
import { auth } from './stores/Auth'

const stores = { vendors, wedding, guestManagement, auth }

const app = (
	<Provider {...stores}>
		<Router>
			<App />
		</Router>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
