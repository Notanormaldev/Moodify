import { useEffect, useState } from "react";
import { Children } from "react";
import { createContext } from "react";
import { getme } from "./Services/auth.api";


export const  Authcontext = createContext()

export const AuthProvider =({children})=>{
    const [loading, setloading] = useState(true)
    const [user, setuser] = useState(null)

     useEffect(()=>{
        getme().then(data=>{
            setuser(data.user)
            setloading(false)
        }).catch(err=>{
            setloading(false)
        })
     },[])

    return(
        <Authcontext.Provider value={{user,setuser,loading,setloading}}>
            {children}
        </Authcontext.Provider>
    )
}
