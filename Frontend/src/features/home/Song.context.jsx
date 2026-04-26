import { useState, createContext } from "react";
import { songapi } from "./services/song.api";

export const Songcontext = createContext();

const moodBackgrounds = {
  natural: "linear-gradient(135deg, #163f91 0%, #111827 40%, #0a101e 70%, #e2398b 100%)",
  happy: "linear-gradient(135deg, #4c0b60 0%, #1f2937 30%, #ac44a5 65%, #02040b 100%)",
  sad: "linear-gradient(135deg, #090b10 0%, #111219 35%, #1a2431 70%, #06090f 100%)",
  surprised: "linear-gradient(135deg, #942d48 0%, #0f172a 30%, #111827 70%, #0d423a 100%)",
};

const getMoodBackground = (mood) => moodBackgrounds[mood] || moodBackgrounds.natural;

export const SongProvider = ({children})=>{
  const [loading, setloading] = useState(false)
  const [song, setsong] = useState(null)
  const [moodKey, setMoodKey] = useState("natural")
  const [moodBackground, setMoodBackground] = useState(getMoodBackground("natural"))

  async function handleSongGet(mood){
    const normalizedMood = mood || "natural"
    setMoodKey(normalizedMood)
    setMoodBackground(getMoodBackground(normalizedMood))
    setloading(true)
    try {
      const data = await songapi({ mood: normalizedMood })
      setsong(data.song)
    } catch (error) {
      console.error("Song fetch failed", error)
    } finally {
      setloading(false)
    }
  }

  return(
    <Songcontext.Provider value={{song,setsong,loading,setloading,handleSongGet,moodKey,moodBackground}}>
      {children}
    </Songcontext.Provider>
  )
}