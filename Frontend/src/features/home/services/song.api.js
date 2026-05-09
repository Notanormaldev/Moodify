import axios from "axios"

const api = axios.create({
    baseURL:"https://moodify-5y5h.onrender.com",
    withCredentials:true
})


export async function songapi({mood}){
    const res = await api.get('/api/songs/?mood='+mood)
    console.log(res.data);
    
    return res.data
}
