import React,{Component} from 'react'
import authenticateUser from '../../services/authenticateUser'
import { Route, Redirect } from 'react-router-dom'

class AuthenticatedRoute extends Component {

    constructor(props){
        super(props)
        this.state = {
            promiseDone : false,
            isAuth: false
        }
    }
    render(){
            if(this.state.promiseDone === false){
                this.process()
                return null
            }
            else{
                if(this.state.isAuth === 'error'){
                    return <Route {...this.props}/>
                   }else{
                    return <Redirect to="/login"/>
                    }
            }
    }

    async process(){
        let isAuthenticated = false
        isAuthenticated = await authenticateUser(localStorage.getItem("token")).then(response=>response.data).catch(error=>'error')
        this.setState({
            promiseDone:true,
            isAuth:isAuthenticated
        })       
    }
}

export default AuthenticatedRoute