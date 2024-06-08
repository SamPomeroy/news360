import React, { Component } from 'react'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import {toast} from 'react-toastify'
import { Button, Container, Form } from 'react-bootstrap'


export class Login extends Component {
    state={
        username:'',
        password:''
    }
    handleOnChange=(event)=>{
        this.setState({[event.target.name]: event.target.value})
    }
    handleOnSubmit=async (event)=>{
        event.preventDefault()
        const allUsers = JSON.parse(localStorage.getItem('allUsers')) || []
        const allSavedArrays = JSON.parse(localStorage.getItem('allSavedArrays')) || []
        const foundUser = allUsers.find(user=>user.username === this.state.username && user.password === this.state.password)
        const userSavedArr = allSavedArrays.find(e=>e.username === foundUser.username) || []
      
        if(foundUser){

            localStorage.setItem('loggedInUser', foundUser)
            localStorage.setItem('loggedInUserSaved', userSavedArr)
            this.props.handleUserLogin(foundUser, userSavedArr.saved)
            toast.success('user logged in')
        }
        else {
            toast.error('username and password do not match')
        }
    }
  render() {
    return (
        <Container className='bg-black text-white'  fluid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '92vh'}}>
            <Form style={{width:'50vw'}} onSubmit={this.handleOnSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control name='username' value={this.state.username} onChange={this.handleOnChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name='password' value={this.state.password} onChange={this.handleOnChange}></Form.Control>
                </Form.Group>
                <Button type='submit' className='mt-3'>Submit</Button>

            </Form>
        </Container>
    )
  }
}

export default Login