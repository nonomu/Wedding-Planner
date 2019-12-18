import React, { Component, Children } from 'react'
import './App.css'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/navbars/Navbar'
import SideNav from './components/navbars/SideNav'
import Home from './components/Home'
import Profile from './components/User/Profile'
import Favorites from './components/User/Favorites'
import Overview from './components/User/Overview'
import Attractions from './components/Attractions/Attractions'
import BookAttraction from './components/Attractions/BookAttraction'
import AttractionInfo from './components/Attractions/AttractionInfo'
import SwipeableTemporaryDrawer from './components/navbars/SwipeableDrawer'
import { Drawer, List, Paper, ListItem, Dialog, Grid } from '@material-ui/core'
// import ResponsiveDrawer from './components/navbars/ResponsiveSideNav'

@inject('attractions')
@observer
class App extends Component {
	componentDidMount() {
		this.props.attractions.getAttractions()
	}

	render() {
		return (
			<div className='App'>
				<Router>
					<Navbar />
					<SwipeableTemporaryDrawer
						categories={this.props.attractions.categories}
					/>
					<Route exact path='/' component={Home} />
					<Route exact path='/profile' component={Profile} />
					<Route exact path='/favorites' component={Favorites} />
					<Route exact path='/overview' component={Overview} />

					<Route
						exact
						path='/attractions/:category'
						render={({ match }) => (
							<Attractions category={match.params.category} />
						)}
					/>
					<Route
						exact
						path='/book/:category/:id'
						render={({ match }) => (
							<BookAttraction
								category={match.params.category}
								id={match.params.id}
							/>
						)}
					/>
					<Route
						exact
						path='/attractionInfo/:id'
						render={({ match }) => (
							<Grid container justify='center' alignContent='center'>
								<Dialog open={true} fullWidth maxWidth='xl' component={Paper} >
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
