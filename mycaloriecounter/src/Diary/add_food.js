/**
 * @Date:   2020-01-15T14:39:38+00:00
 * @Last modified time: 2020-02-24T16:03:10+00:00
 */
 import React, { Component } from 'react';
 import axios from 'axios';
 import Moment from 'react-moment'
  import moment from 'moment'
 import {Form, Row, Col, Card, InputGroup} from 'react-bootstrap';
 import '../App.css';
  import ExitIcon from "../Rewards/ExitIcon.png"

 export default class AddFoodToDiary extends Component {
   constructor(props) {
     super(props);
     this.state = {
       food: {
       createdby: '',
       meal: '',
       name: '',
       calories: '',
       carbs: '',
       proteins: '',
       fats: ''
     },
     todaysDate: new Date(),
     isDuplicate: '',
     newMeal: '',
     recommendations: {},
     day: '',
     submittedOnce: false,
     error: null,
     loggedIn: localStorage.getItem('jwtToken') !== null
     }
   }

   async componentDidMount(){
     const loggedIn = this.state.loggedIn;
     if(loggedIn === true){
       const token = localStorage.getItem('jwtToken');
       const tokenParts = token.split('.');
       const encodedPayload = tokenParts[1];
       const rawPayload = atob(encodedPayload);
       const user = JSON.parse(rawPayload);
       const todaysDate = moment(this.state.todaysDate).format('YYYY-MM-DD') + 'T00:00:00.000Z'
       console.log(todaysDate);
      await this.setState({day: this.props.location.state.day, todaysDate: todaysDate})
      const mutatingDate = this.state.day; //declare mutatingDate as todays date
      const todayParsed = moment(mutatingDate).format('DDMMYYYY')
      await this.setState({
         createdby: user._id,
         meal: this.props.location.state.newMeal,
         totalcalories: this.props.location.state.totalcalories,
         totalcarbs: this.props.location.state.totalcarbs,
         totalproteins: this.props.location.state.totalproteins,
         totalfats: this.props.location.state.totalfats,
         recommendations: this.props.location.state.recommendations,
         day: todayParsed,
         mutatingDate: mutatingDate,
         isDuplicate: false
       })
     }
   }

viewUpdated(){
  const totalcalories = this.state.totalcalories
  const calories = this.state.calories
  const totalcarbs = this.state.totalcarbs
  const carbs = this.state.carbs
  const totalproteins = this.state.totalproteins
  const proteins = this.state.proteins
  const totalfats = this.state.totalfats
  const fats = this.state.fats
  const updatedCalories = parseInt(totalcalories) + parseInt(calories)
  const updatedCarbs = parseInt(totalcarbs) + parseInt(carbs)
  const updatedProteins = parseInt(totalproteins) + parseInt(proteins)
  const updatedFats= parseInt(totalfats) + parseInt(fats)
  const allEntered = (updatedCalories && updatedCarbs && updatedProteins && updatedFats )
  if(Number.isInteger(allEntered)){
    this.setState({submittedOnce: true, updatedCalories: updatedCalories, updatedCarbs: updatedCarbs, updatedProteins: updatedProteins, updatedFats: updatedFats})
  } else{
    this.setState({error: 'You must Fill out all fields'})
  }

}








   handleInputChange = e => {
     const target = e.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     console.log(`Input name ${name}. Input value ${value}.`);

     this.setState({
       [name]: value,
       error: null,
       submittedOnce: false

     });
   }

   onSubmit = e => {
     const food = {

       createdby: this.state.createdby,
       meal: this.state.meal,
       name: this.state.name,
       calories: this.state.calories,
       carbs: this.state.carbs,
       proteins: this.state.proteins,
       fats: this.state.fats,
       isDuplicate: this.state.isDuplicate
     }
     axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
     axios.post('http://localhost:4000/foods/'+this.props.match.params.id, food)
     .then(res => {
       this.props.history.push({pathname:'/diary/today/'+this.state.createdby, state : {day: this.state.day, mutatingDate: this.state.mutatingDate}})
     })
     .catch(err => {
       console.log(err)

     })
   };


   render() {
     console.log(this.props.location.state.day);
     console.log(this.state.todaysDate);
     const loggedIn = this.state.loggedIn;
     if(loggedIn === true){

     return (
       <div className="container col-lg-8 col-md-12 col-sm-12">
       <Card className="addFoodCard">
       <Row>
       <Col className="col-lg-12 mb-3">
       <Card.Img variant="top" className="exitIcon" src={ExitIcon} onClick={() => {this.props.history.push({pathname: '/diary/today/'+this.state.createdby, state : {day: this.state.day, mutatingDate: this.state.mutatingDate}})}} />
       </Col>
       </Row>
       <Card.Header>
       <center><h1 className="addFoodHeader">Add Food to {this.state.meal}</h1></center>
        {this.props.location.state.day !== this.state.todaysDate ? (
          <center><h4 className="subHeadDate">Adding to Previous Diary - <Moment format="dddd">{this.props.location.state.day}</Moment> <Moment format="MMMM">{this.props.location.state.day}</Moment> <Moment format="Do">{this.props.location.state.day}</Moment></h4></center>
        ) : (
          <center><h4 className="subHeadDate">Adding to Diary - Today, <Moment format="dddd">{this.props.location.state.day}</Moment> <Moment format="MMMM">{this.props.location.state.day}</Moment> <Moment format="Do">{this.props.location.state.day}</Moment></h4></center>
        )}

       </Card.Header>
       <Card.Body className="addBody">
       <Form onSubmit={this.onSubmit} autocomplete="off">
       <Row>
       <Col className="col-6">
       <Form.Group>
           <InputGroup className="">
           <InputGroup.Prepend>
             <InputGroup.Text id="" className="addFoodPrepends" >Meal <span className="needed">*</span></InputGroup.Text>
           </InputGroup.Prepend>
           <select className = "form-control addFoodInputs" value={this.state.meal} name="meal" onChange={this.handleInputChange}>
             <option value="" selected="selected" hidden="hidden">Select Meal</option>
             <option>Breakfast</option>
             <option>Lunch</option>
             <option>Dinner</option>
             <option>Snacks</option>
            </select>
         </InputGroup>
     </Form.Group>
     </Col>
     <Col className="col-6">
     <Form.Group>
       <InputGroup>
       <InputGroup.Prepend >
         <InputGroup.Text id="" className="addFoodPrepends">Food Name <span className="needed">*</span></InputGroup.Text>
       </InputGroup.Prepend>
       <Form.Control  type="text"
           required
           name = "name"
           className="addFoodInputs"
           value={this.state.name}
           onChange={this.handleInputChange}
           />
         </InputGroup>
     </Form.Group>
     </Col>
</Row>


<Row>
<Col className="col-6">
     <Form.Group>
       <InputGroup>
       <InputGroup.Prepend >
         <InputGroup.Text id="" className="addFoodPrepends"><div className="">Calories <span className="needed">*</span></div></InputGroup.Text>
       </InputGroup.Prepend>
       <Form.Control  type="text"
           required
           name = "calories"
           className="addFoodInputs"
           value={this.state.calories}
           onChange={this.handleInputChange}
           />
         </InputGroup>
     </Form.Group>
</Col>
<Col className="col-6">
     <Form.Group>
       <InputGroup>
       <InputGroup.Prepend >
         <InputGroup.Text id="" className="addFoodPrepends"><div className="">Carbs <span className="needed">*</span></div></InputGroup.Text>
       </InputGroup.Prepend>
       <Form.Control  type="text"
           required
           name = "carbs"
           className="addFoodInputs"
           value={this.state.carbs}
           onChange={this.handleInputChange}
           />
           <InputGroup.Append >
             <InputGroup.Text id="" className="addFoodAppends"><div className="">Grams</div></InputGroup.Text>
           </InputGroup.Append>
         </InputGroup>
     </Form.Group>
     </Col>
</Row>
<Row>
<Col className="col-6">
     <Form.Group>
       <InputGroup>
       <InputGroup.Prepend >
         <InputGroup.Text id="" className="addFoodPrepends"><div className="">Proteins <span className="needed">*</span></div></InputGroup.Text>
       </InputGroup.Prepend>
       <Form.Control  type="text"
           required
           name = "proteins"
           className="addFoodInputs"
           value={this.state.proteins}
           onChange={this.handleInputChange}
           />
           <InputGroup.Append >
             <InputGroup.Text id="" className="addFoodAppends"><div className="">Grams</div></InputGroup.Text>
           </InputGroup.Append>
         </InputGroup>
     </Form.Group>
</Col>
<Col className="col-6">
     <Form.Group>
       <InputGroup>
       <InputGroup.Prepend >
         <InputGroup.Text id="" className="addFoodPrepends"><div className="">Fats <span className="needed">*</span></div></InputGroup.Text>
       </InputGroup.Prepend>
       <Form.Control  type="text"
           required
           name = "fats"
           className="addFoodInputs"
           value={this.state.fats}
           onChange={this.handleInputChange}
           />
           <InputGroup.Append >
             <InputGroup.Text id="" className="addFoodAppends"><div className="">Grams</div></InputGroup.Text>
           </InputGroup.Append>
         </InputGroup>
     </Form.Group>
     </Col>
</Row>

<div className="form-group">
{this.state.submittedOnce === false ? (
  <>
  {this.state.error === null ? (
        <center><div className=" col-6">{this.state.error}</div></center>
  ) : (
        <center><div className="error col-6">{this.state.error}</div></center>
  )}

    <center><div className="btn addFoodBtn" onClick={() => {this.viewUpdated()}}>Submit Entry</div></center>
    </>
) : (
    <center><div className="btn  confirmBtn" onClick={() => {this.onSubmit()}}>Add Entry to Diary</div></center>
)}


</div>
       </Form>
       </Card.Body>
       <Card.Footer className="addFoodFooter">
              {this.state.submittedOnce === true &&
<div className="footerTotals">
  <Row><Col className="col-12 updatedDiary"><div className="diaryText">How This Entry Will Affect This Diary</div></Col></Row>
       <Row>
       <Col className="col-4 diaryDate"><Moment format="dddd">{this.props.location.state.day}</Moment> <Moment format="MMM">{this.props.location.state.day}</Moment> <Moment format="Do">{this.props.location.state.day}</Moment></Col>
       <Col className="col-2 currentTotals leftPad">Calories</Col>
       <Col className="col-2 currentTotals">Carbs</Col>
       <Col className="col-2 currentTotals">Proteins</Col>
       <Col className="col-2 currentTotals leftPad">Fats</Col>
       </Row>
       <Row>
       <Col className="col-4 currentHeads">Current Diary Totals</Col>
       <Col className="col-2 currentTotals">{this.state.totalcalories}</Col>
       <Col className="col-2 currentTotals">{this.state.totalcarbs}</Col>
       <Col className="col-2 currentTotals">{this.state.totalproteins}</Col>
       <Col className="col-2 currentTotals">{this.state.totalfats}</Col>
       </Row>

       <Row>
       <Col className="col-4 currentHeads">Updated Diary Totals</Col>
       {this.state.updatedCalories > this.state.recommendations.calories ? (
          <Col className="col-2 currentTotals negative">{this.state.updatedCalories}</Col>
       ) : (
         <Col className="col-2 currentTotals positive">{this.state.updatedCalories}</Col>
       )}
       {this.state.updatedCarbs > this.state.recommendations.carbs ? (
          <Col className="col-2 currentTotals negative">{this.state.updatedCarbs}</Col>
       ) : (
         <Col className="col-2 currentTotals positive">{this.state.updatedCarbs}</Col>
       )}
       {this.state.updatedProteins > this.state.recommendations.proteins ? (
          <Col className="col-2 currentTotals negative">{this.state.updatedProteins}</Col>
       ) : (
         <Col className="col-2 currentTotals positive">{this.state.updatedProteins}</Col>
       )}
       {this.state.updatedFats > this.state.recommendations.fats ? (
          <Col className="col-2 currentTotals negative">{this.state.updatedFats}</Col>
       ) : (
         <Col className="col-2 currentTotals positive">{this.state.updatedFats}</Col>
       )}
       </Row>

     <Row>
     <Col className="col-4 currentHeads">Your Daily Target</Col>
     <Col className="col-2 currentTotals">{this.state.recommendations.calories}</Col>
     <Col className="col-2 currentTotals">{this.state.recommendations.carbs}</Col>
     <Col className="col-2 currentTotals">{this.state.recommendations.proteins}</Col>
     <Col className="col-2 currentTotals">{parseFloat(this.state.recommendations.fats).toFixed(0)}</Col>
     </Row>
     </div>

          }
       </Card.Footer>
       <Row>
       {this.state.updatedCalories > this.state.recommendations.calories &&
        <Col className="col-12 negative addErrors">You will exceed your recommended calories upon adding this entry.</Col>
      }
      {this.state.updatedCarbs > this.state.recommendations.carbs &&
        <Col className="col-12 negative addErrors">You will exceed your recommended Carbohydrates upon adding this entry.</Col>
     }
     {this.state.updatedProteins > this.state.recommendations.proteins &&
      <Col className="col-12 negative addErrors ">You will exceed your recommended Proteins upon adding this entry.</Col>
    }
    {this.state.updatedFats > this.state.recommendations.fats &&
    <Col className="col-12 negative addErrors">Warning: Your daily goal is stay under {parseFloat(this.state.recommendations.fats).toFixed(0)} grams of Fat.</Col>
   }
       </Row>
       </Card>
       </div>
     )}
   }
 }
