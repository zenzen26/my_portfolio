'use client'
import { useEffect, useRef, useState } from 'react'
import { Fraunces } from 'next/font/google'
import { Sigmar_One } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin'], weight: ['400', '600', '700'] })
const sigmar = Sigmar_One({ subsets: ['latin'], weight: '400' })

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return
      const headerBottom = headerRef.current.getBoundingClientRect().bottom
      setIsSticky(headerBottom <= 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main
      className={`${fraunces.className} min-h-screen bg-[#ffd966] text-[#2a4020]`}
    >
      {/* CSS for vertical scroll-up "casino" hover effect */}
      <style>{`
        .nav-item {
          position: relative;
          overflow: hidden;
          height: 1.5em;
          cursor: pointer;
          color: #2a4020;
          display: inline-block;
        }
        .nav-item span {
          display: block;
          transform: translateY(0);
          transition: transform 0.3s ease;
        }
        .nav-item:hover span {
          animation: rollUp 0.6s forwards;
        }
        @keyframes rollUp {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-100%);
          }
          51% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Header Section */}
      <div ref={headerRef} className="py-20 px-8 text-center">
        <h1 className={`text-[120px] font-bold ${sigmar.className}`}>
          HELLO STALKER :D
        </h1>
      </div>

      {/* NavBar */}
    <div
    className={`z-50 transition-all duration-300 flex justify-center ${
        isSticky ? 'fixed top-0 left-0 right-0 bg-transparent' : 'relative'
    }`}
    >
    <nav
        className={`${sigmar.className} text-[20px] max-w-xl w-full px-8 py-4 font-semibold text-lg border-4 border-black rounded-md bg-white flex justify-center space-x-20 shadow-md`}
    >
        {['About', 'Projects', 'Contact'].map((item) => (
        <a key={item} href={`#${item.toLowerCase()}`} className="nav-item px-4 py-1 rounded-md">
            <span>{item}</span>
        </a>
        ))}
    </nav>
    </div>


      {/* Content */}
      <div
        className={`${fraunces.className} text-center max-w-4xl mx-auto px-8 pt-16 text-[#2a4020]`}
      >
        <section className="font-black max-w-4xl mx-auto px-6 py-16 text-lg leading-relaxed text-justify">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse
            lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum
            ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit
            amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a,
            enim.
          </p>
          <p className="mt-6">
            Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum
            bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim.
            Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus
            orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede
            pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
          </p>
          <p className="mt-6">
            Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa
            suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc
            turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et
            augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae
            elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse
            lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum
            ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit
            amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a,
            enim.
          </p>
          <p className="mt-6">
            Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum
            bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim.
            Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus
            orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede
            pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
          </p>
          <p className="mt-6">
            Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa
            suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc
            turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et
            augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae
            elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </p>
        </section>
      </div>
    </main>
  )
}
