import axios from 'axios'


class GetDataService{
    getDataFromApi(apiUrl){
        return axios.get(apiUrl)
    }

    getDataFromDatabase(apiUrl,headers){
        return axios.get(apiUrl,headers)
    }
    
}

export default new GetDataService()