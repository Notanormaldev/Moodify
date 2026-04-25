import React from 'react'
import Formgroup from '../components/Formgroup'
import '../styles/register.scss'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { useauth } from '../hooks/useAuth'

function Register() {
   
  const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  const {handleregister,loading} = useauth()

 async function handlesubmit(e){
  e.preventDefault()
  await handleregister({username,email,password})
  navigate('/')
 }

  return (
    <main className="registerpage">
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handlesubmit} >
              <Formgroup value={email} onChange={(e)=>setemail(e.target.value)} label='Email' placeholder='Enter the email'/>
              <Formgroup value={username} onChange={(e)=>setusername(e.target.value)} label='username' placeholder='Enter the username'/>
              <Formgroup value={password} onChange={(e)=>setpassword(e.target.value)} label='password' placeholder='Enter the password'/>

                <button>Register</button>
            </form>
            <p>Already have a account ? <Link to='/login'>Login here</Link></p>
        </div>
    </main>
  )
}

export default Register
