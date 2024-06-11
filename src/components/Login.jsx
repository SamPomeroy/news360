import React, { Component } from 'react'
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
        try {
            const allUsers = JSON.parse(localStorage.getItem('allUsers')) || []
            const user = allUsers.find(user=>user.username === this.state.username && user.password === this.state.password)
            if(!user){
                toast.error('Username or password is incorrect')
                return
            }
            const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || []
            const userSaved = savedArticles.filter(e=>e.username === user.username) || []
            localStorage.setItem('loggedInUser', JSON.stringify(user))
            this.props.handleUserLogin(user, savedArticles)
            
        } catch (error) {
            console.log(error)
            
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