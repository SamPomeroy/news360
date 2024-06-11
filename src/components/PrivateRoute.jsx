import {Navigate} from 'react-router-dom'

const loggedIn=localStorage.getItem('loggedInUser')
const PrivateRoute = ({user, children}) => {
  if(loggedIn || user){
    return children
  }else{
    return <Navigate to='/login'/>
  }
}

export default PrivateRoute