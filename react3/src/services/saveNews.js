import axios from 'axios'

function saveNews(token,article) {
    return axios.post('http://localhost:8091/NewsService/api/v1/news/', article, { headers: { "Authorization": "Bearer " + token } }).then(response=>console.log(response.data))
}


export default saveNews