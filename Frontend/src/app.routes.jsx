import Protected from "./features/auth/components/Protected";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import {createBrowserRouter} from 'react-router-dom'
import Home from "./features/home/pages/Home";


export const router  = createBrowserRouter([
    {
        path:'/',
        element:<Protected><Home/></Protected>
    },
    {
        path:'/login',
        element:<Login/>
    },{
        path:'/register',
        element:<Register/>
    }
])