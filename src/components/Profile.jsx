import { Component } from 'react'

export class Profile extends Component {
    state = {
        firstName: "",
        lastName: "",
        username: "",
        email: ""
    }

  render() {
    return (
      <div >
        <div style={{width: '100vw', height:'92vh', overflow: 'auto', display: 'flex', justifyContent: 'center', padding: '20px'}} className='bg-dark text-white' >
          <div>
            <h3><u>Profile</u></h3>
            <div>
                <p className='text-white'>First Name: {this.props.user.firstName}</p>
                <p>Last Name: {this.props.user.lastName}</p>
                <p>Username: {this.props.user.username}</p>
                <p>Email: {this.props.user.email}</p>
            </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Profile

