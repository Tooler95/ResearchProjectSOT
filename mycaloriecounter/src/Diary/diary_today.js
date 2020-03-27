/**
 * @Date:   2020-02-06T09:54:52+00:00
 * @Last modified time: 2020-03-03T11:45:33+00:00
 */



import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment'
import { Table, Card, Col, InputGroup, FormControl, Form, Row} from 'react-bootstrap';
 import { Link } from 'react-router-dom';
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'; // Import
import '../App.css';
import '../styles/diary.css';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import UpcomingAwards from './Modals/upcomingAwardsModal'
import Award1 from "../Rewards/1.png"
 import ExitIcon from "../Rewards/ExitIcon.png"

export default class TodaysDiary extends Component {

constructor(props){
  super(props);
  this.state = {
    diary: [],
    myDiaries: [],
    todaysDiary: {},
    food: {},
    entries: [],
    recommendations: {},
    prevdate: '',
    totalcalories: '', //total amount of calories for the day - based on sum of entries
    totalcarbs: '',   //total amount of carbs for the day - based on sum of entries
    totalproteins: '',  //total amount of proteins for the day - based on sum of entries
    totalfats: '',  //total amount of fats for the day - based on sum of entries
    remainingcalories: '',
    remainingcarbs: '',
    remainingproteins: '',
    remainingfats: '',
    today: '', // todays date in the following format - DDMMYYY - parsed
    mutatingDate: '', // date that changes each time the user switches diary
    user: {
      calories: ''
    },
    points: {},
    clickedOnce: false,
    parseFats: '',
    breakfastTotals: '',
    error: '',
    loggedIn: localStorage.getItem('jwtToken') !== null,

  };
}


async componentDidMount(){
  const loggedIn = await this.state.loggedIn; //create loggedIn constant - assign value from contructor state
  if(loggedIn === true)
  {
    const prevdate = moment(this.state.todaysDate).subtract(1, 'days').format('YYYY-MM-DD')
    const nextDate = moment(this.state.todaysDate).add(1, 'days').format('YYYY-MM-DD')
    if(!this.props.location.state){
    var mutatingDate = new Date();
    var todayParsed = moment(mutatingDate).format('DDMMYYYY')
  } else{
    var mutatingDate = this.props.location.state.mutatingDate
    var todayParsed = this.props.location.state.day
  }
    await axios.get('http://localhost:4000/diary/log/'+this.props.match.params.id)
    .then(response => {
             this.setState({myDiaries: response.data, error: false})
  })
  .catch((error) => {
  console.log(error);
  })
  await axios.get('http://localhost:4000/account/'+this.props.match.params.id)
  .then(res => {
    this.setState({user: res.data})
  })
  .catch(err => {
    console.log(err)
  })
   await axios.get('http://localhost:4000/diary/'+this.props.match.params.id+'/today/'+todayParsed)
      .then(response => {
          this.setState({
                         parseFats: parseFloat(Math.round(this.state.user.recommendations.fats)).toFixed(0),
                         points: this.state.user.points,
                         diary: response.data,
                         today: todayParsed,
                         mutatingDate: mutatingDate,
                         prevdate: prevdate,
                         nextDate: nextDate
                       })
                       console.log(response.data)
          this.setState({
                        todaysDiary: this.state.diary[0]
          })
          this.setState({
                        entries: this.state.todaysDiary.entries
          })
          this.setState({

                        totalcalories: this.state.entries.reduce(function(prev, current){
                        return prev + +current.calories
                        }, 0),
                        totalcarbs: this.state.entries.reduce(function(prev, current){
                        return prev + +current.carbs
                        }, 0),
                        totalproteins: this.state.entries.reduce(function(prev, current){
                        return prev + +current.proteins
                        }, 0),
                        totalfats: this.state.entries.reduce(function(prev, current){
                        return prev + +current.fats
                        }, 0),
                        breakfastTotals: this.state.entries.reduce(function(prev, current){
                        return prev + +current.fats
                        }, 0),
          })
          this.setState({
            breakfastTotals: parseFloat(this.state.breakfastTotals).toFixed(0),
            totalcalories: parseFloat(this.state.totalcalories).toFixed(0),
            totalcarbs: parseFloat(this.state.totalcarbs).toFixed(0),
            totalproteins: parseFloat(this.state.totalproteins).toFixed(0),
            totalfats: parseFloat(this.state.totalfats).toFixed(0),
            remainingcalories: parseFloat(this.state.user.recommendations.calories - this.state.totalcalories).toFixed(0),
            remainingcarbs: parseFloat(this.state.user.recommendations.carbs - this.state.totalcarbs).toFixed(0),
            remainingproteins: parseFloat(this.state.user.recommendations.proteins - this.state.totalproteins).toFixed(0),
            remainingfats: parseFloat(this.state.user.recommendations.fats - this.state.totalfats).toFixed(0)
          })
  })
  .catch((error) => {
    window.location = '/landing'
  })

}
}

removeFood(id){


  axios.get('http://localhost:4000/foods/'+id)
  .then(res => {
    console.log(res.data);
    console.log(this.state.remainingcalories);
    this.setState({food: res.data})
    this.setState({
      totalcalories: parseFloat(this.state.totalcalories - this.state.food.calories).toFixed(0),
      totalcarbs: parseFloat(this.state.totalcarbs - this.state.food.carbs).toFixed(0),
      totalproteins: parseFloat(this.state.totalproteins - this.state.food.proteins).toFixed(0),
      totalfats: parseFloat(this.state.totalfats - this.state.food.fats).toFixed(0),
    })
    this.setState({
      remainingcalories: parseFloat(this.state.user.recommendations.calories - this.state.totalcalories).toFixed(0),
      remainingcarbs: parseFloat(this.state.user.recommendations.carbs - this.state.totalcarbs).toFixed(0),
      remainingproteins: parseFloat(this.state.user.recommendations.proteins - this.state.totalproteins).toFixed(0),
      remainingfats: parseFloat(this.state.user.recommendations.fats - this.state.totalfats).toFixed(0)
    })
    console.log(this.state.remainingcalories);

  })
  .catch(err => {
    console.log(err)
  })

  const entry = {data: {diary_id: this.state.diary[0]._id}}
        axios.delete('http://localhost:4000/foods/'+id, entry)
          this.setState({
        entries: this.state.entries.filter(el => el._id !== id),
      })
}
checkLast(){
  this.setState({
                totalcalories: this.state.entries.reduce(function(prev, current){
                return prev + +current.calories
                }, 0),
                totalcarbs: this.state.entries.reduce(function(prev, current){
                return prev + +current.carbs
                }, 0),
                totalproteins: this.state.entries.reduce(function(prev, current){
                return prev + +current.proteins
                }, 0),
                totalfats: this.state.entries.reduce(function(prev, current){
                return prev + +current.fats
                }, 0),
  })
  this.setState({
    totalcalories: parseFloat(this.state.totalcalories).toFixed(0),
    totalcarbs: parseFloat(this.state.totalcarbs).toFixed(0),
    totalproteins: parseFloat(this.state.totalproteins).toFixed(0),
    totalfats: parseFloat(this.state.totalfats).toFixed(0),
    remainingcalories: parseFloat(this.state.user.recommendations.calories - this.state.totalcalories).toFixed(0),
    remainingcarbs: parseFloat(this.state.user.recommendations.carbs - this.state.totalcarbs).toFixed(0),
    remainingproteins: parseFloat(this.state.user.recommendations.proteins - this.state.totalproteins).toFixed(0),
    remainingfats: parseFloat(this.state.user.recommendations.fats - this.state.totalfats).toFixed(0)
  })}
changeDiaryLeft(){
  const newDate = moment(this.state.mutatingDate).subtract(1, 'days').format('YYYY-MM-DD')
  const newDiary = moment(newDate).format('DDMMYYYY')
  const prevdate = moment(this.state.mutatingDate).subtract(2, 'days').format('YYYY-MM-DD')
  const nextDate = moment(this.state.mutatingDate).format('YYYY-MM-DD')
  this.setState({mutatingDate: newDate, prevdate: prevdate, nextDate: nextDate})
  axios.get('http://localhost:4000/diary/'+this.props.match.params.id+'/today/'+newDiary)
  .then(response => {
    this.setState({diary: response.data})
    this.setState({
                  todaysDiary: this.state.diary[0]
    })
    this.setState({
                  entries: this.state.todaysDiary.entries
    })
    this.checkLast();
  })

  .catch((error) => {
    console.log(error);
  })

}
changeDiaryRight(){
  const newDate = moment(this.state.mutatingDate).add(1, 'days').format('YYYY-MM-DD')
  const newDiary = moment(newDate).format('DDMMYYYY')
  const prevdate = moment(this.state.mutatingDate).format('YYYY-MM-DD')
  const nextDate = moment(this.state.mutatingDate).add(2, 'days').format('YYYY-MM-DD')
  this.setState({mutatingDate: newDate, nextDate: nextDate, prevdate: prevdate})
  axios.get('http://localhost:4000/diary/'+this.props.match.params.id+'/today/'+newDiary)
  .then(response => {
    this.setState({diary: response.data})
    this.setState({
                  todaysDiary: this.state.diary[0]
    })
    this.setState({
                  entries: this.state.todaysDiary.entries
    })
    this.checkLast();
  })
  .catch((error) => {
    console.log(error);
  })

}
async completeDiary(onClose){
  const calories = this.state.totalcalories
  const carbs = parseInt(this.state.totalcarbs)
  const proteins = this.state.totalproteins
  const fats = this.state.totalfats



const diary = {
  belongsto: this.state.todaysDiary.belongsto,
  submitted: 'true',
  entries: this.state.todaysDiary.entries,
  day: this.state.todaysDiary.day,
  diaryCode: this.state.todaysDiary.diaryCode,
  totals: {
    calories: calories,
    carbs: carbs,
    proteins: proteins,
    fats: fats,
  },
  originalTotals: {
    calories: calories,
    carbs: carbs,
    proteins: proteins,
    fats: fats,
  },
  originalRecommendations: {
    calories: this.state.user.recommendations.calories,
    carbs: this.state.user.recommendations.carbs,
    proteins: this.state.user.recommendations.proteins,
    fats: this.state.user.recommendations.fats,
  }
}
console.log(diary);


console.log(this.state.user.points);
{((this.state.totalcalories > this.state.user.recommendations.calories) && (this.state.totalcalories < this.state.user.recommendations.calories + 100)) ? (
    await this.setState({caloriePoint: this.state.user.points.calories+1})
) : (
    await this.setState({caloriePoint: this.state.user.points.calories})
)}
{((carbs > this.state.user.recommendations.carbs) && (carbs < this.state.user.recommendations.carbs + 25)) ? (
    await this.setState({carbPoint: this.state.user.points.carbs+1})
) : (
    await this.setState({carbPoint: this.state.user.points.carbs})
)}
{((proteins > this.state.user.recommendations.proteins) && (proteins < this.state.user.recommendations.proteins + 25)) ? (
    await this.setState({proteinPoint: this.state.user.points.proteins+1})
) : (
    await this.setState({proteinPoint: this.state.user.points.proteins})
)}
{((fats > this.state.user.recommendations.fats) && (fats < this.state.user.recommendations.fats + 11)) ? (
    await this.setState({fatPoint: this.state.user.points.fats+1})
) : (
    await this.setState({fatPoint: this.state.user.points.fats})
)}

console.log(this.state.caloriePoint);
console.log(this.state.carbPoint);
  const user = {
    points: {
    calories: this.state.caloriePoint,
    carbs: this.state.carbPoint,
    proteins: this.state.proteinPoint,
    fats: this.state.fatPoint
  }
  }
  console.log(user);
  console.log(diary);
axios.post('http://localhost:4000/account/add/points/'+this.state.user._id, user)
axios.post('http://localhost:4000/diary/update/'+this.state.todaysDiary._id, diary)
.then(res => {
  console.log(res.data);
  this.props.history.push({
    pathname:'/breakdown/'+this.state.todaysDiary._id,
    state: {
      remainingcalories: this.state.remainingcalories,
      remainingcarbs: this.state.remainingcarbs,
      remainingproteins: this.state.remainingproteins,
      remainingfats: this.state.remainingfats,
      originalTotals: diary.originalTotals,
      originalRecommendations: diary.originalRecommendations
    }})
  window.location = '/breakdown/'+this.state.todaysDiary._id
})
.catch(err => {
})
   };
confirmation(){
  if(this.state.entries.length === 0){
    this.setState({noentriesError: 'You must have at least 1 entry in order to submit the diary!'})
  }else{
    this.setState({confirmError: 'Are you sure you want to complete this Diary? You will no longer be able to earn points for this Diary.', clickedOnce: true})
 }
   }
Resubmitconfirmation(){
  if(this.state.entries.length === 0){
    this.setState({noentriesError: 'You must have at least 1 entry in order to submit the diary!'})
  }else{
        confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='confirmCard'>
              <div className="card-header removeBorder"><center><h3>Re-Submit Diary for <Moment format="dddd">{this.state.todaysDiary.day}</Moment> - <Moment format="LL">{this.state.todaysDiary.day}</Moment>?</h3></center></div>
                            {this.state.gamification === true &&
              <div className="card-body">
                <center><b>Note:</b> You cannot earn points from re-submitting a diary!</center>
              </div>
              }
              <div className="card-footer removeBorder">
              <center>
              <div className="btn modalbtns modalbtn1" onClick={onClose}>No, I've Changed My Mind</div>
              <div className="btn modalbtns modalbtn2 btn-success" onClick={() => {this.resubmit(onClose)}}>
                Yes, Re-Submit Diary
              </div>
              </center>
              </div>
            </div>
          );
        }
      });
    }
      }
resubmit(onClose){
  const calories = this.state.totalcalories
  const carbs = this.state.totalcarbs
  const proteins = this.state.totalproteins
  const fats = this.state.totalfats



const diary = {
  belongsto: this.state.todaysDiary.belongsto,
  submitted: 'true',
  entries: this.state.todaysDiary.entries,
  day: this.state.todaysDiary.day,
  diaryCode: this.state.todaysDiary.diaryCode,
  totals: {
    calories: calories,
    carbs: carbs,
    proteins: proteins,
    fats: fats,
  },
  originalTotals: this.state.todaysDiary.originalTotals,
  originalRecommendations: this.state.todaysDiary.originalRecommendations
}
  console.log(diary);
axios.post('http://localhost:4000/diary/update/'+this.state.todaysDiary._id, diary)
.then(res => {
  console.log(res.data);
  this.props.history.push({
    pathname:'/breakdown/'+this.state.todaysDiary._id,
    state: {
      remainingcalories: this.state.remainingcalories,
      remainingcarbs: this.state.remainingcarbs,
      remainingproteins: this.state.remainingproteins,
      remainingfats: this.state.remainingfats,
      originalTotals: diary.originalTotals,
      originalRecommendations: diary.originalRecommendations
    }})
  onClose();
})
.catch(err => {
})
}
handleInputChange = e => {
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  console.log(`Input name ${name}. Input value ${value}.`);

  this.setState({
    [name]: value
  });

  if(this.state.searchFoods !== ''){
  this.setState({searchError: ''});
  }

};

validate = () => {
  let searchError = ''
  if(!this.state.searchPhrase){
    searchError = 'Search Criteria Cannot be Empty'
  }
  if(searchError) {
    this.setState({searchError})
    return false;
  }

  return true;
}
async checkforErrors() {
  const isValid = await this.validate();
  if (isValid) {
    const state = this.state
    await  this.props.history.push({pathname: '/searchApi', state: {
      searchPhrase: this.state.searchPhrase,
      totalcalories: this.state.totalcalories,
      totalcarbs: this.state.totalcarbs,
      totalproteins: this.state.totalproteins,
      totalfats: this.state.totalfats,
      recommendations: this.state.user.recommendations,
      day: this.state.todaysDiary.day,
    }})
  }
}

  render() {
    const myDiaries = this.state.myDiaries
    if(this.state.todaysDiary === undefined){
      return(
        <div className="container col-lg-12 col-md-12">
    <div className="col-lg-12 heading">
    <center>

    </center>
    </div>


        <Card className="Diary">
        <div className="row heading">
        <div className="col-lg-3">
              <div><AiOutlineCaretLeft size={32} className="icons" onClick={() => {this.changeDiaryLeft()}}/> <small className="dateNav">{this.state.prevdate}</small> </div>

              </div>

        <div className="col-lg-6 date"><center><h2>No Diary Exists for
        {this.state.mutatingDate}
        </h2></center></div>
        <div className="col-lg-3 rightArrow"><div className="rightArrow">
                <div className="rightArrow"><small className="dateNav">{this.state.nextDate}</small><AiOutlineCaretRight className="icons ml-4" size={32} onClick={() => {this.changeDiaryRight()}}/></div>
              </div>
          </div>

        </div>
        <div className="row heading">
        <div className="col-lg-12 date"><center><div className="btn  btn-lg btn-success">Create Diary for This Date Now</div></center></div>
        </div>
        <Table className="table tablehead">

        </Table>
        </Card>






    </div>
      )
    } else
    return(
<div className="container col-lg-12 col-md-12 littleTest">
<div className="col-lg-12 heading">
<center>

</center>
</div>
  {this.state.diary.map((diary) =>
    <>
    <div className="row">
    <div className="col-lg-2">      {(this.state.myDiaries[0]._id !== this.state.todaysDiary._id) && (this.state.clickedOnce === false) && <div><AiOutlineCaretLeft size={42} className="icons" onClick={() => {this.changeDiaryLeft()}}/> <small className="dateNav"></small> </div>}
          </div>
    <div className="col-lg-8">
    {this.state.clickedOnce === false ? (
      <center><h2 className="date">Food Diary for <Moment format="dddd">{this.state.todaysDiary.day}</Moment> - <Moment format="LL">{this.state.todaysDiary.day}</Moment></h2></center>
    ) : (
      <center><h2 className="date">Submit Diary for <Moment format="dddd">{this.state.todaysDiary.day}</Moment> - <Moment format="LL">{this.state.todaysDiary.day}</Moment>?</h2></center>
    )}
    </div>

    <div className="col-lg-2 rightArrow"><div className="rightArrow">        {(this.state.myDiaries[this.state.myDiaries.length-1]._id !== this.state.todaysDiary._id) && (this.state.clickedOnce === false) &&
            <div className="rightArrow"><small className="dateNav"></small><AiOutlineCaretRight className="icons ml-4" size={42} onClick={() => {this.changeDiaryRight()}}/></div>
          }</div></div>
          {this.state.todaysDiary.submitted === true ? (
              <div className="col-lg-12 submittedWarning"><center><h4>{this.state.user.gamification === true ? ('Note: This Diary has already be submitted! - No Points can be Gained!') : ('Note: This Diary has already be submitted!')}</h4></center></div>
          ) : (
              <div className="col-lg-12 submittedWarning"></div>
          )

        }
    </div>
    <Card key={diary._id} className="Diary">
    <Row >
             <Form.Group className="col-lg-12 ">
             {this.state.clickedOnce === true &&
             <Row>
             <Col className="col-lg-12 mt-2">
             {this.state.user.gamification === true &&
               <>
             <div className="btn upcomingAwards col-3">
             <UpcomingAwards user={this.state.user} totalcalories={this.state.totalcalories} points={this.state.points} totalcarbs={this.state.totalcarbs} totalproteins={this.state.totalproteins} totalfats={this.state.totalfats}/>
             </div>
             <Card.Img variant="top" className="exitIcon" src={ExitIcon} onClick={() => {this.setState({confirmError: '', clickedOnce: false})}} />
             </>
           }
           <Card.Img variant="top" className="btn exitIcon2" src={ExitIcon} onClick={() => {this.setState({confirmError: '', clickedOnce: false})}} />
             </Col>
             </Row>
           }
           {this.state.clickedOnce === false &&
             <InputGroup className="diarySearchBar">
                 <Form.Control type="text" placeholder="Search Database for foods to add to this diary"
                   name="searchPhrase"
                   className="diarySearchInput"
                   value={this.state.searchPhrase}
                   onChange={this.handleInputChange}
                 />
                 <InputGroup.Append>
                   <InputGroup.Text id="" className="curveSearch">
                   <Link onClick={() => {this.checkforErrors()}}
                   className="diarySearchBtn">
                   <FaSearch size={26}/></Link>
                   </InputGroup.Text>
                 </InputGroup.Append>
              </InputGroup>
            }
             </Form.Group>
             <Col className="col-lg-12 searchError">{this.state.searchError}</Col>
    </Row>

    <Table className="table tablehead">

      <thead>
        <tr>
        {this.state.clickedOnce === false ? (
          <th className="meals breakfast">Breakfast</th>
        ) : (
        <>{this.state.user.gamification === true  ? (<th className="meals pointHead">What Points will I receive?</th>) : (<th className="meals pointHead">My Macro Targets</th>)}</>
        )}
          <th className="bottomLegend">Calories</th>
          <th className="bottomLegend">Carbs</th>
          <th className="bottomLegend">Proteins</th>
          <th className="bottomLegend last">Fats</th>
        </tr>

      </thead>
      <tbody>

{this.state.clickedOnce === false &&
  <>
      {this.state.entries.map((entry, index) => {
        if(entry.meal === 'Breakfast'){
          return(
        <tr key={index}>
          <td><div className="deleteButton">
          <span className="btn entryNames" title="Edit Entry" onClick={() => {this.props.history.push({pathname:'/food/edit/'+entry._id,
           state: {
            totalcalories: this.state.totalcalories,
            totalcarbs: this.state.totalcarbs,
            totalproteins: this.state.totalproteins,
            totalfats: this.state.totalfats,
            recommendations: this.state.user.recommendations,
            day: this.state.todaysDiary.day
          }}
        )}}>{entry.name}</span>
          <div title={entry._id} onClick={() => {this.removeFood(entry._id)}} className="btn entryDelete">
          <TiDelete className="removeEntry" size={25}/>
          </div>
    </div></td>
          <td className="nutrition">{entry.calories}</td>
          <td className="nutrition">{entry.carbs}</td>
          <td className="nutrition">{entry.proteins}</td>
          <td className="nutrition">{entry.fats}</td>


        </tr>
      )
      }else return (<></>)
      })}
      <tr>
          <td className="quickadd">




          <Link to={{
            pathname: "/add/"+diary._id,
            state: {
              newMeal: "Breakfast",
              totalcalories: this.state.totalcalories,
              totalcarbs: this.state.totalcarbs,
              totalproteins: this.state.totalproteins,
              totalfats: this.state.totalfats,
              recommendations: this.state.user.recommendations,
              day: this.state.todaysDiary.day
            }
          }}>Add to Breakfast |</Link>
          <Link to={{
            pathname: "/MyFoods/"+this.state.user._id,
            state: {
              newMeal: "Breakfast",
              totalcalories: this.state.totalcalories,
              totalcarbs: this.state.totalcarbs,
              totalproteins: this.state.totalproteins,
              totalfats: this.state.totalfats,
              recommendations: this.state.user.recommendations,
              diaryId: this.state.todaysDiary._id,
              day: this.state.todaysDiary.day
            }
          }}> Quick Add</Link>
          </td>
      </tr>

      <tr>
        <th colSpan={5} className="meals">Lunch</th>
      </tr>
      {this.state.entries.map((entry) => {
        if(entry.meal === 'Lunch'){
          return(
        <tr key={entry._id}>
          <td><div className="deleteButton">
          <span className="btn entryNames" title="Edit Entry" onClick={() => {this.props.history.push({pathname:'/food/edit/'+entry._id,
           state: {
            totalcalories: this.state.totalcalories,
            totalcarbs: this.state.totalcarbs,
            totalproteins: this.state.totalproteins,
            totalfats: this.state.totalfats,
            recommendations: this.state.user.recommendations,
            day: this.state.todaysDiary.day
          }}
        )}}>{entry.name}</span>
          <div title={entry._id} onClick={() => {this.removeFood(entry._id)}} className="btn entryDelete"><TiDelete className="removeEntry" size={25}/></div></div></td>
          <td className="nutrition">{entry.calories}</td>
          <td className="nutrition">{entry.carbs}</td>
          <td className="nutrition">{entry.proteins}</td>
          <td className="nutrition">{entry.fats}</td>
        </tr>
      )
      }else return (<></>)
      })}
      <tr>
      <td className="quickadd">




      <Link to={{
        pathname: "/add/"+diary._id,
        state: {
          newMeal: "Lunch",
          totalcalories: this.state.totalcalories,
          totalcarbs: this.state.totalcarbs,
          totalproteins: this.state.totalproteins,
          totalfats: this.state.totalfats,
          recommendations: this.state.user.recommendations,
          day: this.state.todaysDiary.day
        }
      }}>Add to Lunch </Link>
      <Link to={{
        pathname: "/MyFoods/"+this.state.user._id,
        state: {
          newMeal: "Lunch",
          totalcalories: this.state.totalcalories,
          totalcarbs: this.state.totalcarbs,
          totalproteins: this.state.totalproteins,
          totalfats: this.state.totalfats,
          recommendations: this.state.user.recommendations,
          diaryId: this.state.todaysDiary._id,
          day: this.state.todaysDiary.day
        }
      }}>| Quick Add</Link>
      </td>
      </tr>
      <tr>
        <th colSpan={5} className="meals">Dinner</th>
      </tr>
      {this.state.entries.map((entry) => {
        if(entry.meal === 'Dinner'){
          return(
        <tr key={entry._id}>
          <td><div className="deleteButton">
          <span className="btn entryNames" title="Edit Entry" onClick={() => {this.props.history.push({pathname:'/food/edit/'+entry._id,
           state: {
            totalcalories: this.state.totalcalories,
            totalcarbs: this.state.totalcarbs,
            totalproteins: this.state.totalproteins,
            totalfats: this.state.totalfats,
            recommendations: this.state.user.recommendations,
            day: this.state.todaysDiary.day
          }}
        )}}>{entry.name}</span>
          <div title={entry._id} onClick={() => {this.removeFood(entry._id)}} className="btn entryDelete"><TiDelete className="removeEntry" size={25}/></div></div></td>
          <td className="nutrition">{entry.calories}</td>
          <td className="nutrition">{entry.carbs}</td>
          <td className="nutrition">{entry.proteins}</td>
          <td className="nutrition">{entry.fats}</td>

        </tr>
      )
      }else return (<></>)
      })}
      <tr>
      <td className="quickadd">



      <Link to={{
        pathname: "/add/"+diary._id,
        state: {
          newMeal: "Dinner",
          totalcalories: this.state.totalcalories,
          totalcarbs: this.state.totalcarbs,
          totalproteins: this.state.totalproteins,
          totalfats: this.state.totalfats,
          recommendations: this.state.user.recommendations,
          day: this.state.todaysDiary.day
        }
      }}>Add to Dinner </Link>
      <Link to={{
        pathname: "/MyFoods/"+this.state.user._id,
        state: {
          newMeal: "Dinner",
          totalcalories: this.state.totalcalories,
          totalcarbs: this.state.totalcarbs,
          totalproteins: this.state.totalproteins,
          totalfats: this.state.totalfats,
          recommendations: this.state.user.recommendations,
          diaryId: this.state.todaysDiary._id,
          day: this.state.todaysDiary.day
        }
      }}>| Quick Add</Link>
      </td>
      </tr>
      <tr>
        <th  colSpan={5} className="meals">Snacks</th>
      </tr>
      {this.state.entries.map((entry) => {
        if(entry.meal === 'Snacks'){
          return(
        <tr key={entry._id}>
          <td>
          <div className="deleteButton">
          <span className="btn entryNames" title="Edit Entry" onClick={() => {this.props.history.push({pathname:'/food/edit/'+entry._id,
           state: {
            totalcalories: this.state.totalcalories,
            totalcarbs: this.state.totalcarbs,
            totalproteins: this.state.totalproteins,
            totalfats: this.state.totalfats,
            recommendations: this.state.user.recommendations,
            day: this.state.todaysDiary.day
          }}
        )}}>{entry.name}</span>
          <div title={entry._id} onClick={() => {this.removeFood(entry._id)}} className=" entryDelete"><TiDelete className="removeEntry" size={25}/></div></div></td>
          <td className="nutrition">{entry.calories}</td>
          <td className="nutrition">{entry.carbs}</td>
          <td className="nutrition">{entry.proteins}</td>
          <td className="nutrition">{entry.fats}</td>

        </tr>
      )
    }else return (<></>)
      })}
      <tr>
      <td className="quickadd">




      <Link to={{
        pathname: "/add/"+diary._id,
        state: {
          newMeal: "Snacks",
          totalcalories: this.state.totalcalories,
          totalcarbs: this.state.totalcarbs,
          totalproteins: this.state.totalproteins,
          totalfats: this.state.totalfats,
          recommendations: this.state.user.recommendations,
          day: this.state.todaysDiary.day
        }
      }}>Add to Snacks </Link>
      <Link to={{
        pathname: "/MyFoods/"+this.state.user._id,
        state: {
          newMeal: "Snacks",
          totalcalories: this.state.totalcalories,
          totalcarbs: this.state.totalcarbs,
          totalproteins: this.state.totalproteins,
          totalfats: this.state.totalfats,
          recommendations: this.state.user.recommendations,
          diaryId: this.state.todaysDiary._id,
          day: this.state.todaysDiary.day
        }
      }}>| Quick Add</Link>
      </td>
      </tr>
      </>
}
<tr>

{this.state.clickedOnce === true &&
  <>
  {(this.state.totalcalories >= this.state.user.recommendations.calories) && (this.state.totalcalories <= this.state.user.recommendations.calories + 100) ? (
    <span className="displayPoints">{this.state.user.gamification === true ? ('+1 Calorie Point') : ('Calorie Target Hit!')}</span>
  ) : (
    <span className="displayPoints2">
    {this.state.totalcalories < this.state.user.recommendations.calories && 'Target not Met - calories'}
    {(this.state.totalcalories > this.state.user.recommendations.calories + 25) && 'Target Exceeded - calories'}
    </span>
  )}


</>
}
  <td className="tableBottom"> Totals</td>
  <td className="nutrition totals">{this.state.totalcalories}</td>
  <td className="nutrition totals">{this.state.totalcarbs}</td>
  <td className="nutrition totals">{this.state.totalproteins}</td>
  <td className="nutrition totals">{this.state.totalfats}</td>
</tr>
<tr>
{this.state.clickedOnce === true &&
  <>
  {(this.state.totalcarbs >= this.state.user.recommendations.carbs) && (this.state.totalcarbs <= this.state.user.recommendations.carbs + 25) ? (
    <span className="displayPoints">{this.state.user.gamification === true ? ('+1 Carbohydrate Point') : ('Carbs Target Hit!')}</span>
  ) : (
    <span className="displayPoints2">
    {this.state.totalcarbs < this.state.user.recommendations.carbs && 'Target not Met - Carbs'}
    {(this.state.totalcarbs > this.state.user.recommendations.carbs + 25) && 'Target Exceeded - Carbs'}
    </span>
  )}
</>
}
  <td className="tableBottom">Daily Goal</td>
  <td className="nutrition">{this.state.user.recommendations.calories}</td>
  <td className="nutrition">{this.state.user.recommendations.carbs}</td>
  <td className="nutrition">{this.state.user.recommendations.proteins}</td>
  <td className="nutrition">{this.state.parseFats}</td>
</tr>
<tr>
{this.state.clickedOnce === true ? (
  <>
  {(this.state.totalproteins >= this.state.user.recommendations.proteins) && (this.state.totalproteins <= this.state.user.recommendations.proteins + 25) ? (
    <span className="displayPoints">{this.state.user.gamification === true ? ('+1 Protein Point') : ('Protein Target Hit!')}</span>
  ) : (
    <span className="displayPoints2">
    {this.state.totalproteins < this.state.user.recommendations.proteins && 'Target not Met - Proteins'}
    {(this.state.totalproteins > this.state.user.recommendations.proteins + 25) && 'Target Exceeded - Proteins'}
    </span>
  )}
</>
) : (
  <>
</>
)}
  <td className="tableBottom">Remaining</td>
  {this.state.totalcalories - 100 > this.state.user.recommendations.calories ? (
    <td className="nutrition negative">
    {this.state.remainingcalories}
    </td>
  ): (
    <td className="nutrition positive">
    {this.state.remainingcalories}
    </td>
  )}

  {this.state.totalcarbs > this.state.user.recommendations.carbs + 25 ? (
    <td className="nutrition negative">
    {this.state.remainingcarbs}
    </td>
  ): (
    <td className="nutrition positive">
    {this.state.remainingcarbs}
    </td>
  )}
  {this.state.totalproteins  > this.state.user.recommendations.proteins + 25 ? (
    <td className="nutrition negative">
    {this.state.remainingproteins}
    </td>
  ) : (
    <td className="nutrition positive">
    {this.state.remainingproteins}
    </td>
  )}
  {this.state.totalfats > this.state.user.recommendations.fats + 11 ? (
    <td className="nutrition negative">
    {this.state.remainingfats}
    </td>
  ) : (
    <td className="nutrition positive">
    {this.state.remainingfats}
    </td>
  )}
</tr>
<tr>
{this.state.clickedOnce === true &&
  <>
  {(this.state.totalfats >= this.state.user.recommendations.fats) && (this.state.totalfats <= this.state.user.recommendations.fats + 11) ? (
    <span className="displayPoints lastPoint">{this.state.user.gamification === true ? ('+1 Fat Point') : ('Fat Target Hit!')}</span>
  ) : (
    <span className="displayPoints2 lastPoint">
    {this.state.totalfats < this.state.user.recommendations.fats && 'Target not Met - Fats'}
    {(this.state.totalfats > this.state.user.recommendations.fats + 11) && 'Target Exceeded - Fats'}
    </span>
  )}
</>
}
  <td className="subornot">
  {this.state.todaysDiary.submitted === false ? (
    <>
      {this.state.clickedOnce === false &&
        <>
        <div onClick={() => {this.confirmation()}}  className="btn btn-success alreadySubmitted col-2">Complete Diary</div>
        {this.state.user.gamification === true &&
        <div className="btn btn-success alreadySubmitted sub2 col-2"><UpcomingAwards user={this.state.user} totalcalories={this.state.totalcalories} points={this.state.points} totalcarbs={this.state.totalcarbs} totalproteins={this.state.totalproteins} totalfats={this.state.totalfats}/></div>
        }
        </>


      }

        </>
  ) : (
    <>
    <div onClick={() => {this.Resubmitconfirmation()}}  className="btn alreadySubmitted col-2">Update Diary</div>
    <div onClick={() => {this.props.history.push({
      pathname:'/breakdown/'+this.state.todaysDiary._id,
      state: {
        remainingcalories: this.state.remainingcalories,
        remainingcarbs: this.state.remainingcarbs,
        remainingproteins: this.state.remainingproteins,
        remainingfats: this.state.remainingfats,
        originalTotals: this.state.todaysDiary.originalTotals,
        originalRecommendations: this.state.todaysDiary.originalRecommendations
      }})}}  className="btn alreadySubmitted sub2 col-2">View Breakdown</div>
    </>
  )}

  </td>
  <td className="bottomLegend legend1">Calories</td>
  <td className="bottomLegend">Carbs</td>
  <td className="bottomLegend">Proteins</td>
  <td className="bottomLegend">Fats</td>
</tr>
<tr>
</tr>
      </tbody>
    </Table>
    {this.state.clickedOnce &&
    <div className="row ml-1 mr-1">
    <div className="col-3 limits limit1">{this.state.user.gamification === true ? ('Range for Earning Points') : ('Range for Hitting Targets')}</div>
    <div className="col-3 limits">Calories = {this.state.user.recommendations.calories} - {this.state.user.recommendations.calories + 100}kcal</div>
    <div className="col-4 limits">Carbs/Proteins = {this.state.user.recommendations.carbs} - {this.state.user.recommendations.carbs + 25}g</div>
    <div className="col-2 limits">Fats = {parseInt(this.state.user.recommendations.fats)} - {parseInt(this.state.user.recommendations.fats) + 11}g</div>
    </div>
  }
    <div className="row"><div className="col-lg-12"><div className="noEntries">{this.state.noentriesError}</div></div></div>
    <div className="row"><div className="col-lg-12"><div className="noEntries">{this.state.confirmError}</div></div></div>
    {this.state.clickedOnce === true &&
    <div className="row">
    <div className="col-lg-12"><center><div onClick={() => {this.completeDiary()}} className="btn confirmComplete">Yes, Complete </div><div onClick={() => {this.setState({confirmError: '', clickedOnce: false})}} className="btn confirmComplete cancelComplete">No, Cancel</div></center></div>
    </div>

  }
    </Card>
    </>
  )}
</div>
)



    }
  }
