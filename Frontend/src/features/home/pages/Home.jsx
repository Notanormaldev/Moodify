import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { Songcontext } from '../song.context'
import { useauth } from '../../auth/hooks/useAuth'

function Home() {
  const { moodBackground } = useContext(Songcontext)
    const navigate = useNavigate()
 
    const { handlelogout } = useauth()

    async function logbtn(){
      await handlelogout()
    }
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: 24,
        display: 'grid',
        gap: 32,
        justifyItems: 'center',
        background: moodBackground,
        transition: 'background 0.5s ease',
        position: 'relative',
      }}
    >
      <button
        onClick={logbtn}
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          padding: '10px 20px',
          fontSize: 14,
          borderRadius: 8,
          border: 'none',
          background: '#ff2b82',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Logout
      </button>
      <FaceExpression />
      <Player />
    </div>
  )
}

export default Home
