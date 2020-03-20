import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import updateService from '../../services/update';
import { Container, Card, Row, Col, Form, Alert } from "react-bootstrap"; 
import getDataService from '../../services/getDataService'

class Profile extends Component {
    constructor(props) {
        super(props)
        console.log("profilllllll")
        this.state = {
            data: getDataService.getDataFromDatabase("http://localhost:8084/api/v1/userprofile/" + localStorage.getItem("username"), { headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })
                .then(response => this.promiseDone(response.data)).catch(error => this.setState({
                    promiseError: "OOPS!!! " + (error.response ? Object.values(error.response.data) : error)
                })),
            promiseDone: false,
            promiseError: "",
            validEmail: true,
            validContact: true,
            validFirstName: true,
            validLastName: true,
            validForm: false
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.update = this.update.bind(this)
    }

    render() {
        return (<>{
            this.state.promiseDone && <Container className="mb-5">
                <Row className="mt-5 justify-content-center">
                    <Col lg={8}>
                        <Card className="text-center">
                            <Card.Header>
                                
                                <Card.Subtitle> <h2>Hi {localStorage.getItem("username")}! You can edit your prfile here!</h2></Card.Subtitle>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    {/* <Form.Group>
                                        <Form.Control id="email" name="email" className="text-center" type="email" placeholder="Enter email"
                                            value={this.state.data.email} onChange={this.handleFormChange} />
                                        {!this.state.validEmail && <Alert id="validEmail" variant="danger">Enter a valid email please!</Alert>}
                                    </Form.Group> */}
                                    <Form.Group controlId="formBasicfirstName">
                                        <Form.Control name="firstName" className="text-center" type="firstName" placeholder="Enter firstName"
                                            value={this.state.data.firstName} onChange={this.handleFormChange} />
                                        {!this.state.validFirstName && <Alert id="validFirstName" variant="danger">Enter a valid first name please!</Alert>}
                                    </Form.Group>
                                    <Form.Group controlId="formBasiclastName">

                                            <Form.Control name="lastName" className="text-center" type="lastName" placeholder="Enter lastName"
                                            value={this.state.data.lastName} onChange={this.handleFormChange} />
                                            {!this.state.validLastName && <Alert id="validLastName" variant="danger">Enter a valid last name please!</Alert>}

                                    </Form.Group>

                                    <Form.Group controlId="formBasicontact">
                                            <Form.Control name="contact" className="text-center" type="number" placeholder="Enter contact"
                                                value={this.state.data.contact} onChange={this.handleFormChange} />
                                            {!this.state.validContact && <Alert id="validContact" variant="danger">Enter a valid 10 digit contact number please!</Alert>}

                                    </Form.Group>
                                            {!this.state.validForm && <Alert id="validForm" variant="warning">Ensure valid values before updating!</Alert>}

                                    <Row>
                                        <Col>
                                            <Button variant="dark" onClick={this.update}>Update</Button>
                                        </Col>
                                        <Col><Link to="./dashboard">Cancel</Link></Col>
                                    </Row>
                            </Form>

                        </Card.Body>
                        </Card>
                               </Col>
                        </Row>
                        </Container>
                        }</>)
                    }


async update() {
    if (this.state.validFirstName && this.state.validLastName
        && this.state.validContact) {
        this.setState({
            validForm: true
        })
         await updateService(this.state.data.username, this.state.data.firstName, this.state.data.lastName, this.state.data.contact)
        this.props.history.push("/dashboard")
    } else {
        this.setState({
            validForm: false
        })
    }

}

handleFormChange(event) {
    let data1 = this.state.data
    let name = [event.target.name]
    data1[name] = event.target.value
    this.setState({
        data: data1
    })
    if (event.target.name === ("firstName")) {
        let firstName = event.target.value
        if (firstName.length < 1) {
            this.setState({
                validFirstName: false
            })
        } else {
            this.setState({
                validFirstName: true
            })
        }
    }

    if (event.target.name === ("lastName")) {
        let lastName = event.target.value
        if (lastName.length < 1) {
            this.setState({
                validLastName: false
            })
        } else {
            this.setState({
                validLastName: true
            })
        }
    }
    if (event.target.name === "email") {
        let re = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (re.test(event.target.value)) {
            this.setState({
                validEmail: true
            })
        } else {
            this.setState({
                validEmail: false
            })
        }
    }

    if (event.target.name === ("contact")) {
        let contact = event.target.value
        if (contact.length !== 10) {
            this.setState({
                validContact: false
            })
        } else {
            this.setState({
                validContact: true
            })
        }
    }

}

promiseDone(data) {
    this.setState({
    data: data,
    promiseDone: true
    })
    }
}
export default Profile