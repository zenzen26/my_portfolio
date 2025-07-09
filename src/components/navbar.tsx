'use client'
import { Sigmar_One } from 'next/font/google'

const sigmar = Sigmar_One({ subsets: ['latin'], weight: '400' })

export default function NavBar({ isSticky }: { isSticky: boolean }) {
  return (
    <div
      className={`z-50 transition-all duration-300 flex justify-center ${
        isSticky ? 'fixed top-0 left-0 right-0 bg-transparent' : 'relative'
      }`}
    >
      <nav
        className={`${sigmar.className} text-[20px] max-w-xl w-full px-8 py-4 font-semibold text-lg border-4 border-black rounded-md bg-white flex justify-center space-x-20 shadow-md`}
      >
        {['About', 'Projects', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="nav-item px-4 py-1 rounded-md"
          >
            <span>{item}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}
