import React from 'react'
import '../styles/login.scss'
import Formgroup from '../components/Formgroup'
import { Link, useNavigate } from 'react-router'
import { useauth } from '../hooks/useAuth'
import { useState } from 'react'
function Login() {
  const {loading,handlelogin}=useauth()

  const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  async function handlesubmit(e) {
    e.preventDefault()
    await handlelogin({email,password})
   navigate('/') 
  }


  return (
    <main className="loginpage">
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handlesubmit}>
                <Formgroup value={email} onChange={(e)=>setemail(e.target.value)} label='Email' placeholder='Enter the email' />
                <Formgroup value={password} onChange={(e)=>setpassword(e.target.value)} label='password' placeholder='Enter the password' />
              
                <button>Login</button>
            </form>
              <p>Don't have a account ? <Link to='/register'>Register here</Link></p>
        </div>
    </main>
  )
}

export default Login
