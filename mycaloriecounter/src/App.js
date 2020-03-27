/**
 * @Date:   2020-02-06T09:54:51+00:00
 * @Last modified time: 2020-03-02T12:45:04+00:00
 */



import React from 'react';


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Landing from './components/Landing'
import MyNavbar from './components/MyNavbar'
import Register from './views/auth/Register';
import Login from './views/auth/Login'
import axios from 'axios';
import Profile from './Profile/profile'
import SearchApi from './Diary/diary_searchApi'
import DiaryBreakdown from './Diary/diary_breakdown'
import TodaysDiary from './Diary/diary_today'
import AddToDiary from './Diary/add_food'
import EditFood from './Diary/edit_food'
import MyFoods from './Diary/my_foods'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {loggedIn: localStorage.getItem('jwtToken') !== null, firstname: ''}
  };

  componentDidMount(){
    const loggedIn = this.props.loggedIn;
    if(loggedIn === true){
      const token = localStorage.getItem('jwtToken');
      const tokenParts = token.split('.');
      const encodedPayload = tokenParts[1];
      const rawPayload = atob(encodedPayload);
      const user = JSON.parse(rawPayload);
      axios.get('http://localhost:4000/account/'+user._id)
      .then(res => {
        this.setState({
          firstname: res.data.firstname
        })
        console.log(res.data);
      })
    }
  }


  authHandler = () => {
    this.setState((state, props) => ({
      loggedIn: state.loggedIn ? false: true
    }));
  }

  render(){

    const loggedIn = this.state.loggedIn;
    const user = this.state.user
    return (
      //<div className="bgImage">
      <BrowserRouter>
        <MyNavbar user={user} loggedIn={loggedIn} onLogout={this.authHandler} />
        <Container>
          <Row>
          <Col>
            <Switch>
              <Route path = "/landing">
              {loggedIn ? <Landing /> : <Redirect to="/" />}
              </Route>
              <Route path = "/diary/today/:id" exact component = {TodaysDiary} />
              <Route path = "/breakdown/:id" exact component = {DiaryBreakdown} />

              <Route path = "/searchApi/" exact component = {SearchApi} />

              <Route path = "/register" exact component = {Register} />
              <Route path = "/MyFoods/:id" exact component = {MyFoods} />
              <Route path = "/add/:id" exact component = {AddToDiary} />
              <Route path = "/food/edit/:id" exact component = {EditFood} />
              <Route path = "/profile/:id" exact component = {Profile} />
              <Route path = "/" exact component = {(props) => <Login {...props} onLogin={this.authHandler} /> } />
            </Switch>
          </Col>
         </Row>
        </Container>
      </BrowserRouter>
      //</div>
    )
  }



}

export default App;
