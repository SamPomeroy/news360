import React from 'react'
import Navbar from './NavBar'
//Navbar has access to everything and has router links
export default function Layout(props) {
  console.log(props)
  return (
    <div>
        <Navbar user = {props.user} logoutUser={props.logoutUser}/>
        {props.children}
    </div>
  )
}
