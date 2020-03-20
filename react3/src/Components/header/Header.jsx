import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";

class Header extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        this.profile = this.profile.bind(this)
        this.favorite = this.favorite.bind(this)
        this.newsservice = this.newsservice.bind(this)
    }
     logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        this.props.history.push("/login")
    }
    profile() {
        this.props.history.push("/profile")
    }
    favorite() {
        this.props.history.push("/newssource")
    }
    newsservice() {
        this.props.history.push("/newsservice")
    }
    render() {
        return (
            <Navbar bg="primary" variant="dark" expand="md">
                <Navbar.Brand>
                    React Assignment
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="https://reactjs.org/">Home</Nav.Link>
                </Nav>
                {localStorage.getItem("username") !== null &&<> <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-end">
                    <Nav>
                        <NavDropdown title={"Welcome "+localStorage.getItem("username")} id="basic-nav-dropdown">
                        <Button className="w-100" variant="secondary" onClick={this.favorite}>NewsSourceInfo</Button>
                        <Button className="w-100" variant="secondary" onClick={this.newsservice}>NewsServiceInfo</Button>
                             <Button className="w-100" variant="secondary" onClick={this.profile}>Profile</Button> 
                            <Button className="w-100" variant="secondary" onClick={this.logout}>Logout</Button>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse></>}
            </Navbar>

            
        )
    }
}

export default withRouter(Header)