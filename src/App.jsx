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
    console.log(userObj, savedArr)
    const user={...userObj, saved: savedArr}
    this.setState({user})
  }

  handleUserLogout=()=>{
    window.localStorage.removeItem('loggedInUser')
    this.setState({user: null})
  }
  async componentDidMount(){
    if(!this.state.user){
    const currentUser = localStorage.getItem('loggedInUser')
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || []
    
    
    if(currentUser){
      const parsed = JSON.parse(currentUser)
      const userSaved = savedArticles.filter(e=>e.username === parsed.username) || []
      const user = {...parsed, saved: userSaved}
      this.setState({user})
    }
  }
  }



  //saved and favorites functions
  addSaved =async(article)=>{
    const username = this.state.user.username
    const saveArticle = {...article, username}
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || []
    if(savedArticles.some(e=>e.url === article.url && e.username === username)){
      toast.error('Article already saved')
      return
    }
    savedArticles.push(saveArticle)
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
    const user = {...this.state.user, saved: [...this.state.user.saved, saveArticle]}
    this.setState({user})
  }
  deleteSaved = async(url)=>{
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || []
    const updateSaved = savedArticles.filter(i=>{
      if(i.url !== url && i.username === this.state.user.username){
        return i
      }
    })
    localStorage.setItem('savedArticles', JSON.stringify(updateSaved))
    const user = {...this.state.user, saved: updateSaved}
    this.setState({user})
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