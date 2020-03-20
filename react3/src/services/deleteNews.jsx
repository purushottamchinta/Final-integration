import axios from 'axios'

function deleteNews(newsId, article) {
    alert("success fully Deleted news , click on  the favorite button for NewsSource info !")
    axios.post('http://localhost:8083/api/v1/newssource/',
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

    return axios.delete('http://localhost:8091/NewsService/api/v1/news/'+newsId,{ headers: { "Authorization": "Bearer " + localStorage.getItem('token') } }).then(response=>console.log(response.data))
}

export default deleteNews