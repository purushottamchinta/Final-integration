import axios from 'axios'

function serviceRegistration(username,password,firstName) {
    let data = {
        
    }
    let register = axios.post('http://localhost:8091/AuthenticationService/api/v1/auth/register',{
        "userId" : username,
        "password":password
        
    }).then(response => [response,username]).catch((error) =>'error while login')

    let profile = axios.post('http://localhost:8084/api/v1/user/',{
        "userId" : username,
        "firstName":firstName,
        "lastName": firstName        
        
    }).then(response => [response,username]).catch((error) =>'error while userprofile')

    
    return {register, profile}
}

export default serviceRegistration;