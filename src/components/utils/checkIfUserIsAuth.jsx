import setAxiosAuthToken from './setAxiosAuthToken'
import {jwtDecode} from 'jwt-decode'

const checkIfUserIsAuth = ()=>{
    const jwt = window.localStorage.getItem('jwt')
    if(jwt){
        const currentTime = Date.now()/1000
        const decodedJwt = jwtDecode(jwt)
        if(decodedJwt.exp > currentTime){
            setAxiosAuthToken(jwt)
           return true
        }else{
            return false
        }
    }else{
        return false
    }
}

export default checkIfUserIsAuth