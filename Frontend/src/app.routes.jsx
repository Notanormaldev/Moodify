import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import {createBrowserRouter} from 'react-router-dom'


export const router  = createBrowserRouter([
    {
        path:'/',
        element:<h1>home page </h1>
    },
    {
        path:'/login',
        element:<Login/>
    },{
        path:'/register',
        element:<Register/>
    }
])