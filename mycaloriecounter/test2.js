/**
 * @Date:   2020-02-06T09:54:52+00:00
 * @Last modified time: 2020-02-24T18:32:09+00:00
 */



import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment'
import Row from 'react-bootstrap/Row';
 import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import moment from 'moment'
import Card from 'react-bootstrap/Card'
import '../App.css';
import '../styles/diary.css';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";


export default class TodaysDiary extends Component {

constructor(props){
  super(props);
  this.state = {
    diary: [],
    totalcalories: '',
    totalcarbs: '',
    totalproteins: '',
    totalfats: '',
    remainingcalories: '',
    remainingcarbs: '',
    remainingproteins: '',
    remainingfats: '',
    newCode: '',
    today: '',
    yesterday: '',
    date: '',
    isEmpty: false,








    user: {
    },
    loggedIn: localStorage.getItem('jwtToken') !== null
  };
}


componentDidMount(){
  const loggedIn = this.state.loggedIn;
  if(loggedIn === true){
    const token = localStorage.getItem('jwtToken');
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const user = JSON.parse(rawPayload);
    const date = new Date();
    const today = moment(date).format('DDMMYYYY')
    this.setState({user: user, date: date, today: today})


  axios.get('http://localhost:4000/diary/'+this.props.match.params.id+'/today/'+today)
  .then(response => {
    this.setState({diary: response.data})
    console.log(this.state.diary)
  })
  .catch((error) => {
    console.log(error);
  })
}
}

removeFood(id)
{
  const r = window.confirm("Are you sure you want to remove Food from the diary?")
  if (r === true){
  const date = moment(this.state.date).format('DDMMYYY')
  console.log(date)
  axios.delete('http://localhost:4000/foods/'+id)
    .then(res => console.log(res.data));
    axios.get('http://localhost:4000/diary/'+this.props.match.params.id+'/today/'+date)
    .then(response => {
      this.setState({diary: response.data})
      console.log(this.state.diary)
    })
    .catch((error) => {
      console.log(error);
    })
}
}

changeDiaryLeft(){
  const newDate = moment(this.state.date).subtract(1, 'days').format('YYYY-MM-DD')
  const date = moment(newDate).format('DDMMYYYY')
  if(this.state.diary.length == 1){
  this.setState({date: newDate})
  axios.get('http://localhost:4000/diary/'+this.props.match.params.id+'/today/'+date)
  .then(response => {
    this.setState({diary: response.data})

  })
  .catch((error) => {
    console.log(error);
  })
  console.log('false')
}
else if (this.state.diary.length != 1){
  console.log('True')
}
}














changeDiaryRight(){
  const newDate = moment(this.state.date).add(1, 'days').format('YYYY-MM-DD')
  const date = moment(newDate).format('DDMMYYYY')
  console.log(date);
  this.setState({date: newDate})
  axios.get('http://localhost:4000/diary/'+this.props.match.params.id+'/today/'+date)
  .then(response => {
    this.setState({diary: response.data})
    console.log(this.state.diary)
  })
  .catch((error) => {
    console.log(error);
  })
}



  render() {

    return(
<div className="container col-lg-12 col-md-12 diaryContainer">
    {this.state.diary.map((diary) =>
        <div key={diary._id} className="container col-lg-12">
        <Card className="diaryTop">
        <div className="card-header diaryHeader">
          <Row>
          <Col className="col-lg-1"><AiOutlineCaretLeft size={26} className="" onClick={() => {this.changeDiaryLeft()}}/></Col>
          <Col className="col-lg-10">Diary for <b><Moment format="MMMM Do YYYY">{diary.day}</Moment></b></Col>
          <Col className="col-lg-1"><div className="rightArrow"><AiOutlineCaretRight size={26} onClick={() => {this.changeDiaryRight()}}/></div></Col>

          </Row>
        </div>

        <div className="card-body">
        <div className="row">
          <div className="col-lg-12"><b>Breakfast</b> <Link to={"/add/"+diary._id} title="Add Episode to Show" className="btn btn-success addFood">Add to Diary</Link></div>
        </div>
        {diary.entries.map((entry) =>
              <div key={entry._id}>
              <div className="row">
              <div className="col-lg-2">
                <div className="card-text"></div>
              </div>
                <div className="col-2">
                  <div className="card-text">{entry.name}</div>
                </div>
                <div className="col-2">
                  <div className="card-text">{entry.calories}</div>
                </div>
                <div className="col-2">
                  <div className="card-text">{entry.carbs}</div>
                </div>
                <div className="col-2">
                  <div className="card-text">{entry.proteins}</div>
                </div>
                <div className="col-1">
                  <div className="card-text">{entry.fats}</div>
                </div>
                <div className="col-1">
                  <div className="deleteButton"><a href="#" title={entry._id} onClick={() => {this.removeFood(entry._id)}} className="btn btn-danger "></a></div>
                </div>
              </div>
              </div>
        )}

          <hr></hr>
          <div className="row">
            <div className="col-2">
              <div className="">Target</div>
            </div>
            <div className="col-2">
              <div className="card-text"></div>
            </div>
            <div className="col-2">
              <div className="card-text">{this.state.user.recommendations.calories}</div>
            </div>
            <div className="col-2">
              <div className="card-text">{this.state.user.recommendations.carbs}</div>
            </div>
            <div className="col-2">
              <div className="card-text">{this.state.user.recommendations.proteins}</div>
            </div>
            <div className="col-1">
              <div className="card-text">{this.state.user.recommendations.fats}</div>
            </div>
            <div className="col-1">
            </div>
            </div>
            <hr></hr>
          <div className="row">
            <div className="col-2">
              <div className="">Totals</div>
            </div>
            <div className="col-2">
              <div className="card-text"></div>
            </div>
            <div className="col-2">
              <div className="card-text">{this.state.totalcalories}</div>
            </div>
            <div className="col-2">
              <div className="card-text">{this.state.totalcarbs}</div>
            </div>
            <div className="col-2">
              <div className="card-text">{this.state.totalproteins}</div>
            </div>
            <div className="col-1">
              <div className="card-text">{this.state.totalfats}</div>
            </div>
            <div className="col">
            </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-2">
                <div className="">Remaining</div>
              </div>
              <div className="col-2">
                <div className="card-text"></div>
              </div>
              <div className="col-2">
                <div className="card-text">{this.state.remainingcalories}</div>
              </div>
              <div className="col-2">
                <div className="card-text">{this.state.remainingcarbs}</div>
              </div>
              <div className="col-2">
                <div className="card-text">{this.state.remainingproteins}</div>
              </div>
              <div className="col-1">
                <div className="card-text">{this.state.remainingfats}</div>
              </div>
              <div className="col">
              </div>
              </div>
              <hr></hr>
            <div className="row">
              <div className="col-2">
                <div className="">Points Earned</div>
              </div>
              <div className="col-2">
                <div className="card-text"></div>
              </div>
              <div className="col-2">
                <div className="card-text">{this.state.user.points.calories}</div>
              </div>
              <div className="col-2">
                <div className="card-text">{this.state.user.points.carbs}</div>
              </div>
              <div className="col-2">
                <div className="card-text">{this.state.user.points.proteins}</div>
              </div>
              <div className="col-1">
                <div className="card-text">{this.state.user.points.fats}</div>
              </div>
              <div className="col-1">
              </div>
              </div>
          </div>
          </Card>
        </div>
      )
    })
</div>
)



    }
  }
