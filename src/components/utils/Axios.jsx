import axios from 'axios'

const Axios = axios.create({
    baseURL: import.meta.env.DEV
    ? 'http://localhost:3000/users'
    : 'DEPLOYMENT ADDRESS',
    timeout: 50000
})

export default Axios