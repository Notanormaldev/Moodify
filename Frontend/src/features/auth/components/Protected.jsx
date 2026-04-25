import React from 'react'
import { useauth } from '../hooks/useAuth'
import { useNavigate ,Navigate } from 'react-router'

function Protected({children}) {
    const {user,loading}=useauth()
    
    // console.log(user,loading);
    
    if(loading){
        return <h1>loading...</h1>
    }

    if(!user){
       return <Navigate to='/login'/>
    }

    return children
}

export default Protected
