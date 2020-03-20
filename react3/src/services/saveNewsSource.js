import axios from 'axios'

function saveNewsSource(token,article) {
    
    return axios.post('http://localhost:8083/api/v1/newssource/',
        { 
            newsSourceId : article.source.id,
            newsSourceName: article.author,
            newsSourceDesc:article.description,
            headers: { 
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem('token') },
             "mode":"no-cors",
             credentials: "same-origin"
        }).then(response=>console.log(response.data))
   
}

export default saveNewsSource