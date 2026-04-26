import { useContext } from "react"
import { Authcontext } from "../auth.context"
import { getme, login, logout, register } from "../Services/auth.api"
import { useEffect } from "react"



export const useauth =()=>{
    const {user,loading,setuser,setloading} = useContext(Authcontext)
    
    async function handlelogin({email,username,password}){
       setloading(true)
       const data= await login({email,username,password})
       setuser(data.username)
        setloading(false)  
    }
    async function handleregister({email,username,password}) {
        setloading(true)
         const data= await register({email,username,password})
         setuser(data.username)
        setloading(false)
    }
    async function handlegetme(){
        try {
        setloading(true)
        const data=await getme()
        setuser(data.user)
        setloading(false)
        } catch (error) {
            setloading(false)
        }
    }
    async function handlelogout() {
        setloading(true)
        const data= await logout()
        setuser(null)
        setloading(false)
        
    }


  
    return({
        handlegetme,handlelogin,handlelogout,handleregister,user,loading
    })
}