import Footer from '../Components/footer/Footer';

import React from 'react'
import ReactDOM,{ unmountComponentAtNode,render } from "react-dom";
// please add your test cases here



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


it("Unit Test 1 : Footer renders container",()=>{
    ReactDOM.render(<Footer/>,container)
})

it("Unit Test 2 : StackRoute @Copyright Assignment is displayed in Footer",()=>{
    ReactDOM.render(<Footer/>,container)
    expect(container.textContent).toBe('StackRoute @Copyright Assignment')
})
it("Unit Test 3 : Footer contains a single Navbar",()=>{
    
    ReactDOM.render(<Footer/>,container)
    let navbar = document.getElementsByClassName('navbar')
    expect(navbar.length).toBe(1)
})


it("Unit Test 4 : Footer contains dark(navbar-dark) Footer text",()=>{
    ReactDOM.render(<Footer/>,container)
    expect(document.getElementsByClassName('navbar-dark').length).toBe(1)
    
})

it("Unit Test 5 : Footer contains warning(bg-warning) Footer background",()=>{
    ReactDOM.render(<Footer/>,container)
    expect(document.getElementsByClassName('bg-warning').length).toBe(1)
})
