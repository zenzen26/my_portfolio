'use client'
import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
import { useRouter } from 'next/router' // ✅ correct for pages dir
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  { lines: ['KNOCK KNOCK'], bg: 'var(--primary)' },
  { lines: ['WHO\'S THERE?'], bg: 'var(--primary)' },
  { lines: ['POOKIE WHO ?'], bg: 'var(--primary)' },
]

export default function Landing() {
  const [current, setCurrent] = useState(0)
  const [showRipple, setShowRipple] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (current < slides.length - 1) {
      const interval = setInterval(() => {
        setCurrent((prev) => prev + 1)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [current])

  useEffect(() => {
    if (current === slides.length - 1) {
      const handleScroll = () => {
        setShowRipple(true)
        setTimeout(() => {
          router.push(`${router.basePath || ''}/home`)
        }, 1000) // match ripple animation duration
      }

      window.addEventListener('wheel', handleScroll, { once: true })
      return () => window.removeEventListener('wheel', handleScroll)
    }
  }, [current, router])

  return (
    <main
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      {/* Animate background color container */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full -z-10"
        animate={{ backgroundColor: slides[current].bg }}
        transition={{ duration: 1 }}
      />

      {/* Slide container */}
      <div
        className="transition-transform duration-700 ease-in-out h-full"
        style={{
          transform: `translateY(-${current * 100}vh)`,
        }}
      >
        {slides.map((slide, i) => (
          <section
            key={i}
            className="h-screen flex justify-center items-center"
          >
            <div className="flex flex-col items-center leading-normal" style={{ lineHeight: '1.1' }}>
              {slide.lines.map((line, idx) => (
                <motion.h1
                  key={idx}
                  className="text-secondary text-center font-bold text-[220px] sm:text-[80px] lg:text-[220px] tracking-tight"
                  initial={{ opacity: 0, y: 30, letterSpacing: '-0.05em' }}
                  animate={{
                    opacity: i === current ? 1 : 0,
                    y: i === current ? 0 : 30,
                    letterSpacing: i === current ? '0.05em' : '-0.55em',
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                    delay: idx * 0.1,
                  }}
                >
                  {line}
                </motion.h1>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Ripple effect */}
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
