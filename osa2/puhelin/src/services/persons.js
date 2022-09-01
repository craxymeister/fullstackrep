import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }




export default { 
  getAll: getAll, 
  remove: remove
  
  
}