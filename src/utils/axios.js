import Axios from 'axios'

export default Axios.create({
  baseURL: process.env.REACT_APP_API_URL
})
