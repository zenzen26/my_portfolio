'use client'
import { useEffect, useRef, useState } from 'react'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'
import Typewritter from '@/components/typewritter'

type Event = {
  title: string
  description: string
  start: Date
  end: Date
}

// Sample events sorted ascending initially, will reverse later
const sampleEvents: Event[] = [
  {
    title: 'AI Intern @ INCYT',
    description: 'Developed ML pipelines and deployed edge AI systems.',
    start: new Date(2025, 0),
    end: new Date(2025, 6),
  },
  {
    title: 'Freelance Developer',
    description: 'Built web apps for local businesses.',
    start: new Date(2024, 5),
    end: new Date(2024, 11),
  },
  {
    title: 'Teaching Assistant @ UTS',
    description: 'Tutored Data Analytics and Machine Learning subjects.',
    start: new Date(2023, 2),
    end: new Date(2024, 10),
  },
].sort((a, b) => a.start.getTime() - b.start.getTime())

function monthsDiff(d1: Date, d2: Date) {
  return (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth())
}

const monthHeight = 80  // Increased from 50 to 80 for more vertical spacing
const cardWidth = 600

// Years to show in floating menu
const yearsMenu = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2001, 1800]

export default function HorizontalTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Map year => ref to latest event card of that year
  const yearRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  // Timeline calculations
  const earliestStart = sampleEvents.reduce(
    (earliest, ev) => (ev.start < earliest ? ev.start : earliest),
    sampleEvents[0].start
  )
  const latestEnd = sampleEvents.reduce(
    (latest, ev) => (ev.end > latest ? ev.end : latest),
    sampleEvents[0].end
  )
  const totalMonths = monthsDiff(earliestStart, latestEnd) + 1

  // Reverse order: latest at top, oldest at bottom
  // yPos calculates distance from top for a given date
  function yPos(date: Date) {
    return (totalMonths - monthsDiff(earliestStart, date)) * monthHeight
  }

  // Reverse the sampleEvents for rendering from latest to oldest
  const eventsDesc = [...sampleEvents].sort((a, b) => b.start.getTime() - a.start.getTime())

  // Find latest event per year (based on end date)
  const latestEventByYear = new Map<number, Event>()
  sampleEvents.forEach(ev => {
    const yr = ev.start.getFullYear()
    const prev = latestEventByYear.get(yr)
    if (!prev || ev.end > prev.end) latestEventByYear.set(yr, ev)
  })

  // Scroll handler for floating menu clicks: smooth scroll to event card
  const handleYearClick = (year: number) => {
    const ref = yearRefs.current.get(year)
    if (ref && containerRef.current) {
      const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY
      const targetTop = ref.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: targetTop - containerTop + window.scrollY - 80, // adjust for sticky navbar height
        behavior: 'smooth',
      })
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center">
      {/* Header and NavBar */}
      <div className="w-full max-w-12xl py-10 px-8 text-center">
        <Typewritter text="MY EXPERIENCES" speed={80} loop={true} />
      </div>
      <NavBar isSticky={true} />

      {/* Content */}
      <div
        className="text-center max-w-7xl mx-auto px-8 pt-16 w-full relative flex"
        ref={containerRef}
        style={{ minHeight: totalMonths * monthHeight + 200 }}
      >
        {/* Floating sticky vertical menu */}
        <nav
          className="sticky top-32 flex flex-col space-y-2 mr-8 h-fit"
          style={{ minWidth: '80px', alignSelf: 'start' }}
        >
          {yearsMenu.map(year => (
            <button
              key={year}
              onClick={() => handleYearClick(year)}
              className="text-sm font-semibold hover:text-primary transition-colors"
              type="button"
            >
              {year}
            </button>
          ))}
        </nav>

        {/* Timeline section */}
        <div className="flex-1 flex flex-row items-start w-full max-w-[900px]">
          {/* Left: date labels */}
          <div className="w-24 flex flex-col items-end pr-6 relative">
            {/* Timeline vertical baseline */}
            <div
              className="bg-black absolute left-full top-0"
              style={{ width: 2, height: totalMonths * monthHeight }}
            />
            {eventsDesc.map((event, idx) => {
              const top = yPos(event.start)
              return (
                <div
                  key={idx}
                  className="absolute right-0 text-xs text-gray-500 font-mono"
                  style={{ top }}
                >
                  {`${event.start.getFullYear()}-${String(event.start.getMonth() + 1).padStart(2, '0')}`}
                </div>
              )
            })}
          </div>

          {/* Middle: timeline line with dots and connecting lines */}
          <div
            className="relative w-8 flex flex-col items-center"
            style={{ height: totalMonths * monthHeight }}
          >
            {eventsDesc.map((event, idx) => {
              const startY = yPos(event.start)
              const endY = yPos(event.end)
              return (
                <div key={idx} className="relative w-full">
                  {/* Vertical connecting line */}
                  <div
                    className="bg-black absolute left-1/2"
                    style={{
                      top: startY,
                      height: endY - startY,
                      width: 2,
                      transform: 'translateX(-50%)',
                      zIndex: 0,
                    }}
                  />
                  {/* Start dot (green) */}
                  <div
                    className="rounded-full w-5 h-5 absolute left-1/2 shadow-md"
                    style={{
                      top: startY,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                      backgroundColor: 'green',
                    }}
                    title={`${event.title} Start`}
                  />
                  {/* End dot (red) with label */}
                  <div
                    className="rounded-full w-3 h-3 absolute left-1/2 shadow"
                    style={{
                      top: endY,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                      backgroundColor: 'red',
                    }}
                    title={`${event.title} End`}
                  />
                  <p
                    className="body-3 absolute left-full ml-4 text-black font-semibold select-none"
                    style={{ top: endY - 40 }}
                  >
                    {`${event.title} ended`}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Right: event cards */}
          <div className="flex-1 pl-8 relative">
            {eventsDesc.map((event, idx) => {
              const top = yPos(event.start)
              // For each event, if it's the latest for its year, save ref to map
              const year = event.start.getFullYear()
              return (
                <div
                  key={idx}
                  className="absolute container-1 bg-white p-6 rounded-lg shadow-md text-left"
                  style={{ top, width: cardWidth }}
                  ref={el => {
                    if (el && latestEventByYear.get(year) === event) {
                      yearRefs.current.set(year, el)
                    }
                  }}
                >
                  <h4 className="font-semibold mb-1">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    {`${event.start.getFullYear()}-${String(event.start.getMonth() + 1).padStart(2, '0')} - ${
                      event.end.getFullYear()
                    }-${String(event.end.getMonth() + 1).padStart(2, '0')}`}
                  </p>
                  <p className="text-sm">{event.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
