import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import React, { Component } from 'react'
import {ToastContainer} from 'react-toastify'
import MainRouter from './MainRouter'
import { jwtDecode } from 'jwt-decode'
import setAxiosAuthToken from './components/utils/setAxiosAuthToken'
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from './components/utils/Axios'
import Saved from './components/Saved'

export class App extends Component {
  state ={
    user: null
  }
  //functions and user passed down thru props so state is accessible and changeable anywhere
  handleUserLogin=async (userObj, savedArr)=>{
    try {
      const user={...userObj, saved: savedArr}
      this.setState({user})
    } catch (error) {
      console.log(error)
    }
    
  }

  handleUserLogout=()=>{
    this.setState({user: null})
    window.localStorage.removeItem('jwt')
    setAxiosAuthToken(null)
  }
//login check jwt pull user info from backend
async componentDidMount(){
  const currentUser = localStorage.getItem('loggedInUser')
  const userSavedArr = localStorage.getItem('loggedInUserSaved') || []
  if(currentUser){
    try {
      this.setState({
        user: {
          username: currentUser.username,
          email: currentUser.email,
          id: currentUser.id,
          saved: userSavedArr,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
//saved and favorites functions
addSaved =async(article)=>{
  
}
deleteSaved = async(url)=>{
  try {
    const article=this.state.user.saved.find(e=>e.url===url)
    const deleted = await Axios.put(`/delete-saved/${this.state.user.id}/${article._id}`)
    console.log(deleted)
    const saved=[...this.state.user.saved]
    const updateSaved=saved.filter(i=> 
      {
        if(i.url !== url){
          return i
        }
      }
    )
    const user={...this.state.user, saved: updateSaved}
    this.setState({user})
  } catch (error) {
    console.log(error)
  }
}
  render() {
    return (
      <>
      <ToastContainer position='top-center' />
      <MainRouter
      user = {this.state.user}
      handleUserLogin = {this.handleUserLogin}
      handleUserLogout = {this.handleUserLogout}
      addFavorites={this.addFavorites}
      addSaved={this.addSaved}
      />
      </>
    )
  }
}

export default App