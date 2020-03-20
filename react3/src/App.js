import React, { Component } from 'react'
import Footer from './Components/footer/Footer'
import Header from './Components/header/Header'
import Dashboard from './Components/dashboard/Dashboard'
import Login from './Components/login/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './Components/register/Register'
import AuthenticatedRoute from './Components/authenticatedRoute/AuthenticatedRoute'
import ReadNow from './Components/readNow/ReadNow'
import Profile from './Components/profile/Profile'
import Favorite from './Components/favorite/Favorite'
import NewsService from './Components/newsservice/NewsService'
class App extends Component {
  render() {
    return (<div>
      
      <Router>
      <Header></Header>
        <><Switch>
          
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <AuthenticatedRoute path="/dashboard" component={Dashboard} />
          <AuthenticatedRoute path="/savedNews" component={ReadNow} />
          <AuthenticatedRoute path="/profile" component={Profile} />
          <AuthenticatedRoute path="/newssource" component={Favorite} />
          <AuthenticatedRoute path="/newsservice" component={NewsService} />


        </Switch></>
        <Footer></Footer>
      </Router>
      
    </div>)
  }

}
export default App;
