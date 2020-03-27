/**
 * @Date:   2020-01-28T11:34:29+00:00
 * @Last modified time: 2020-03-05T15:53:07+00:00
 */
 import React, { Component } from 'react';
 import axios from 'axios';
 import Form from 'react-bootstrap/Form'
 import Row from 'react-bootstrap/Row'
 import Col from 'react-bootstrap/Col'
 import Button from 'react-bootstrap/Button'
 import InputGroup from 'react-bootstrap/InputGroup';

 import RegisterModal from './modals/registerModal'
 import InfoModal from './modals/infoModal'


 import { Link } from 'react-router-dom';
 import { MdEmail, MdLock, MdDateRange, MdPerson } from "react-icons/md";
 import { FaAngleDoubleRight, FaAngleDoubleLeft, FaWeightHanging, FaGamepad } from "react-icons/fa";

 import { FiActivity } from "react-icons/fi";
 import { IoIosPersonAdd, IoIosPerson } from "react-icons/io";
 import { GiBodyHeight } from "react-icons/gi";
 import "../../styles/auth.css"


 export default class Register extends Component {
   constructor(props) {
     super(props);

     this.state = {
       firstname: '',
       surname: '',
       email: '',
       password: '',
       confirmpassword: '',
       age: '',
       weight: '',
       goalweight: '',
       height: '',
       gender: '',
       activity: '',
       page1Errors: true,
       page: false,
       gamification: true,
       recommendations: {
         calories: '',
         carbs: '',
         proteins: '',
         fats: null
       },
       points: {},
       response: {}

     };

   }


   handleInputChange = async  e =>  {
     const target = e.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     console.log(`Input name ${name}. Input value ${value}.`);

     await this.setState({
       [name]: value,
       page1Errors: true,
       response: {}
     });

      if(this.state.firstname !== ''){
      this.setState({firstnameError: ''});
     }
     if(this.state.surname !== ''){
       this.setState({surnameError: ''})
     }
     if(this.state.password !== ''){
       this.setState({passwordError: ''})
     }
     if(this.state.email !== ''){
       this.setState({emailError: ''})
     }
     if(this.state.age !== ''){
       this.setState({ageError: ''})
     }
     if(this.state.gender !== ''){
       this.setState({genderError: ''})
     }
     if(this.state.weight !== ''){
       this.setState({weightError: ''})
     }
     if(this.state.height !== ''){
       this.setState({heightError: ''})
     }
     if(this.state.goalweight !== ''){
       this.setState({goalweightError: ''})
     }
     if(this.state.activity !== ''){
       this.setState({activityError: ''})
     }



   };

   validate = () => {
     let firstnameError = ''
     let surnameError = ''
     let emailError = ''
     let passwordError = ''
     if(!this.state.email.includes('@')) {
       emailError = 'Email Address must include an @ symbol'
     }
     if(!this.state.email) {
       emailError = 'Email Address is required'
     }
     if(!this.state.firstname) {
       firstnameError = 'Firstname is required '
     }
     if(this.state.firstname.match(/\d/)){
       firstnameError = 'Firstname cannot include a number'
     }
     if(!this.state.surname) {
       surnameError = 'Surname is required'
     }
     if(this.state.surname.match(/\d/)){
       surnameError = 'Surname cannot include a number'
     }
     if(this.state.password.length < 5){
       passwordError =  'Password field must be at least 5 characters'
     }
     if(this.state.password !== this.state.confirmpassword){
       passwordError = 'Password fields do not match!'
     }
     if(emailError || firstnameError || surnameError || passwordError) {
       this.setState({emailError, firstnameError, surnameError, passwordError})
       return false;
     }
     return true;
   }


validate2 = () => {
  let ageError = ''
  let genderError = ''
  let weightError = ''
  let heightError = ''
  let goalweightError = ''
  let activityError = ''
  if(!this.state.age) {
    ageError = 'Age is required'
  }
  if(isNaN(this.state.age)) {
    ageError = 'Age must be a number'
  }
  if(this.state.age > 130) {
    ageError = 'Invalid - Age too High'
  }
  if(!this.state.gender) {
    genderError = 'Gender is required'
  }
  if(!this.state.weight) {
    weightError = 'Weight is required'
  }
  if(isNaN(this.state.weight)) {
    weightError = 'Weight must be a number'
  }
  if(!this.state.height) {
    heightError = 'Height is required'
  }
  if(this.state.height > 110) {
    heightError = 'Invalid Height - Too High!'
  }
  if(isNaN(this.state.height)) {
    heightError = 'Height must be a number'
  }
  if(!this.state.goalweight) {
    goalweightError = 'Goal Weight is required'
  }
  if(!this.state.activity) {
    activityError = 'Activity Level is required'
  }
  if(ageError || genderError || weightError || heightError || goalweightError || activityError) {
    this.setState({ageError, genderError, weightError, heightError, goalweightError, activityError})
    return false;
  }
  return true;
}













   checkErrors(){
     const isValid = this.validate();
     if (isValid) {
       this.setState({page: true, page1Errors: false})
     }
   }
   checkErrors2(){
     const isValid = this.validate2();
     if (isValid) {
       this.onSubmit();
     }
   }









   changePage(){
     if(this.state.page === true){
       this.setState({page: false})
     } else{
       this.setState({page: true})
     }
   }

   onSubmit = e => {
       const kcal = Math.round((66 + (6.3 * this.state.weight) + (12.9 * this.state.height) - (6.8 * this.state.age)) * this.state.activity) - this.state.goalweight
       const carbsAndProteins = Math.round(kcal/100)*40/4
       const fats = Math.round(kcal/100)*20/9;
       const user = {
         firstname: this.state.firstname,
         surname: this.state.surname,
         email: this.state.email,
         password: this.state.password,
         age: this.state.age,
         weight: this.state.weight,
         goalweight: this.state.goalweight,
         height: this.state.height,
         gender: this.state.gender,
         activity: this.state.activity,
         gamification: this.state.gamification,
         recommendations: {
           calories: kcal,
           carbs: carbsAndProteins,
           proteins: carbsAndProteins,
           fats: fats,
         },
         points: {
           calories: 0,
           carbs: 0,
           proteins: 0,
           fats: 0
         }
       }
        console.log(user);
        axios.post('http://localhost:4000/account/register', user)
        .then(res => {
          console.log(res.data);
          if(res.data.success === false){
          this.setState({response: res.data})
        } else{
          this.props.history.push({pathname: '/', state: {email: this.state.email, password: this.state.password}})
        }
        });




  }

switchtoMetric(){
  console.log('Switching to Metric Units');
  this.setState({measurements: true, weight: this.state.weight/2.205, height: this.state.height*2.54})
}
switchtoImperial(){
  console.log('Switching to Imperial Units');
  this.setState({measurements: false, weight: this.state.weight*2.205, height: this.state.height/2.54})

}

async toggle(){
  if(this.state.gamification === true){
    await this.setState({gamification: false})
  } else{
    await this.setState({gamification: true})
  }
}



   render() {
     return (
     <div className="container col-lg-8 col-md-8 col-sm-12">
     <div className="col-lg-12 textAnimation">
       <center><h1 className="pageGreeting">Welcome!</h1></center>
     </div>
     <div className="card registerCard">
     <div className="card-header registerCardHead">
     <Row>
     <Col>
     {this.state.page === false ? (


            <h2 className="text-center ml-4">Create Account - Page 1<span className="pageRight">
            {this.state.page1Errors === false &&
            <FaAngleDoubleRight onClick={() => {this.changePage()}}/>
          }
            </span></h2>
     ) : (

            <h2 className="text-center ml-4"><span className="pageLeft"><FaAngleDoubleLeft onClick={() => {this.changePage()}}/></span>Create Account - Page 2</h2>

     )}
     </Col>
     </Row>
     </div>
     <div className="card-body authBody">
       <Form onSubmit={this.onSubmit} autocomplete="off">
       {this.state.page === false ? (
         <>
       <Row>
                <Form.Group className="col-lg-6 pb-0">
                <InputGroup className="inputGroupsLeft">
                <InputGroup.Prepend>
                  <InputGroup.Text id="" className="reactIconsContainer"><IoIosPersonAdd size={24} title="Firstname" className="reactIcons" /></InputGroup.Text>
                </InputGroup.Prepend>
                    <Form.Control type="text" placeholder="Firstname"
                      name="firstname"
                      className="registerInputs"
                      value={this.state.firstname}
                      onChange={this.handleInputChange}
                    />
                 </InputGroup>
                </Form.Group>
                <Form.Group className="col-lg-6">
                <InputGroup className="inputGroupsRight">
                <InputGroup.Prepend>
                  <InputGroup.Text id="" className="reactIconsContainer"><IoIosPerson size={24} title="Surname" className="reactIcons" /></InputGroup.Text>
                </InputGroup.Prepend>
                    <Form.Control type="text" placeholder="Surname"
                      name="surname"
                      className="registerInputs"
                      value={this.state.surname}
                      onChange={this.handleInputChange}
                    />
                 </InputGroup>
                </Form.Group>
                         <Col className="col-lg-6"><div className="registerErrors">{this.state.firstnameError}</div></Col><Col className="col-lg-6"><div className="registerErrors">{this.state.surnameError}</div></Col>
       </Row>


<Row>
         <Form.Group className="col-lg-12">
         <InputGroup className="inputGroupsBoth">
         <InputGroup.Prepend>
           <InputGroup.Text id="" className="reactIconsContainer"><MdEmail size={24} title="Email Address" className="reactIcons" /></InputGroup.Text>
         </InputGroup.Prepend>
             <Form.Control type="email" placeholder="Email Address"
               name="email"
               className="registerInputs"
               value={this.state.email}
               onChange={this.handleInputChange}
             />
          </InputGroup>
         </Form.Group>
         <Col className="col-lg-12"><div className="registerErrors2">{this.state.emailError}</div></Col>
</Row>


<Row>
<Form.Group className="col-lg-12">
<InputGroup className="inputGroupsBoth">
<InputGroup.Prepend>
  <InputGroup.Text id="" className="reactIconsContainer"><MdLock size={24} title="Password" className="reactIcons" /></InputGroup.Text>
</InputGroup.Prepend>
    <Form.Control type="password" placeholder="Password"
      name="password"
      className="registerInputs"
      value={this.state.password}
      onChange={this.handleInputChange}
    />
    <InputGroup.Prepend className="samelineSpace">
      <InputGroup.Text id="" className="reactIconsContainer"><MdLock size={24} title="Confirm Password" className="reactIcons" /></InputGroup.Text>
    </InputGroup.Prepend>
        <Form.Control type="password" placeholder="Confirm Password"
          name="confirmpassword"
          className="registerInputs"
          value={this.state.confirmpassword}
          onChange={this.handleInputChange}
        />
     </InputGroup>
    </Form.Group>
    <Col className="col-lg-12"><div className="registerErrors">{this.state.passwordError}</div></Col>
</Row>
<Row>
<Col className="col-12"><center><Button onClick={() => {this.checkErrors()}} className="submitButton col-6">Continue</Button></center></Col>
</Row>
</>
       ) : (
         <>
         <Row>
               <Col className="col-lg-12"><RegisterModal /></Col>
    <Form.Group className="col-lg-12">
           <InputGroup className="inputGroupsBoth">
           <InputGroup.Prepend>
             <InputGroup.Text id="" className="reactIconsContainer" ><MdDateRange size={24} title="Please enter your age" className="reactIcons" /><div className="required">*</div></InputGroup.Text>
           </InputGroup.Prepend>
             <Form.Control
                 type="text"
                 name="age"
                 className="registerInputs"
                 maxLength="3"
                 placeholder="Age"
                 value={this.state.age}
                 onChange={this.handleInputChange}
                 />

           <InputGroup.Prepend className="samelineSpace">
             <InputGroup.Text id="" className="reactIconsContainer"><MdPerson size={24} title="Select Your Gender" className="reactIcons"  /><div className="required">*</div></InputGroup.Text>
           </InputGroup.Prepend>
           <select className="form-control registerInputs" value={this.state.gender} name="gender" onChange={this.handleInputChange}>
               <option value="" selected="selected" hidden="hidden">Select your Gender</option>
               <option>Male</option>
               <option>Female</option>
           </select>

           </InputGroup>
        </Form.Group>
        <Col className="col-lg-6"><div className="registerErrors2">{this.state.ageError}</div></Col><Col className="col-lg-6"><div className="registerErrors2">{this.state.genderError}</div></Col>
      </Row>

      <Row>
          <Form.Group className="col-lg-12">
                 <InputGroup className="inputGroupsBoth">
                 <InputGroup.Prepend>
                   <InputGroup.Text id="" className="reactIconsContainer"><FaWeightHanging size={24} title="Please enter your current weight" className="reactIcons" /><div className="required">*</div></InputGroup.Text>
                 </InputGroup.Prepend>
                   <Form.Control
                       type="text"
                       name="weight"
                       maxLength="3"
                       className="form-control registerInputs"
                       value={this.state.weight}
                       placeholder="Weight (lbs)"
                       onChange={this.handleInputChange}
                       />
                       <InputGroup.Prepend className="samelineSpace">
                         <InputGroup.Text id="" className="reactIconsContainer"><GiBodyHeight size={24} title="Please enter your current height in Inches" className="reactIcons" /><div className="required">*</div></InputGroup.Text>
                       </InputGroup.Prepend>
                         <Form.Control
                             type="text"
                             name="height"
                             maxLength="3"
                             className="form-control registerInputs"
                             placeholder="Height (Inches)"
                             value={this.state.height}
                             onChange={this.handleInputChange}
                             />

                 </InputGroup>
              </Form.Group>
              <Col className="col-lg-6"><div className="registerErrors2">{this.state.weightError}</div></Col><Col className="col-lg-6"><div className="registerErrors2">{this.state.heightError}</div></Col>
            </Row>


            <Row>
            <Form.Group className="col-lg-12">
                   <InputGroup className="inputGroupsBoth">
                   <InputGroup.Prepend>
                     <InputGroup.Text id="" className="reactIconsContainer"><GiBodyHeight size={24} title="Please select your desired goal" className="reactIcons" /><div className="required">*</div></InputGroup.Text>
                   </InputGroup.Prepend>
                     <select className="form-control registerInputs" value={this.state.goalweight} name="goalweight" onChange={this.handleInputChange}>
                         <option value="" selected="selected" hidden="hidden">Desired Goal (lbs)</option>
                         <option value="500">Lose 1 Pound Per Week</option>
                         <option value="750">Lose 1.5 Pound Per Week</option>
                         <option value="1000">Lose 2 Pound Per Week</option>
                     </select>
                     <InputGroup.Prepend className="samelineSpace">
                       <InputGroup.Text id="" className="reactIconsContainer"><FiActivity  size={24} title="Choose your activity level" className="reactIcons"/><div className="required">*</div></InputGroup.Text>
                     </InputGroup.Prepend>
                     <select className="form-control registerInputs" value={this.state.activity} name="activity" onChange={this.handleInputChange}>
                         <option value="" selected="selected" hidden="hidden">Choose Activity Level..</option>
                         <option value="1.2">Sedentary - Little to no exercise</option>
                         <option value="1.375">Lightly Active - Light excercise 1-3 days/week</option>
                         <option value="1.55">Moderately Active - Moderate exercise 3-5 days/week</option>
                         <option value="1.725">Very Active - Hard exercise 6-7 days a week</option>
                         <option value="1.9">Extra Active - Very hard exercise & phsysical job</option>
                     </select>
                 </InputGroup>
                </Form.Group>
                        <Col className="col-lg-6"><div className="registerErrors2">{this.state.goalweightError}</div></Col><Col className="col-lg-6"><div className="registerErrors2">{this.state.activityError}</div></Col>
            </Row>
            <Row className="gamingRow">
            <Col className="col-6 "><div className="btnSpan"><FaGamepad className="gamingIcon" size={26}/>Use Gaming Elements?</div></Col>
            {this.state.gamification === false ? (
              <>
                                   <Col className="col-2 btnSpace">
                                   <div className="gamificationBtn offBtn btn" onClick={() => {this.toggle()}}>Yes</div>
                                     </Col>
                                     <Col className="col-2">
                                   <div className="gamificationBtn onBtn btn" onClick={() => {this.toggle()}}>No</div>
                                   </Col>
                                   </>
            ) : (
              <>
                                   <Col className="col-2">
                                   <div className="gamificationBtn onBtn btn" onClick={() => {this.toggle()}}>Yes</div>
                                     </Col>
                                     <Col className="col-2">
                                   <div className="gamificationBtn offBtn btn" onClick={() => {this.toggle()}}>No</div>
                                   </Col>
                                   </>
            )}



            <Col className="col-2"><InfoModal /></Col>
            </Row>

                  <Row>
                  <Col>
                  <center>
    <Button onClick={() => {this.checkErrors2()}} className="submitButton col-6">Create Account</Button></center>
    </Col>
    </Row>
    <Row><Col className="col-lg-12">{this.state.response.success === false && <center><div className="accountExistsError">Sorry, but the email '{this.state.email}' already exists.</div></center>}</Col>
    </Row>
    </>
       )

}




       </Form>
       </div>
       <div className="card-footer registerFooter">
       <Row>
       <Col>
       <center><p className="navtoLogin pb-3 mt-2">Already a member?
       <Link to='/' className="loginLink">  Login</Link>

   </p></center>
</Col>
</Row>
       </div>
       </div>
     </div>
     )
   }
 }
