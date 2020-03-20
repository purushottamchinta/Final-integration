import axios from 'axios'

function deletenewssource(newsId) {
    alert("success fully Deleted news")

    return axios.delete('http://localhost:8083/api/v1/newssource/'+newsId,
    { 
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        "mode":"no-cors",
        credentials: "same-origin"
    }).then(response=>console.log(response.data))
}

export default deletenewssource