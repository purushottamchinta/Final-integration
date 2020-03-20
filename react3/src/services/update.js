import axios from 'axios'

function updateService(username,firstname,lastname,contact) {
    let profile = axios.put('http://localhost:8091/UserProfileService/api/v1/userprofile/'+localStorage.getItem("username"),{
        "userId": username,
        "firstName":firstname,
        "lastName": lastname,
        "contact":contact,
        headers:{
            "Accepted-Type":"application/json",
            "Authorization": "Bearer "+localStorage.getItem("token"),
        },       
        
    }).then(response => [response,username]).catch((error) =>'error while userprofile')
    return profile
}

export default updateService