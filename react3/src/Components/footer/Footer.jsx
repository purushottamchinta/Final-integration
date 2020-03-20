import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import './footer.css'
class Footer extends Component{
    render (){
        return (
            <>
            
            <Navbar id="footer" bg="warning" variant="dark" className="w-100 d-flex justify-content-center">
                <div>StackRoute @Copyright Assignment</div>
            </Navbar>
            </>
        );
    }
} 


export default Footer