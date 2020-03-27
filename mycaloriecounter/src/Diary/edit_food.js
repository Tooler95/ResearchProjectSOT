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

 export default class EditFood extends Component {
   constructor(props) {
     super(props);
     this.state = {
     submittedOnce: false,
     error: null,
     loggedIn: localStorage.getItem('jwtToken') !== null,
     originalname: '',
     originalmeal: ''
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
      await this.setState({day: this.props.location.state.day, todaysDate: todaysDate})
      const mutatingDate = this.state.day; //declare mutatingDate as todays date
      const todayParsed = moment(mutatingDate).format('DDMMYYYY')
       axios.get('http://localhost:4000/foods/'+this.props.match.params.id)
       .then(res => {
         this.setState({
           createdby: res.data.createdby,
           meal: res.data.meal,
           name: res.data.name,
           calories: res.data.calories,
           carbs: res.data.carbs,
           proteins: res.data.proteins,
           fats: res.data.fats,
           originalname: res.data.name,
           originalmeal: res.data.meal,
         })
       })
       this.setState({
         createdby: user._id,
         totalcalories: this.props.location.state.totalcalories,
         totalcarbs: this.props.location.state.totalcarbs,
         totalproteins: this.props.location.state.totalproteins,
         totalfats: this.props.location.state.totalfats,
         recommendations: this.props.location.state.recommendations,
         day: todayParsed,
         mutatingDate: mutatingDate
       })
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
       fats: this.state.fats
     }

     console.log(food);

     axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
     axios.post('http://localhost:4000/foods/update/'+this.props.match.params.id, food)
     .then(res => {
       console.log(res.data);
       this.props.history.push({pathname:'/diary/today/'+this.state.createdby, state : {day: this.state.day, mutatingDate: this.state.mutatingDate}})
     })
     .catch(err => {
       console.log(err)

     })
   };


   render() {
     console.log(this.props.location.state);
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
       <center><h1 className="addFoodHeader"> {this.state.originalname}</h1></center>
  <center><h4 className="subHeadDate">Editing Diary Entry - <Moment format="dddd">{this.state.day}</Moment> <Moment format="MMMM">{this.state.day}</Moment> <Moment format="Do">{this.state.day}</Moment></h4></center>
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

    <center><div className="btn addFoodBtn" onClick={() => {this.onSubmit()}}>Update Entry</div></center>
    </>
) : (
    <center><div className="btn  confirmBtn" onClick={() => {this.onSubmit()}}>Add Entry to Diary</div></center>
)}


</div>
       </Form>
       </Card.Body>
       </Card>
       </div>
     )}
   }
 }
