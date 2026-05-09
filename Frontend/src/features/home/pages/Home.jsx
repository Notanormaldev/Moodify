import React, { useContext, useEffect, useState } from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { Songcontext } from '../Song.context.jsx'
import { useauth } from '../../auth/hooks/useAuth'
import { RiLogoutCircleRLine } from 'react-icons/ri'

function Home() {
  const { moodBackground } = useContext(Songcontext)

  const { handlelogout } = useauth()

  const [ismobile, setismobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    function resizehandle() {
      setismobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', resizehandle)

    return () => window.removeEventListener('resize', resizehandle)
  }, [])

  async function logbtn() {
    await handlelogout()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: '24px',

        display: 'grid',
        gap: '32px',
        justifyItems: 'center',

        background: moodBackground,

        transition: 'background 0.5s ease',

        position: 'relative',

        overflow: 'hidden',
      }}
    >
      {/* DESKTOP LOGOUT BUTTON */}
      {!ismobile && (
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
      )}

      {/* FACE */}
      <FaceExpression />

      {/* PLAYER */}
      <Player />

      {/* MOBILE BOTTOM LOGOUT ICON */}
      {ismobile && (
        <button
          onClick={logbtn}
          style={{
            position: 'fixed',

            bottom: '20px',
            right: '20px',

            width: '60px',
            height: '60px',

            borderRadius: '50%',

            border: 'none',

            background: '#ff2b82',

            color: '#fff',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            fontSize: '28px',

            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',

            zIndex: 1000,

            cursor: 'pointer',
          }}
        >
          <RiLogoutCircleRLine />
        </button>
      )}
    </div>
  )
}

export default Home