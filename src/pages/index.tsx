'use client'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

export default function Landing() {
  const [showRipple, setShowRipple] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setShowRipple(true)
    setTimeout(() => {
      router.push(`${router.basePath || ''}/home`)
    }, 800) // match ripple animation
  }

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-contain -z-10 bg-black"
      >
        <source src="/images/Landing Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play Button */}
      <div className="flex flex-col items-center justify-center h-full space-y-10">
        <p className="big-title-2 text-[17rem] text-center" style={{ lineHeight: '0.8' }}>
          ZEN'S<br/>PORTFOLIO
        </p>

        <button
          onClick={handleClick}
          className="text-[3rem] rounded-full min-w-[30%] px-5 py-2 big-title-2 tracking-wider cursor-pointer select-none"
          style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}
        >
          PLAY
        </button>
      </div>


      {/* Ripple Effect */}
      <AnimatePresence>
        {showRipple && (
          <motion.div
            className="fixed top-1/2 left-1/2 bg-white rounded-full z-50"
            initial={{
              width: 0,
              height: 0,
              x: '-50%',
              y: '-50%',
              opacity: 0.5,
            }}
            animate={{
              width: '300vw',
              height: '300vw',
              opacity: 1,
              transition: { duration: 0.8, ease: 'easeInOut' },
            }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
