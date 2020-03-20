import React,{Component} from 'react'

import { Link } from "react-router-dom";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";  
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Alert from 'react-bootstrap/Alert';
import serviceRegistration from '../../services/serviceRegistration'
class Register extends Component{

     constructor(props){
         super(props)
         this.state = {
             username:'',
             password:'',
             confirmPassword:'',
             email:'',
             passwordeValid:true,
             bothPasswordValid:true,
             firstName:'',
             usernameValid:true,
             firstNameValid:true,
             validValues:false,
             //emailValid:true
         }
         this.handleCredetialChange = this.handleCredetialChange.bind(this)
         this.registerForm = this.registerForm.bind(this)
     }

     render(){
         return (<Container className="mb-5">
             <Row className="mt-5 justify-content-center">
                 <Col lg={4}>
                     <Card className="text-center">
                         <Card.Header>
                         <Card.Subtitle> <h2>Register Page</h2></Card.Subtitle>
                         </Card.Header>
                         <Card.Body>
                         <Form>
                         <Form.Group controlId="formBasicUsername">
                            
                             <Form.Control className="text-center" name="username" type="userename" placeholder="Enter username" 
                             value={this.state.username} onChange={this.handleCredetialChange}/>
                             {!this.state.usernameValid && <Alert id="usernameValid">Please Enter Valid Username</Alert>}
                         </Form.Group>

                         <Form.Group controlId="formBasicPassword">
                        
                             <Form.Control id="password" name = "password" className="text-center" type="password" placeholder="Enter password"
                             value ={this.state.password} onChange={this.handleCredetialChange}/>
                             {!this.state.passwordeValid && <Alert id="passwordeValid">Password should be greater than 6 characters and provide special character</Alert>}
                         </Form.Group>
                         <Form.Group controlId="confirmPassword">
                             {/* <Form.Label className="text-left">ConfirmPassword</Form.Label> */}
                             <Form.Control id="confirmPassword" name = "confirmPassword" className="text-center" type="password" placeholder="Enter confirmPassword"
                             value ={this.state.confirmPassword} onChange={this.handleCredetialChange}/>
                             {!this.state.bothPasswordValid && <Alert id="bothPasswordValid">Mismatch given password and confirmedpassword</Alert>}
                         </Form.Group>
                         <Form.Group controlId="firstName">
                             {/* <Form.Label className="text-left">FirstName</Form.Label> */}
                             <Form.Control name = "firstName" className="text-center" type="firstName" placeholder="Enter firstName"
                             value ={this.state.firstName} onChange={this.handleCredetialChange}/>
                             {!this.state.firstNameValid && <Alert id="firstName">Enter your firstName</Alert>}
                         </Form.Group>
                         <Row>
                             <Col>
                                
                         <Button variant="dark" id="loginForm" onClick={this.registerForm}>
                             Register
                         </Button>
                             </Col>
                             <Col>
                            
                         <Link to="./login">Login</Link></Col>
                         </Row>
                     </Form>
                         </Card.Body>
                     </Card>
                 </Col>
             </Row>
         </Container>)
     }

     handleCredetialChange(event) {
         this.setState({
             [event.target.name]:event.target.value
         })
         if(event.target.name === ("username")) {
             let username = event.target.value;
             if(username.length < 1){
                 this.setState({
                     usernameValid :false
                 })
             } else {
                 this.setState({
                     usernameValid :true
                 })
             }
         }
         if(event.target.name === ("firstName")) {
             let firstName = event.target.value;
             if(firstName.length < 1){
                 this.setState({
                     firstNameValid :false
                 })
             } else {
                 this.setState({
                     firstNameValid :true
                 })
             }
         }
        
         if(event.target.name === ("password") || event.target.name === ("confirmPassword")) {
             let password = event.target.value;
             if(password.length < 6){
                 this.setState({
                     passwordeValid :true
                 })
             } else {
                 this.setState({
                     firstNameValid :true
                 })
             }
             if(document.getElementById("password").value === document.getElementById("confirmPassword").value ) {
                 this.setState({
                     bothPasswordValid :true
                 })
             } else {
                 this.setState({
                     bothPasswordValid :false
                 })
             }
         }
     }
     async registerForm(){
         if(this.state.usernameValid && this.state.passwordeValid && this.state.firstNameValid){
             this.setState({
                 validValues :true
             })
             await serviceRegistration(this.state.username,this.state.password,this.state.firstName)
             this.props.history.push("/login")
         } else {
             this.setState({
                 validValues :false
             })
         }

     }    
}

export default Register