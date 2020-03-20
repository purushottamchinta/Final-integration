import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";  
import PersonPinIcon from '@material-ui/icons/PersonPin';
import LoginService from '../../services/login'
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            inValidCredentials  : false,
            username : '',
            password : ''
        }
        this.handleCredentials = this.handleCredentials.bind(this)
        this.login = this.login.bind(this)
    }
    render() {
        return (<Container >
            <Row className="mt-5 justify-content-center">
                <Col lg={4}>
                    <Card className="text-center">
                        <Card.Header>
                       
                        <Card.Subtitle> <h2>Login</h2></Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            {this.state.inValidCredentials && <div>Invalid credentials</div>}
                        <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Control className="text-center" name="username" type="userename" placeholder="Enter username" 
                            value={this.state.username} onChange={this.handleCredentials}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control name = "password" className="text-center" type="password" placeholder="Enter password" 
                            value={this.state.password} onChange={this.handleCredentials}/>
                        </Form.Group>
                        <Row>
                            <Col>
                                
                        <Button id="loginButton" variant="dark" onClick={this.login}>
                            Login
                        </Button>
                            </Col>
                            <Col>
                            
                        <Link to="./register">Register</Link></Col>
                        </Row>
                    </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>)
    }

    async login(){
        let creditals = await LoginService(this.state.username,this.state.password)
        
        if(creditals !== 'error'){
            localStorage.setItem('token',creditals[0].data.token)
            localStorage.setItem('username',creditals[1])
            localStorage.setItem('isAdmin',creditals[0].data.isAdmin)
            this.props.history.push("/dashboard")
        }else{
            this.setState({
                inValidCredentials:true
            })
        }

    }

    handleCredentials(event){
        console.log(event.target.value)
        this.setState({
            [event.target.name] :  event.target.value
        })
    }
}

export default Login