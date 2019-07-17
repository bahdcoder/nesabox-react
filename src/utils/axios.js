import Axios from 'axios'
import { getDefaultAuth }  from './context'

const Instance = Axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

Instance.interceptors.request.use(defaultConfig => {
    let config
    const user = getDefaultAuth()
 

    if (user) {
        config = {
            ...defaultConfig,
            headers: {
                ...defaultConfig.headers,
                Authorization: `Bearer ${user.access_token}`
            }
        }
    } else {
        config = defaultConfig
    }

    return config
})

export default Instance
