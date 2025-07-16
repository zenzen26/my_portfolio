'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
// import { Fraunces } from 'next/font/google'
// import { Sigmar_One } from 'next/font/google'
import { motion, useScroll, useTransform } from 'framer-motion'
import NavBar from '@/components/navbar'

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)

  // Goals Card Animation Variable
  const containerRef = useRef<HTMLDivElement>(null)
  const jobRef = useRef<HTMLDivElement>(null)
  const interestRef = useRef<HTMLDivElement>(null)
  const skillRef = useRef<HTMLDivElement>(null)
  const [jobHeight, setJobHeight] = useState(0)
  const [interestHeight, setInterestHeight] = useState(0)
  const [skillHeight, setSkillHeight] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  useEffect(() => {

    if (jobRef.current) setJobHeight(jobRef.current.offsetHeight)
    if (interestRef.current) setInterestHeight(interestRef.current.offsetHeight)
    if (skillRef.current) setSkillHeight(skillRef.current.offsetHeight)
    const handleScroll = () => {
      if (!triggerRef.current) return
      const triggerTop = triggerRef.current.getBoundingClientRect().top
      setIsSticky(triggerTop <= 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

const jobY = useTransform(scrollYProgress, [0.15, 0.35], [jobHeight || 500, 0])
const interestY = useTransform(scrollYProgress, [0.35, 0.55], [interestHeight || 500, 0])
const skillY = useTransform(scrollYProgress, [0.55, 0.75], [skillHeight || 500, 0])


  return (
    <main className= "min-h-screen max-w-12xl ">

      {/* Header Section */}
      <div ref={headerRef} className="h-auto py-10 px-8 text-center">
        <p className="big-title text-white">HELLO STALKER :D</p>
      </div>

      {/* Scroll trigger */}
      <div ref={triggerRef} className="h-[1px]" />

      {/* NavBar (sticky logic) */}
      <NavBar isSticky={isSticky} />
      <div className={isSticky ? 'h-20' : 'h-0'} />

      {/* Content */}
      <div className="text-center max-w-12xl mx-auto px-30 pt-16">

        {/* Introduction */}
        <section className="flex my-20 overflow-hidden items-center justify-center">
          <div className="w-[95%] flex items-center justify-between gap-12 p-10 leading-relaxed text-justify bg-foreground border-2 border-black rounded-[20px]">
            {/* Left Text Container */}
            <div className="w-[65%] text-left">
              <h1>A little bit about me ...</h1>
              <p className="body-2 my-5 text-black">
                Malaysian-born and mildly concerned about both reptilian and coding pythons. <br /><br />
                Graduated from UTS with a <b><u>Bachelor in Computer Science (Honours), majored in Artificial Intelligence and Data Analytics</u></b> — basically teaching machines to think while I still can’t decide what’s for dinner.. <br /><br />
                I like cats, money, and data — preferably all in one dashboard. Funny how we let numbers and patterns make our biggest life decisions.
              </p>
            </div>

            {/* Right Image Container */}
            <div className="w-[35%]">
              <Image
                src="/images/avatar.png"
                alt="avatar"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </section>


        {/* Goals, Skills, Industry */}
       <section className="my-10 h-[250vh]" ref={containerRef}>
          <h1 className='text-dark-black'>Goals, Skills, Interests ...</h1>
          <div className="sticky top-0 h-screen flex flex-col justify-center">
            <div className="flex gap-6">
              {/* Job Card */}
              <motion.div
                ref={jobRef}
                className="flex-1 p-6 bg-foreground border-2 border-black rounded-[20px]"
                style={{ y: jobY }}
              >
                <h4 className="mb-4">Preferred Jobs</h4>
                <p className="body-3 font-bold underline">Intern / Associate / Junior Roles</p>
                <ul className="body-3 list-disc list-inside text-left space-y-2 my-5">
                  <li>Data Scientist (Preferred)</li>
                  <li>Data Analytics</li>
                  <li>Data Engineer</li>
                  <li>Web Developer</li>
                </ul>
              </motion.div>

              {/* Interests Card */}
              <motion.div
                ref={interestRef}
                className="flex-1 p-6 bg-foreground border-2 border-black rounded-[20px]"
                style={{ y: interestY }}
              >
                <h4 className="mb-4">Interests</h4>
                <p className="body-3 font-bold underline">Industry</p>
                <ul className="body-3 list-disc list-inside text-left space-y-2 my-3">
                  <li>Healthcare (Preferred)</li>
                  <li>Finance</li>
                  <li>Transport &amp; City Planning</li>
                  <li>Open to others</li>
                </ul>
                <p className="body-3 font-bold underline">Tasks</p>
                <ul className="body-3 list-disc list-inside text-left space-y-2 my-3">
                  <li>Building AI Models (Preferred)</li>
                  <li>Create Dashboards</li>
                  <li>Developing UI</li>
                </ul>
              </motion.div>

              {/* Skills Card */}
              <motion.div
                ref={skillRef}
                className="flex-1 p-6 bg-foreground border-2 border-black rounded-[20px]"
                style={{ y: skillY }}
              >
                <h4 className="mb-4">Skills</h4>
                <p className="body-3 font-bold underline">Programming Languages / Scripts</p>
                <ul className="body-3 list-disc list-inside text-left space-y-2 my-5">
                  <li>Python (Intermediate)</li>
                  <li>SQL (Intermediate)</li>
                  <li>Excel VBA</li>
                  <li>Java</li>
                  <li>PHP</li>
                  <li>JavaScript</li>
                </ul>
                <p className="body-3 font-bold underline">Apps</p>
                <ul className="body-3 list-disc list-inside text-left space-y-2 my-5">
                  <li>Dashboard: PowerBI, Tableau</li>
                  <li>Database: MySQL, Firebase, MS Access, MS Excel</li>
                  <li>CRM: Lark, Clickup</li>
                  <li>Design: Photoshop, Figma</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}