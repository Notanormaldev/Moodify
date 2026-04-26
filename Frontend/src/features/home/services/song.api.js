import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})


export async function songapi({mood}){
    const res = await api.get('/api/songs/?mood='+mood)
    console.log(res.data);
    
    return res.data
}
