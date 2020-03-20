import Header from '../Components/header/Header';
import React from 'react'
import ReactDOM,{ unmountComponentAtNode,render } from "react-dom";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


let container = null;
beforeEach(() => {
  container = document.createElement("div");
  container.setAttribute("id","testContainer")
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it("Unit Test 1 : Header renders perfectly",()=>{
    ReactDOM.render(<Router><Header/></Router>,container)
})

it("Unit Test 2 : React Assignment ToDo is displayed in Header",()=>{
    ReactDOM.render(<Router><Header/></Router>,container)
    expect(container.textContent).toBe('React AssignmentHome')
})
it("Unit Test 3 : Header contains a single Navbar",()=>{
    
    ReactDOM.render(<Router><Header/></Router>,container)
    let navbar = document.getElementsByClassName('navbar')
    expect(navbar.length).toBe(1)
})


it("Unit Test 4 : Header contains dark(navbar-dark) Navbar text",()=>{
    ReactDOM.render(<Router><Header/></Router>,container)
    expect(document.getElementsByClassName('navbar-dark').length).toBe(1)
    
})



