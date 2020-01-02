import React, { Component } from 'react'
import './App.css'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Navbar from './components/navbars/Navbar'
import Home from './components/Home'
import Profile from './components/User/Profile'
import Favorites from './components/User/Favorites'
import Overview from './components/User/Overview'
import BookVendor from './components/Vendors/BookVendor'
import VendorInfo from './components/Vendors/VendorInfo'
import { ToastContainer } from 'react-toastify'
import { Paper, Dialog, Grid } from '@material-ui/core'
import Login from './components/Users_components/Login'
import Register from './components/Users_components/Register'
import GuestManagement from './components/GuestManagement/GuestManagement'
import ClippedDrawer from './components/Vendors/ClippedDrawer'
import AddTable from './components/GuestManagement/AddTable'
import TableManager from './components/GuestManagement/TableManager'

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
				{ name: 'Budget Tracker', link: '/overview' },
				{ name: 'Guest Management', link: '/guest-management' },
				{ name: 'Profile', link: '/profile' },
				{ name: 'Logout', link: '/logout' }
			],
			guestsTabs: [
				{ name: <img id="logo" src="/logo3.png" alt="logo"/>, link: '/' },
				{ name: 'Login', link: '/login' },
				{ name: 'Register', link: '/register' }
			]
		}
	}
	async componentDidMount() {
		this.props.attractions.getAttractions()
		await this.props.user.getWeddingDetails()
		this.props.user.getBookedAttractions()
		this.props.user.getUserFavorites()
		this.props.manage_seats.getInvitees(this.props.user.userInfo.weddingData.id)
		this.props.manage_seats.getTables(this.props.user.userInfo.weddingData.id)

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
				<Route exact path='/guest-management' component={GuestManagement} />

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
								<BookVendor
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
						<Grid className='attr-info' container justify='center' alignContent='center'>
							{this.openDialog()}
							<Dialog
								open={this.props.attractions.open}
								onClose={() => this.closeDialog()}
								fullWidth
								maxWidth='xl'
								component={Paper}>
								<VendorInfo id={match.params.id} history={history} />
							</Dialog>
						</Grid>
					)}
				/>

				<Route
					exact
					path='/addtable'
					render={({history}) => (
						<Grid container justify='center' alignContent='center'>
							{this.openDialog()}
							<Dialog
								open={this.props.attractions.open}
								onClose={() => this.closeDialog()}
								maxWidth='xl'
								component={Paper}>
								<AddTable history={history}/>
							</Dialog>
						</Grid>
					)}
				/>

				<Route
					exact
					path='/addtotable/:currenTableID'
					render={({match, history}) => (
						<Grid container justify='center' alignContent='center'>
							{this.openDialog()}
							<Dialog
								open={this.props.attractions.open}
								onClose={() => this.closeDialog()}
								maxWidth='xl'
								component={Paper}>
								<TableManager currenTableID={match} history={history} />
							</Dialog>
						</Grid>
					)}
				/>

				<ToastContainer position='bottom-left' autoClose={2500} />
			</Router>
		)
	}
}

export default App
