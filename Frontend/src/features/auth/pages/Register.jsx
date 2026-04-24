import React from 'react'
import Formgroup from '../components/Formgroup'
import '../styles/register.scss'
import { Link } from 'react-router'

function Register() {
  return (
    <main className="registerpage">
        <div className="form-container">
            <h1>Register</h1>
            <form >
              <Formgroup label='Email' placeholder='Enter the email'/>
              <Formgroup label='username' placeholder='Enter the username'/>
              <Formgroup label='password' placeholder='Enter the password'/>

                <button>Register</button>
            </form>
            <p>Already have a account ? <Link to='/login'>Login here</Link></p>
        </div>
    </main>
  )
}

export default Register
