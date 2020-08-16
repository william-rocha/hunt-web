import axios from 'axios'

const api = axios.create({baseURL: "http://localhost:3001/api"})
// api da rocketseat
// const api = axios.create({baseURL: "http://rocketseat-node.herokuapp.com/api"})

export default api