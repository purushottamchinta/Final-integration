import React from 'react'
import ReactDOM,{ unmountComponentAtNode } from "react-dom";

import {configure,shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CardComponent from '../Components/card/Card'
import { Button } from '@material-ui/core'
import CardImg from 'react-bootstrap/CardImg';
// please add your test cases here

configure({adapter: new Adapter()})

let article = {
    "source": {
      "id": "id",
      "name": "name"
    },
    "author": "https://www.facebook.com/bbcnews",
    "title": "Dutch letter-bomb blackmail campaign targets companies",
    "description": "Police are investigating a spate of letter-bomb attacks on companies across the Netherlands.",
    "url": "https://www.bbc.co.uk/news/world-europe-51488862",
    "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/BD0E/production/_110889384_bombrief.jpg",
    "publishedAt": "2020-02-13T16:31:48Z",
    "content": "Image copyrightDutch policeImage caption Dutch police have warned companies to look out for padded envelopes with two stamps Police are investigating a spate of letter-bomb attacks on companies across the Netherlands.Four letter bombs have been found in … [+2882 chars]",
    "id": 1
  }
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

it("Unit Test 1 : Card renders areticle",()=>{
    ReactDOM.render(<CardComponent buttonId='0'
     article= {article} readLater={this}/>,container)
})

it("Unit Test 2 : Card text context",()=>{
    ReactDOM.render(<CardComponent buttonId='0'
    article= {article} readLater={this}/>,container)
    expect(container.textContent).toBe('Dutch letter-bomb blackmail campaign targets companiesDeleteRead NowDelete News ?')
    
})


it("Unit Test 3 : CardComponenet length",()=>{
    
    ReactDOM.render(<CardComponent buttonId='0'
    article= {article} readLater={this}/>,container)
    let card = document.getElementsByClassName('card')
    expect(card.length).toBe(1)
    
})


it("Unit Test 4 : CardComponenet has a single button",()=>{
    const wrapper = shallow(<CardComponent  buttonId='0'
    article= {article} readLater={this}/>)
    expect(wrapper.find(Button)).toHaveLength(5)
})

it("Unit Test 5 : CardComponenet has a single card image",()=>{
  const wrapper = shallow(<CardComponent  buttonId='0'
  article= {article} readLater={this}/>)
  expect(wrapper.find(CardImg)).toHaveLength(1)
})