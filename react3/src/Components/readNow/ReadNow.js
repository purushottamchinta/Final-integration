import React, { Component } from 'react'
import GetDataService from '../../services/getDataService'
import CardComponent from '../card/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



import LinearProgress from '@material-ui/core/LinearProgress'
class ReadNow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: GetDataService.getDataFromDatabase("http://localhost:3001/api/v1/news/",{ headers: { "Authorization": "Bearer " + localStorage.getItem("token") } })
                .then(response => this.promiseDone(response.data)).catch(),
            promiseDone: false
        }
    }

    render() {

        return (<Container className="mb-5">
            {!this.state.promiseDone && <LinearProgress variant="indeterminate" color="secondary"/>}
            {this.state.promiseDone && <Row>


                {this.state.data.map(article => {
                    return (<Col key={this.state.data.indexOf(article)} xs={12} md={6} lg={4}>
                        <CardComponent article= {article}></CardComponent>
                    </Col>)

                })}

            </Row>}

        </Container>
        )
    }

    promiseDone(data) {
        this.setState({
            data: data,
            promiseDone: true
        })
        console.log(this.state.data)
    }




}


export default ReadNow