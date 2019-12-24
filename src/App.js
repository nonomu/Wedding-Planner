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
import { Paper, Dialog, Grid } from '@material-ui/core'
import Login from './components/Users_components/Login'
import Register from './components/Users_components/Register'
import ManageSeats from './components/ManageSeats/ManageSeats'
import ClippedDrawer from './components/Attractions/ClippedDrawer'


@inject('attractions','manage_seats','user')
@observer
class App extends Component {
	async componentDidMount() {
		await this.props.attractions.getAttractions()
		await this.props.user.getWeddingDetails()
		this.props.manage_seats.getInvitees(this.props.user.userInfo.weddingData.id)


  }
  
  closeDialog = () => {
    this.props.attractions.closeDialog()
  }

  openDialog = () => {
    this.props.attractions.openDialog()
  }
  
  logout() {
	sessionStorage.clear()
	return <Redirect to='/' /> 
  }

	render() {
		return (
			<div className='App'>
				<Router>
					<div id="background"></div>
					<Navbar />
					<Route exact path='/' component={Home} />
					<Route exact path='/profile' component={Profile} />
					<Route exact path='/favorites' component={Favorites} />
					<Route exact path='/overview' component={Overview} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/logout' render={this.logout} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/manage_seats' component={ManageSeats} />

					<Route exact path='/vendors' render={() => <Redirect to='/vendors/Venue'/>} />
					<Route
						exact
						path='/vendors/:category'
						render={({ match }) => (
							<ClippedDrawer category={match.params.category} categories={this.props.attractions.categories} />
						)}
					/>
					<Route
						exact
						path='/book/:category/:id'
						render={({ match }) => (
							<Grid container justify='center' alignContent='center'>
              {this.openDialog()}
              <Dialog open={this.props.attractions.open} onClose={() => this.closeDialog()} fullWidth maxWidth='xl' component={Paper} > 
              <BookAttraction
								category={match.params.category}
								id={match.params.id}
							/>
              </Dialog>
              </Grid>
						)}
					/>
					<Route
						exact
						path='/attractionInfo/:id'
						render={({ match }) => (
							<Grid container justify='center' alignContent='center'>
								{this.openDialog()}
                <Dialog open={this.props.attractions.open} onClose={() => this.closeDialog()} fullWidth maxWidth='xl' component={Paper} >
                <AttractionInfo id={match.params.id} />
                </Dialog>
							</Grid>
						)}
					/>
				</Router>
			</div>
		)
	}
}

export default App
