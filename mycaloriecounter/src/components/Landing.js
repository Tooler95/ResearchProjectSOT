/**
 * @Date:   2020-02-18T16:15:03+00:00
 * @Last modified time: 2020-02-26T19:12:30+00:00
 */
import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import moment from 'moment'
import {withRouter, Link} from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Landing extends Component {
   constructor(props){
     super(props);
     this.state = {
       loggedIn: localStorage.getItem('jwtToken') !== null,
       diary: {
         belongsto: '',
         entries: [],
         submitted: false,
         day: new Date(),
         diaryCode: '',
         totals: {
           calories: 0,
           carbs: 0,
           proteins: 0,
           fats: 0,
         }
       },
       isdiary: {},
       user: '',
       newDate: '',
       code: '',
       formattedDate: ''
     }

   }

   componentDidMount(){
     console.log(this.state.diary.day)
     const loggedIn = this.state.loggedIn;
     if(loggedIn === true){
       console.log('You are logged In!')
       const token = localStorage.getItem('jwtToken');
       const tokenParts = token.split('.');
       const encodedPayload = tokenParts[1];
       const rawPayload = atob(encodedPayload);
       const user = JSON.parse(rawPayload);
       const newDate = moment(this.state.diary.day).format('YYYY-MM-DD')
       const code = moment(this.state.diary.day).format('DMMY')
       const mutatingDate = new Date(); //declare mutatingDate as todays date
       const todayParsed = moment(mutatingDate).format('DDMMYYYY')
       axios.get('http://localhost:4000/account/'+user._id)
       .then(res => {
         this.setState({
           user: res.data,
           gamification: res.data.gamification,
           newDate: newDate,
           code: code
         })
       })
       axios.get('http://localhost:4000/diary/'+user._id+'/today/'+todayParsed)
          .then(response => {
              this.setState({
                             isdiary: response.data,
                           })
                           if(this.state.isdiary.length === 0){
                             this.setState({diaryPresent: false})
                           } else{
                             this.setState({diaryPresent: true})
                           }
      })
      .catch((error) => {
        console.log(error);
      })
      this.setState({belongsto: user._id, diaryCode: user._id + code, day: newDate})
   }
}
onSubmit = e => {
e.preventDefault();

const diary = {
  belongsto: this.state.belongsto,
  submitted: this.state.diary.submitted,
  entries: this.state.diary.entries,
  day: this.state.day,
  diaryCode: this.state.diaryCode,
  totals: {
    calories: this.state.diary.totals.calories,
    carbs: this.state.diary.totals.carbs,
    proteins: this.state.diary.totals.proteins,
    fats: this.state.diary.totals.fats,
  }
}
console.log(diary);


axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
axios.post('http://localhost:4000/diary/', diary)
.then(res => {
  console.log(res.data);
  window.location = '/diary/today/'+this.state.user._id
})
.catch(err => {
  confirmAlert({
    title: <div className="card"><div className="card-header"><center>Diary already exists</center></div></div>,
    message: <center>Where would you like to go?</center>,
    buttons: [
      {
        label: 'View Diary',
        onClick: () => this.props.history.push('/diary/today/' + this.state.user._id)
      },
      {
        label: 'View Profile',
        onClick: () => this.props.history.push('/profile')
      },
      {
        label: 'Visit Community',
        onClick: () => alert('Click No')
      }
    ]
  });
  console.log(err)

})



   };

async toggle(){
  if(this.state.gamification === true){
    await this.setState({gamification: false})
  } else{
    await this.setState({gamification: true})
  }
  const user = {
    gamification: this.state.gamification
  }
  axios.post('http://localhost:4000/account/update/gamification/'+this.state.user._id, user)
  .then(res => console.log(res.data));
  window.location = '/landing'
}




   render() {



      return(
         <div className="container col-lg-12 textAnimation landingContainer">
         <div className="col-lg-12 textAnimation">
         {this.state.diaryPresent === true ? (
           <center>
            <h1 className="pageGreeting head1">Daily Calorie Counter</h1>
               <h2 className="pageGreeting subGreeting head2">Welcome Back {this.state.user.firstname}</h2><h3 className="landingText">Where would you like to go?</h3>
               <Link to={"/diary/today/"+this.state.user._id} className="btn landing1 col-3" >Today's Diary</Link>
               <Link to={"/profile/"+this.state.user._id} className="btn btn-danger landing2 col-3">My Profile</Link>
           </center>
         ) : (
           <center>
               <h1 className="pageGreeting head1">Welcome {this.state.user.firstname}!</h1><h3 className="landingText">Please create a diary for today to get started.</h3>
               <Form onSubmit={this.onSubmit}>
               <input type="submit" value="Begin Diary" className="btn landing1 col-6" />
               </Form>
           </center>
         )}

         </div>
         </div>
       )



   }
 }
 export default withRouter(Landing)
