/**
 * @Date:   2020-02-25T14:24:10+00:00
 * @Last modified time: 2020-02-25T17:32:28+00:00
 */
 import React, { Component } from 'react';
 import ReactSearchBox from 'react-search-box'
 import axios from 'axios';
 import {Form, CardColumns,Button, Col, InputGroup, FormControl, Card, Row }from 'react-bootstrap'
 import moment from 'moment'
 import '../styles/myfoods.css'
 import {withRouter, Link} from 'react-router-dom'



 const Food = props => (

  <Card>
    <Card.Body>
    <Row>
      <Col sm={4}>{props.food.name}</Col>
      <Col sm={2}>{props.food.calories}</Col>
      <Col sm={2}>{props.food.carbs}</Col>
      <Col sm={2}>{props.food.proteins}</Col>
      <Col sm={2}>{props.food.fats}</Col>
    </Row>
    </Card.Body>
  </Card>

);

 class Test extends Component {

    constructor(props){
      super(props);
      this.state = {
        foods: [],
        filter: '',
        mealType: 'Breakfast'
      }
    }
    componentDidMount(){
      axios.get('http://localhost:4000/foods/')
      .then(response => {
        this.setState({foods: response.data})
        console.log(this.state.foods)
      })
      .catch((error) => {
        console.log(error);
      })

    }

    onSubmit = e => {
      e.preventDefault();

      console.log()

    }

    addFood(food){
      const r = window.confirm("Add to Todays Diary - " + this.state.mealType + "?")
      if (r === true){
      console.log(food);
      // const id = this.props.match.params.id;
      const id = "5e5559e7c574bc61dc07cd21";
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.post('http://localhost:4000/foods/add/'+id, food)
      .then(res => {
        console.log(res.data);
        this.props.history.push('/diary/today/'+this.state.createdby)
      })
      .catch(err => {
        console.log(err)

      })
    }
    }


    handleInputChange = e => {
  const target = e.target;
  const value = target.value;
  const name = target.name;

  console.log(`Input name ${name}. Input value ${value}.`);

  this.setState({
    [name]: value
  });
};

handleChange = event => {
  this.setState({filter: event.target.values})
}

handleSearchInput = e => {
  const target = e.target;
  const value = target.value;
  const name = target.name;

  console.log(`Input name ${name}. Input value ${value}.`);

  this.setState({
    filter: value
  });
};

    render(){
      if(this.state.mealType === ''){
        return(
          <div className="container col-lg-12">
          <Row>
          <Col>
          <center><h1>Select a Meal</h1></center>
          </Col>
          </Row>
          <Row>
          <Col>
            <center><div onClick={() => this.setState({mealType: 'Breakfast'})} className="btn btn-success filterButton">Breakfast</div>
            <div onClick={() => this.setState({mealType: 'Lunch'})}className="btn btn-success filterButton">Lunch</div>
            <div onClick={() => this.setState({mealType: 'Dinner'})} className="btn btn-success filterButton">Dinner</div>
            <div onClick={() => this.setState({mealType: 'Snacks'})} className="btn btn-success filterButton">Snacks</div></center>
          </Col>
          </Row>
          </div>
        )
      }
      const loggedIn = this.state.loggedIn;
      let filteredFoods = this.state.foods.filter(food => {
      console.log(food.name);
      return food.name.toLowerCase().indexOf(this.state.filter) !== -1;



    });
      return (
        <div className="container col-lg-12 mt-3">
        <Row>
        <Col>
        <center><h1>Your foods for <b>{this.state.mealType}</b></h1></center>
        </Col>
        </Row>
        <Row>
        <Col sm={7}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Search"
              name="search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={this.state.search}
              onChange={this.handleSearchInput}
            />
        </InputGroup>
      </Col>
      <Col sm={5}>
      <div onClick={() => this.setState({mealType: 'Breakfast'})} className="btn btn-success filterButton">Breakfast</div>
      <div onClick={() => this.setState({mealType: 'Lunch'})}className="btn btn-success filterButton">Lunch</div>
      <div onClick={() => this.setState({mealType: 'Dinner'})} className="btn btn-success filterButton">Dinner</div>
      <div onClick={() => this.setState({mealType: 'Snacks'})} className="btn btn-success filterButton">Snacks</div>
      </Col>
      </Row>
   {filteredFoods.map(food => {
     if(food.meal === this.state.mealType){
      return <div onClick={()=> this.addFood(food)}><Food food={food} key={food._id} /></div>;
    }
    })}
        </div>
      )
    }
}


  export default withRouter(Test)
