/**
 * @Date:   2020-01-28T11:34:35+00:00
 * @Last modified time: 2020-03-05T15:23:26+00:00
 */

 import React, { Component } from 'react';
 import axios from 'axios';
 import Form from 'react-bootstrap/Form'
 import Row from 'react-bootstrap/Row'
 import Col from 'react-bootstrap/Col'
  import Card from 'react-bootstrap/Card'
 import InputGroup from 'react-bootstrap/InputGroup';
 import { MdEmail, MdLock } from "react-icons/md";
  import { FaRegEye } from "react-icons/fa";
  import { Link } from 'react-router-dom';


 export default class Login extends Component {
   constructor(props) {
     super(props);
if(this.props.location.state === undefined){
  this.state = {
    email: '',
    password: '',
    showPassword: false
  };

}  else{
  this.state = {
    email: this.props.location.state.email,
    password: this.props.location.state.password,
    showPassword: false
  };
  }


   }

   handleInputChange = async e => {
     const target = e.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     console.log(`Input name ${name}. Input value ${value}.`);

  await this.setState({
       [name]: value,
       message: ''
     });
     if(this.state.email !== ''){
       this.setState({emailError: ''})
     }
     if(this.state.password !== ''){
       this.setState({passwordError: ''})
     }
   };

   validate = () => {
     let emailError = ''
     let passwordError = ''
     if(!this.state.email.includes('@')) {
       emailError = 'Email Address must include an @ symbol'
     }
     if(!this.state.email) {
       emailError = 'Email Address is required'
     }
     if(!this.state.password) {
       passwordError = 'Password is required'
     }
     if(this.state.password.length > 0 && this.state.password.length < 5){
       passwordError =  'Password field must be at least 5 characters'
     }
     if(emailError || passwordError) {
       this.setState({emailError, passwordError})
       return false;
     }
     return true;
   }
   checkErrors(){
     const isValid = this.validate();
     if (isValid) {
       this.onSubmit();
     }
   }
   onSubmit = e => {

     const user = {
       email: this.state.email,
       password: this.state.password,
     }

     console.log(user);

     axios.post('http://localhost:4000/account/login', user)
       .then(res => {
         localStorage.setItem('jwtToken', res.data.token);
         this.props.onLogin();
         console.log(res.data);
         window.location = '/landing'
       })
       .catch((err) => {
         if(err.response.status === 401) {
           this.setState({ message: 'Incorrect Username or Password' });
         }
       });
   };

   showPassword(){
     if(this.state.showPassword === false) {
     this.setState({showPassword: true})
   } else {
     this.setState({showPassword: false})
   }
   }

   render() {
     return (
     <div className="container col-lg-8 col-md-8 col-sm-12">
     <div className="col-lg-12 textAnimation">
       <center><h1 className="pageGreeting">Welcome Back!</h1></center>
     </div>
     <div className="col-10 mx-auto ">
     <Card className="registerCard">
     <Card.Header className="registerCardHead">
     <h3 className="text-center loginHead">Login</h3>
     </Card.Header>
     <Card.Body className="authBody">
       <Form onSubmit={this.onSubmit}>
       <Form.Group className="col-lg-12">
       <InputGroup className="inputGroupsLeft">
       <InputGroup.Prepend>
         <InputGroup.Text id="" className="reactIconsContainer"><MdEmail size={24} title="Enter Firstname" className="reactIcons" /></InputGroup.Text>
       </InputGroup.Prepend>
           <Form.Control type="text" placeholder="Email Address"
             name="email"
             className="registerInputs"
             value={this.state.email}
             onChange={this.handleInputChange}
           />
        </InputGroup>
       </Form.Group>
       <Col className="col-lg-12"><div className="registerErrors">{this.state.emailError}</div></Col>
       <Form.Group className="col-lg-12">
       <InputGroup className="inputGroupsBoth">
       <InputGroup.Prepend>
         <InputGroup.Text id="" className="reactIconsContainer"><MdLock size={24}  title="Enter a Password" className="reactIcons" /></InputGroup.Text>
       </InputGroup.Prepend>
       {this.state.showPassword === false ? (
         <>
         <Form.Control type="password" placeholder="Password"
           name="password"
           className="registerInputs"
           value={this.state.password}
           onChange={this.handleInputChange}
         />
         <InputGroup.Append>
           <InputGroup.Text id="" className="reactIconsContainer"><FaRegEye onClick={() => {this.showPassword()}} size={24} title="Show Password" className="reactIcons" /></InputGroup.Text>
         </InputGroup.Append>
         </>
       ) : (
         <>
         <Form.Control type="text" placeholder="Password"
           name="password"
           className="registerInputs"
           value={this.state.password}
           onChange={this.handleInputChange}
         />
         <InputGroup.Append>
           <InputGroup.Text id="" className="reactIconsContainer"><FaRegEye size={24} onClick={() => {this.showPassword()}} title="Enter a Password" className="reactIcons" /></InputGroup.Text>
         </InputGroup.Append>
         </>
       )}

        </InputGroup>
       </Form.Group>
      <Col className="col-lg-12"><div className="registerErrors">{this.state.passwordError}</div></Col>
      <Row><Col className="col-lg-12">{this.state.message !== '' && <center><div className="accountExistsError">{this.state.message}</div></center>}</Col>
      </Row>
       <Row>
       <Col>
       <center>
<div onClick={() => {this.checkErrors()}} className="btn submitButton col-6">Login</div></center>
</Col>
</Row>

       </Form>
       </Card.Body>
       <div className="card-footer registerFooter">
       <Row>
       <Col>
       <center>
       <p className="navtoLogin pb-3 mt-3">Not yet a member?
       <Link to='/register' className="loginLink"> Register</Link>
   </p>
   </center></Col></Row>
       </div>
       </Card>
       </div>

     </div>
     )
   }
 }
