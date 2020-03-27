/**
 * @Date:   2020-02-06T09:54:52+00:00
 * @Last modified time: 2020-02-28T19:52:53+00:00
 */



 import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
 import {Navbar} from 'react-bootstrap';
 import Nav from 'react-bootstrap/Nav'
 import { GiFoodTruck } from "react-icons/gi";
  import GamingModal from '../Profile/Modals/gaming_modal'
 import '../App.css'
 import axios from 'axios';
import moment from 'moment'

 export default class MyNavbar extends Component {
   constructor(props){
     super(props);
     this.state = {
       user: {},
       points: {},
       gamification: {},
       diary: {},
       diaryPresent: null,
   }
 }
 componentDidMount(){
   const loggedIn = this.props.loggedIn;
   if(loggedIn === true){
   const token = localStorage.getItem('jwtToken');
   const tokenParts = token.split('.');
   const encodedPayload = tokenParts[1];
   const rawPayload = atob(encodedPayload);
   const user = JSON.parse(rawPayload);
   const mutatingDate = new Date(); //declare mutatingDate as todays date
   const todayParsed = moment(mutatingDate).format('DDMMYYYY')
   axios.get('http://localhost:4000/account/'+user._id)
   .then(res => {
     this.setState({
       user: res.data,
       gamification: res.data.gamification
     })
     this.setState({
       points: this.state.user.points
     })
   });
   axios.get('http://localhost:4000/diary/'+user._id+'/today/'+todayParsed)
      .then(response => {
          this.setState({
                         diary: response.data,
                       })
                       if(this.state.diary.length === 0){
                         this.setState({diaryPresent: false})
                       } else{
                         this.setState({diaryPresent: true})
                       }
  })
  .catch((error) => {
    console.log(error);
  })
 }
 }

 logout = () => {
   localStorage.removeItem('jwtToken');
   this.props.onLogout();
   window.location = '/';
 }


   render() {

     const loggedIn = this.props.loggedIn;
     if(loggedIn === true){
     return (
       <Navbar className="color-nav" variant="light">
       <Navbar.Brand className="navItems" ><GiFoodTruck size={45} /></Navbar.Brand>
         <Navbar.Brand as={Link} to="/landing" className="navItems">Shauns Calorie Counter</Navbar.Brand>
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Navbar.Collapse id ="basic-navbar-nav">
             <Nav className="mr-auto">
             {loggedIn &&
               <>
               {this.state.diaryPresent === true ? (
                 <>
               <Nav.Link as={Link} to={"/diary/today/"+ this.state.user._id} className="navItems"><div className="">My Diary</div></Nav.Link>

               </>
             ) : (
               <Nav.Link as={Link} to="/landing" className="navItems">Begin Todays Diary</Nav.Link>
             )
             }
               </>
             }
             </Nav>
             <Nav>
             {(loggedIn) ? (
               <>
               {this.state.gamification === true ? (
                 <>
                 <Nav.Link className="navItems"><GamingModal user={this.state.user} points={this.state.points}/></Nav.Link>
                 <Nav.Link as={Link} to={"/profile/"+this.state.user._id} className="navItems"><div className="whitelines2">Profile</div></Nav.Link>

                 </>
               ) : (
                 <>
                 <Nav.Link as={Link} to={"/profile/"+this.state.user._id} className="navItems"><div className="whitelines">Profile</div></Nav.Link>
                 </>
               )

                }

                       <Nav.Link onClick={this.logout} className="navItems">Logout</Nav.Link>
              </>
             ) : (
               <>
               <Nav.Link as={Link} to="/register" className="navItems">Register</Nav.Link>
               <Nav.Link as={Link} to="/" className="navItems">Log In</Nav.Link>
               </>
             )}
             </Nav>
           </Navbar.Collapse>
         </Navbar>
     );
   } else {
     return(
       <Navbar className="color-nav" variant="light">
       <Navbar.Brand className="navItems" ><GiFoodTruck size={45} /></Navbar.Brand>
         <Navbar.Brand to="/" className="navItems">Shauns Calorie Counter</Navbar.Brand>
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Navbar.Collapse id ="basic-navbar-nav">
             <Nav className="mr-auto"></Nav>
             <Nav>
               {(loggedIn) ? (
                         <Nav.Link as={Link} to="/profile/" className="navItems">Profile</Nav.Link>
               ) : (
                 <>
                 <Nav.Link as={Link} to="/register" className="navItems">Register</Nav.Link>
                 <Nav.Link as={Link} to="/" className="navItems">Log In</Nav.Link>
                 </>
               )}
               {(loggedIn) ? (
                   <Nav.Link onClick={this.logout} className="navItems">Logout</Nav.Link>

               ) : (
                 <>

                 </>
               )}
             </Nav>
           </Navbar.Collapse>
         </Navbar>
     )
 }
}
}
