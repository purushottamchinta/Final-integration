import axios from 'axios'

function loginService(username,password){
   return axios.post('http://localhost:8091/AuthenticationService/api/v1/auth/login',{
    "userId" : username,
    "password":password
    }).then(response=>[response,username]).catch((error)=>'error')
}


export default loginService