/**
 * @Date:   2020-02-26T12:56:20+00:00
 * @Last modified time: 2020-03-12T14:38:36+00:00
 */
 import React, { Component } from 'react';
 import axios from 'axios';
 import {Form, Col, InputGroup, FormControl, Card, Row }from 'react-bootstrap'
  import Moment from 'react-moment'
   import moment from 'moment'
 import '../styles/myfoods.css'
 import {withRouter} from 'react-router-dom'
 import { IoIosRemoveCircle } from "react-icons/io";
  import ExitIcon from "../Rewards/ExitIcon.png"

 const Food = props => (
   <>
   <Card.Header className="foodName">{props.food.name}</Card.Header>
    <Card.Body>
    <Row className="detailsRow">
        <div className="col-3 p-0"><h6 className="foodProps">Calories:</h6></div>
        <div className="col-3 p-0"><h6 className="foodProps">Carbs</h6></div>
        <div className="col-3 p-0"><h6 className="foodProps">Proteins</h6></div>
        <div className="col-3 p-0"><h6 className="foodProps">Fats</h6></div>
        <div className="col-3 p-0"><h6 className="foodProps bottom">{props.food.calories}</h6></div>
        <div className="col-3 p-0"><h6 className="foodProps bottom">{props.food.carbs}</h6></div>
        <div className="col-3 p-0"><h6 className="foodProps bottom">{props.food.proteins}</h6></div>
        <div className="col-3 p-0"><h6 className="foodProps bottom">{props.food.fats}</h6></div>
    </Row>
    </Card.Body>
</>
);

 class MyFoods extends Component {

    constructor(props){
      super(props);
      this.state = {
        foods: [],
        food: {
        },
        diary: {},
        totals: {},
        user: {},
        filter: '',
        clickedOnce: false,
        requiredError: '',
        duplicateError: '',
        mealType: '',
        selectedMeal: '',
        hasbeenUpdated: false,
        calorieNumberError: '',
        loggedIn: localStorage.getItem('jwtToken') !== null,
      }
    }
    async componentDidMount(){
      const loggedIn = this.state.loggedIn;
      if(loggedIn === true)
      {
        const token = localStorage.getItem('jwtToken'); //get the JWT authentication token from local Storage
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const rawPayload = atob(encodedPayload);
        const user = JSON.parse(rawPayload);
        await this.setState({day: this.props.location.state.day})
        const mutatingDate = this.state.day; //declare mutatingDate as todays date
        const todayParsed = moment(mutatingDate).format('DDMMYYYY')

    await  axios.get('http://localhost:4000/foods/log/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          foods: response.data,
          user: user,
          mealType: this.props.location.state.newMeal,
          diaryId: this.props.location.state.diaryId
        })
      })
      .catch((error) => {
        console.log(error);
      })
      axios.get('http://localhost:4000/diary/'+this.state.diaryId)
      .then(response => {
        this.setState({
          diary: response.data,
          searchPhrase: this.props.location.state.searchPhrase,
          totalcalories: this.props.location.state.totalcalories,
          totalcarbs: this.props.location.state.totalcarbs,
          totalproteins: this.props.location.state.totalproteins,
          totalfats: this.props.location.state.totalfats,
          recommendations: this.props.location.state.recommendations,
          day: todayParsed,
          mutatingDate: mutatingDate
        })
        this.setState({totals: this.state.diary.totals})

      })
      .catch((error) => {
        console.log(error);
      })
    }

    }

    onSubmit = e => {
      e.preventDefault();
    }

async updateFood(){
   if(this.state.error1 !== true && this.state.error2 !== true){
  const id = this.state.diary._id
  const food = this.state.food
  await this.setState({food: {
    _id: food._id,
    createdby: food.createdby,
    name: this.state.foodname,
    meal: food.meal,
    calories: this.state.foodcalories,
    carbs: this.state.foodcarbs,
    proteins: this.state.foodproteins,
    fats: this.state.foodfats,
    isDuplicate: false
  }})
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('http://localhost:4000/foods/update/'+this.state.constantId, this.state.food)
    axios.post('http://localhost:4000/foods/add/'+id, food)
    this.props.history.push({pathname: '/diary/today/'+this.state.user._id, state : {day: this.state.day, mutatingDate: this.state.mutatingDate}})
}
}
async duplicateFood(){
  await this.setState({isDuplicate: true})
  console.log(this.state.food);
  const food = {
    createdby: this.state.food.createdby,
    meal: this.state.food.meal,
    name: this.state.food.name,
    calories: parseInt(this.state.foodcalories),
    carbs: parseInt(this.state.foodcarbs),
    proteins: parseInt(this.state.foodproteins),
    fats: parseInt(this.state.foodfats),
    isDuplicate: true
  }
  console.log(food);
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  axios.post('http://localhost:4000/foods/'+this.state.diary._id, food)
  .then(res => {
    console.log(res.data);
        this.props.history.push({pathname: '/diary/today/'+this.state.user._id, state : {day: this.state.day, mutatingDate: this.state.mutatingDate}})
  })
  .catch(err => {
    console.log(err)

  })
}
async createNewFood(){
  console.log(this.state.food);
  const food = {
    createdby: this.state.food.createdby,
    meal: this.state.food.meal,
    name: this.state.foodname,
    calories: parseInt(this.state.foodcalories),
    carbs: parseInt(this.state.foodcarbs),
    proteins: parseInt(this.state.foodproteins),
    fats: parseInt(this.state.foodfats),
    isDuplicate: false
  }
  console.log(food);
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  axios.post('http://localhost:4000/foods/'+this.state.diary._id, food)
  .then(res => {
    console.log(res.data);
        this.props.history.push({pathname: '/diary/today/'+this.state.user._id, state : {day: this.state.day, mutatingDate: this.state.mutatingDate}})
  })
  .catch(err => {
    console.log(err)

  })
}
async testRedirect(){
  if((this.state.diary.entries.indexOf(this.state.food._id) > -1) === true){
    if(this.state.hasbeenUpdated === false){
  await    this.setState({duplicateError: '* This food is already in todays Diary *', error1: true})
} else {
    await    this.setState({duplicateError: 'The Details for '+this.state.food.name+' have changed - a new food will be added.', error1: true})
}
    }
    else{
        await    this.setState({duplicateError: '', error1: false})
    }
   if(this.state.selectedMeal === ''){
  await   this.setState({requiredError: 'Please select a meal to add this food to!', error2: true})
   }
   else{
       await    this.setState({requiredError: '', error2: false})
   }
   console.log(this.state.diary.entries);
   console.log(this.state.diary.entries.indexOf(this.state.food._id) > -1);
   await this.updateFood();
}

cancel(){
  this.setState({clickedOnce: false, selectedMeal: '', mealType: '', filter: '', requiredError: '', duplicateError: '', error1: false, error2: false})
}

async changeMeal(mealname){
  console.log(mealname);
await  this.setState({selectedMeal: mealname, food: {
    _id: this.state.constantId,
    createdby: this.state.food.createdby,
    name: this.state.food.name,
    meal: mealname,
    calories: parseInt(this.state.foodcalories),
    carbs: parseInt(this.state.foodcarbs),
    proteins: parseInt(this.state.foodproteins),
    fats: parseInt(this.state.foodfats),
  } })
  console.log(this.state.food);
}

removeFood(id)
{
   axios.delete('http://localhost:4000/foods/remove/'+id)
   this.setState({
   foods: this.state.foods.filter(el => el._id !== id)
  })
}

handleInputChange = async e => {
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  const fatnumberError = ''
  console.log(`Input name ${name}. Input value ${value}.`);

await this.setState({
    [name]: value,
    hasbeenUpdated: true,
  });

await this.setState({
      updatedCalories: parseInt(this.state.totalcalories) + parseInt(this.state.foodcalories),
      updatedCarbs: parseInt(this.state.totalcarbs) + parseInt(this.state.foodcarbs),
      updatedProteins: parseInt(this.state.totalproteins) + parseInt(this.state.foodproteins),
      updatedFats: parseInt(this.state.totalfats) + parseInt(this.state.foodfats),
})

if(this.state.updatedCalories > this.state.recommendations.calories || this.state.updatedCarbs > this.state.recommendations.carbs ||
    this.state.updatedProteins > this.state.recommendations.proteins || this.state.updatedFats > this.state.recommendations.fats){
  this.setState({anyError: 'Warning! Daily Goal Exceeded in the following categories : '})
} else{
  this.setState({anyError: ''})
}
if(this.state.updatedCalories > this.state.recommendations.calories){
  this.setState({calorieNumberError: 'Calories'})
} else{
  this.setState({calorieNumberError: ''})
}
if(this.state.updatedCarbs > this.state.recommendations.carbs){
  this.setState({carbNumberError: 'Carbs'})
} else{
  this.setState({carbNumberError: ''})
}
if(this.state.updatedProteins > this.state.recommendations.proteins){
  this.setState({proteinNumberError: 'Proteins'})
} else{
  this.setState({proteinNumberError: ''})
}
if(this.state.updatedFats > parseInt(this.state.recommendations.fats)){
  this.setState({fatNumberError: 'Fats'})
} else{
  this.setState({fatNumberError: ''})
}
if(this.state.foodcalories !== ''){
this.setState({calorieError: ''});
}
if(this.state.foodcarbs !== ''){
this.setState({carbError: ''});
}
if(this.state.foodproteins !== ''){
this.setState({proteinError: ''});
}
if(this.state.foodfats !== ''){
this.setState({fatError: ''});
}


};

validate = () => {
  console.log('Validating');
  let foodnameError = ''
  let calorieError = ''
  let carbError = ''
  let proteinError = ''
  let fatError = ''
  if(isNaN(this.state.foodcalories)){
    calorieError = 'Not a Number!'
  }
  if(isNaN(this.state.foodcarbs)){
    carbError = 'Not a Number!'
  }
  if(isNaN(this.state.foodproteins)){
    proteinError = 'Not a Number!'
  }
  if(isNaN(this.state.foodfats)){
    fatError = 'Not a Number!'
  }
  if(!this.state.foodname){
    foodnameError = 'Food must have a name!'
  }

  if(calorieError || carbError || proteinError || fatError || foodnameError) {
    this.setState({calorieError, carbError, proteinError, fatError, foodnameError})
    return false;

  }

  return true;
}

checkForError(){
  const isValid = this.validate();
  if (isValid) {
    this.testRedirect();
  }
}

changeButtons(food){
  const totalcalories = this.state.totalcalories
  const calories = food.calories
  const totalcarbs = this.state.totalcarbs
  const carbs = food.carbs
  const totalproteins = this.state.totalproteins
  const proteins = food.proteins
  const totalfats = this.state.totalfats
  const fats = food.fats
  const updatedCalories = parseInt(totalcalories) + parseInt(calories)
  const updatedCarbs = parseInt(totalcarbs) + parseInt(carbs)
  const updatedProteins = parseInt(totalproteins) + parseInt(proteins)
  const updatedFats= parseInt(totalfats) + parseInt(fats)
  const allEntered = (updatedCalories && updatedCarbs && updatedProteins && updatedFats )
  if(Number.isInteger(allEntered)){
    this.setState({updatedCalories: updatedCalories, updatedCarbs: updatedCarbs, updatedProteins: updatedProteins, updatedFats: updatedFats})
  }
    this.setState({clickedOnce: true, mealType: null, food: food, constantId: food._id, selectedMeal: food.meal,
      foodname: food.name, foodcalories: food.calories, foodcarbs: food.carbs, foodproteins: food.proteins, foodfats: food.fats
    })
}
    render(){
      console.log(this.state.diary.entries);
      var mealname = '';
      const loggedIn = this.state.loggedIn;
      let filteredFoods = this.state.foods.filter(food => {
      return food.name.toLowerCase().indexOf(this.state.filter) !== -1;
    });
    if(this.state.loggedIn === true){
      return (
        <>
        {this.state.clickedOnce === false ? (

          <Card className="col-lg-12 mt-5 largeContainer">
          <Row>
          <Col className="col-lg-12">
          <Card.Img variant="top" className="exitIcon exit2" src={ExitIcon} onClick={() => {this.props.history.push('/diary/today/'+this.state.user._id)}} />
          </Col>
          </Row>
          <Card.Header className="foodTop">
          <h1 className="pageHead">Search for Previously Used Foods</h1>
          <Row >
                   <Form.Group className="col-lg-12 ">
                   <InputGroup className="searchBarApi">
                       <Form.Control type="text" placeholder="Search Database for a particular food"
                         name="searchPhrase"
                         className="searchInput"
                         value={this.state.searchPhrase}
                         onChange={this.handleInputChange}
                       />
                       <InputGroup.Append>
                         <InputGroup.Text id="" ><div className="searchBtn" onClick={() => {this.search()}}>Search</div></InputGroup.Text>
                       </InputGroup.Append>
                    </InputGroup>
                   </Form.Group>
          </Row>
        <Row>
        <Col className="col-lg-12">
          <center><h6 className="filterTxt">Filter Results by Meal Type</h6></center>
        </Col>
        </Row>
        <Row>
        <Col className="col-lg-4 filterbtns">
        {this.state.mealType === '' ? (
                <div className="btn showAll current" onClick={() => this.setState({mealType: ''})}>Show All My Foods</div>
        ) : (
                <div className="btn showAll" onClick={() => this.setState({mealType: ''})}>Show All My Foods</div>
            )}
        </Col>
        <Col className="col-lg-2 filterbtns">
        {this.state.mealType === 'Breakfast' ? (
                <div className="btn showAll filterbtns2 current" onClick={() => this.setState({mealType: 'Breakfast'})}>Breakfast</div>
        ) : (
                <div className="btn showAll filterbtns2  " onClick={() => this.setState({mealType: 'Breakfast'})}>Breakfast</div>
        )}

        </Col>
        <Col className="col-lg-2 filterbtns">
        {this.state.mealType === 'Lunch' ? (
                <div className="btn showAll filterbtns2 current" onClick={() => this.setState({mealType: 'Lunch'})}>Lunch</div>
        ) : (
                <div className="btn showAll filterbtns2  " onClick={() => this.setState({mealType: 'Lunch'})}>Lunch</div>
        )}

        </Col>
        <Col className="col-lg-2 filterbtns">
        {this.state.mealType === 'Dinner' ? (
                <div className="btn showAll filterbtns2 current" onClick={() => this.setState({mealType: 'Dinner'})}>Dinner</div>
        ) : (
                <div className="btn showAll filterbtns2  " onClick={() => this.setState({mealType: 'Dinner'})}>Dinner</div>
        )}

        </Col>
        <Col className="col-lg-2 filterbtns">
        {this.state.mealType === 'Snacks' ? (
                <div className="btn showAll filterbtns2 current" onClick={() => this.setState({mealType: 'Snacks'})}>Snacks</div>
        ) : (
                <div className="btn showAll filterbtns2  " onClick={() => this.setState({mealType: 'Snacks'})}>Snacks</div>
        )}

        </Col>
      </Row>
          </Card.Header>
          <Card.Body>
          <Row className="testtest">
  {filteredFoods.map(food => {
    if(food.meal === this.state.mealType && food.isDuplicate !== true){
            return(
             <Card className="foodCards col-6">
               <span className="btn deleteBtn"onClick={() => {this.removeFood(food._id)}}><IoIosRemoveCircle className="removeFood" size={32}/></span>
              <Food food={food} key={food._id} meal/>
              <Card.Footer className="foodFooter">
              <Row>
              <div className="col-12">
              <div className="btn addtoMeal" onClick={() => {this.changeButtons(food)}}>Add to Today's Diary</div>
              </div>
              </Row>
              </Card.Footer>
             </Card>
           )
         } else if(this.state.mealType === '' && food.isDuplicate !== true){
           return(
            <Card className="foodCards col-6">
            <span className="btn deleteBtn"onClick={() => {this.removeFood(food._id)}}><IoIosRemoveCircle className="removeFood" size={32}/></span>
             <Food food={food} key={food._id} meal/>
             <Card.Footer className="foodFooter">
             <Row>
             <div className="col-12">
             <div className="btn addtoMeal" onClick={() => {this.changeButtons(food)}}>Add to Today's Diary</div>
             </div>
             </Row>
             </Card.Footer>
            </Card>
          )

         }
       })}
       </Row>

          </Card.Body>
          </Card>
        ) : (
          <Row className="test2">

                  <Card className="confirmFoodCard col-10">
                  <Card.Header className="confirmFoodHead">
                  <div className="col-lg-12"><div className="confirmTitle">Add '{this.state.food.name}' to Today's Diary?</div></div>
                  <div className="row">
                  <div className="col-4 nutri nutri2">You can edit these details</div>
                  <div className="col-2 nutri">Calories</div>
                  <div className="col-2 nutri">Carbs</div>
                  <div className="col-2 nutri">Proteins</div>
                  <div className="col-2 nutri lastNutri">Fats</div>
                  </div>
                  </Card.Header>
                   <Card.Body className="foodObject">
                   <div className="row" >
                   <div className="col-4 nutri">
                   <InputGroup className="inputGroupsLeft">
                       <Form.Control type="text" placeholder="Food Name"
                         name="foodname"
                         className="nutriInputs"
                         value={this.state.foodname}
                         onChange={this.handleInputChange}
                       />
                    </InputGroup>
                   </div>
                   <div className="col-2 nutri">
                   <InputGroup className="inputGroupsLeft">
                                          <Form.Control type="text" placeholder="0"
                                            name="foodcalories"
                                            maxLength="4"
                                            autocomplete="off"
                                            className="nutriInputs"
                                            value={this.state.foodcalories}
                                            onChange={this.handleInputChange}
                                          />
                                       </InputGroup>
                    </div>
                   <div className="col-2 nutri">
                   <InputGroup className="inputGroupsLeft">
                                          <Form.Control type="text" placeholder="0"
                                            name="foodcarbs"
                                            maxLength="3"
                                            className="nutriInputs"
                                            value={this.state.foodcarbs}
                                            onChange={this.handleInputChange}
                                          />
                                       </InputGroup>
                   </div>
                   <div className="col-2 nutri">
                   <InputGroup className="inputGroupsLeft">
                                          <Form.Control type="text" placeholder="0"
                                            name="foodproteins"
                                            maxLength="3"
                                            className="nutriInputs"
                                            value={this.state.foodproteins}
                                            onChange={this.handleInputChange}
                                          />
                                       </InputGroup>
                   </div>
                   <div className="col-2 nutri lastNutri">
                   <InputGroup className="inputGroupsLeft">
                                          <Form.Control type="text" placeholder="0"
                                            name="foodfats"
                                            maxLength="3"
                                            className="nutriInputs"
                                            value={this.state.foodfats}
                                            onChange={this.handleInputChange}
                                          />
                                       </InputGroup>
                   </div>
                   </div>
                   </Card.Body>
                   <div className="row">
                   <div className="col-4 nutriError">
                   {this.state.foodnameError}
                   </div>
                   <div className="col-2 nutriError">
                   {this.state.calorieError}
                    </div>
                   <div className="col-2 nutriError">
                   {this.state.carbError}
                   </div>
                   <div className="col-2 nutriError">
                   {this.state.proteinError}
                   </div>
                   <div className="col-2 nutriError">
                   {this.state.fatError}
                   </div>
                   </div>
                   <Card.Footer className="addFoodFooter">
              <Row><Col className="col-12 updatedDiary"><div className="diaryText">How This Entry Will Affect Today's Diary</div></Col></Row>
                   <Row>
                   <Col className="col-4 diaryEffectHead"><Moment format="dddd">{this.props.location.state.day}</Moment> <Moment format="MMM">{this.props.location.state.day}</Moment> <Moment format="Do">{this.props.location.state.day}</Moment></Col>
                   <Col className="col-2 diaryEffect leftPad">Calories</Col>
                   <Col className="col-2 diaryEffect">Carbs</Col>
                   <Col className="col-2 diaryEffect">Proteins</Col>
                   <Col className="col-2 diaryEffect leftPad">Fats</Col>
                   </Row>
                   <Row>
                   <Col className="col-4 diaryEffectHead">Current Diary Totals</Col>
                   <Col className="col-2 diaryEffect">{this.state.totalcalories}</Col>
                   <Col className="col-2 diaryEffect">{this.state.totalcarbs}</Col>
                   <Col className="col-2 diaryEffect">{this.state.totalproteins}</Col>
                   <Col className="col-2 diaryEffect">{this.state.totalfats}</Col>
                   </Row>
                   <Row>
                   <Col className="col-4 diaryEffectHead">Updated Diary Totals</Col>
                   {(isNaN(this.state.updatedCalories) || this.state.updatedCalories < this.state.totalcalories) ? (
                              <Col className="col-2 diaryEffect">{this.state.totalcalories}</Col>
                   ) : (
                     <>
                     {this.state.updatedCalories > this.state.recommendations.calories ? (
                       <Col className="col-2 diaryEffect updatedcolor">{this.state.updatedCalories}</Col>
                     ) : (
                       <Col className="col-2 diaryEffect updatedcolor2">{this.state.updatedCalories}</Col>
                     )}
                    </>
                   )
                 }
                 {(isNaN(this.state.updatedCarbs) || this.state.updatedCarbs < this.state.totalcarbs) ? (
                            <Col className="col-2 diaryEffect">{this.state.totalcarbs}</Col>
                 ) : (
                   <>
                   {this.state.updatedCarbs > this.state.recommendations.carbs ? (
                     <Col className="col-2 diaryEffect updatedcolor">{this.state.updatedCarbs}</Col>
                   ) : (
                     <Col className="col-2 diaryEffect updatedcolor2">{this.state.updatedCarbs}</Col>
                   )}
                  </>
                 )
               }
               {(isNaN(this.state.updatedProteins) || this.state.updatedProteins < this.state.totalproteins) ? (
                          <Col className="col-2 diaryEffect">{this.state.totalproteins}</Col>
               ) : (
                 <>
                 {this.state.updatedProteins > this.state.recommendations.proteins ? (
                   <Col className="col-2 diaryEffect updatedcolor">{this.state.updatedProteins}</Col>
                 ) : (
                   <Col className="col-2 diaryEffect updatedcolor2">{this.state.updatedProteins}</Col>
                 )}
                </>
               )
             }
             {(isNaN(this.state.updatedFats) || this.state.updatedFats < this.state.totalfats) ? (
                        <Col className="col-2 diaryEffect">{this.state.totalfats}</Col>
             ) : (
               <>
               {this.state.updatedFats > this.state.recommendations.fats ? (
                 <Col className="col-2 diaryEffect updatedcolor">{this.state.updatedFats}</Col>
               ) : (
                 <Col className="col-2 diaryEffect updatedcolor2">{this.state.updatedFats}</Col>
               )}
              </>
             )
           }
                   </Row>
                   <Row>
                   <Col className="col-4 diaryEffectHead">Your Recommendations</Col>
                   <Col className="col-2 diaryEffect">{this.state.recommendations.calories}</Col>
                   <Col className="col-2 diaryEffect">{this.state.recommendations.carbs}</Col>
                   <Col className="col-2 diaryEffect">{this.state.recommendations.proteins}</Col>
                   <Col className="col-2 diaryEffect">{parseFloat(this.state.recommendations.fats).toFixed(0)}</Col>
                   </Row>
                   <Row>
                    <Col className="col-lg-12 mainError">{this.state.anyError}
                    {this.state.calorieNumberError !== '' &&
                    <span className="subError">{this.state.calorieNumberError}</span>
                    }
                    {this.state.carbNumberError !== '' &&
                    <span className="subError">{this.state.carbNumberError}</span>
                    }
                    {this.state.proteinNumberError !== '' &&
                    <span className="subError">{this.state.proteinNumberError}</span>
                    }
                    {this.state.fatNumberError !== '' &&
                    <span className="subError">{this.state.fatNumberError}</span>
                    }
</Col>
                   </Row>
                   <Row>
                    <Col className="col-lg-12 mealHead">Add to which meal?</Col>
                    {this.state.selectedMeal === 'Breakfast' ? (
                        <Col className="col-3 btn mealButtons selectedMeal" onClick={() => {this.changeMeal(mealname='')}}>Breakfast</Col>
                    ) : (
                         <Col className="col-3 btn mealButtons" onClick={() => {this.changeMeal(mealname="Breakfast")}}>Breakfast</Col>
                    )}
                    {this.state.selectedMeal === 'Lunch' ? (
                        <Col className="col-3 btn mealButtons selectedMeal" onClick={() => {this.changeMeal(mealname='')}}>Lunch</Col>
                    ) : (
                         <Col className="col-3 btn mealButtons" onClick={() => {this.changeMeal(mealname="Lunch")}}>Lunch</Col>
                    )}
                    {this.state.selectedMeal === 'Dinner' ? (
                        <Col className="col-3 btn mealButtons selectedMeal" onClick={() => {this.changeMeal(mealname='')}}>Dinner</Col>
                    ) : (
                         <Col className="col-3 btn mealButtons" onClick={() => {this.changeMeal(mealname="Dinner")}}>Dinner</Col>
                    )}
                    {this.state.selectedMeal === 'Snacks' ? (
                        <Col className="col-3 btn mealButtons selectedMeal" onClick={() => {this.changeMeal(mealname='')}}>Snacks</Col>
                    ) : (
                         <Col className="col-3 btn mealButtons" onClick={() => {this.changeMeal(mealname="Snacks")}}>Snacks</Col>
                    )}
                   </Row>

                   <Row>
                   {this.state.selectedMeal === '' ? (
                     <Col className="col-lg-12 mt-4"><center><h5 className="missingMeal">{this.state.requiredError}</h5></center></Col>
                   ) : (
                     <Col className="col-lg-12 mt-4"></Col>
                   )}
                   {this.state.duplicateError === '' ? (
                     <Col className="col-lg-12 mt-4"></Col>
                   ) : (
                     <>
                     <Col className="col-lg-12 mt-4"><center><h5 className="missingMeal">{this.state.duplicateError}</h5></center></Col>
                     </>
                                      )}

                   {this.state.duplicateError === '' ? (
                    <Col className="col-6 btn"><div className="optionBtn1" onClick={() => {this.checkForError()}}>Add Food</div></Col>
                  ) : (
                    <>
                    {this.state.hasbeenUpdated === true ? (
                                          <Col className="col-6 btn"><div className="optionBtn1" onClick={() => {this.createNewFood()}}>Add New Food</div></Col>
                    ) : (
                                          <Col className="col-6 btn"><div className="optionBtn1" onClick={() => {this.duplicateFood()}}>Add Food Again</div></Col>
                    )}

                    </>
                  )}
                    <Col className="col-6 btn"><div className="optionBtn2" onClick={() => {this.cancel()}}>Cancel</div></Col>
                   </Row>
                  </Card.Footer>
                  </Card>
                </Row>

        )}


      </>
      )
    }
    }
}


  export default withRouter(MyFoods)
