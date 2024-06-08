import checkIfUserIsAuth from './utils/checkIfUserIsAuth'
import {Navigate} from 'react-router-dom'


const PrivateRoute = ({children}) => {
  if(checkIfUserIsAuth()){
    return children
  }else{
    return <Navigate to='/login'/>
  }
}

export default PrivateRoute