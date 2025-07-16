'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'
import Typewritter from '@/components/typewritter'

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const handleScroll = () => {
      if (!triggerRef.current) return
      const triggerTop = triggerRef.current.getBoundingClientRect().top
      setIsSticky(triggerTop <= 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const card1RotateY = useTransform(scrollYProgress, [0, 0.33], [0, 180])
  const card2RotateY = useTransform(scrollYProgress, [0.33, 0.66], [0, 180])
  const card3RotateY = useTransform(scrollYProgress, [0.66, 1], [0, 180])

  return (
    <main className="min-h-screen bg-background">
      <div ref={headerRef} className="w-full h-auto py-10 px-8 text-center">
        <Typewritter text="HELLO STALKER :D" speed={80} loop={true} />
      </div>
      <div ref={triggerRef} className="h-[1px]" />
      <NavBar isSticky={isSticky} />
      <div className={isSticky ? 'h-20' : 'h-0'} />

      <div className="text-center max-w-12xl mx-auto px-30 pt-16">
        {/* Introduction */}
        <section className="flex my-20 overflow-hidden items-center justify-center">
          <div className="container-1 w-full flex items-center justify-between gap-30 leading-relaxed text-justify bg-white rounded-[20px] p-10">
            <div className="w-[65%] text-left">
              <h1>A little bit about me ...</h1>
              <p className="body-2 my-5 text-black">
                <br />
                Graduated from UTS with a{' '}
                <b><u>Bachelor in Computer Science (Honours), majored in Artificial Intelligence and Data Analytics</u></b>{' '}
                — basically teaching machines to think while I still can’t decide what’s for dinner..<br /><br />
                I like cats, money, and data — preferably all in one dashboard. Funny how we let numbers and patterns make our biggest life decisions.
              </p>
            </div>
            <div className="w-[35%]">
              <Image
                src="/images/avatar.png"
                alt="avatar"
                width={500}
                height={500}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </section>

         {/* Jobs, Interests, Skills */}
        <section className="my-10 min-h-[150vh]" ref={containerRef}>
          <div className="sticky top-0 h-screen flex justify-center items-center">
            <div className="flex gap-6 w-full">
              <FlipCard rotateY={card1RotateY} title="Preferred Jobs" subtitle="Intern / Associate / Junior Roles" items={["Data Scientist (Preferred)", "Data Analytics", "Data Engineer", "Web Developer"]} />
              <FlipCard rotateY={card2RotateY} title="Interests" subtitle="Industry" items={["Healthcare (Preferred)", "Finance", "Transport & City Planning", "Open to others"]} additional={{ title: 'Tasks', items: ["Building AI Models (Preferred)", "Create Dashboards", "Developing UI"] }} />
              <FlipCard rotateY={card3RotateY} title="Skills" subtitle="Programming Languages / Scripts" items={["Python (Intermediate)", "SQL (Intermediate)", "Excel VBA", "Java", "PHP", "JavaScript"]} additional={{ title: 'Apps', items: ["Dashboard: PowerBI, Tableau", "Database: MySQL, Firebase, MS Access, MS Excel", "CRM: Lark, Clickup", "Design: Photoshop, Figma"] }} />
            </div>
          </div>
        </section>

         {/* Current Status, Milestones, Goals */}
        <section className="flex my-20 overflow-hidden items-center justify-center">
          <div className="container-1 h-[700px] flex flex-col w-full flex items-center justify-between gap-5leading-relaxed text-justify bg-white rounded-[20px] p-10">
            <h2>Placeholder for project highlight</h2>
          </div>
        </section>
      </div>
      <Footer />
    </main>
    
  )
}

function FlipCard({ rotateY, title, subtitle, items, additional }) {
  return (
    <motion.div
      className="container-1 relative flex-1 min-h-[750px] bg-white shadow-lg cursor-pointer perspective-1000"
      style={{ transformStyle: 'preserve-3d', rotateY }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-center backface-hidden h-full"
        style={{ rotateY: 0 }}
      >
        <h4 className="text-3xl font-bold">{title}</h4>
      </motion.div>

      <motion.div
        className="absolute inset-0 p-6 backface-hidden h-full"
        style={{ rotateY: 180 }}
      >
        <h4 className="mb-4">{title}</h4>
        <p className="body-3 font-bold underline">{subtitle}</p>
        <ul className="body-3 list-disc list-inside text-left space-y-2 my-5">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {additional && (
          <>
            <p className="body-3 font-bold underline">{additional.title}</p>
            <ul className="body-3 list-disc list-inside text-left space-y-2 my-3">
              {additional.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
