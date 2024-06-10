import React, { Component } from 'react'
import {isAlpha, isAlphanumeric, isEmail, isStrongPassword} from 'validator'
import {toast} from 'react-toastify'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import {v4 as uuid} from 'uuid'

export class SignUp extends Component {
    state={
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '', 
        confirmPassword: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        usernameError: '',
        passwordError: '',
        confirmPasswordError: '',
        submitIsDisabled: true, 
    }
    componentDidUpdate =(prevProps, prevState)=>{
        const {firstName, 
            lastName, 
            email, 
            username, 
            password, 
            confirmPassword, 
            lastNameError, 
            firstNameError, 
            emailError, 
            passwordError, 
            usernameError, 
            confirmPasswordError}=this.state
        if(prevState.submitIsDisabled === true){
        if(firstName.length > 0 && 
            lastName.length > 0 &&
            email.length > 0 &&
            username.length > 0 && 
            password.length > 0 &&
            confirmPassword.length > 0 &&
            !lastNameError &&
            !firstNameError &&
            !usernameError &&
            !emailError &&
            !passwordError &&
            !confirmPasswordError){
                this.setState({submitIsDisabled: false})
            }
        }    else{
            if(!firstName || 
                !lastName ||
                !email ||
                !username ||
                !password ||
                !confirmPassword){
                    this.setState({submitIsDisabled: true})
        }
    }
    }

    handleOnSubmit = async (event) =>{
        event.preventDefault()
        try {
            const {
                firstName,
                lastName,
                username,
                email,
                password
            } = this.state
            const savedUsers = JSON.parse(localStorage.getItem('allUsers')) || []
            if(savedUsers.some(e=>e.username === username)){
                toast.error('username already exists')
                return
            }
            const id = uuid()
            const user = {firstName, lastName, email, username, password, id }
            savedUsers.push(user)
            localStorage.setItem('allUsers', JSON.stringify(savedUsers))
           toast.success('User created')
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        })
    }
    catch (error) {
        console.log(error)
        // toast.error(error.response.data.message)
    }
}

    handleOnChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        },()=>{
            switch (event.target.name){
                case "firstName": return this.handleFirstAndLastName(event)
                case "lastName": return this.handleFirstAndLastName(event)
                case "email": return this.handleEmail(event)
                case "username": return this.handleUsername(event)
                case "password": return this.handlePassword(event)
                case "confirmPassword": return this.handleConfirmPassword(event)
            }
        })
    }

    handleFirstAndLastName =(event)=>{
        if(this.state[event.target.name].length > 0){
            if(isAlpha(this.state[event.target.name])){
                this.setState({
                    [`${event.target.name}Error`]: ''
                })
            }else{
                this.setState({
                    [`${event.target.name}Error`]: `${event.target.placeholder} can only contain letters`
                })
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        }
    }
    handleEmail =(event)=>{
        if(this.state[event.target.name].length > 0){
            if(isEmail(this.state[event.target.name])){
                this.setState({
                    [`${event.target.name}Error`]: ''
                })
            }else{
                this.setState({
                    [`${event.target.name}Error`]: `${event.target.placeholder} must be valid`
                })
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        }
    }
    handleUsername =(event)=>{
        if(this.state[event.target.name].length > 0){
            if(isAlphanumeric(this.state[event.target.name])){
                this.setState({
                    [`${event.target.name}Error`]: ''
                })
            }else{
                this.setState({
                    [`${event.target.name}Error`]: `${event.target.placeholder} can only contain alphanumeric`
                })
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        }
    }
    handlePassword =(event)=>{
        if(this.state[event.target.name].length > 0){
            if(isStrongPassword(this.state[event.target.name])){
                this.setState({
                    [`${event.target.name}Error`]: ''
                })
            }else{
                this.setState({
                    [`${event.target.name}Error`]: `${event.target.placeholder} must contain at least 8 characters, one uppsercase, one lowercase and one special character`
                })
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `please confirm ${event.target.placeholder}`})
        }
    }
   
    handleConfirmPassword =(event)=>{
       if(this.state[event.target.name].length > 0){
            if(this.state.confirmPassword === this.state.password){
                this.setState({
                    [`${event.target.name}Error`]: ''
                })
            }else{
                this.setState({
                    [`${event.target.name}Error`]: `Password does not match. Please try again.`
                })
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        
    }
    }
        
    

  render() {
    return (
        <div style={{width: '100vw', height: '92vh'}} className='bg-black text-white'>
            <Container fluid style={{display: 'flex', justifyContent: 'center', alignItems:'center', height: '100%'}}>
                <Form style={{width: '70vw'}} onSubmit={this.handleOnSubmit}>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control name='firstName' value={this.state.firstName} onChange={this.handleOnChange}></Form.Control>
                            <Form.Text className='text-white'>{this.state.firstNameError}</Form.Text>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name='lastName' value={this.state.lastName} onChange={this.handleOnChange}></Form.Control>
                            <Form.Text className='text-white'>{this.state.lastNameError}</Form.Text>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                    <Form.Label>Username</Form.Label>
                            <Form.Control name='username' value={this.state.username} onChange={this.handleOnChange}></Form.Control>
                            <Form.Text className='text-white'>{this.state.usernameError}</Form.Text>

                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Email</Form.Label>
                            <Form.Control type='email' name='email' value={this.state.email} onChange={this.handleOnChange}></Form.Control>
                            <Form.Text className='text-white'>{this.state.emailError}</Form.Text>

                    </Form.Group>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='password' value={this.state.password} onChange={this.handleOnChange}></Form.Control>
                            <Form.Text className='text-white'>{this.state.passwordError}</Form.Text>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleOnChange}></Form.Control>
                            <Form.Text className='text-white'>{this.state.confirmPasswordError}</Form.Text>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Button className='mt-3' type='submit'>Submit</Button>


                </Form>
            </Container>

        </div>
    )
} 
}
export default SignUp