import React, { Component } from 'react'
import GetDataService from '../../services/getDataService'
import CardComponent from '../newsServiceCard/Newsservicecard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './newsService.css'
import { Button as BButton } from 'react-bootstrap';
import axios from 'axios';
import saveNews from '../../services/saveNews'
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
class NewsService extends Component {



    constructor(){
        super();

    this.state = {
        loading : true,
        books: [],
        authorInfo: [],
        result:[],
        query: '',
        booleanValue: false,
        data: []
        
    };
    
}
    render() {
        return (<Container className="mb-5">
        <Row>
            {console.log(this.state.data)}
              {this.state.data.map(article => {
                return (<Col key={this.state.data.indexOf(article)}>
                
                <CardComponent type="dashboard" buttonId={this.state.data.indexOf(article.newslist[0])} article={article.newslist[0]} readLater={this.readLater}></CardComponent>
                </Col>)
            })}  
        </Row>

        </Container>
        )
    }

    componentDidMount() {
        //fetch("http://newsapi.org/v2/everything?q=bitcoin&apiKey=471e000083734b74acbe33666bac12f0&language=en&page=1")
        fetch("http://localhost:8091/NewsService/api/v1/news/",{ headers: { "Authorization": "Bearer " + localStorage.getItem("token") } }
        )
        .then(response => response.json())
        .then(data => this.setState({data : data}))
    }
     
    // promiseDone(data) {
    //     this.setState({
    //       isPromiseDone: true,  
    //       data: data.articles,
    //       booleanValue:true
           
           
    //     })
    //    // console.log(data)
    // }

    readLater(article,buttonId){
       document.getElementById(buttonId).style.display = "none"
       document.getElementById(buttonId+"text").style.display = "block"
       saveNews(localStorage.getItem('token'),article)
       //saveNews('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTgzNDg2Nzc3LCJleHAiOjE1ODM0OTY3Nzd9.-6EzyBBb7T2RooPMovMGxgCj6dK46P4lNnD6QBj8_Y0',article)
    //    axios.post("http://localhost:8091/NewsService/api/v1/news/", {
    //         body : 
    //         article,
    //         headers : {
    //             'Content-Type':'application/json',
    //             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTgzNDY4MjgxLCJleHAiOjE1ODM0NzgyODF9.mvzysiFaqYaZbT8Dt5FX010xg__ETXjYSaqpbCMvhhE'
    //                 }
    //     })
    //    .then(response => response.data)
       
    }

    

}


export default NewsService