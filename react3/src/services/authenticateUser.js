import axios from 'axios'

async function authenticateUser(token) {
    let response =await fetch('http://localhost:8091/AuthenticationService/api/v1/auth/register',
{
    method:"GET",
     headers:{
         "Accepted-Type":"application/json",
         "Authorization": "Bearer "+localStorage.getItem("token"),
     },
    "mode":"no-cors",
    credentials: "same-origin"
})
    console.log(response)
    return response.json();
}

export default authenticateUser