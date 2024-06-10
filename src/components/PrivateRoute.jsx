import {Navigate} from 'react-router-dom'

const loggedIn=localStorage.getItem('loggedInUser')
const PrivateRoute = ({children}) => {
  if(loggedIn){
    return children
  }else{
    return <Navigate to='/login'/>
  }
}

export default PrivateRoute