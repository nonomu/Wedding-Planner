import React, { Component } from 'react'
import './App.css'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Navbar from './components/navbars/Navbar'
import Home from './components/Home'
import Profile from './components/User/Profile'
import Favorites from './components/User/Favorites'
import Overview from './components/User/Overview'
import BookAttraction from './components/Attractions/BookAttraction'
import AttractionInfo from './components/Attractions/AttractionInfo'
import { ToastContainer } from 'react-toastify'
import { Paper, Dialog, Grid } from '@material-ui/core'
import Login from './components/Users_components/Login'
import Register from './components/Users_components/Register'
import ManageSeats from './components/ManageSeats/ManageSeats'
import ClippedDrawer from './components/Attractions/ClippedDrawer'
import AddTable from './components/ManageSeats/AddTable'
import InviteesSideBar from './components/ManageSeats/InviteesSideBar'

@inject('attractions', 'manage_seats', 'user')
@observer
class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedin: sessionStorage.getItem('id'),
			loggedTabs: [
				{ name: <img id="logo" src="/logo3.png" alt="logo"/>, link: '/' },
				{ name: 'Vendors', link: '/vendors' },
				{ name: 'Favorites', link: '/favorites' },
				{ name: 'Overview', link: '/overview' },
				{ name: 'Manage Seats', link: '/manage_seats' },
				{ name: 'Profile', link: '/profile' },
				{ name: 'Logout', link: '/logout' }
			],
			guestsTabs: [
				{ name: 'Home', link: '/' },
				{ name: 'Login', link: '/login' },
				{ name: 'Register', link: '/register' }
			]
		}
	}
	async componentDidMount() {
		await this.props.attractions.getAttractions()
		this.props.user.getWeddingDetails()
	}

	closeDialog = () => {
		this.props.attractions.closeDialog()
	}

	openDialog = () => {
		this.props.attractions.openDialog()
	}

	logout() {
		sessionStorage.clear()
		return (window.location = '/')
	}

	render() {
		let categoriesForSideBar=this.props.attractions.categories
		return (
			<Router>
				<div id='background'></div>
				<div className="menus">
					<Navbar
						tabs={
							this.state.loggedin
								? this.state.loggedTabs
								: this.state.guestsTabs
						}
					/>
				</div>
				<Route exact path='/' component={Home} />
				<Route exact path='/profile' component={Profile} />
				<Route exact path='/favorites' component={Favorites} />
				<Route exact path='/overview' component={Overview} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/logout' render={this.logout} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/manage_seats' component={ManageSeats} />

				<Route
					exact
					path='/vendors'
					render={() => <Redirect to='/vendors/Venue' />}
				/>
				<Route
					exact
					path='/vendors/:category'
					render={({ match }) => (
						<ClippedDrawer
							category={match.params.category}
							categories={categoriesForSideBar}
						/>
					)}
				/>
				<Route
					exact
					path='/book/:category/:id'
					render={({ match, history }) => (
						<Grid container justify='center' alignContent='center'>
							{this.openDialog()}
							<Dialog
								open={this.props.attractions.open}
								onClose={() => this.closeDialog()}
								fullWidth
								maxWidth='xl'
								component={Paper}>
								<BookAttraction
									category={match.params.category}
									id={match.params.id}
									history={history}
								/>
							</Dialog>
						</Grid>
					)}
				/>
				<Route
					exact
					path='/attractionInfo/:id'
					render={({ match, history }) => (
						<Grid container justify='center' alignContent='center'>
							{this.openDialog()}
							<Dialog
								open={this.props.attractions.open}
								onClose={() => this.closeDialog()}
								fullWidth
								maxWidth='xl'
								component={Paper}>
								<AttractionInfo id={match.params.id} history={history} />
							</Dialog>
						</Grid>
					)}
				/>

				<Route
					exact
					path='/addtable'
					render={() => (
						<Grid container justify='center' alignContent='center'>
							{this.openDialog()}
							<Dialog
								open={this.props.attractions.open}
								onClose={() => this.closeDialog()}
								maxWidth='xl'
								component={Paper}>
								<AddTable />
							</Dialog>
						</Grid>
					)}
				/>

				<Route
					exact
					path='/addtotable'
					render={() => (
						<Grid container justify='center' alignContent='center'>
							{this.openDialog()}
							<Dialog
								open={this.props.attractions.open}
								onClose={() => this.closeDialog()}
								maxWidth='xl'
								component={Paper}>
								<InviteesSideBar />
							</Dialog>
						</Grid>
					)}
				/>

				<ToastContainer position='bottom-left' />
			</Router>
		)
	}
}

export default App
