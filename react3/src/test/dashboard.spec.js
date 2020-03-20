import Dashboard from '../Components/dashboard/Dashboard'
import React from 'react'
import ReactDOM,{ unmountComponentAtNode } from "react-dom";

import Container from 'react-bootstrap/Container';
import {configure,shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { LinearProgress } from '@material-ui/core';
import Row from 'react-bootstrap/Row'

configure({adapter: new Adapter()})
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

it("Unit Test 1 : Dashboard renders without crashing",()=>{
    ReactDOM.render(<Container/>,container)
})


it("Unit Test 2 : Dashboard has a container",()=>{
    const wrapper = shallow(<Dashboard/>)
    expect(wrapper.find(Container)).toHaveLength(1)
})

it("Unit Test 3 : Dashboard shows a linear progress bar",()=>{
    const wrapper = shallow(<Dashboard/>)
    expect(wrapper.find(LinearProgress)).toHaveLength(0)
})

it("Unit Test 4 : Dashboard does not show Row intitially",()=>{
    const wrapper = shallow(<Dashboard/>)
    expect(wrapper.find(Row)).toHaveLength(1)
})




