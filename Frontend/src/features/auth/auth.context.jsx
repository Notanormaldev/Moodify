import { useState } from "react";
import { Children } from "react";
import { createContext } from "react";


export const  Authcontext = createContext()

export const AuthProvider =({children})=>{
    const [loading, setloading] = useState(true)
    const [user, setuser] = useState(null)

  

    return(
        <Authcontext.Provider value={{user,setuser,loading,setloading}}>
            {children}
        </Authcontext.Provider>
    )
}
