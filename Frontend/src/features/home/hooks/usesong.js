const { useContext } = require("react")
const { Songcontext } = require("../song.context")
const { songapi } = require("../services/song.api")


const usesong = ()=>{
   const {song,setsong,loading,setloading} = useContext(Songcontext)

   async function handlesongget({mood}){
     setloading(true)
     const data= await songapi({mood})
     setsong(data.song)
     setloading(false)
   }

   return(
    {song,loading,handlesongget}
   )

}