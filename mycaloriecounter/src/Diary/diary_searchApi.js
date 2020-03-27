/**
 * @Date:   2020-02-26T12:56:20+00:00
 * @Last modified time: 2020-03-03T13:20:07+00:00
 */
 import React, { Component } from 'react';
 import axios from 'axios';
 import {Form, InputGroup, Card, Row, Col }from 'react-bootstrap'
 import moment from 'moment'
 import '../styles/myfoods.css'
 import {withRouter} from 'react-router-dom'
 import "../styles/api.css"
 import { confirmAlert } from 'react-confirm-alert'; // Import
 import { IoMdExit } from "react-icons/io";
 import { GiFoodTruck } from "react-icons/gi";
 import { FaSearch } from "react-icons/fa";
 import ExitIcon from "../Rewards/ExitIcon.png"
   import Moment from 'react-moment'

 class SearchApi extends Component {

    constructor(props){
      super(props);
      this.state = {
        foods: [],
        food: {},
        carbohydrates: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
        clicks: 0,
        show: true,
        user: {},
        todaysDiary: {},
        nutrients: [],
        beenClicked: false,
        clickedOnce: false,
        searchHappened: false,
        searchPhrase: '',
        loggedIn: localStorage.getItem('jwtToken') !== null
      }
    }

handleInputChange = async e => {
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  console.log(`Input name ${name}. Input value ${value}.`);

await  this.setState({
    [name]: value
  });
  if(this.state.searchHappened === true){
    this.setState({searchHappened: false, beenClicked: false})
  }
await  this.setState({
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
  if(this.state.food.meal !== ''){
  this.setState({mealError: ''});
  }

};

async componentDidMount(){
        console.log(this.props);
  const loggedIn = this.state.loggedIn;
  if(loggedIn === true){
    const token = localStorage.getItem('jwtToken');
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const user = JSON.parse(rawPayload);
    const recommendations = user.recommendations
    console.log(recommendations);
    await axios.get('http://localhost:4000/account/'+user._id)
    .then(res => {this.setState({user: res.data, day: this.props.location.state.day})
    })
    .catch(err => {
      console.log(err)
    })
    const mutatingDate = this.state.day; //declare mutatingDate as todays date
    const todayParsed = moment(mutatingDate).format('DDMMYYYY')
    console.log(todayParsed);
    await axios.get('http://localhost:4000/diary/'+user._id+'/today/'+todayParsed)
       .then(response => {
           this.setState({
                          todaysDiary: response.data[0],
                          searchPhrase: this.props.location.state.searchPhrase,
                          totalcalories: this.props.location.state.totalcalories,
                          totalcarbs: this.props.location.state.totalcarbs,
                          totalproteins: this.props.location.state.totalproteins,
                          totalfats: this.props.location.state.totalfats,
                          recommendations: this.props.location.state.recommendations,
                          day: todayParsed,
                          mutatingDate: mutatingDate
                        })
          this.search();
   })
   .catch((error) => {
     console.log(error);
   })

}
}


search(){
  this.setState({beenClicked: true})
  const axios = require("axios");
  const food = this.state.searchPhrase
console.log(this.state.beenClicked);
  axios({
      "method":"GET",
      "url":"https://api.edamam.com/api/food-database/parser?ingr="+food+"&app_id=fa10ff04&app_key=ce4383b10a6ee0d73f5afb9d5c963820",
      })
      .then((response)=>{
        console.log(response);
        this.setState({
          food: response.data.hints,
          beenClicked: true,
          searchHappened: true,
          nextPage: response.data._links.next.href
        })
        console.log(this.state.food);
      })
      .catch((error)=>{
        console.log(error)
      })
}
nextPage(){
const axios = require("axios");
const page = this.state.nextPage
  axios({
      "method":"GET",
      "url": page,
      })
      .then((response)=>{
        console.log(response);
        this.setState({
          food: response.data.hints,
          nextPage: response.data._links.next.href
        })
      })
      .catch((error)=>{
        console.log(error)
      })
}

addFood(){
  const food = {
    createdby: this.state.user._id,
    meal: this.state.food.meal,
    name: this.state.food.name,
    calories: this.state.foodcalories,
    carbs: this.state.foodcarbs,
    proteins: this.state.foodproteins,
    fats: this.state.foodfats
  }
axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
axios.post('http://localhost:4000/foods/'+this.state.todaysDiary._id, food)
.then(res => {
  console.log(res.data);
  this.props.history.push({pathname: '/diary/today/'+this.state.user._id, state : {day: this.state.day, mutatingDate: this.state.mutatingDate}
})
})
.catch(err => {
  console.log(err)

})
}

async changeState(result){
if(isNaN(result.food.nutrients.ENERC_KCAL)){
  await this.setState({foodcalories: 0})
}
else {
 await  this.setState({foodcalories: parseFloat(result.food.nutrients.ENERC_KCAL).toFixed(0),})
}
if(isNaN(result.food.nutrients.CHOCDF))
{
await  this.setState({foodcarbs: 0})
}
else {
await  this.setState({foodcarbs: parseFloat(result.food.nutrients.CHOCDF).toFixed(0),})
}
if(isNaN(result.food.nutrients.PROCNT))
{
await  this.setState({foodproteins: 0})
}
else {
await this.setState({foodproteins: parseFloat(result.food.nutrients.PROCNT).toFixed(0),})
  }
if(isNaN(result.food.nutrients.FAT))
{
await  this.setState({foodfats: 0})
}
else {
await  this.setState({foodfats: parseFloat(result.food.nutrients.FAT).toFixed(0),})
}

  const food = {
    createdby: this.state.user._id,
    meal: '',
    name: result.food.label,
    calories: this.state.foodcalories,
    carbs: this.state.foodcarbs,
    proteins: this.state.foodproteins,
    fats: this.state.foodfats
  }
  console.log(food);
  const updatedCalories = parseInt(this.state.totalcalories) + parseInt(this.state.foodcalories)
  const updatedCarbs = parseInt(this.state.totalcarbs) + parseInt(this.state.foodcarbs)
  const updatedProteins = parseInt(this.state.totalproteins) + parseInt(this.state.foodproteins)
  const updatedFats= parseInt(this.state.totalfats) + parseInt(this.state.foodfats)
  const allEntered = (updatedCalories && updatedCarbs && updatedProteins && updatedFats )
  if(Number.isInteger(allEntered)){
    this.setState({updatedCalories: updatedCalories, updatedCarbs: updatedCarbs, updatedProteins: updatedProteins, updatedFats: updatedFats})
  }
await this.setState({clickedOnce: true, food: food,
  foodname: food.name})
}
validate = () => {
  console.log('Validating');
  let foodnameError = ''
  let calorieError = ''
  let carbError = ''
  let proteinError = ''
  let fatError = ''
  let mealError = ''
  if(!this.state.food.meal){
    mealError = 'Please Select a Meal!'
  }
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

  if(calorieError || carbError || proteinError || fatError || foodnameError || mealError) {
    this.setState({calorieError, carbError, proteinError, fatError, foodnameError, mealError})
    return false;

  }

  return true;
}

checkForError(){
  const isValid = this.validate();
  if (isValid) {
    this.addFood();
  }
}

async changeMeal(mealname){
await this.setState({mealError: '', food: {
    createdby: this.state.food.createdby,
    name: this.state.food.name,
    meal: mealname,
    calories: parseInt(this.state.foodcalories),
    carbs: parseInt(this.state.foodcarbs),
    proteins: parseInt(this.state.foodproteins),
    fats: parseInt(this.state.foodfats),
  } })
}

    render(){
            var mealname = '';
      const food = this.state.food;
      return(
        <>
        {this.state.clickedOnce === false ? (
          <div className="container col-lg-12 apiContainer">
          <Row>
          <Col className="col-lg-12">
          <Card.Img variant="top" className="exitIcon" src={ExitIcon} onClick={() => {this.props.history.push('/diary/today/'+this.state.user._id)}} />
          </Col>
          </Row>
          <div className="col-lg-12 textAnimation">

  <div className="col-12 emptyResults">
            <center><h1 className="pageGreeting apiPage"><span className="icon1"><GiFoodTruck size={120}/></span>Food Finder<span className="icon2"><GiFoodTruck size={120}/></span></h1></center>
  </div>
            <center>
            {this.state.searchHappened === true ? (
                        <h4 className="subTxt">Showing results for {this.state.searchPhrase}</h4>
            ) : (
                        <h4 className="subTxt">Please enter a food/meal below</h4>
            )}

            </center>



          </div>
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
                         <InputGroup.Text id="" className="searchBtn" ><div className="diarySearchBtn" onClick={() => {this.search()}}><FaSearch className="" size={28}/></div></InputGroup.Text>
                       </InputGroup.Append>
                    </InputGroup>
                   </Form.Group>
          </Row>

  {this.state.searchHappened === true && this.state.beenClicked === true &&
    <>
    <Card.Body>
    <Row className="testtest">
                    {food.map((result) =>

                      <Card className="col-lg-6 foodCards">
                      <Card.Header className="foodName">{result.food.label}</Card.Header>
                      <Card.Body>
                      <Row className="detailsRow">
                          <div className="col-3 p-0"><h6 className="foodProps">Calories:</h6></div>
                          <div className="col-3 p-0"><h6 className="foodProps">Carbs</h6></div>
                          <div className="col-3 p-0"><h6 className="foodProps">Proteins</h6></div>
                          <div className="col-3 p-0"><h6 className="foodProps">Fats</h6></div>
                          <div className="col-3 p-0"><h6 className="foodProps bottom">{parseFloat(result.food.nutrients.ENERC_KCAL).toFixed(0)}</h6></div>
                          <div className="col-3 p-0"><h6 className="foodProps bottom">{parseFloat(result.food.nutrients.CHOCDF).toFixed(0)}</h6></div>
                          <div className="col-3 p-0"><h6 className="foodProps bottom">{parseFloat(result.food.nutrients.PROCNT).toFixed(0)}</h6></div>
                          <div className="col-3 p-0"><h6 className="foodProps bottom">{parseFloat(result.food.nutrients.FAT).toFixed(0)}</h6></div>
                      </Row>
                      </Card.Body>
                      <Card.Footer className="foodFooter">
                      <Row>
                                   <div className="col-12">
                                   <div className="btn addtoMeal" onClick={() => {this.changeState(result)}}>Add to Today's Diary</div>
                                   </div>
                      </Row>
                      </Card.Footer>
                      </Card>

                     )}
                      </Row>
      </Card.Body>
      <Card.Footer className="apiFooter">
      <div className="col-lg-12"><center>
      {this.state.nextPage !== null ? (
            <div className="btn nextPage" onClick={() => {this.nextPage()}}>Load More Results</div>
      ) : (
            <div className="btn nextPage" onClick={() => {this.nextPage()}}>Next Page</div>
      )}

      </center></div>
      </Card.Footer>
                   </>
  }
  {this.state.beenClicked === true && this.state.searchHappened === false &&
      <>
      <center><div class="lds-ring"><div></div><div></div><div></div><div></div></div></center>
      </>
  }
          </div>
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
          <Col className="col-4 diaryEffectHead"><Moment format="dddd">{this.state.mutatingDate}</Moment> <Moment format="MMM">{this.state.mutatingDate}</Moment> <Moment format="Do">{this.state.mutatingDate}</Moment></Col>
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
           {this.state.food.meal === 'Breakfast' ? (
               <Col className="col-3 btn mealButtons selectedMeal" onClick={() => {this.changeMeal(mealname='')}}>Breakfast</Col>
           ) : (
                <Col className="col-3 btn mealButtons" onClick={() => {this.changeMeal(mealname="Breakfast")}}>Breakfast</Col>
           )}
           {this.state.food.meal === 'Lunch' ? (
               <Col className="col-3 btn mealButtons selectedMeal" onClick={() => {this.changeMeal(mealname='')}}>Lunch</Col>
           ) : (
                <Col className="col-3 btn mealButtons" onClick={() => {this.changeMeal(mealname="Lunch")}}>Lunch</Col>
           )}
           {this.state.food.meal === 'Dinner' ? (
               <Col className="col-3 btn mealButtons selectedMeal" onClick={() => {this.changeMeal(mealname='')}}>Dinner</Col>
           ) : (
                <Col className="col-3 btn mealButtons" onClick={() => {this.changeMeal(mealname="Dinner")}}>Dinner</Col>
           )}
           {this.state.food.meal === 'Snacks' ? (
               <Col className="col-3 btn mealButtons selectedMeal" onClick={() => {this.changeMeal(mealname='')}}>Snacks</Col>
           ) : (
                <Col className="col-3 btn mealButtons" onClick={() => {this.changeMeal(mealname="Snacks")}}>Snacks</Col>
           )}
           <Col className="col-lg-12 mt-4"><center><h5 className="missingMeal">{this.state.mealError}</h5></center></Col>
          </Row>

          <Row>
          {this.state.food.meal === '' ? (
            <Col className="col-lg-12 mt-4"><center><h5 className="missingMeal">{this.state.requiredError}</h5></center></Col>
          ) : (
            <Col className="col-lg-12 mt-4"></Col>
          )}
          {this.state.food.meal === '' ? (
            <Col className="col-lg-12 mt-4"></Col>
          ) : (
            <>
            <Col className="col-lg-12 mt-4"><center><h5 className="missingMeal">{this.state.duplicateError}</h5></center></Col>
            </>
                             )}

           <Col className="col-6 btn"><div className="optionBtn1" onClick={() => {this.checkForError()}}>Add Food</div></Col>

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


  export default withRouter(SearchApi)
