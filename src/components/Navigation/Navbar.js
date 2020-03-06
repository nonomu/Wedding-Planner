import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import Logo from '../Logo/Logo'
import { AuthContext } from '../../stores/Auth'

const loggedTabs = [
	{ name: <Logo />, link: '/' },
	{ name: 'Vendors', link: '/vendors' },
	{ name: 'Favorites', link: '/favorites' },
	{ name: 'Budget Tracker', link: '/budget-tracker' },
	{ name: 'Guest Management', link: '/guest-management' },
	{ name: 'Profile', link: '/profile' },
	{ name: 'Logout', link: '/logout' }
]

const guestsTabs = [
	{ name: <Logo />, link: '/' },
	{ name: 'Login', link: '/login' },
	{ name: 'Register', link: '/register' }
]

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		width: '100vw',
		height: 'auto',
		zIndex: 20,
		position: 'fixed',
		top: 0
	}
})

const Navbar = () => {
		const auth = useContext(AuthContext)
		const classes = useStyles()
		const tabs = auth.loggedIn ? loggedTabs : guestsTabs

		return (
			<Paper className={classes.root}>
				<Tabs
					value={auth.url}
					variant='fullWidth'
					indicatorColor='primary'
					textColor='primary'
					centered>
					{tabs.map(t => (
						<Tab
							value={t.link}
							key={t.name}
							label={t.name}
							id={t.name + '-tab'}
							component={NavLink}
							exact
							to={t.link}
						/>
					))}
				</Tabs>
			</Paper>
		)
	}

export default observer(Navbar)
