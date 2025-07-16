'use client'
import { useState, useEffect } from 'react'

export default function Typewriter({ text, speed = 100, loop = false }: { text: string, speed?: number, loop?: boolean }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let currentIndex = 0
    let timeoutId: ReturnType<typeof setTimeout>

    function type() {
      setDisplayed(text.slice(0, currentIndex + 1))
      currentIndex++
      if (currentIndex < text.length) {
        timeoutId = setTimeout(type, speed)
      } else if (loop) {
        timeoutId = setTimeout(() => {
          setDisplayed('')
          currentIndex = 0
          type()
        }, 10000)
      }
    }
    type()

    return () => clearTimeout(timeoutId)
  }, [text, speed, loop])

  return (
    <>
      <p className="big-title text-dark-black">
        {displayed}
        <span className="cursor" />
      </p>

      <style jsx>{`
        .cursor {
          display: inline-block;
          width: 50px;
          height: 1em;
          margin-left: 4px;
          background-color: black;
          animation: blink 1s step-start infinite;
        }

        @keyframes blink {
          0%, 50%, 100% {
            opacity: 1;
          }
          25%, 75% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
