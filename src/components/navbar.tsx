'use client'

export default function NavBar({ isSticky }: { isSticky: boolean }) {
  return (
    <div
      className={`z-50 transition-all duration-300 flex justify-center ${
        isSticky ? 'fixed top-0 left-0 right-0 bg-transparent' : 'relative'
      }`}
    >
      <nav
        className= "text-[20px] max-w-2xl w-full px-8 py-4 font-semibold text-lg border-4 border-black rounded-md bg-white flex justify-center space-x-20 shadow-md"
      >
        {['About', 'Experiences', 'Contact'].map((item) => (
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
